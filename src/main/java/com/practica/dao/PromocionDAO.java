package com.practica.dao;

import java.math.BigDecimal;
import java.time.LocalDate;

public class PromocionDAO {
    private Integer idPromo;
    private String nombre;
    private String descripcion;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private BigDecimal porcentajeDescuento;
    private String estado;
    
    public PromocionDAO() {}
    
    public PromocionDAO(Integer idPromo, String nombre, String descripcion, LocalDate fechaInicio,
                        LocalDate fechaFin, BigDecimal porcentajeDescuento, String estado) {
        this.idPromo = idPromo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.porcentajeDescuento = porcentajeDescuento;
        this.estado = estado;
    }
    
    // Getters y Setters
    public Integer getIdPromo() {
    	return idPromo;
    	}
    public void setIdPromo(Integer idPromo) {
    	this.idPromo = idPromo;
    	}
    
    public String getNombre() {
    	return nombre;
    	}
    public void setNombre(String nombre) {
    	this.nombre = nombre;
    	}
    
    public String getDescripcion() {
    	return descripcion;
    	}
    public void setDescripcion(String descripcion) {
    	this.descripcion = descripcion;
    	}
    
    public LocalDate getFechaInicio() {
    	return fechaInicio;
    	}
    public void setFechaInicio(LocalDate fechaInicio) {
    	this.fechaInicio = fechaInicio;
    	}
    
    public LocalDate getFechaFin() {
    	return fechaFin;
    	}
    public void setFechaFin(LocalDate fechaFin) {
    	this.fechaFin = fechaFin;
    	}
    
    public BigDecimal getPorcentajeDescuento() {
    	return porcentajeDescuento;
    	}
    public void setPorcentajeDescuento(BigDecimal porcentajeDescuento) {
    	this.porcentajeDescuento = porcentajeDescuento;
    	}
    
    public String getEstado() {
    	return estado;
    	}
    public void setEstado(String estado) {
    	this.estado = estado;
    	}
}