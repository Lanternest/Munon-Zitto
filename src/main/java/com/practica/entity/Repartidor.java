package com.practica.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "repartidores")
public class Repartidor {
    
    @Id
    @Column(name = "dni_r", length = 15)
    private String dniR;
    
    @Column(nullable = false, length = 25)
    private String nombre;
    
    @Column(nullable = false, length = 25)
    private String apellido;
    
    @Column(length = 20)
    private String telefono;
    
    @Column(name = "FechaContratacion")
    private LocalDate fechaContratacion;
    
    @Column(length = 10)
    private String patente;
    
    public Repartidor() {}
    
    public Repartidor(String dniR, String nombre, String apellido, String telefono, String patente) {
        this.dniR = dniR;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.patente = patente;
        this.fechaContratacion = LocalDate.now();
    }
    
    // Getters y Setters
    public String getDniR() {
    	return dniR;
    	}
    public void setDniR(String dniR) {
    	this.dniR = dniR;
    	}
   
    public String getNombre() {
    	return nombre;
    	}
    public void setNombre(String nombre) {
    	this.nombre = nombre;
    	}
    
    public String getApellido() {
    	return apellido;
    	}
    public void setApellido(String apellido) {
    	this.apellido = apellido;
    	}
    
    public String getTelefono() {
    	return telefono;
    	}
    public void setTelefono(String telefono) {
    	this.telefono = telefono;
    	}
    
    public LocalDate getFechaContratacion() {
    	return fechaContratacion;
    	}
    public void setFechaContratacion(LocalDate fechaContratacion) {
    	this.fechaContratacion = fechaContratacion;
    	}
    
    public String getPatente() {
    	return patente;
    	}
    public void setPatente(String patente) {
    	this.patente = patente;
    	}
}