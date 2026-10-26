package com.example.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "eclipses", schema = "public")
public class Eclipse {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "\"type\"", nullable = false)
	private Boolean type;

	@Column(name = "\"start\"", nullable = false)
	private LocalDateTime startTime;

	@Column(name = "peak", nullable = false)
	private LocalDateTime peak;

	@Column(name = "\"end\"", nullable = false)
	private LocalDateTime endTime;

	@Column(name = "observable_in_est", nullable = false)
	private Boolean observableInEst;

	protected Eclipse() {
	}

	public Integer getId() {
		return id;
	}

	public Boolean getType() {
		return type;
	}

	public void setType(Boolean type) {
		this.type = type;
	}

	public LocalDateTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalDateTime startTime) {
		this.startTime = startTime;
	}

	public LocalDateTime getPeak() {
		return peak;
	}

	public void setPeak(LocalDateTime peak) {
		this.peak = peak;
	}

	public LocalDateTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalDateTime endTime) {
		this.endTime = endTime;
	}

	public Boolean getObservableInEst() {
		return observableInEst;
	}

	public void setObservableInEst(Boolean observableInEst) {
		this.observableInEst = observableInEst;
	}
}
