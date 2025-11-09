package com.practica.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.practica.dao.ClienteDAO;
import com.practica.dao.PedidoDAO;
import com.practica.service.ClienteService;
import com.practica.service.PedidoService;

@RestController
@RequestMapping("/api/repartidor")
@CrossOrigin(origins = "*")
public class RepartidorEntregasController {
    
    @Autowired
    private PedidoService pedidoService;
    
    @Autowired
    private ClienteService clienteService;
    
    // Ver pedidos asignados al repartidor (solo En_Camino)
    @GetMapping("/mis-entregas/{dniR}")
    public ResponseEntity<List<Map<String, Object>>> misEntregas(@PathVariable String dniR) {
        List<PedidoDAO> todosPedidos = pedidoService.listarTodos();
        
        // Filtrar: solo del repartidor, estado En_Camino
        List<Map<String, Object>> entregas = todosPedidos.stream()
            .filter(p -> dniR.equals(p.getDniR()))
            .filter(p -> "En_Camino".equals(p.getEstado()))
            .map(p -> {
                Map<String, Object> entrega = new HashMap<>();
                entrega.put("idPedido", p.getIdPedido());
                entrega.put("direccionEntrega", p.getDireccionEntrega());
                entrega.put("observaciones", p.getObservaciones());
                entrega.put("precioTotal", p.getPrecioTotal());
                
                // Obtener datos del cliente
                try {
                    ClienteDAO cliente = clienteService.obtenerPorDni(p.getDni());
                    entrega.put("clienteNombre", cliente.getNombre() + " " + cliente.getApellido());
                    entrega.put("clienteTelefono", cliente.getTelefono());
                } catch (Exception e) {
                    entrega.put("clienteNombre", "N/A");
                    entrega.put("clienteTelefono", "N/A");
                }
                
                return entrega;
            })
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(entregas);
    }
    
    // Marcar pedido como entregado
    @PatchMapping("/entregar/{idPedido}")
    public ResponseEntity<PedidoDAO> marcarEntregado(@PathVariable Integer idPedido) {
        PedidoDAO pedido = pedidoService.actualizarEstado(idPedido, "Entregado");
        return ResponseEntity.ok(pedido);
    }
}