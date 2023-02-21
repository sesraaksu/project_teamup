package com.teamup.teamup.team;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.teamup.teamup.file.FileAttachment;
import com.teamup.teamup.file.FileAttachmentRepository;
import com.teamup.teamup.file.FileService;
import com.teamup.teamup.team.vm.TeamSubmitVM;
import com.teamup.teamup.user.User;
import com.teamup.teamup.user.UserService;

@Service
public class TeamService {
	
	TeamRepository teamRepository;
	
	UserService userService;
	
	FileAttachmentRepository fileAttachmentRepository;

	FileService fileService;

	public TeamService(TeamRepository teamRepository, UserService userService, FileAttachmentRepository fileAttachmentRepository
			,FileService fileService) {
		super();
		this.teamRepository = teamRepository;
		this.fileAttachmentRepository = fileAttachmentRepository;
		this.fileService = fileService;
		this.userService = userService;
	}

	public void save(TeamSubmitVM teamSubmitVM, User user) {
		Team team = new Team();
		team.setContent(teamSubmitVM.getContent());
		team.setTimestamp(new Date());
		team.setUser(user);
		teamRepository.save(team);
		Optional<FileAttachment> optionalFileAttachment = fileAttachmentRepository.findById(teamSubmitVM.getAttachmentId());
		if(optionalFileAttachment.isPresent()) {
			FileAttachment fileAttachment = optionalFileAttachment.get();
			fileAttachment.setTeam(team);
			fileAttachmentRepository.save(fileAttachment);
		}
	}
	public Page<Team> getTeames(Pageable page) {
		return teamRepository.findAll(page);
	}
	public Page<Team> getTeamesOfUser(String username, Pageable page) {
		User inDB = userService.getByUsername(username);
		return teamRepository.findByUser(inDB, page);
	}
	public Page<Team> getOldTeames(long id, String username, Pageable page) {
		Specification<Team> specification = idLessThan(id);
		if(username != null) {
			User inDB = userService.getByUsername(username);
			specification = specification.and(userIs(inDB));
		}
		return teamRepository.findAll(specification, page);
	}
	public long getNewTeamesCount(long id, String username) {
		Specification<Team> specification = idGreaterThan(id);
		if(username != null) {
			User inDB = userService.getByUsername(username);
			specification = specification.and(userIs(inDB));
		}
		return teamRepository.count(specification);
	}
	public List<Team> getNewTeames(long id, String username, Sort sort) {
		Specification<Team> specification = idGreaterThan(id);
		if(username != null) {
			User inDB = userService.getByUsername(username);
			specification = specification.and(userIs(inDB));
		}
		return teamRepository.findAll(specification, sort);
	}
	
	
	Specification<Team> idLessThan(long id){
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.lessThan(root.get("id"), id);
		};
	}
	
	Specification<Team> userIs(User user){
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.equal(root.get("user"), user);
		};
	}
	
	Specification<Team> idGreaterThan(long id){
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.greaterThan(root.get("id"), id);
		};
	}
	public void delete(long id) {
		Team inDB = teamRepository.getOne(id);
		if(inDB.getFileAttachment() != null) {
			String fileName = inDB.getFileAttachment().getName();
			fileService.deleteAttachmentFile(fileName);
		}
		teamRepository.deleteById(id);
	}

}