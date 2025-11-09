package com.practica.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.practica.dao.ClienteDAO;
import com.practica.entity.Cliente;
import com.practica.exception.ResourceNotFoundException;
import com.practica.repository.ClienteRepository;
import com.practica.service.ClienteService;
import com.practica.util.JwtUtil;

@Service
public class ClienteServiceImpl implements ClienteService {
    
    @Autowired
    private ClienteRepository clienteRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Override
    public ClienteDAO obtenerPorDni(String dni) {
        Cliente cliente = clienteRepository.findById(dni)
            .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con DNI: " + dni));
        return convertirADAO(cliente);
    }
    
    @Override
    public List<ClienteDAO> listarTodos() {
        return clienteRepository.findAll().stream()
            .map(this::convertirADAO)
            .collect(Collectors.toList());
    }
    
    @Override
    public ClienteDAO actualizar(String dni, ClienteDAO clienteDAO) {
        Cliente cliente = clienteRepository.findById(dni)
            .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con DNI: " + dni));
        
        // Actualizar campos
        cliente.setNombre(clienteDAO.getNombre());
        cliente.setApellido(clienteDAO.getApellido());
        cliente.setDireccion(clienteDAO.getDireccion());
        cliente.setTelefono(clienteDAO.getTelefono());
        cliente.setCodigoPostal(clienteDAO.getCodigoPostal());
        
        // Guardar cambios
        Cliente updatedCliente = clienteRepository.save(cliente);
        return convertirADAO(updatedCliente);
    }
    
    @Override
    public void eliminar(String dni) {
        if (!clienteRepository.existsById(dni)) {
            throw new ResourceNotFoundException("Cliente no encontrado con DNI: " + dni);
        }
        clienteRepository.deleteById(dni);
    }
    
    // Método auxiliar para convertir Entity a DAO
    private ClienteDAO convertirADAO(Cliente cliente) {
        return new ClienteDAO(
            cliente.getDni(),
            cliente.getNombre(),
            cliente.getApellido(),
            cliente.getDireccion(),
            cliente.getTelefono(),
            cliente.getEmail(),
            cliente.getCodigoPostal()
        );
    }
}