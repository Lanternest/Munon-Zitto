package com.practica.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.practica.dao.RepartidorDAO;
import com.practica.entity.Repartidor;
import com.practica.exception.ResourceNotFoundException;
import com.practica.repository.RepartidorRepository;
import com.practica.service.RepartidorService;

@Service
public class RepartidorServiceImpl implements RepartidorService {
    
    @Autowired
    private RepartidorRepository repartidorRepository;
    
    @Override
    public RepartidorDAO crear(RepartidorDAO repartidorDAO) {
        Repartidor repartidor = new Repartidor(
            repartidorDAO.getDniR(),
            repartidorDAO.getNombre(),
            repartidorDAO.getApellido(),
            repartidorDAO.getTelefono(),
            repartidorDAO.getPatente()
        );
        Repartidor saved = repartidorRepository.save(repartidor);
        return convertirADAO(saved);
    }
    
    @Override
    public RepartidorDAO obtenerPorDni(String dniR) {
        Repartidor repartidor = repartidorRepository.findById(dniR)
            .orElseThrow(() -> new ResourceNotFoundException("Repartidor no encontrado con DNI: " + dniR));
        return convertirADAO(repartidor);
    }
    
    @Override
    public List<RepartidorDAO> listarTodos() {
        return repartidorRepository.findAll().stream()
            .map(this::convertirADAO)
            .collect(Collectors.toList());
    }
    
    @Override
    public RepartidorDAO actualizar(String dniR, RepartidorDAO repartidorDAO) {
        Repartidor repartidor = repartidorRepository.findById(dniR)
            .orElseThrow(() -> new ResourceNotFoundException("Repartidor no encontrado con DNI: " + dniR));
        
        repartidor.setNombre(repartidorDAO.getNombre());
        repartidor.setApellido(repartidorDAO.getApellido());
        repartidor.setTelefono(repartidorDAO.getTelefono());
        repartidor.setPatente(repartidorDAO.getPatente());
        
        Repartidor updated = repartidorRepository.save(repartidor);
        return convertirADAO(updated);
    }
    
    @Override
    public void eliminar(String dniR) {
        if (!repartidorRepository.existsById(dniR)) {
            throw new ResourceNotFoundException("Repartidor no encontrado con DNI: " + dniR);
        }
        repartidorRepository.deleteById(dniR);
    }
    
    private RepartidorDAO convertirADAO(Repartidor repartidor) {
        return new RepartidorDAO(
            repartidor.getDniR(),
            repartidor.getNombre(),
            repartidor.getApellido(),
            repartidor.getTelefono(),
            repartidor.getFechaContratacion(),
            repartidor.getPatente()
        );
    }
}