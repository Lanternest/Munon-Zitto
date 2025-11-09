package com.practica.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_usuario")
    private Integer idUsuario;
    
    @Column(nullable = false, unique = true, length = 80, name = "Email")
    private String email;
    
    @Column(nullable = false, length = 255, name = "Contrasenia")
    private String contrasenia;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "Rol")
    private Rol rol;
    
    @Column(length = 15, name = "DNI")
    private String dni;
    
    @Column(name = "Activo")
    private Boolean activo = true;
    
    @Column(name = "FechaCreacion")
    private LocalDateTime fechaCreacion;
    
    public enum Rol {
        ADMINISTRADOR, CLIENTE, REPARTIDOR
    }
    
    public Usuario() {
        this.fechaCreacion = LocalDateTime.now();
    }
    
    public Usuario(String email, String contrasenia, Rol rol, String dni) {
        this.email = email;
        this.contrasenia = contrasenia;
        this.rol = rol;
        this.dni = dni;
        this.activo = true;
        this.fechaCreacion = LocalDateTime.now();
    }
    
    // Getters y Setters
    public Integer getIdUsuario() {
    	return idUsuario;
    	}
    public void setIdUsuario(Integer idUsuario) {
    	this.idUsuario = idUsuario;
    	}
    
    public String getEmail() {
    	return email;
    	}
    public void setEmail(String email) {
    	this.email = email;
    	}
    
    public String getContrasenia() {
    	return contrasenia;
    	}
    public void setContrasenia(String contrasenia) {
    	this.contrasenia = contrasenia;
    	}
    
    public Rol getRol() {
    	return rol;
    	}
    public void setRol(Rol rol) {
    	this.rol = rol;
    	}
    
    public String getDni() {
    	return dni;
    	}
    public void setDni(String dni) {
    	this.dni = dni;
    	}
    
    public Boolean getActivo() {
    	return activo;
    	}
    public void setActivo(Boolean activo) {
    	this.activo = activo;
    	}
    
    public LocalDateTime getFechaCreacion() {
    	return fechaCreacion;
    	}
    public void setFechaCreacion(LocalDateTime fechaCreacion) {
    	this.fechaCreacion = fechaCreacion;
    	}
}