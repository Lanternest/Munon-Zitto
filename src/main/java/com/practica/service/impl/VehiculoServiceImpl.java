package com.practica.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.practica.dao.VehiculoDAO;
import com.practica.entity.Vehiculo;
import com.practica.exception.ResourceNotFoundException;
import com.practica.repository.VehiculoRepository;
import com.practica.service.VehiculoService;

@Service
public class VehiculoServiceImpl implements VehiculoService {
    
    @Autowired
    private VehiculoRepository vehiculoRepository;
    
    @Override
    public VehiculoDAO crear(VehiculoDAO vehiculoDAO) {
        Vehiculo vehiculo = new Vehiculo(
            vehiculoDAO.getPatente(),
            vehiculoDAO.getMarca(),
            vehiculoDAO.getModelo()
        );
        Vehiculo saved = vehiculoRepository.save(vehiculo);
        return convertirADAO(saved);
    }
    
    @Override
    public VehiculoDAO obtenerPorPatente(String patente) {
        Vehiculo vehiculo = vehiculoRepository.findById(patente)
            .orElseThrow(() -> new ResourceNotFoundException("Vehículo no encontrado con patente: " + patente));
        return convertirADAO(vehiculo);
    }
    
    @Override
    public List<VehiculoDAO> listarTodos() {
        return vehiculoRepository.findAll().stream()
            .map(this::convertirADAO)
            .collect(Collectors.toList());
    }
    
    @Override
    public VehiculoDAO actualizar(String patente, VehiculoDAO vehiculoDAO) {
        Vehiculo vehiculo = vehiculoRepository.findById(patente)
            .orElseThrow(() -> new ResourceNotFoundException("Vehículo no encontrado con patente: " + patente));
        
        vehiculo.setMarca(vehiculoDAO.getMarca());
        vehiculo.setModelo(vehiculoDAO.getModelo());
        if (vehiculoDAO.getEstado() != null) {
            vehiculo.setEstado(Vehiculo.EstadoVehiculo.valueOf(vehiculoDAO.getEstado()));
        }
        
        Vehiculo updated = vehiculoRepository.save(vehiculo);
        return convertirADAO(updated);
    }
    
    @Override
    public void eliminar(String patente) {
        if (!vehiculoRepository.existsById(patente)) {
            throw new ResourceNotFoundException("Vehículo no encontrado con patente: " + patente);
        }
        vehiculoRepository.deleteById(patente);
    }
    
    private VehiculoDAO convertirADAO(Vehiculo vehiculo) {
        return new VehiculoDAO(
            vehiculo.getPatente(),
            vehiculo.getMarca(),
            vehiculo.getModelo(),
            vehiculo.getEstado().name()
        );
    }
}