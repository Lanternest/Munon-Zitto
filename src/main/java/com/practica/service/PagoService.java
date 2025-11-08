package com.practica.service;

import java.util.List;

import com.practica.dao.PagoDAO;

public interface PagoService {
    PagoDAO obtenerPorId(Integer id);
    PagoDAO obtenerPorPedido(Integer idPedido);
    List<PagoDAO> listarTodos();
    PagoDAO actualizarEstado(Integer id, String estado);
}