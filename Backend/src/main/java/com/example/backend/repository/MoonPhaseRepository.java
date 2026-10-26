package com.example.backend.repository;

import com.example.backend.entity.MoonPhase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MoonPhaseRepository extends JpaRepository<MoonPhase, Integer> {
}
