package com.practica.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.practica.dao.LocalidadDAO;
import com.practica.service.LocalidadService;

@RestController
@RequestMapping("/api/localidades")
@CrossOrigin(origins = "*")
public class LocalidadController {
    
    @Autowired
    private LocalidadService localidadService;
    
    @PostMapping
    public ResponseEntity<LocalidadDAO> crear(@RequestBody LocalidadDAO localidadDAO) {
        LocalidadDAO nueva = localidadService.crear(localidadDAO);
        return ResponseEntity.status(HttpStatus.CREATED).body(nueva);
    }
    
    @GetMapping("/{codigoPostal}")
    public ResponseEntity<LocalidadDAO> obtenerPorCodigoPostal(@PathVariable Integer codigoPostal) {
        LocalidadDAO localidad = localidadService.obtenerPorCodigoPostal(codigoPostal);
        return ResponseEntity.ok(localidad);
    }
    
    @GetMapping
    public ResponseEntity<List<LocalidadDAO>> listarTodas() {
        List<LocalidadDAO> localidades = localidadService.listarTodas();
        return ResponseEntity.ok(localidades);
    }
    
    @PutMapping("/{codigoPostal}")
    public ResponseEntity<LocalidadDAO> actualizar(@PathVariable Integer codigoPostal, @RequestBody LocalidadDAO localidadDAO) {
        LocalidadDAO actualizada = localidadService.actualizar(codigoPostal, localidadDAO);
        return ResponseEntity.ok(actualizada);
    }

    @DeleteMapping("/{codigoPostal}")
    public ResponseEntity<Map<String, String>> eliminar(@PathVariable Integer codigoPostal) {
        localidadService.eliminar(codigoPostal);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Localidad eliminada exitosamente");
        return ResponseEntity.ok(response);
    }
}