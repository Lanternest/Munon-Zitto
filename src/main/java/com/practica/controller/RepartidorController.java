package com.practica.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.practica.dao.RepartidorDAO;
import com.practica.service.RepartidorService;

@RestController
@RequestMapping("/api/repartidores")
@CrossOrigin(origins = "*")
public class RepartidorController {
    
    @Autowired
    private RepartidorService repartidorService;
    
    @PostMapping
    public ResponseEntity<RepartidorDAO> crear(@RequestBody RepartidorDAO repartidorDAO) {
        RepartidorDAO nuevo = repartidorService.crear(repartidorDAO);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }
    
    @GetMapping("/{dniR}")
    public ResponseEntity<RepartidorDAO> obtenerPorDni(@PathVariable String dniR) {
        RepartidorDAO repartidor = repartidorService.obtenerPorDni(dniR);
        return ResponseEntity.ok(repartidor);
    }
    
    @GetMapping
    public ResponseEntity<List<RepartidorDAO>> listarTodos() {
        List<RepartidorDAO> repartidores = repartidorService.listarTodos();
        return ResponseEntity.ok(repartidores);
    }
    
    @PutMapping("/{dniR}")
    public ResponseEntity<RepartidorDAO> actualizar(@PathVariable String dniR, @RequestBody RepartidorDAO repartidorDAO) {
        RepartidorDAO actualizado = repartidorService.actualizar(dniR, repartidorDAO);
        return ResponseEntity.ok(actualizado);
    }
    
    @DeleteMapping("/{dniR}")
    public ResponseEntity<Map<String, String>> eliminar(@PathVariable String dniR) {
        repartidorService.eliminar(dniR);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Repartidor eliminado exitosamente");
        return ResponseEntity.ok(response);
    }
}