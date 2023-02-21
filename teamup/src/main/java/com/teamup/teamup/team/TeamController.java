package com.teamup.teamup.team;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamup.teamup.shared.CurrentUser;
import com.teamup.teamup.shared.GenericResponse;
import com.teamup.teamup.team.vm.TeamSubmitVM;
import com.teamup.teamup.team.vm.TeamVM;
import com.teamup.teamup.user.User;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/1.0")
public class TeamController {

	@Autowired
	TeamService teamService;

	@PostMapping("/teames")
	GenericResponse saveTeam(@Valid @RequestBody TeamSubmitVM team, @CurrentUser User user) {
		teamService.save(team, user);
		return new GenericResponse("Team is saved");
	}

	@GetMapping("/teames")
	Page<TeamVM> getTeames(@PageableDefault(sort = "id", direction = Direction.DESC) Pageable page) {
		return teamService.getTeames(page).map(TeamVM::new);
	}

	@GetMapping({"/teames/{id:[0-9]+}" , "/users/{username}/teames/{id:[0-9]+}"}) 
	ResponseEntity<?> getTeamesRelative(@PageableDefault(sort = "id", direction = Direction.DESC) Pageable page,
			@PathVariable long id,
			@PathVariable(required = false) String username,
			@RequestParam(name = "count", required = false, defaultValue = "false") boolean count,
			@RequestParam(name = "direction", defaultValue = "before") String direction) {
		if (count) {
			long newTeamCount = teamService.getNewTeamesCount(id, username);
			Map<String, Long> response = new HashMap<>();
			response.put("count", newTeamCount);
			return ResponseEntity.ok(response);
		}
		if (direction.equals("after")) {
			List<TeamVM> newTeames = teamService.getNewTeames(id, username, page.getSort()).stream().map(TeamVM::new)
					.collect(Collectors.toList());
			return ResponseEntity.ok(newTeames);
		}

		return ResponseEntity.ok(teamService.getOldTeames(id, username, page).map(TeamVM::new));
	}

	@GetMapping("/users/{username}/teames")
	Page<TeamVM> getUserTeames(@PathVariable String username,
			@PageableDefault(sort = "id", direction = Direction.DESC) Pageable page) {
		return teamService.getTeamesOfUser(username, page).map(TeamVM::new);
	}
	
	@DeleteMapping("/teames/{id:[0-9]+}")
	@PreAuthorize("@teamSecurity.isAllowedToDelete(#id, principal)")
	GenericResponse deleteTeam(@PathVariable long id) {
		teamService.delete(id);
		return new GenericResponse("Team removed");
	}
}