package com.practica.service;

import java.util.List;

import com.practica.dao.VehiculoDAO;

public interface VehiculoService {
    VehiculoDAO crear(VehiculoDAO vehiculoDAO);
    VehiculoDAO obtenerPorPatente(String patente);
    List<VehiculoDAO> listarTodos();
    VehiculoDAO actualizar(String patente, VehiculoDAO vehiculoDAO);
    void eliminar(String patente);
}