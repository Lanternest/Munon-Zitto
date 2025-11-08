package com.practica.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.practica.dao.PagoDAO;
import com.practica.service.PagoService;

@RestController
@RequestMapping("/api/pagos")
@CrossOrigin(origins = "*")
public class PagoController {
    
    @Autowired
    private PagoService pagoService;
    
    @GetMapping("/{id}")
    public ResponseEntity<PagoDAO> obtenerPorId(@PathVariable Integer id) {
        PagoDAO pago = pagoService.obtenerPorId(id);
        return ResponseEntity.ok(pago);
    }
    
    @GetMapping("/pedido/{idPedido}")
    public ResponseEntity<PagoDAO> obtenerPorPedido(@PathVariable Integer idPedido) {
        PagoDAO pago = pagoService.obtenerPorPedido(idPedido);
        return ResponseEntity.ok(pago);
    }
    
    @GetMapping
    public ResponseEntity<List<PagoDAO>> listarTodos() {
        List<PagoDAO> pagos = pagoService.listarTodos();
        return ResponseEntity.ok(pagos);
    }
    
    @PatchMapping("/{id}/estado")
    public ResponseEntity<PagoDAO> actualizarEstado(@PathVariable Integer id, @RequestParam String estado) {
        PagoDAO actualizado = pagoService.actualizarEstado(id, estado);
        return ResponseEntity.ok(actualizado);
    }
}