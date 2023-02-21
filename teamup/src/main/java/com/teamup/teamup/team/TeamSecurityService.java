package com.teamup.teamup.team;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamup.teamup.user.User;

@Service(value = "teamSecurity")
public class TeamSecurityService {
	
	@Autowired
	TeamRepository teamRepository;

	public boolean isAllowedToDelete(long id, User loggedInUser) {
		Optional<Team> optionalTeam = teamRepository.findById(id);
		if(!optionalTeam.isPresent()) {
			return false;
		}

		Team team = optionalTeam.get();
		if(team.getUser().getId() != loggedInUser.getId()) {
			return false;
		}

		return true;
	}

}
