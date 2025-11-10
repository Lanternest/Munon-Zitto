package com.practica.dao;

public class ClienteDAO {
    private String dni;
    private String nombre;
    private String apellido;
    private String direccion;
    private String telefono;
    private String email;
    private Integer codigoPostal;
    private String contrasenia;
    
    // Constructor vacío
    public ClienteDAO() {}
    
    // Constructor completo
    public ClienteDAO(String dni, String nombre, String apellido, String direccion, 
            String telefono, String email, Integer codigoPostal, String contrasenia) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
        this.codigoPostal = codigoPostal;
        this.contrasenia = contrasenia;
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
    
    public Integer getCodigoPostal() {
    	return codigoPostal;
    	}
    public void setCodigoPostal(Integer codigoPostal) {
    	this.codigoPostal = codigoPostal;
    	}
    
    public String getContrasenia() {
        return contrasenia;
    }
    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }
}