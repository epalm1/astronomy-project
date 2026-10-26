package com.example.backend.service;

import com.example.backend.entity.CelestialBody;
import com.example.backend.repository.CelestialBodyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class CelestialBodyService {

	private final CelestialBodyRepository repository;

	public CelestialBodyService(CelestialBodyRepository repository) {
		this.repository = repository;
	}

	public List<CelestialBody> findAll() {
		return repository.findAll();
	}

	public Optional<CelestialBody> findById(Integer id) {
		return repository.findById(id);
	}
}
