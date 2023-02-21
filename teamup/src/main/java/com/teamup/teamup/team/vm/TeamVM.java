package com.teamup.teamup.team.vm;

import com.teamup.teamup.file.vm.FileAttachmentVM;
import com.teamup.teamup.team.Team;
import com.teamup.teamup.user.vm.UserVM;

import lombok.Data;

@Data
public class TeamVM {
	
	private long id;

	private String content;

	private long timestamp;

	private UserVM user;
	
	private FileAttachmentVM fileAttachment;

	public TeamVM(Team team) {
		this.setId(team.getId());
		this.setContent(team.getContent());
		this.setTimestamp(team.getTimestamp().getTime());
		this.setUser(new UserVM(team.getUser()));
		if(team.getFileAttachment() != null) {
			this.fileAttachment = new FileAttachmentVM(team.getFileAttachment());
		}
	}
}
