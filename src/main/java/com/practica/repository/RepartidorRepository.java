package com.practica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.practica.entity.Repartidor;

@Repository
public interface RepartidorRepository extends JpaRepository<Repartidor, String> {
}