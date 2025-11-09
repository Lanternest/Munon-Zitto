package com.practica.dao;

public class UsuarioDAO {
    private Integer idUsuario;
    private String email;
    private String rol;
    private String dni;
    private Boolean activo;
    
    public UsuarioDAO() {}
    
    public UsuarioDAO(Integer idUsuario, String email, String rol, String dni, Boolean activo) {
        this.idUsuario = idUsuario;
        this.email = email;
        this.rol = rol;
        this.dni = dni;
        this.activo = activo;
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
    
    public String getRol() {
    	return rol;
    	}
    public void setRol(String rol) {
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
}