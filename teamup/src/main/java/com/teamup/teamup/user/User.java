package com.teamup.teamup.user;

import java.util.Collection;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import com.teamup.teamup.auth.Token;
import com.teamup.teamup.team.Team;

import jakarta.persistence.GenerationType;

import lombok.Data;

@Data
@Entity
@Table(name="users")
public class User implements UserDetails{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -8421768845853099274L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull(message="{teamup.constraint.username.NotNull.message}")
	@Size(min = 4, max=255)
	@UniqueUsername
	private String username;

	@NotNull
	@Size(min = 4, max=255)
	private String displayName;

	@NotNull
	@Size(min = 8, max=255)
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message="{hoaxify.constrain.password.Pattern.message}")
	private String password;

	private String image;
	
	@OneToMany(mappedBy="user", cascade=CascadeType.REMOVE)
	private List<Team> teames;
	
	@OneToMany(mappedBy="user", cascade=CascadeType.REMOVE)
	private List<Token> tokens;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return AuthorityUtils.createAuthorityList("Role_user");
	}
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	@Override
	public boolean isEnabled() {
		return true;
	}
	
}
