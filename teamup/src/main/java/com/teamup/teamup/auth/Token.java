package com.teamup.teamup.auth;

import com.teamup.teamup.user.User;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Token {
	
	@Id
	private String token;

	@ManyToOne
	private User user;

}
