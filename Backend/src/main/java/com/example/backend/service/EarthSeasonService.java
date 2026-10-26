package com.example.backend.service;

import com.example.backend.entity.EarthSeason;
import com.example.backend.repository.EarthSeasonRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class EarthSeasonService {
	private final EarthSeasonRepository repository;

	public EarthSeasonService(EarthSeasonRepository repository) {
		this.repository = repository;
	}

	public List<EarthSeason> findAll() {
		return repository.findAll();
	}

	public Optional<EarthSeason> findById(Integer id) {
		return repository.findById(id);
	}
}
