package com.example.backend.repository;

import com.example.backend.entity.CelestialBody;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CelestialBodyRepository extends JpaRepository<CelestialBody, Integer> {
}
