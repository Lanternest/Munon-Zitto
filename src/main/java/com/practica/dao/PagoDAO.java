package com.practica.dao;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PagoDAO {
    private Integer idPago;
    private Integer idPedido;
    private String formaDePago;
    private BigDecimal monto;
    private LocalDateTime fechaPago;
    private String estado;
    private String comprobanteTransaccion;
    
    public PagoDAO() {}
    
    // Getters y Setters
    public Integer getIdPago() {
    return idPago;
    }
    public void setIdPago(Integer idPago) {
    	this.idPago = idPago;
    	}
    
    public Integer getIdPedido() {
    	return idPedido;
    	}
    public void setIdPedido(Integer idPedido) {
    	this.idPedido = idPedido;
    	}
    
    public String getFormaDePago() {
    	return formaDePago;
    	}
    public void setFormaDePago(String formaDePago) {
    	this.formaDePago = formaDePago;
    	}
    
    public BigDecimal getMonto() {
    	return monto;
    	}
    public void setMonto(BigDecimal monto) {
    	this.monto = monto;
    	}
    
    public LocalDateTime getFechaPago() {
    	return fechaPago;
    	}
    public void setFechaPago(LocalDateTime fechaPago) {
    	this.fechaPago = fechaPago;
    	}
    
    public String getEstado() {
    	return estado;
    	}
    public void setEstado(String estado) {
    	this.estado = estado;
    	}
    
    public String getComprobanteTransaccion() {
    	return comprobanteTransaccion;
    	}
    public void setComprobanteTransaccion(String comprobanteTransaccion) {
    	this.comprobanteTransaccion = comprobanteTransaccion;
    	}
}