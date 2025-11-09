package com.practica.dao;

public class LoginResponseDAO {
    private String token;
    private String rol;
    private String email;
    private String dni;
    private String message;
    
    public LoginResponseDAO() {}
    
    public LoginResponseDAO(String token, String rol, String email, String dni, String message) {
        this.token = token;
        this.rol = rol;
        this.email = email;
        this.dni = dni;
        this.message = message;
    }
    
    // Getters y Setters
    public String getToken() {
    	return token;
    	}
    public void setToken(String token) {
    	this.token = token;
    	}
    
    public String getRol() {
    	return rol;
    	}
    public void setRol(String rol) {
    	this.rol = rol;
    	}
    
    public String getEmail() {
    	return email;
    	}
    public void setEmail(String email) {
    	this.email = email;
    	}
    
    public String getDni() {
    	return dni;
    	}
    public void setDni(String dni) {
    	this.dni = dni;
    	}
    
    public String getMessage() {
    	return message;
    	}
    public void setMessage(String message) {
    	this.message = message;
    	}
}