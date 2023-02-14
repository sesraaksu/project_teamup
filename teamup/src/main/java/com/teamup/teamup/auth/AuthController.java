package com.teamup.teamup.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import com.teamup.teamup.shared.CurrentUser;
import com.teamup.teamup.user.User;
import com.teamup.teamup.user.UserRepository;
import com.teamup.teamup.user.vm.UserVM;

@RestController
public class AuthController {
	
	@Autowired
	UserRepository userRepository;

	@PostMapping("/api/1.0/auth")
	UserVM handleAuthentication(@CurrentUser User user) {
		return new UserVM(user);
	}


}