package com.practica.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.practica.entity.Promocion;

@Repository
public interface PromocionRepository extends JpaRepository<Promocion, Integer> {
    List<Promocion> findByEstado(Promocion.EstadoPromocion estado);
    
    @Query("SELECT p FROM Promocion p WHERE p.estado = 'ACTIVA' AND :fecha BETWEEN p.fechaInicio AND p.fechaFin")
    List<Promocion> findPromocionesActivas(LocalDate fecha);
}