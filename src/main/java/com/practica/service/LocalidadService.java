package com.practica.service;

import java.util.List;

import com.practica.dao.LocalidadDAO;

public interface LocalidadService {
    LocalidadDAO crear(LocalidadDAO localidadDAO);
    LocalidadDAO obtenerPorCodigoPostal(Integer codigoPostal);
    List<LocalidadDAO> listarTodas();
    LocalidadDAO actualizar(Integer codigoPostal, LocalidadDAO localidadDAO);
    void eliminar(Integer codigoPostal);
}