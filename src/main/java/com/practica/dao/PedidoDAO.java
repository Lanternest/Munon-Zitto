package com.practica.dao;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class PedidoDAO {
    private Integer idPedido;
    private String dni;
    private String dniR;
    private LocalDateTime fecha;
    private LocalDateTime fechaEntrega;
    private String estado;
    private BigDecimal subTotal;
    private BigDecimal descuentoTotal;
    private BigDecimal precioTotal;
    private String direccionEntrega;
    private String observaciones;
    private List<DetallePedidoDAO> detalles;
    
    public PedidoDAO() {}
    
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
    
    public String getEstado() {
    	return estado;
    	}
    public void setEstado(String estado) {
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
    
    public List<DetallePedidoDAO> getDetalles() {
    	return detalles;
    	}
    public void setDetalles(List<DetallePedidoDAO> detalles) {
    	this.detalles = detalles;
    	}
}