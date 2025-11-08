package com.practica.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "localidad")
public class Localidad {
    
	@Id
	@Column(name = "CodigoPostal")
	private Integer codigoPostal;

	@Column(nullable = false, length = 50, name = "Nombre")
	private String nombre;
    
    public Localidad() {}
    
    public Localidad(Integer codigoPostal, String nombre) {
        this.codigoPostal = codigoPostal;
        this.nombre = nombre;
    }
    
    // Getters y Setters
    
    public Integer getCodigoPostal() {
    	return codigoPostal;
    	}
    public void setCodigoPostal(Integer codigoPostal) {
    	this.codigoPostal = codigoPostal;
    	}
    
    public String getNombre() {
    	return nombre;
    	}
    public void setNombre(String nombre) {
    	this.nombre = nombre;
    	}
}