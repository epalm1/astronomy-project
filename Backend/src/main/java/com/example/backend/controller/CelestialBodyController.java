package com.example.backend.controller;

import com.example.backend.entity.CelestialBody;
import com.example.backend.service.CelestialBodyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/celestial-bodies")
public class CelestialBodyController {

	private final CelestialBodyService service;

	public CelestialBodyController(CelestialBodyService service) {
		this.service = service;
	}

	@GetMapping
	public List<CelestialBody> findAll() {
		return service.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<CelestialBody> findById(@PathVariable Integer id) {
		return service.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
}
