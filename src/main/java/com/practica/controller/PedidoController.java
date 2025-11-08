package com.practica.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.practica.dao.CrearPedidoDAO;
import com.practica.dao.PagoDAO;
import com.practica.dao.PedidoDAO;
import com.practica.service.PedidoService;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {
    
    @Autowired
    private PedidoService pedidoService;
    
    @PostMapping
    public ResponseEntity<PedidoDAO> crearPedido(@RequestBody CrearPedidoDAO crearPedidoDAO) {
        PedidoDAO nuevoPedido = pedidoService.crearPedido(crearPedidoDAO);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoPedido);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<PedidoDAO> obtenerPorId(@PathVariable Integer id) {
        PedidoDAO pedido = pedidoService.obtenerPorId(id);
        return ResponseEntity.ok(pedido);
    }
    
    @GetMapping
    public ResponseEntity<List<PedidoDAO>> listarTodos() {
        List<PedidoDAO> pedidos = pedidoService.listarTodos();
        return ResponseEntity.ok(pedidos);
    }
    
    @GetMapping("/cliente/{dni}")
    public ResponseEntity<List<PedidoDAO>> listarPorCliente(@PathVariable String dni) {
        List<PedidoDAO> pedidos = pedidoService.listarPorCliente(dni);
        return ResponseEntity.ok(pedidos);
    }
    
    @PatchMapping("/{id}/estado")
    public ResponseEntity<PedidoDAO> actualizarEstado(@PathVariable Integer id, @RequestParam String estado) {
        PedidoDAO actualizado = pedidoService.actualizarEstado(id, estado);
        return ResponseEntity.ok(actualizado);
    }
    
    @PatchMapping("/{id}/repartidor")
    public ResponseEntity<PedidoDAO> asignarRepartidor(@PathVariable Integer id, @RequestParam String dniR) {
        PedidoDAO actualizado = pedidoService.asignarRepartidor(id, dniR);
        return ResponseEntity.ok(actualizado);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> cancelarPedido(@PathVariable Integer id) {
        pedidoService.cancelarPedido(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Pedido cancelado exitosamente");
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/{id}/pago")
    public ResponseEntity<PagoDAO> procesarPago(@PathVariable Integer id, @RequestParam String formaPago) {
        PagoDAO pago = pedidoService.procesarPago(id, formaPago);
        return ResponseEntity.status(HttpStatus.CREATED).body(pago);
    }
}