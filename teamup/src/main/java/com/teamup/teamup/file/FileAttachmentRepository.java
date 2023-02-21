package com.teamup.teamup.file;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamup.teamup.user.User;

public interface FileAttachmentRepository extends JpaRepository<FileAttachment, Long>{
	
	List<FileAttachment> findByDateBeforeAndTeamIsNull(Date date);

	List<FileAttachment> findByTeamUser(User user);
}
