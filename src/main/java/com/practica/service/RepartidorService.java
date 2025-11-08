package com.practica.service;

import java.util.List;

import com.practica.dao.RepartidorDAO;

public interface RepartidorService {
    RepartidorDAO crear(RepartidorDAO repartidorDAO);
    RepartidorDAO obtenerPorDni(String dniR);
    List<RepartidorDAO> listarTodos();
    RepartidorDAO actualizar(String dniR, RepartidorDAO repartidorDAO);
    void eliminar(String dniR);
}