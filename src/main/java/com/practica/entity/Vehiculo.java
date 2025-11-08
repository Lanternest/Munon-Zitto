package com.practica.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "vehiculos")
public class Vehiculo {
    
    @Id
    @Column(length = 10)
    private String patente;
    
    @Column(nullable = false, length = 20)
    private String marca;
    
    @Column(nullable = false, length = 20)
    private String modelo;
    
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EstadoVehiculo estado = EstadoVehiculo.Activo;
    
    public enum EstadoVehiculo {
        Activo, En_Reparacion, Inactivo
    }
    
    public Vehiculo() {}
    
    public Vehiculo(String patente, String marca, String modelo) {
        this.patente = patente;
        this.marca = marca;
        this.modelo = modelo;
        this.estado = EstadoVehiculo.Activo;
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
    
    public EstadoVehiculo getEstado() {
    	return estado;
    	}
    public void setEstado(EstadoVehiculo estado) {
    	this.estado = estado;
    	}
}