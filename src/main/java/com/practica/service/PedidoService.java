package com.practica.service;

import java.util.List;

import com.practica.dao.CrearPedidoDAO;
import com.practica.dao.PagoDAO;
import com.practica.dao.PedidoDAO;

public interface PedidoService {
    PedidoDAO crearPedido(CrearPedidoDAO crearPedidoDAO);
    PedidoDAO obtenerPorId(Integer id);
    List<PedidoDAO> listarTodos();
    List<PedidoDAO> listarPorCliente(String dni);
    PedidoDAO actualizarEstado(Integer id, String estado);
    PedidoDAO asignarRepartidor(Integer id, String dniR);
    void cancelarPedido(Integer id);
    PagoDAO procesarPago(Integer idPedido, String formaPago);
}