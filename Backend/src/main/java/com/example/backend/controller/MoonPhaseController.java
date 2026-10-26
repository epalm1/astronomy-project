package com.example.backend.controller;

import com.example.backend.entity.MoonPhase;
import com.example.backend.service.MoonPhaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/moon-phases")
public class MoonPhaseController {
	private final MoonPhaseService service;

	public MoonPhaseController(MoonPhaseService service) {
		this.service = service;
	}

	@GetMapping
	public List<MoonPhase> findAll() {
		return service.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<MoonPhase> findById(@PathVariable Integer id) {
		return service.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
}
