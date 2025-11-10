package com.practica.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.practica.dao.ProductoDAO;
import com.practica.entity.Producto;
import com.practica.exception.BadRequestException;
import com.practica.exception.ResourceNotFoundException;
import com.practica.repository.ProductoRepository;
import com.practica.service.ProductoService;

@Service
public class ProductoServiceImpl implements ProductoService {
    
    @Autowired
    private ProductoRepository productoRepository;
    
    @Override
    public ProductoDAO crear(ProductoDAO productoDAO) {
        Producto producto = new Producto(
            productoDAO.getNombre(),
            productoDAO.getDescripcion(),
            productoDAO.getPrecio(),
            productoDAO.getStock(),
            productoDAO.getDiasVencimiento(),
            productoDAO.getCategoria(),
            productoDAO.getImagenUrl()
        );
        Producto saved = productoRepository.save(producto);
        return convertirADAO(saved);
    }
    
    @Override
    public ProductoDAO obtenerPorId(Integer id) {
        Producto producto = productoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + id));
        return convertirADAO(producto);
    }
    
    @Override
    public List<ProductoDAO> listarTodos() {
        return productoRepository.findAll().stream()
            .map(this::convertirADAO)
            .collect(Collectors.toList());
    }
    
    @Override
    public List<ProductoDAO> listarPorCategoria(String categoria) {
        return productoRepository.findByCategoria(categoria).stream()
            .map(this::convertirADAO)
            .collect(Collectors.toList());
    }
    
    @Override
    public ProductoDAO actualizar(Integer id, ProductoDAO productoDAO) {
        Producto producto = productoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + id));
        
        producto.setNombre(productoDAO.getNombre());
        producto.setDescripcion(productoDAO.getDescripcion());
        producto.setPrecio(productoDAO.getPrecio());
        producto.setStock(productoDAO.getStock());
        producto.setDiasVencimiento(productoDAO.getDiasVencimiento());
        producto.setCategoria(productoDAO.getCategoria());
        producto.setImagenUrl(productoDAO.getImagenUrl());
        
        if (productoDAO.getEstado() != null) {
            producto.setEstado(Producto.EstadoProducto.valueOf(productoDAO.getEstado()));
        }
        
        Producto updated = productoRepository.save(producto);
        return convertirADAO(updated);
    }
    
    @Override
    public void eliminar(Integer id) {
        if (!productoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Producto no encontrado con ID: " + id);
        }
        productoRepository.deleteById(id);
    }
    
    @Override
    public ProductoDAO actualizarStock(Integer id, Integer cantidad) {
        Producto producto = productoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + id));
        
        int nuevoStock = producto.getStock() + cantidad;
        if (nuevoStock < 0) {
            throw new BadRequestException("Stock insuficiente");
        }
        
        producto.setStock(nuevoStock);
        Producto updated = productoRepository.save(producto);
        return convertirADAO(updated);
    }
    
    private ProductoDAO convertirADAO(Producto producto) {
        return new ProductoDAO(
            producto.getIdProductos(),
            producto.getNombre(),
            producto.getDescripcion(),
            producto.getPrecio(),
            producto.getStock(),
            producto.getFechaElaboracion(),
            producto.getDiasVencimiento(),
            producto.getEstado().name(),
            producto.getCategoria(),
            producto.getImagenUrl()
        );
    }
}