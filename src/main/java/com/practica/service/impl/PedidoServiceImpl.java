package com.practica.service.impl;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.practica.dao.*;
import com.practica.entity.*;
import com.practica.exception.BadRequestException;
import com.practica.exception.ResourceNotFoundException;
import com.practica.repository.*;
import com.practica.service.PedidoService;

import jakarta.transaction.Transactional;

@Service
public class PedidoServiceImpl implements PedidoService {
    
    @Autowired
    private PedidoRepository pedidoRepository;
    
    @Autowired
    private DetallePedidoRepository detallePedidoRepository;
    
    @Autowired
    private ProductoRepository productoRepository;
    
    @Autowired
    private ClienteRepository clienteRepository;
    
    @Autowired
    private RepartidorRepository repartidorRepository;
    
    @Autowired
    private PagoRepository pagoRepository;
    
    @Override
    @Transactional
    public PedidoDAO crearPedido(CrearPedidoDAO crearPedidoDAO) {
        // Validar que el cliente existe
        if (!clienteRepository.existsById(crearPedidoDAO.getDni())) {
            throw new ResourceNotFoundException("Cliente no encontrado");
        }
        
        // Crear el pedido
        Pedido pedido = new Pedido();
        pedido.setDni(crearPedidoDAO.getDni());
        pedido.setDireccionEntrega(crearPedidoDAO.getDireccionEntrega());
        pedido.setObservaciones(crearPedidoDAO.getObservaciones());
        
        BigDecimal subTotal = BigDecimal.ZERO;
        
        // Procesar cada detalle del pedido
        for (DetallePedidoDAO detalleDAO : crearPedidoDAO.getDetalles()) {
            // Validar producto y stock
            Producto producto = productoRepository.findById(detalleDAO.getIdProductos())
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + detalleDAO.getIdProductos()));
            
            if (producto.getStock() < detalleDAO.getCantidad()) {
                throw new BadRequestException("Stock insuficiente para el producto: " + producto.getNombre());
            }
            
            // Crear detalle
            DetallePedido detalle = new DetallePedido();
            detalle.setPedido(pedido);
            detalle.setIdProductos(detalleDAO.getIdProductos());
            detalle.setCantidad(detalleDAO.getCantidad());
            detalle.setPrecioUnitario(producto.getPrecio());
            
            BigDecimal subtotalDetalle = producto.getPrecio().multiply(new BigDecimal(detalleDAO.getCantidad()));
            detalle.setSubtotal(subtotalDetalle);
            detalle.setIdPromo(detalleDAO.getIdPromo());
            
            // Actualizar stock
            producto.setStock(producto.getStock() - detalleDAO.getCantidad());
            productoRepository.save(producto);
            
