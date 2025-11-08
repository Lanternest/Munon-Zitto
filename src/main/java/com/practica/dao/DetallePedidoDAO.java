package com.practica.dao;

import java.math.BigDecimal;

public class DetallePedidoDAO {
    private Integer idProductos;
    private Integer cantidad;
    private BigDecimal precioUnitario;
    private BigDecimal subtotal;
    private Integer idPromo;
    
    public DetallePedidoDAO() {}
    
    // Getters y Setters
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