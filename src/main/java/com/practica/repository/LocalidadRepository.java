package com.practica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.practica.entity.Localidad;

@Repository
public interface LocalidadRepository extends JpaRepository<Localidad, Integer> {
}