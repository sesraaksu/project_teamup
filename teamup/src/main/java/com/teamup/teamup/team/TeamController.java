package com.teamup.teamup.team;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamup.teamup.shared.CurrentUser;
import com.teamup.teamup.shared.GenericResponse;
import com.teamup.teamup.user.User;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/1.0")
public class TeamController {
	
	@Autowired
	TeamService teamService;

	@PostMapping("/teames")
	GenericResponse saveTeam(@Valid @RequestBody Team team, @CurrentUser User user) {
		teamService.save(team, user);
		return new GenericResponse("Team is saved");
	}
	
	@GetMapping("/teames")
	Page<Team> getTeames(@PageableDefault(sort = "id", direction = Direction.DESC)Pageable page){
		return teamService.getTeames(page);
	}
}