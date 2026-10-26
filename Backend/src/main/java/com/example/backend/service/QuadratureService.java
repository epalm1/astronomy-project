
package com.example.backend.service;

import com.example.backend.dto.QuadratureResponse;
import com.example.backend.entity.Quadrature;
import com.example.backend.repository.QuadratureRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class QuadratureService {

	private final QuadratureRepository repository;

	public QuadratureService(QuadratureRepository repository) {
		this.repository = repository;
	}

	public List<QuadratureResponse> findAll() {
		return repository.findAll().stream().map(this::toResponse).toList();
	}

	public Optional<QuadratureResponse> findById(Integer id) {
		return repository.findById(id).map(this::toResponse);
	}

	public List<QuadratureResponse> findByYearRange(int startYear, int endYear) {

		if (startYear > endYear) {
			throw new IllegalArgumentException("Start year must not be after end year");
		}

		final LocalDateTime startDate = LocalDateTime.of(startYear, 1, 1, 0, 0);

		final LocalDateTime endDate = LocalDateTime.of(endYear + 1, 1, 1, 0, 0);

		return repository.findByTimeRange(startDate, endDate).stream().map(this::toResponse).toList();
	}

	private QuadratureResponse toResponse(Quadrature quadrature) {
		return new QuadratureResponse(quadrature.getId(), quadrature.getOuterPlanet().getId(),
				quadrature.getPhaseAngle(), quadrature.getTime());
	}
}
