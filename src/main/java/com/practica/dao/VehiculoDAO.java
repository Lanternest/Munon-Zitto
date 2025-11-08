package com.practica.dao;

public class VehiculoDAO {
    private String patente;
    private String marca;
    private String modelo;
    private String estado;
    
    public VehiculoDAO() {}
    
    public VehiculoDAO(String patente, String marca, String modelo, String estado) {
        this.patente = patente;
        this.marca = marca;
        this.modelo = modelo;
        this.estado = estado;
    }
    
    // Getters y Setters
    public String getPatente() {
    	return patente;
    	}
    public void setPatente(String patente) {
    	this.patente = patente;
    	}
    
    public String getMarca() {
    	return marca;
    	}
    public void setMarca(String marca) {
    	this.marca = marca;
    	}
    
    public String getModelo() {
    	return modelo;
    	}
    public void setModelo(String modelo) {
    	this.modelo = modelo;
    	}
    
    public String getEstado() {
    	return estado;
    	}
    public void setEstado(String estado) {
    	this.estado = estado;
    	}
}