            pedido.getDetalles().add(detalle);
            subTotal = subTotal.add(subtotalDetalle);
        }
        
        pedido.setSubTotal(subTotal);
        pedido.setPrecioTotal(subTotal.subtract(pedido.getDescuentoTotal()));
        
        Pedido savedPedido = pedidoRepository.save(pedido);
        return convertirADAO(savedPedido);
    }
    
    @Override
    public PedidoDAO obtenerPorId(Integer id) {
        Pedido pedido = pedidoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Pedido no encontrado con ID: " + id));
        return convertirADAO(pedido);
    }
    
    @Override
    public List<PedidoDAO> listarTodos() {
        return pedidoRepository.findAll().stream()
            .map(this::convertirADAO)
            .collect(Collectors.toList());
    }
    
    @Override
    public List<PedidoDAO> listarPorCliente(String dni) {
        return pedidoRepository.findByDni(dni).stream()
            .map(this::convertirADAO)
            .collect(Collectors.toList());
    }
    
    @Override
    public PedidoDAO actualizarEstado(Integer id, String estado) {
        Pedido pedido = pedidoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Pedido no encontrado con ID: " + id));
        
        try {
            pedido.setEstado(Pedido.EstadoPedido.valueOf(estado));
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Estado inválido: " + estado);
        }
        
        Pedido updated = pedidoRepository.save(pedido);
        return convertirADAO(updated);
    }
    
    @Override
    public PedidoDAO asignarRepartidor(Integer id, String dniR) {
        Pedido pedido = pedidoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Pedido no encontrado con ID: " + id));
        
        if (!repartidorRepository.existsById(dniR)) {
            throw new ResourceNotFoundException("Repartidor no encontrado con DNI: " + dniR);
        }
        
        pedido.setDniR(dniR);
        pedido.setEstado(Pedido.EstadoPedido.En_Camino);
        
        Pedido updated = pedidoRepository.save(pedido);
        return convertirADAO(updated);
    }
    
    @Override
    @Transactional
    public void cancelarPedido(Integer id) {
        Pedido pedido = pedidoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Pedido no encontrado con ID: " + id));
        
        if (pedido.getEstado() == Pedido.EstadoPedido.Entregado) {
            throw new BadRequestException("No se puede cancelar un pedido ya entregado");
        }
        
        // Restaurar stock
        for (DetallePedido detalle : pedido.getDetalles()) {
            Producto producto = productoRepository.findById(detalle.getIdProductos())
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));
            producto.setStock(producto.getStock() + detalle.getCantidad());
            productoRepository.save(producto);
        }
        
        pedido.setEstado(Pedido.EstadoPedido.Cancelado);
        pedidoRepository.save(pedido);
    }
    
    @Override
    @Transactional
    public PagoDAO procesarPago(Integer idPedido, String formaPago) {
        Pedido pedido = pedidoRepository.findById(idPedido)
            .orElseThrow(() -> new ResourceNotFoundException("Pedido no encontrado con ID: " + idPedido));
        
        // Verificar si ya existe un pago
        if (pagoRepository.findByIdPedido(idPedido).isPresent()) {
            throw new BadRequestException("Este pedido ya tiene un pago registrado");
        }
        
        Pago pago = new Pago();
        pago.setIdPedido(idPedido);
        pago.setMonto(pedido.getPrecioTotal());
        
        try {
            pago.setFormaDePago(Pago.FormaPago.valueOf(formaPago));
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Forma de pago inválida: " + formaPago);
        }
        
        pago.setEstado(Pago.EstadoPago.Aprobado);
        pedido.setEstado(Pedido.EstadoPedido.Confirmado);
        
        Pago savedPago = pagoRepository.save(pago);
        pedidoRepository.save(pedido);
        
        return convertirPagoADAO(savedPago);
    }
    
    private PedidoDAO convertirADAO(Pedido pedido) {
        PedidoDAO dao = new PedidoDAO();
        dao.setIdPedido(pedido.getIdPedido());
        dao.setDni(pedido.getDni());
        dao.setDniR(pedido.getDniR());
        dao.setFecha(pedido.getFecha());
        dao.setFechaEntrega(pedido.getFechaEntrega());
        dao.setEstado(pedido.getEstado().name());
        dao.setSubTotal(pedido.getSubTotal());
        dao.setDescuentoTotal(pedido.getDescuentoTotal());
        dao.setPrecioTotal(pedido.getPrecioTotal());
        dao.setDireccionEntrega(pedido.getDireccionEntrega());
        dao.setObservaciones(pedido.getObservaciones());
        
        List<DetallePedidoDAO> detallesDAO = pedido.getDetalles().stream()
            .map(this::convertirDetalleADAO)
            .collect(Collectors.toList());
        dao.setDetalles(detallesDAO);
        
        return dao;
    }
    
    private DetallePedidoDAO convertirDetalleADAO(DetallePedido detalle) {
        DetallePedidoDAO dao = new DetallePedidoDAO();
        dao.setIdProductos(detalle.getIdProductos());
        dao.setCantidad(detalle.getCantidad());
        dao.setPrecioUnitario(detalle.getPrecioUnitario());
        dao.setSubtotal(detalle.getSubtotal());
        dao.setIdPromo(detalle.getIdPromo());
        return dao;
    }
    
    private PagoDAO convertirPagoADAO(Pago pago) {
        PagoDAO dao = new PagoDAO();
        dao.setIdPago(pago.getIdPago());
        dao.setIdPedido(pago.getIdPedido());
        dao.setFormaDePago(pago.getFormaDePago().name());
        dao.setMonto(pago.getMonto());
        dao.setFechaPago(pago.getFechaPago());
        dao.setEstado(pago.getEstado().name());
        dao.setComprobanteTransaccion(pago.getComprobanteTransaccion());
        return dao;
    }
}