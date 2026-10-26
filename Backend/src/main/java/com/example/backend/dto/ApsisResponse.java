package com.example.backend.dto;

import java.time.LocalDateTime;

public record ApsisResponse(Integer id, Integer bodyId, Boolean type, Integer distance, LocalDateTime time) {
}
