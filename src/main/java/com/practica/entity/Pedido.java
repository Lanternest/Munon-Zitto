package com.practica.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "pedidos")
public class Pedido {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_pedido")
    private Integer idPedido;
    
    @Column(name = "DNI", nullable = false, length = 15)
    private String dni;
    
    @Column(name = "DNI_R", length = 15)
    private String dniR;
    
    @Column(name = "Fecha", nullable = false)
    private LocalDateTime fecha;
    
    @Column(name = "FechaEntrega")
    private LocalDateTime fechaEntrega;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "Estado", length = 20)
    private EstadoPedido estado = EstadoPedido.Pendiente;
    
    @Column(name = "SubTotal", precision = 10, scale = 2)
    private BigDecimal subTotal;

    @Column(name = "DescuentoTotal", precision = 10, scale = 2)
    private BigDecimal descuentoTotal = BigDecimal.ZERO;

    @Column(name = "PrecioTotal", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioTotal;

    @Column(name = "DireccionEntrega", length = 100)
    private String direccionEntrega;
    
    @Column(name = "Observaciones", columnDefinition = "TEXT")
    private String observaciones;
    
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetallePedido> detalles = new ArrayList<>();
    
    public enum EstadoPedido {
        Pendiente, Confirmado, En_Preparacion, En_Camino, Entregado, Cancelado
    }
    
    public Pedido() {
        this.fecha = LocalDateTime.now();
    }
    
    // Getters y Setters
    public Integer getIdPedido() {
    	return idPedido;
    	}
    public void setIdPedido(Integer idPedido) {
    	this.idPedido = idPedido;
    	}
    
    public String getDni() {
    	return dni;
    	}
    public void setDni(String dni) {
    	this.dni = dni;
    	}
    
    public String getDniR() {
    	return dniR;
    	}
    public void setDniR(String dniR) {
    	this.dniR = dniR;
    	}
    
    public LocalDateTime getFecha() {
    	return fecha;
    	}
    public void setFecha(LocalDateTime fecha) {
    	this.fecha = fecha;
    	}
    
    public LocalDateTime getFechaEntrega() {
    	return fechaEntrega;
    	}
    public void setFechaEntrega(LocalDateTime fechaEntrega) {
    	this.fechaEntrega = fechaEntrega;
    	}
    
    public EstadoPedido getEstado() {
    	return estado;
    	}
    public void setEstado(EstadoPedido estado) {
    	this.estado = estado;
    	}
    
    public BigDecimal getSubTotal() {
    	return subTotal;
    	}
    public void setSubTotal(BigDecimal subTotal) {
    	this.subTotal = subTotal;
    	}
    
    public BigDecimal getDescuentoTotal() {
    	return descuentoTotal;
    	}
    public void setDescuentoTotal(BigDecimal descuentoTotal) {
    	this.descuentoTotal = descuentoTotal;
    	}
    
    public BigDecimal getPrecioTotal() {
    	return precioTotal;
    	}
    public void setPrecioTotal(BigDecimal precioTotal) {
    	this.precioTotal = precioTotal;
    	}
    
    public String getDireccionEntrega() {
    	return direccionEntrega;
    	}
    public void setDireccionEntrega(String direccionEntrega) {
    	this.direccionEntrega = direccionEntrega;
    	}
    
    public String getObservaciones() {
    	return observaciones;
    	}
    public void setObservaciones(String observaciones) {
    	this.observaciones = observaciones;
    	}
    
    public List<DetallePedido> getDetalles() {
    	return detalles;
    	}
    public void setDetalles(List<DetallePedido> detalles) {
    	this.detalles = detalles;
    	}
}