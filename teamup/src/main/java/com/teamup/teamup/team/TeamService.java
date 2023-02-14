package com.teamup.teamup.team;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.teamup.teamup.user.User;

@Service
public class TeamService {
	
	TeamRepository teamRepository;

	public TeamService(TeamRepository teamRepository) {
		super();
		this.teamRepository = teamRepository;
	}

	public void save(Team team, User user) {
		team.setTimestamp(new Date());
		team.setUser(user);
		teamRepository.save(team);
	}

	public Page<Team> getTeames(Pageable page) {
		return teamRepository.findAll(page);
	}

}
