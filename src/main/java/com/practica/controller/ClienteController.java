package com.practica.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.practica.dao.ClienteDAO;
import com.practica.dao.LoginDAO;
import com.practica.dao.RegisterDAO;
import com.practica.service.ClienteService;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {
    
    @Autowired
    private ClienteService clienteService;
    
    // Registrar nuevo cliente
    @PostMapping("/register")
    public ResponseEntity<ClienteDAO> registrar(@RequestBody RegisterDAO registerDAO) {
        ClienteDAO nuevoCliente = clienteService.registrar(registerDAO);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoCliente);
    }
    
    // Login
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginDAO loginDAO) {
        String token = clienteService.login(loginDAO);
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("message", "Login exitoso");
        return ResponseEntity.ok(response);
    }
    
    // Obtener cliente por DNI
    @GetMapping("/{dni}")
    public ResponseEntity<ClienteDAO> obtenerPorDni(@PathVariable String dni) {
        ClienteDAO cliente = clienteService.obtenerPorDni(dni);
        return ResponseEntity.ok(cliente);
    }
    
    // Listar todos los clientes
    @GetMapping
    public ResponseEntity<List<ClienteDAO>> listarTodos() {
        List<ClienteDAO> clientes = clienteService.listarTodos();
        return ResponseEntity.ok(clientes);
    }
    
    // Actualizar cliente
    @PutMapping("/{dni}")
    public ResponseEntity<ClienteDAO> actualizar(@PathVariable String dni, @RequestBody ClienteDAO clienteDAO) {
        ClienteDAO clienteActualizado = clienteService.actualizar(dni, clienteDAO);
        return ResponseEntity.ok(clienteActualizado);
    }
    
    // Eliminar cliente
    @DeleteMapping("/{dni}")
    public ResponseEntity<Map<String, String>> eliminar(@PathVariable String dni) {
        clienteService.eliminar(dni);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Cliente eliminado exitosamente");
        return ResponseEntity.ok(response);
    }
}