package com.practica.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.practica.dao.ClienteDAO;
import com.practica.service.ClienteService;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {
    
    @Autowired
    private ClienteService clienteService;
    
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
    
    // Registrar nuevo cliente
    @PostMapping
    public ResponseEntity<?> registrar(@RequestBody ClienteDAO clienteDAO) {
        try {
            ClienteDAO nuevoCliente = clienteService.registrar(clienteDAO);
            return ResponseEntity.ok(nuevoCliente);
        } catch (IllegalArgumentException e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Error interno del sistema");
            return ResponseEntity.status(500).body(response);
        }
    }
}