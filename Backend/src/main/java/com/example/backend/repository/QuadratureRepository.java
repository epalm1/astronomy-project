package com.example.backend.repository;

import com.example.backend.entity.Quadrature;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuadratureRepository extends JpaRepository<Quadrature, Integer> {
}
