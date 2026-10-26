package com.example.backend.repository;

import com.example.backend.entity.Eclipse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface EclipseRepository extends JpaRepository<Eclipse, Integer> {

	@Query(value = """
			SELECT e.*
			FROM public.eclipses e
			WHERE e."start" >= :startDate
			  AND e."start" < :endDate
			ORDER BY e."start" ASC
			""", nativeQuery = true)
	List<Eclipse> findByStartTimeRange(@Param("startDate") LocalDateTime startDate,
			@Param("endDate") LocalDateTime endDate);
}
