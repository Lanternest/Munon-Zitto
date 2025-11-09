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
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    
    @Autowired
    private ClienteService clienteService;
    
    // Listar todos los clientes
    @GetMapping("/clientes")
    public ResponseEntity<List<ClienteDAO>> listarClientes() {
        List<ClienteDAO> clientes = clienteService.listarTodos();
        return ResponseEntity.ok(clientes);
    }
    
    // Ver cliente específico
    @GetMapping("/clientes/{dni}")
    public ResponseEntity<ClienteDAO> verCliente(@PathVariable String dni) {
        ClienteDAO cliente = clienteService.obtenerPorDni(dni);
        return ResponseEntity.ok(cliente);
    }
    
    // Actualizar cliente
    @PutMapping("/clientes/{dni}")
    public ResponseEntity<ClienteDAO> actualizarCliente(
            @PathVariable String dni, 
            @RequestBody ClienteDAO clienteDAO) {
        ClienteDAO actualizado = clienteService.actualizar(dni, clienteDAO);
        return ResponseEntity.ok(actualizado);
    }
    
    // Eliminar cliente
    @DeleteMapping("/clientes/{dni}")
    public ResponseEntity<Map<String, String>> eliminarCliente(@PathVariable String dni) {
        clienteService.eliminar(dni);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Cliente eliminado exitosamente");
        return ResponseEntity.ok(response);
    }
}