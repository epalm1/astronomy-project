package com.example.backend.dto;

import java.time.LocalDateTime;

public record QuadratureResponse(Integer id, String planetName, Integer phaseAngle, LocalDateTime time) {
}
