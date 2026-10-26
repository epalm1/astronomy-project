package com.example.backend.repository;

import com.example.backend.entity.EarthSeason;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EarthSeasonRepository extends JpaRepository<EarthSeason, Integer> {
}
