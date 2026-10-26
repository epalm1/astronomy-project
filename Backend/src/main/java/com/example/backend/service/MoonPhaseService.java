package com.example.backend.service;

import com.example.backend.entity.MoonPhase;
import com.example.backend.repository.MoonPhaseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class MoonPhaseService {
	private final MoonPhaseRepository repository;

	public MoonPhaseService(MoonPhaseRepository repository) {
		this.repository = repository;
	}

	public List<MoonPhase> findAll() {
		return repository.findAll();
	}

	public Optional<MoonPhase> findById(Integer id) {
		return repository.findById(id);
	}
}
