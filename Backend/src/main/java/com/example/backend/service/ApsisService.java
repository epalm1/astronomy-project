package com.example.backend.service;

import com.example.backend.dto.ApsisResponse;
import com.example.backend.entity.Apsis;
import com.example.backend.repository.ApsisRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class ApsisService {
	private final ApsisRepository repository;

	public ApsisService(ApsisRepository repository) {
		this.repository = repository;
	}

	public List<ApsisResponse> findAll() {
		return repository.findAll().stream().map(this::toResponse).toList();
	}

	public Optional<ApsisResponse> findById(Integer id) {
		return repository.findById(id).map(this::toResponse);
	}

	private ApsisResponse toResponse(Apsis apsis) {
		return new ApsisResponse(apsis.getId(), apsis.getBody().getId(), apsis.getType(), apsis.getDistance(),
				apsis.getTime());
	}
}
