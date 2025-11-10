package com.practica.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "pagos")
public class Pago {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_pago")
    private Integer idPago;
    
    @Column(name = "ID_pedido", nullable = false, unique = true)
    private Integer idPedido;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "FormaDePago", nullable = false, length = 30)
    private FormaPago formaDePago;
    
    @Column(name = "Monto", nullable = false, precision = 10, scale = 2)
    private BigDecimal monto;
    
    @Column(name = "FechaPago")
    private LocalDateTime fechaPago;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "Estado", length = 20)
    private EstadoPago estado = EstadoPago.Pendiente;
    
    @Column(name = "ComprobanteTransaccion", length = 100)
    private String comprobanteTransaccion;
    
    public enum FormaPago {
        Efectivo, Tarjeta_Debito, Tarjeta_Credito, Transferencia
    }

    public enum EstadoPago {
        Pendiente, Aprobado, Rechazado
    }
    
    public Pago() {
        this.fechaPago = LocalDateTime.now();
    }
    
    // Getters y Setters
    public Integer getIdPago() {
    	return idPago;
    	}
    public void setIdPago(Integer idPago) {
    	this.idPago = idPago;
    	}
    
    public Integer getIdPedido() {
    	return idPedido;
    	}
    public void setIdPedido(Integer idPedido) {
    	this.idPedido = idPedido;
    	}
    
    public FormaPago getFormaDePago() {
    	return formaDePago;
    	}
    public void setFormaDePago(FormaPago formaDePago) {
    	this.formaDePago = formaDePago;
    	}
    
    public BigDecimal getMonto() {
    	return monto;
    	}
    public void setMonto(BigDecimal monto) {
    	this.monto = monto;
    	}
    
    public LocalDateTime getFechaPago() {
    	return fechaPago;
    	}
    public void setFechaPago(LocalDateTime fechaPago) {
    	this.fechaPago = fechaPago;
    	}
    
    public EstadoPago getEstado() {
    	return estado;
    	}
    public void setEstado(EstadoPago estado) {
    	this.estado = estado;
    	}
    
    public String getComprobanteTransaccion() {
    	return comprobanteTransaccion;
    	}
    public void setComprobanteTransaccion(String comprobanteTransaccion) {
    	this.comprobanteTransaccion = comprobanteTransaccion;
    	}
}