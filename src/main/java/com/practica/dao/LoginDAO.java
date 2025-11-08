package com.practica.dao;

public class LoginDAO {
    private String email;
    private String contrasenia;
    
    // Constructor vacío
    public LoginDAO() {}
    
    // Constructor con parámetros
    public LoginDAO(String email, String contrasenia) {
        this.email = email;
        this.contrasenia = contrasenia;
    }
    
    // Getters y Setters
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
}