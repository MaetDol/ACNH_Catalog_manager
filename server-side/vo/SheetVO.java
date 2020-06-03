package com.kroject.acnh.domain;

public class SheetVO {

    private Integer id;
    private String user_id;
    private String title;
    private Integer view;
    private Boolean is_need_update;
    
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Integer getView() {
		return view;
	}
	public void setView(Integer view) {
		this.view = view;
	}
	public Boolean getIs_need_update() {
		return is_need_update;
	}
	public void setIs_need_update(Boolean is_need_update) {
		this.is_need_update = is_need_update;
	}

}