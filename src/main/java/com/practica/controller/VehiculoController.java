package com.practica.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.practica.dao.VehiculoDAO;
import com.practica.service.VehiculoService;

@RestController
@RequestMapping("/api/vehiculos")
@CrossOrigin(origins = "*")
public class VehiculoController {
    
    @Autowired
    private VehiculoService vehiculoService;
    
    @PostMapping
    public ResponseEntity<VehiculoDAO> crear(@RequestBody VehiculoDAO vehiculoDAO) {
        VehiculoDAO nuevo = vehiculoService.crear(vehiculoDAO);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }
    
    @GetMapping("/{patente}")
    public ResponseEntity<VehiculoDAO> obtenerPorPatente(@PathVariable String patente) {
        VehiculoDAO vehiculo = vehiculoService.obtenerPorPatente(patente);
        return ResponseEntity.ok(vehiculo);
    }
    
    @GetMapping
    public ResponseEntity<List<VehiculoDAO>> listarTodos() {
        List<VehiculoDAO> vehiculos = vehiculoService.listarTodos();
        return ResponseEntity.ok(vehiculos);
    }
    
    @PutMapping("/{patente}")
    public ResponseEntity<VehiculoDAO> actualizar(@PathVariable String patente, @RequestBody VehiculoDAO vehiculoDAO) {
        VehiculoDAO actualizado = vehiculoService.actualizar(patente, vehiculoDAO);
        return ResponseEntity.ok(actualizado);
    }
    
    @DeleteMapping("/{patente}")
    public ResponseEntity<Map<String, String>> eliminar(@PathVariable String patente) {
        vehiculoService.eliminar(patente);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Vehículo eliminado exitosamente");
        return ResponseEntity.ok(response);
    }
}