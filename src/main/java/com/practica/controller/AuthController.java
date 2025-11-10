package com.practica.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.practica.dao.LoginDAO;
import com.practica.dao.LoginResponseDAO;
import com.practica.dao.RegisterDAO;
import com.practica.dao.UsuarioDAO;
import com.practica.exception.BadRequestException;
import com.practica.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    // Login unificado (Admin, Cliente, Repartidor)
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDAO> login(@RequestBody LoginDAO loginDAO) {
        LoginResponseDAO response = authService.login(loginDAO);
        return ResponseEntity.ok(response);
    }
    
    // Registro de cliente
    @PostMapping("/register")
    public ResponseEntity<?> registrarCliente(@RequestBody RegisterDAO registerDAO) {
        try {
            UsuarioDAO usuario = authService.registrarCliente(registerDAO);
            return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
        } catch (BadRequestException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al registrar el usuario: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    // Crear administrador (solo para setup inicial)
    @PostMapping("/admin/create")
    public ResponseEntity<UsuarioDAO> crearAdministrador(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String contrasenia = request.get("contrasenia");
        UsuarioDAO admin = authService.crearAdministrador(email, contrasenia);
        return ResponseEntity.status(HttpStatus.CREATED).body(admin);
    }
    
    // Crear usuario para repartidor existente
    @PostMapping("/repartidor/create")
    public ResponseEntity<UsuarioDAO> crearRepartidor(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String contrasenia = request.get("contrasenia");
        String dniR = request.get("dniR");
        UsuarioDAO repartidor = authService.crearRepartidor(email, contrasenia, dniR);
        return ResponseEntity.status(HttpStatus.CREATED).body(repartidor);
    }
}