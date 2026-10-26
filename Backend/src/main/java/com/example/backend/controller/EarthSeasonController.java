package com.example.backend.controller;

import com.example.backend.entity.EarthSeason;
import com.example.backend.service.EarthSeasonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/earth-seasons")
public class EarthSeasonController {
	private final EarthSeasonService service;

	public EarthSeasonController(EarthSeasonService service) {
		this.service = service;
	}

	@GetMapping
	public List<EarthSeason> findAll() {
		return service.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<EarthSeason> findById(@PathVariable Integer id) {
		return service.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
}
