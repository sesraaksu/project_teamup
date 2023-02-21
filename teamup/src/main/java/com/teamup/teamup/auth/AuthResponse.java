package com.teamup.teamup.auth;

import com.teamup.teamup.user.vm.UserVM;

import lombok.Data;

@Data
public class AuthResponse {
	
	private String token;

	private UserVM user;

}
