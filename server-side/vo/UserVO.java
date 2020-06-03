package com.kroject.acnh.domain;

import java.sql.Timestamp;

public class UserVO {
    
    private String id;
    private String password;
    private Integer permission;
    private Timestamp sign_up_date;
    
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Integer getPermission() {
		return permission;
	}
	public void setPermission(Integer permission) {
		this.permission = permission;
	}
	public Timestamp getSign_up_date() {
		return sign_up_date;
	}
	public void setSign_up_date(Timestamp sign_up_date) {
		this.sign_up_date = sign_up_date;
	}
    
}