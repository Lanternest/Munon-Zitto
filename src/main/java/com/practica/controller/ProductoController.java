package com.practica.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.practica.dao.ProductoDAO;
import com.practica.service.ProductoService;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {
    
    @Autowired
    private ProductoService productoService;
    
    @PostMapping
    public ResponseEntity<ProductoDAO> crear(@RequestBody ProductoDAO productoDAO) {
        ProductoDAO nuevo = productoService.crear(productoDAO);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProductoDAO> obtenerPorId(@PathVariable Integer id) {
        ProductoDAO producto = productoService.obtenerPorId(id);
        return ResponseEntity.ok(producto);
    }
    
    @GetMapping
    public ResponseEntity<List<ProductoDAO>> listarTodos() {
        List<ProductoDAO> productos = productoService.listarTodos();
        return ResponseEntity.ok(productos);
    }
    
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<ProductoDAO>> listarPorCategoria(@PathVariable String categoria) {
        List<ProductoDAO> productos = productoService.listarPorCategoria(categoria);
        return ResponseEntity.ok(productos);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ProductoDAO> actualizar(@PathVariable Integer id, @RequestBody ProductoDAO productoDAO) {
        ProductoDAO actualizado = productoService.actualizar(id, productoDAO);
        return ResponseEntity.ok(actualizado);
    }
    
    @PatchMapping("/{id}/stock")
    public ResponseEntity<ProductoDAO> actualizarStock(@PathVariable Integer id, @RequestParam Integer cantidad) {
        ProductoDAO actualizado = productoService.actualizarStock(id, cantidad);
        return ResponseEntity.ok(actualizado);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> eliminar(@PathVariable Integer id) {
        productoService.eliminar(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Producto eliminado exitosamente");
        return ResponseEntity.ok(response);
    }
}