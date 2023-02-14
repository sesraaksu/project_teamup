package com.teamup.teamup.team;

import java.util.Date;

import com.teamup.teamup.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
public class Team {
	
	@Id @GeneratedValue
	private long id;

	@Size(min=1, max=1000)
	@Column(length = 1000)
	private String content;

	@Temporal(TemporalType.TIMESTAMP)
	private Date timestamp;

	private User user;
}
