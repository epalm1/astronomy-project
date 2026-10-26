package com.example.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "locations", schema = "public")
public class Location {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "name", nullable = false, unique = true, length = 30)
	private String name;

	@Column(name = "longitude", nullable = false)
	private Double longitude;

	@Column(name = "latitude", nullable = false)
	private Double latitude;

	@Column(name = "elevation")
	private Integer elevation;

	protected Location() {
	}

	public Integer getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Integer getElevation() {
		return elevation;
	}

	public void setElevation(Integer elevation) {
		this.elevation = elevation;
	}
}
