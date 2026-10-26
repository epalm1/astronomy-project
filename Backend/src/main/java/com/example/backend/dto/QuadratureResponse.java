package com.example.backend.dto;

import java.time.LocalDateTime;

public record QuadratureResponse(Integer id, Integer outerPlanetId, Integer phaseAngle, LocalDateTime time) {
}
