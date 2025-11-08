package com.practica.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.practica.dao.LocalidadDAO;
import com.practica.entity.Localidad;
import com.practica.exception.ResourceNotFoundException;
import com.practica.repository.LocalidadRepository;
import com.practica.service.LocalidadService;

@Service
public class LocalidadServiceImpl implements LocalidadService {
    
    @Autowired
    private LocalidadRepository localidadRepository;
    
    @Override
    public LocalidadDAO crear(LocalidadDAO localidadDAO) {
        Localidad localidad = new Localidad(
            localidadDAO.getCodigoPostal(),
            localidadDAO.getNombre()
        );
        Localidad saved = localidadRepository.save(localidad);
        return convertirADAO(saved);
    }
    
    @Override
    public LocalidadDAO obtenerPorCodigoPostal(Integer codigoPostal) {
        Localidad localidad = localidadRepository.findById(codigoPostal)
            .orElseThrow(() -> new ResourceNotFoundException("Localidad no encontrada con Código Postal: " + codigoPostal));
        return convertirADAO(localidad);
    }
    
    @Override
    public List<LocalidadDAO> listarTodas() {
        return localidadRepository.findAll().stream()
            .map(this::convertirADAO)
            .collect(Collectors.toList());
    }
    
    @Override
    public LocalidadDAO actualizar(Integer codigoPostal, LocalidadDAO localidadDAO) {
        Localidad localidad = localidadRepository.findById(codigoPostal)
            .orElseThrow(() -> new ResourceNotFoundException("Localidad no encontrada con Código Postal: " + codigoPostal));
        
        localidad.setNombre(localidadDAO.getNombre());
        
        Localidad updated = localidadRepository.save(localidad);
        return convertirADAO(updated);
    }
    
    @Override
    public void eliminar(Integer codigoPostal) {
        if (!localidadRepository.existsById(codigoPostal)) {
            throw new ResourceNotFoundException("Localidad no encontrada con Código Postal: " + codigoPostal);
        }
        localidadRepository.deleteById(codigoPostal);
    }
    
    private LocalidadDAO convertirADAO(Localidad localidad) {
        return new LocalidadDAO(
            localidad.getCodigoPostal(),
            localidad.getNombre()
        );
    }
}