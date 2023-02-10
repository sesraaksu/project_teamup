package com.teamup.teamup;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import com.teamup.teamup.team.Team;
import com.teamup.teamup.team.TeamService;
import com.teamup.teamup.user.User;
import com.teamup.teamup.user.UserService;

@SpringBootApplication
public class TeamupApplication {
	public static void main(String[] args) {
		SpringApplication.run(TeamupApplication.class, args);
	}
	
	@Bean
	@Profile("dev")
	CommandLineRunner createInitialUsers(UserService userService, TeamService teamService) {
		return (args) -> {
			for(int i = 1; i<=25;i++) {				
				User user = new User();
				user.setUsername("user"+i);
				user.setDisplayName("display"+i);
				user.setPassword("P4ssword");
				userService.save(user);
				for(int j = 1;j<=2;j++) {
					Team team = new Team();
					team.setContent("team (" +j + ") from user ("+i+")");
					teamService.save(team, user);
				}
			}
		};
	}
}
