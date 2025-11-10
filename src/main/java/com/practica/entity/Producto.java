package com.practica.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "productos")
public class Producto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_productos")
    private Integer idProductos;
    
    @Column(name = "Nombre", nullable = false, length = 50)
    private String nombre;
    
    @Column(name = "Descripcion", columnDefinition = "TEXT")
    private String descripcion;
    
    @Column(name = "Precio", nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;
    
    @Column(name = "Stock", nullable = false)
    private Integer stock = 0;
    
    @Column(name = "FechaElaboracion")
    private LocalDate fechaElaboracion;
    
    @Column(name = "DiasVencimiento", nullable = false)
    private Integer diasVencimiento;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "Estado", length = 30)
    private EstadoProducto estado = EstadoProducto.Disponible;
    
    @Column(name = "Categoria", length = 30)
    private String categoria;
    
    public enum EstadoProducto {
        Disponible, Agotado, Descontinuado
    }
    
    public Producto() {}
    
    public Producto(String nombre, String descripcion, BigDecimal precio, Integer stock,
                    Integer diasVencimiento, String categoria) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.diasVencimiento = diasVencimiento;
        this.categoria = categoria;
        this.fechaElaboracion = LocalDate.now();
        this.estado = EstadoProducto.Disponible;
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
    
    public EstadoProducto getEstado() {
    	return estado;
    	}
    public void setEstado(EstadoProducto estado) {
    	this.estado = estado;
    	}
    
    public String getCategoria() {
    	return categoria;
    	}
    public void setCategoria(String categoria) {
    	this.categoria = categoria;
    	}
}