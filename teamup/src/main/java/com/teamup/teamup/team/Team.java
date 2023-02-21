package com.teamup.teamup.team;

import java.util.Date;

import com.teamup.teamup.file.FileAttachment;
import com.teamup.teamup.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.GenerationType;
import lombok.Data;

@Data
@Entity
public class Team {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(length = 1000)
	private String content;

	@Temporal(TemporalType.TIMESTAMP)
	private Date timestamp;

	@ManyToOne
	private User user;
	
	@OneToOne(mappedBy = "team", cascade = CascadeType.REMOVE)
	private FileAttachment fileAttachment;
	
}
