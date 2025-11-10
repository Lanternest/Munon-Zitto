package com.practica.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.practica.dao.*;
import com.practica.entity.Cliente;
import com.practica.entity.Usuario;
import com.practica.exception.BadRequestException;
import com.practica.exception.ResourceNotFoundException;
import com.practica.repository.ClienteRepository;
import com.practica.repository.LocalidadRepository;
import com.practica.repository.RepartidorRepository;
import com.practica.repository.UsuarioRepository;
import com.practica.service.AuthService;
import com.practica.util.Argon2Util;
import com.practica.util.JwtUtil;

@Service
public class AuthServiceImpl implements AuthService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private ClienteRepository clienteRepository;
    
    @Autowired
    private LocalidadRepository localidadRepository;
    
    @Autowired
    private RepartidorRepository repartidorRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Override
    public LoginResponseDAO login(LoginDAO loginDAO) {
        // Buscar usuario por email
        Usuario usuario = usuarioRepository.findByEmail(loginDAO.getEmail())
            .orElseThrow(() -> new ResourceNotFoundException("Credenciales incorrectas"));
        
        // Verificar contraseña
        if (!Argon2Util.verify(usuario.getContrasenia(), loginDAO.getContrasenia())) {
            throw new BadRequestException("Credenciales incorrectas");
        }
        
        // Verificar que el usuario esté activo
        if (!usuario.getActivo()) {
            throw new BadRequestException("Usuario inactivo");
        }
        
        // Generar token JWT con rol
        String token = jwtUtil.generateToken(
            usuario.getEmail(), 
            usuario.getRol().name(), 
            usuario.getDni()
        );
        
        return new LoginResponseDAO(
            token,
            usuario.getRol().name(),
            usuario.getEmail(),
            usuario.getDni(),
            "Login exitoso"
        );
    }
    
    @Override
    @Transactional
    public UsuarioDAO registrarCliente(RegisterDAO registerDAO) {
        // Validar si ya existe el email
        if (usuarioRepository.existsByEmail(registerDAO.getEmail())) {
            throw new BadRequestException("El email ya está registrado");
        }
        
        // Validar si ya existe el DNI
        if (clienteRepository.existsByDni(registerDAO.getDni())) {
            throw new BadRequestException("El DNI ya está registrado");
        }
        
        // Validar que el código postal existe
        if (!localidadRepository.existsById(registerDAO.getCodigoPostal())) {
            throw new BadRequestException("El código postal no existe en la base de datos");
        }
        
        // Hashear contraseña
        String hashedPassword = Argon2Util.hash(registerDAO.getContrasenia());
        
        // Crear cliente (SIN contraseña)
        Cliente cliente = new Cliente();
        cliente.setDni(registerDAO.getDni());
        cliente.setNombre(registerDAO.getNombre());
        cliente.setApellido(registerDAO.getApellido());
        cliente.setDireccion(registerDAO.getDireccion());
        cliente.setTelefono(registerDAO.getTelefono());
        cliente.setEmail(registerDAO.getEmail());
        cliente.setCodigoPostal(registerDAO.getCodigoPostal());
        
        clienteRepository.save(cliente);
        
        // Crear usuario
        Usuario usuario = new Usuario(
            registerDAO.getEmail(),
            hashedPassword,
            Usuario.Rol.CLIENTE,
            registerDAO.getDni()
        );
        
        Usuario savedUsuario = usuarioRepository.save(usuario);
        
        return convertirADAO(savedUsuario);
    }
    
    @Override
    public UsuarioDAO crearAdministrador(String email, String contrasenia) {
        if (usuarioRepository.existsByEmail(email)) {
            throw new BadRequestException("El email ya está registrado");
        }
        
        String hashedPassword = Argon2Util.hash(contrasenia);
        
        Usuario admin = new Usuario(
            email,
            hashedPassword,
            Usuario.Rol.ADMINISTRADOR,
            null
        );
        
        Usuario saved = usuarioRepository.save(admin);
        return convertirADAO(saved);
    }
    
    @Override
    @Transactional
    public UsuarioDAO crearRepartidor(String email, String contrasenia, String dniR) {
        // Validar que el repartidor existe
        if (!repartidorRepository.existsById(dniR)) {
            throw new ResourceNotFoundException("Repartidor no encontrado con DNI: " + dniR);
        }
        
        // Validar email único
        if (usuarioRepository.existsByEmail(email)) {
            throw new BadRequestException("El email ya está registrado");
        }
        
        String hashedPassword = Argon2Util.hash(contrasenia);
        
        Usuario usuario = new Usuario(
            email,
            hashedPassword,
            Usuario.Rol.REPARTIDOR,
            dniR
        );
        
        Usuario saved = usuarioRepository.save(usuario);
        return convertirADAO(saved);
    }
    
    private UsuarioDAO convertirADAO(Usuario usuario) {
        return new UsuarioDAO(
            usuario.getIdUsuario(),
            usuario.getEmail(),
            usuario.getRol().name(),
            usuario.getDni(),
            usuario.getActivo()
        );
    }
}