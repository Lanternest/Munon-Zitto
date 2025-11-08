package com.practica.service.impl;

import com.practica.dao.ClienteDAO;
import com.practica.dao.LoginDAO;
import com.practica.dao.RegisterDAO;
import com.practica.entity.Cliente;
import com.practica.exception.BadRequestException;
import com.practica.exception.ResourceNotFoundException;
import com.practica.repository.ClienteRepository;
import com.practica.service.ClienteService;
import com.practica.util.Argon2Util;
import com.practica.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClienteServiceImpl implements ClienteService {
    
    @Autowired
    private ClienteRepository clienteRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Override
    public ClienteDAO registrar(RegisterDAO registerDAO) {
        // Validar si ya existe el email
        if (clienteRepository.existsByEmail(registerDAO.getEmail())) {
            throw new BadRequestException("El email ya está registrado");
        }
        
        // Validar si ya existe el DNI
        if (clienteRepository.existsByDni(registerDAO.getDni())) {
            throw new BadRequestException("El DNI ya está registrado");
        }
        
        // Hashear contraseña
        String hashedPassword = Argon2Util.hash(registerDAO.getContrasenia());
        
        // Crear entidad
        Cliente cliente = new Cliente(
        	    registerDAO.getDni(),
        	    registerDAO.getNombre(),
        	    registerDAO.getApellido(),
        	    registerDAO.getDireccion(),
        	    registerDAO.getTelefono(),
        	    registerDAO.getEmail(),
        	    hashedPassword,
        	    registerDAO.getCodigoPostal()
        	);
        
        // Guardar
        Cliente savedCliente = clienteRepository.save(cliente);
        
        // Convertir a DAO
        return convertirADAO(savedCliente);
    }
    
    @Override
    public String login(LoginDAO loginDAO) {
        // Buscar cliente por email
        Cliente cliente = clienteRepository.findByEmail(loginDAO.getEmail())
            .orElseThrow(() -> new ResourceNotFoundException("Credenciales incorrectas"));
        
        // Verificar contraseña
        if (!Argon2Util.verify(cliente.getContrasenia(), loginDAO.getContrasenia())) {
            throw new BadRequestException("Credenciales incorrectas");
        }
        
        // Generar token JWT
        return jwtUtil.generateToken(cliente.getEmail());
    }
    
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