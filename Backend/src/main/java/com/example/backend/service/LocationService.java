package com.example.backend.service;

import com.example.backend.entity.Location;
import com.example.backend.repository.LocationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class LocationService {
	private final LocationRepository repository;

	public LocationService(LocationRepository repository) {
		this.repository = repository;
	}

	public List<Location> findAll() {
		return repository.findAll();
	}

	public Optional<Location> findById(Integer id) {
		return repository.findById(id);
	}
}
