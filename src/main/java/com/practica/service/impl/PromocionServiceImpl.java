package com.practica.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.practica.dao.PromocionDAO;
import com.practica.entity.Promocion;
import com.practica.exception.ResourceNotFoundException;
import com.practica.repository.PromocionRepository;
import com.practica.service.PromocionService;

@Service
public class PromocionServiceImpl implements PromocionService {
    
    @Autowired
    private PromocionRepository promocionRepository;
    
    @Override
    public PromocionDAO crear(PromocionDAO promocionDAO) {
        Promocion promocion = new Promocion(
            promocionDAO.getNombre(),
            promocionDAO.getDescripcion(),
            promocionDAO.getFechaInicio(),
            promocionDAO.getFechaFin(),
            promocionDAO.getPorcentajeDescuento()
        );
        Promocion saved = promocionRepository.save(promocion);
        return convertirADAO(saved);
    }
    
    @Override
    public PromocionDAO obtenerPorId(Integer id) {
        Promocion promocion = promocionRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Promoción no encontrada con ID: " + id));
        return convertirADAO(promocion);
    }
    
    @Override
    public List<PromocionDAO> listarTodas() {
        return promocionRepository.findAll().stream()
            .map(this::convertirADAO)
            .collect(Collectors.toList());
    }
    
    @Override
    public List<PromocionDAO> listarActivas() {
        return promocionRepository.findPromocionesActivas(LocalDate.now()).stream()
            .map(this::convertirADAO)
            .collect(Collectors.toList());
    }
    
    @Override
    public PromocionDAO actualizar(Integer id, PromocionDAO promocionDAO) {
        Promocion promocion = promocionRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Promoción no encontrada con ID: " + id));
        
        promocion.setNombre(promocionDAO.getNombre());
        promocion.setDescripcion(promocionDAO.getDescripcion());
        promocion.setFechaInicio(promocionDAO.getFechaInicio());
        promocion.setFechaFin(promocionDAO.getFechaFin());
        promocion.setPorcentajeDescuento(promocionDAO.getPorcentajeDescuento());
        
        if (promocionDAO.getEstado() != null) {
            promocion.setEstado(Promocion.EstadoPromocion.valueOf(promocionDAO.getEstado()));
        }
        
        Promocion updated = promocionRepository.save(promocion);
        return convertirADAO(updated);
    }
    
    @Override
    public void eliminar(Integer id) {
        if (!promocionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Promoción no encontrada con ID: " + id);
        }
        promocionRepository.deleteById(id);
    }
    
    private PromocionDAO convertirADAO(Promocion promocion) {
        return new PromocionDAO(
            promocion.getIdPromo(),
            promocion.getNombre(),
            promocion.getDescripcion(),
            promocion.getFechaInicio(),
            promocion.getFechaFin(),
            promocion.getPorcentajeDescuento(),
            promocion.getEstado().name()
        );
    }
}