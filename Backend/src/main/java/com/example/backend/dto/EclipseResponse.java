package com.example.backend.dto;

import java.time.LocalDateTime;

public record EclipseResponse(Integer id, String eclipse, LocalDateTime start, LocalDateTime peak, LocalDateTime end,
		String dur, String loc, int percent) {
}
