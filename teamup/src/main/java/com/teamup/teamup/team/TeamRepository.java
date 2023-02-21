package com.teamup.teamup.team;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.teamup.teamup.user.User;

public interface TeamRepository extends JpaRepository<Team, Long>, JpaSpecificationExecutor<Team>{

	Page<Team> findByUser(User user, Pageable page);
}
