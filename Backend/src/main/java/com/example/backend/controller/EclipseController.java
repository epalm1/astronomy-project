package com.example.backend.controller;

import com.example.backend.dto.EclipseResponse;
import com.example.backend.service.EclipseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/eclipses")
public class EclipseController {

	private final EclipseService service;

	public EclipseController(EclipseService service) {
		this.service = service;
	}

	@GetMapping
	public List<EclipseResponse> findByYearRange(@RequestParam int startYear, @RequestParam int endYear) {
		return service.findByYearRange(startYear, endYear);
	}

	@GetMapping("/{id}")
	public ResponseEntity<EclipseResponse> findById(@PathVariable Integer id) {
		return service.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
}
