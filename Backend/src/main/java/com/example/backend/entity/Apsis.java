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
@Table(name = "apsides", schema = "public")
public class Apsis {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "body", nullable = false)
	private CelestialBody body;

	@Column(name = "\"type\"", nullable = false)
	private Boolean type;

	@Column(name = "distance", nullable = false)
	private Integer distance;

	@Column(name = "\"time\"", nullable = false)
	private LocalDateTime time;

	protected Apsis() {
	}

	public Integer getId() {
		return id;
	}

	public CelestialBody getBody() {
		return body;
	}

	public void setBody(CelestialBody body) {
		this.body = body;
	}

	public Boolean getType() {
		return type;
	}

	public void setType(Boolean type) {
		this.type = type;
	}

	public Integer getDistance() {
		return distance;
	}

	public void setDistance(Integer distance) {
		this.distance = distance;
	}

	public LocalDateTime getTime() {
		return time;
	}

	public void setTime(LocalDateTime time) {
		this.time = time;
	}
}
