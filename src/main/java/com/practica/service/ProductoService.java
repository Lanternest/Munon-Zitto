package com.practica.service;

import java.util.List;

import com.practica.dao.ProductoDAO;

public interface ProductoService {
    ProductoDAO crear(ProductoDAO productoDAO);
    ProductoDAO obtenerPorId(Integer id);
    List<ProductoDAO> listarTodos();
    List<ProductoDAO> listarPorCategoria(String categoria);
    ProductoDAO actualizar(Integer id, ProductoDAO productoDAO);
    void eliminar(Integer id);
    ProductoDAO actualizarStock(Integer id, Integer cantidad);
}