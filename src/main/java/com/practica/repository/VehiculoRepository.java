package com.practica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.practica.entity.Vehiculo;

@Repository
public interface VehiculoRepository extends JpaRepository<Vehiculo, String> {
}