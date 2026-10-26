package com.example.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.LocalDateTime;

@Entity
@Table(name = "moon_phases", schema = "public", uniqueConstraints = @UniqueConstraint(columnNames = "time_utc"))
public class MoonPhase {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "time_utc", nullable = false)
	private LocalDateTime timeUtc;

	@Column(name = "phase", nullable = false)
	private Short phase;

	protected MoonPhase() {
	}

	public Integer getId() {
		return id;
	}

	public LocalDateTime getTimeUtc() {
		return timeUtc;
	}

	public void setTimeUtc(LocalDateTime timeUtc) {
		this.timeUtc = timeUtc;
	}

	public Short getPhase() {
		return phase;
	}

	public void setPhase(Short phase) {
		this.phase = phase;
	}
}
