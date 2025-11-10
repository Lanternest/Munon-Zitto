package com.practica.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "cliente")
public class Cliente {
    
    @Id
    @Column(name = "DNI",length = 15)
    private String dni;
    
    @Column(name = "Nombre", nullable = false, length = 25)
    private String nombre;
    
    @Column(name = "Apellido",nullable = false, length = 25)
    private String apellido;
    
    @Column(name = "Direccion",nullable = false, length = 80)
    private String direccion;
    
    @Column(name = "Telefono",nullable = false, length = 20)
    private String telefono;
    
    @Column(name = "Email",nullable = false, unique = true, length = 80)
    private String email;
    
    @Column(name = "FechaRegistro")
    private LocalDateTime fechaRegistro;
    
    @Column(name = "CodigoPostal", nullable = false)
    private Integer codigoPostal;

    // Constructor vacío
    public Cliente() {
        this.fechaRegistro = LocalDateTime.now();
    }
    
    // Constructor con parámetros
    public Cliente(String dni, String nombre, String apellido, String direccion, 
            String telefono, String email, Integer codigoPostal) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
        this.codigoPostal = codigoPostal;
        this.fechaRegistro = LocalDateTime.now();
    }
    
    // Getters y Setters
    public String getDni() {
        return dni;
    }
    public void setDni(String dni) {
        this.dni = dni;
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
    
    public String getDireccion() {
        return direccion;
    }
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
    
    public String getTelefono() {
        return telefono;
    }
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    
    public LocalDateTime getFechaRegistro() {
        return fechaRegistro;
    }
    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }
    
    public Integer getCodigoPostal() {
        return codigoPostal;
    }
    public void setCodigoPostal(Integer codigoPostal) {
        this.codigoPostal = codigoPostal;
    }
}