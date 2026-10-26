package com.example.backend.controller;

import com.example.backend.entity.Location;
import com.example.backend.service.LocationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
public class LocationController {
	private final LocationService service;

	public LocationController(LocationService service) {
		this.service = service;
	}

	@GetMapping
	public List<Location> findAll() {
		return service.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Location> findById(@PathVariable Integer id) {
		return service.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
}
