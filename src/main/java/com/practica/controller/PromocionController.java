package com.practica.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.practica.dao.PromocionDAO;
import com.practica.service.PromocionService;

@RestController
@RequestMapping("/api/promociones")
@CrossOrigin(origins = "*")
public class PromocionController {
    
    @Autowired
    private PromocionService promocionService;
    
    @PostMapping
    public ResponseEntity<PromocionDAO> crear(@RequestBody PromocionDAO promocionDAO) {
        PromocionDAO nueva = promocionService.crear(promocionDAO);
        return ResponseEntity.status(HttpStatus.CREATED).body(nueva);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<PromocionDAO> obtenerPorId(@PathVariable Integer id) {
        PromocionDAO promocion = promocionService.obtenerPorId(id);
        return ResponseEntity.ok(promocion);
    }
    
    @GetMapping
    public ResponseEntity<List<PromocionDAO>> listarTodas() {
        List<PromocionDAO> promociones = promocionService.listarTodas();
        return ResponseEntity.ok(promociones);
    }
    
    @GetMapping("/activas")
    public ResponseEntity<List<PromocionDAO>> listarActivas() {
        List<PromocionDAO> promociones = promocionService.listarActivas();
        return ResponseEntity.ok(promociones);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<PromocionDAO> actualizar(@PathVariable Integer id, @RequestBody PromocionDAO promocionDAO) {
        PromocionDAO actualizada = promocionService.actualizar(id, promocionDAO);
        return ResponseEntity.ok(actualizada);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> eliminar(@PathVariable Integer id) {
        promocionService.eliminar(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Promoción eliminada exitosamente");
        return ResponseEntity.ok(response);
    }
}