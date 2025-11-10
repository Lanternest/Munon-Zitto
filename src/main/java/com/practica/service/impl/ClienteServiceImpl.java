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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ClienteServiceImpl implements ClienteService {
    private static final Logger logger = LoggerFactory.getLogger(ClienteServiceImpl.class);
    
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

    @Override
    public ClienteDAO registrar(ClienteDAO clienteDAO) {
        logger.info("Intentando registrar cliente: {}", clienteDAO.getEmail());
        // Validar email y DNI duplicados
        if (clienteRepository.existsByEmail(clienteDAO.getEmail())) {
            logger.warn("Email duplicado: {}", clienteDAO.getEmail());
            throw new IllegalArgumentException("El email ya está registrado.");
        }
        if (clienteRepository.existsByDni(clienteDAO.getDni())) {
            logger.warn("DNI duplicado: {}", clienteDAO.getDni());
            throw new IllegalArgumentException("El DNI ya está registrado.");
        }

        // Crear entidad Cliente (sin contraseña, se guarda en tabla usuarios)
        Cliente cliente = new Cliente(
            clienteDAO.getDni(),
            clienteDAO.getNombre(),
            clienteDAO.getApellido(),
            clienteDAO.getDireccion(),
            clienteDAO.getTelefono(),
            clienteDAO.getEmail(),
            clienteDAO.getCodigoPostal()
        );

        logger.info("Guardando cliente en la base de datos...");
        // Guardar en la base de datos
        Cliente clienteGuardado = clienteRepository.save(cliente);
        logger.info("Cliente guardado correctamente: {}", clienteGuardado.getEmail());

        // Retornar el DAO
        return convertirADAO(clienteGuardado);
    }
    
    // Método auxiliar para convertir Entity a DAO
    private ClienteDAO convertirADAO(Cliente cliente) {
        ClienteDAO dao = new ClienteDAO();
        dao.setDni(cliente.getDni());
        dao.setNombre(cliente.getNombre());
        dao.setApellido(cliente.getApellido());
        dao.setDireccion(cliente.getDireccion());
        dao.setTelefono(cliente.getTelefono());
        dao.setEmail(cliente.getEmail());
        dao.setCodigoPostal(cliente.getCodigoPostal());
        // La contraseña no se incluye porque está en la tabla usuarios, no en cliente
        dao.setContrasenia(null);
        return dao;
    }
}