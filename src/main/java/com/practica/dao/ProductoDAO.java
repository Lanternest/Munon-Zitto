package com.practica.dao;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ProductoDAO {
    private Integer idProductos;
    private String nombre;
    private String descripcion;
    private BigDecimal precio;
    private Integer stock;
    private LocalDate fechaElaboracion;
    private Integer diasVencimiento;
    private String estado;
    private String categoria;
    
    public ProductoDAO() {}
    
    public ProductoDAO(Integer idProductos, String nombre, String descripcion, BigDecimal precio,
                       Integer stock, LocalDate fechaElaboracion, Integer diasVencimiento,
                       String estado, String categoria) {
        this.idProductos = idProductos;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.fechaElaboracion = fechaElaboracion;
        this.diasVencimiento = diasVencimiento;
        this.estado = estado;
        this.categoria = categoria;
    }
    
    // Getters y Setters
    public Integer getIdProductos() {
    	return idProductos;
    	}
    public void setIdProductos(Integer idProductos) {
    	this.idProductos = idProductos;
    	}
    
    public String getNombre() {
    	return nombre;
    	}
    public void setNombre(String nombre) {
    	this.nombre = nombre;
    	}
    
    public String getDescripcion() {
    	return descripcion;
    	}
    public void setDescripcion(String descripcion) {
    	this.descripcion = descripcion;
    	}
    
    public BigDecimal getPrecio() {
    	return precio;
    	}
    public void setPrecio(BigDecimal precio) {
    	this.precio = precio;
    	}
    
    public Integer getStock() {
    	return stock;
    	}
    public void setStock(Integer stock) {
    	this.stock = stock;
    	}
    
    public LocalDate getFechaElaboracion() {
    	return fechaElaboracion;
    	}
    public void setFechaElaboracion(LocalDate fechaElaboracion) {
    	this.fechaElaboracion = fechaElaboracion;
    	}
    
    public Integer getDiasVencimiento() {
    	return diasVencimiento;
    	}
    public void setDiasVencimiento(Integer diasVencimiento) {
    	this.diasVencimiento = diasVencimiento;
    	}
    
    public String getEstado() {
    	return estado;
    	}
    public void setEstado(String estado) {
    	this.estado = estado;
    	}
    
    public String getCategoria() {
    	return categoria;
    	}
    public void setCategoria(String categoria) {
    	this.categoria = categoria;
    	}
}