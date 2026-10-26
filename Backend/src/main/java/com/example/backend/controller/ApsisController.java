package com.example.backend.controller;

import com.example.backend.dto.ApsisResponse;
import com.example.backend.service.ApsisService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/apsides")
public class ApsisController {
	private final ApsisService service;

	public ApsisController(ApsisService service) {
		this.service = service;
	}

	@GetMapping
	public List<ApsisResponse> findAll() {
		return service.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<ApsisResponse> findById(@PathVariable Integer id) {
		return service.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
}
