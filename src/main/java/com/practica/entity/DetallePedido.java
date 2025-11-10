package com.practica.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name = "detalle_pedido")
public class DetallePedido {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_detalle")
    private Integer idDetalle;
    
    @ManyToOne
    @JoinColumn(name = "ID_pedido", nullable = false)
    private Pedido pedido;
    
    @Column(name = "ID_productos", nullable = false)
    private Integer idProductos;
    
    @Column(name = "Cantidad", nullable = false)
    private Integer cantidad;
    
    @Column(name = "PrecioUnitario", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioUnitario;
    
    @Column(name = "Subtotal", nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;
    
    @Column(name = "ID_promo")
    private Integer idPromo;
    
    public DetallePedido() {}
    
    // Getters y Setters
    public Integer getIdDetalle() {
    	return idDetalle;
    	}
    public void setIdDetalle(Integer idDetalle) {
    	this.idDetalle = idDetalle;
    	}
    
    public Pedido getPedido() {
    	return pedido;
    	}
    public void setPedido(Pedido pedido) {
    	this.pedido = pedido;
    	}
    
    public Integer getIdProductos() {
    	return idProductos;
    	}
    public void setIdProductos(Integer idProductos) {
    	this.idProductos = idProductos;
    	}
    
    public Integer getCantidad() {
    	return cantidad;
    	}
    public void setCantidad(Integer cantidad) {
    	this.cantidad = cantidad;
    	}
    
    public BigDecimal getPrecioUnitario() {
    	return precioUnitario;
    	}
    public void setPrecioUnitario(BigDecimal precioUnitario) {
    	this.precioUnitario = precioUnitario;
    	}
    
    public BigDecimal getSubtotal() {
    	return subtotal;
    	}
    public void setSubtotal(BigDecimal subtotal) {
    	this.subtotal = subtotal;
    	}
    
    public Integer getIdPromo() {
    	return idPromo;
    	}
    public void setIdPromo(Integer idPromo) {
    	this.idPromo = idPromo;
    	}
}