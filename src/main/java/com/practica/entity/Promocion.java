package com.practica.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "promociones")
public class Promocion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_promo")
    private Integer idPromo;
    
    @Column(name = "Nombre", nullable = false, length = 50)
    private String nombre;
    
    @Column(name = "Descripcion", columnDefinition = "TEXT")
    private String descripcion;
    
    @Column(name = "FechaInicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "FechaFin", nullable = false)
    private LocalDate fechaFin;

    @Column(name = "PorcentajeDescuento", nullable = false, precision = 5, scale = 2)
    private BigDecimal porcentajeDescuento;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "Estado", length = 20)
    private EstadoPromocion estado = EstadoPromocion.Activa;
    
    public enum EstadoPromocion {
        Activa, Finalizada, Pausada
    }
    
    public Promocion() {}
    
    public Promocion(String nombre, String descripcion, LocalDate fechaInicio, 
                     LocalDate fechaFin, BigDecimal porcentajeDescuento) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.porcentajeDescuento = porcentajeDescuento;
        this.estado = EstadoPromocion.Activa;
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
    
    public EstadoPromocion getEstado() {
    	return estado;
    	}
    public void setEstado(EstadoPromocion estado) {
    	this.estado = estado;
    	}
}