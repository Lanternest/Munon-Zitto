package com.practica.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.practica.dao.ClienteDAO;
import com.practica.dao.UsuarioDAO;
import com.practica.service.ClienteService;
import com.practica.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    
    @Autowired
    private ClienteService clienteService;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
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
    
    // Listar todos los usuarios (para verificar cuáles repartidores tienen usuario)
    @GetMapping("/usuarios")
    public ResponseEntity<List<UsuarioDAO>> listarUsuarios() {
        List<UsuarioDAO> usuarios = usuarioRepository.findAll().stream()
            .map(u -> new UsuarioDAO(
                u.getIdUsuario(),
                u.getEmail(),
                u.getRol().name(),
                u.getDni(),
                u.getActivo()
            ))
            .collect(Collectors.toList());
        return ResponseEntity.ok(usuarios);
    }
}