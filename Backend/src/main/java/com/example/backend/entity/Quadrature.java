package com.example.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "quadratures", schema = "public")
public class Quadrature {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "outer_planet", nullable = false)
	private CelestialBody outerPlanet;

	@Column(name = "phase_angle", nullable = false)
	private Integer phaseAngle;

	@Column(name = "\"time\"", nullable = false)
	private LocalDateTime time;

	protected Quadrature() {
	}

	public Integer getId() {
		return id;
	}

	public CelestialBody getOuterPlanet() {
		return outerPlanet;
	}

	public void setOuterPlanet(CelestialBody outerPlanet) {
		this.outerPlanet = outerPlanet;
	}

	public Integer getPhaseAngle() {
		return phaseAngle;
	}

	public void setPhaseAngle(Integer phaseAngle) {
		this.phaseAngle = phaseAngle;
	}

	public LocalDateTime getTime() {
		return time;
	}

	public void setTime(LocalDateTime time) {
		this.time = time;
	}
}
