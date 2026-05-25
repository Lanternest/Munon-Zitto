package com.practica.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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

    @PostMapping("/upload-imagen")
    public ResponseEntity<Map<String, String>> subirImagen(@RequestParam("imagen") MultipartFile imagen) throws IOException {
        if (imagen == null || imagen.isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Debe seleccionar una imagen");
            return ResponseEntity.badRequest().body(response);
        }

        String contentType = imagen.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "El archivo debe ser una imagen");
            return ResponseEntity.badRequest().body(response);
        }

        if (!contentType.equals("image/jpeg") && !contentType.equals("image/png") && !contentType.equals("image/webp")) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Formato no permitido. Use JPG, PNG o WebP");
            return ResponseEntity.badRequest().body(response);
        }

        if (imagen.getSize() > 5 * 1024 * 1024) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "La imagen no debe superar los 5 MB");
            return ResponseEntity.badRequest().body(response);
        }

        Path uploadDir = Paths.get("uploads", "productos").toAbsolutePath().normalize();
        Files.createDirectories(uploadDir);

        String nombreOriginal = imagen.getOriginalFilename() != null ? imagen.getOriginalFilename() : "producto";
        String extension = "";
        int punto = nombreOriginal.lastIndexOf('.');
        if (punto >= 0) {
            extension = nombreOriginal.substring(punto).toLowerCase();
        }

        String nombreArchivo = UUID.randomUUID().toString() + extension;
        Path destino = uploadDir.resolve(nombreArchivo);
        Files.copy(imagen.getInputStream(), destino, StandardCopyOption.REPLACE_EXISTING);

        String imagenUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/uploads/productos/")
            .path(nombreArchivo)
            .toUriString();

        Map<String, String> response = new HashMap<>();
        response.put("imagenUrl", imagenUrl);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
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
