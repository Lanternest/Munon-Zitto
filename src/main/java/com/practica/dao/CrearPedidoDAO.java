package com.practica.dao;

import java.util.List;

public class CrearPedidoDAO {
    private String dni;
    private String direccionEntrega;
    private String observaciones;
    private List<DetallePedidoDAO> detalles;
    
    public CrearPedidoDAO() {}
    
    // Getters y Setters
    public String getDni() {
    	return dni;
    	}
    public void setDni(String dni) {
    this.dni = dni;
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