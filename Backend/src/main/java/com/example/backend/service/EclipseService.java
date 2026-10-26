package com.example.backend.service;

import com.example.backend.dto.EclipseResponse;
import com.example.backend.entity.Eclipse;
import com.example.backend.repository.EclipseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class EclipseService {

	private final EclipseRepository repository;

	public EclipseService(EclipseRepository repository) {
		this.repository = repository;
	}

	public List<EclipseResponse> findByYearRange(int startYear, int endYear) {
		if (startYear > endYear) {
			throw new IllegalArgumentException("Start year must not be after end year");
		}

		final LocalDateTime startDate = LocalDateTime.of(startYear, 1, 1, 0, 0);

		final LocalDateTime endDate = LocalDateTime.of(endYear + 1, 1, 1, 0, 0);

		return repository.findByStartTimeRange(startDate, endDate).stream().map(this::toResponse).toList();
	}

	public Optional<EclipseResponse> findById(Integer id) {
		return repository.findById(id).map(this::toResponse);
	}

	private EclipseResponse toResponse(Eclipse eclipse) {
		final String eclipseType = Boolean.TRUE.equals(eclipse.getType()) ? "lunar" : "solar";

		final String location = Boolean.TRUE.equals(eclipse.getObservableInEst()) ? "est" : "other";

		final Duration duration = Duration.between(eclipse.getStartTime(), eclipse.getEndTime());

		final long totalMinutes = duration.toMinutes();
		final long hours = totalMinutes / 60;
		final long minutes = totalMinutes % 60;

		final String formattedDuration = hours + "h " + minutes + "m";

		return new EclipseResponse(eclipse.getId(), eclipseType, eclipse.getStartTime(), eclipse.getPeak(),
				eclipse.getEndTime(), formattedDuration, location, 0);
	}
}
