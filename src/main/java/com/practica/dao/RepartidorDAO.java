package com.practica.dao;

import java.time.LocalDate;

public class RepartidorDAO {
    private String dniR;
    private String nombre;
    private String apellido;
    private String telefono;
    private LocalDate fechaContratacion;
    private String patente;
    
    public RepartidorDAO() {}
    
    public RepartidorDAO(String dniR, String nombre, String apellido, String telefono, 
                         LocalDate fechaContratacion, String patente) {
        this.dniR = dniR;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.fechaContratacion = fechaContratacion;
        this.patente = patente;
    }
    
    // Getters y Setters
    public String getDniR() { return dniR; }
    public void setDniR(String dniR) { this.dniR = dniR; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }
    
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    
    public LocalDate getFechaContratacion() { return fechaContratacion; }
    public void setFechaContratacion(LocalDate fechaContratacion) { this.fechaContratacion = fechaContratacion; }
    
    public String getPatente() { return patente; }
    public void setPatente(String patente) { this.patente = patente; }
}