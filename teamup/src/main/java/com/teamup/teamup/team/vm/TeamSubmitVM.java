package com.teamup.teamup.team.vm;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TeamSubmitVM {

	@Size(min=1, max=1000)
	private String content;
	
	private long attachmentId;
	
}
