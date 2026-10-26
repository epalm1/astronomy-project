
package com.example.backend.repository;

import com.example.backend.entity.Quadrature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface QuadratureRepository extends JpaRepository<Quadrature, Integer> {

	@Query(value = """
			SELECT q.*
			FROM public.quadratures q
			WHERE q."time" >= :startDate
			  AND q."time" < :endDate
			ORDER BY q."time" ASC
			""", nativeQuery = true)
	List<Quadrature> findByTimeRange(@Param("startDate") LocalDateTime startDate,
			@Param("endDate") LocalDateTime endDate);
}
