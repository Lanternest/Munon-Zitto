package com.practica.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.practica.dao.PagoDAO;
import com.practica.entity.Pago;
import com.practica.exception.BadRequestException;
import com.practica.exception.ResourceNotFoundException;
import com.practica.repository.PagoRepository;
import com.practica.service.PagoService;

@Service
public class PagoServiceImpl implements PagoService {
    
    @Autowired
    private PagoRepository pagoRepository;
    
    @Override
    public PagoDAO obtenerPorId(Integer id) {
        Pago pago = pagoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Pago no encontrado con ID: " + id));
        return convertirADAO(pago);
    }
    
    @Override
    public PagoDAO obtenerPorPedido(Integer idPedido) {
        Pago pago = pagoRepository.findByIdPedido(idPedido)
            .orElseThrow(() -> new ResourceNotFoundException("No hay pago registrado para el pedido ID: " + idPedido));
        return convertirADAO(pago);
    }
    
    @Override
    public List<PagoDAO> listarTodos() {
        return pagoRepository.findAll().stream()
            .map(this::convertirADAO)
            .collect(Collectors.toList());
    }
    
    @Override
    public PagoDAO actualizarEstado(Integer id, String estado) {
        Pago pago = pagoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Pago no encontrado con ID: " + id));
        
        try {
            pago.setEstado(Pago.EstadoPago.valueOf(estado));
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Estado inválido: " + estado);
        }
        
        Pago updated = pagoRepository.save(pago);
        return convertirADAO(updated);
    }
    
    private PagoDAO convertirADAO(Pago pago) {
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