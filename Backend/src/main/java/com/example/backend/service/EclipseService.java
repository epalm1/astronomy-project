package com.example.backend.service;

import com.example.backend.entity.Eclipse;
import com.example.backend.repository.EclipseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class EclipseService {
	private final EclipseRepository repository;

	public EclipseService(EclipseRepository repository) {
		this.repository = repository;
	}

	public List<Eclipse> findAll() {
		return repository.findAll();
	}

	public Optional<Eclipse> findById(Integer id) {
		return repository.findById(id);
	}
}
