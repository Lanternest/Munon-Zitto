package com.practica.dao;

public class LocalidadDAO {
    private Integer codigoPostal;
    private String nombre;
    
    public LocalidadDAO() {}
    
    public LocalidadDAO(Integer codigoPostal, String nombre) {
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