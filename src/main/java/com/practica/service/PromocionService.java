package com.practica.service;

import java.util.List;

import com.practica.dao.PromocionDAO;

public interface PromocionService {
    PromocionDAO crear(PromocionDAO promocionDAO);
    PromocionDAO obtenerPorId(Integer id);
    List<PromocionDAO> listarTodas();
    List<PromocionDAO> listarActivas();
    PromocionDAO actualizar(Integer id, PromocionDAO promocionDAO);
    void eliminar(Integer id);
}