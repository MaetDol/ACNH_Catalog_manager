package com.kroject.acnh.domain;

public class RowVO {

    private Integer id;
    private Boolean is_complete;
    private Boolean is_deleted;
    private Integer sheet_id;
    private Integer item_id;
    
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Boolean getIs_complete() {
		return is_complete;
	}
	public void setIs_complete(Boolean is_complete) {
		this.is_complete = is_complete;
	}
	public Boolean getIs_deleted() {
		return is_deleted;
	}
	public void setIs_deleted(Boolean is_deleted) {
		this.is_deleted = is_deleted;
	}
	public Integer getSheet_id() {
		return sheet_id;
	}
	public void setSheet_id(Integer sheet_id) {
		this.sheet_id = sheet_id;
	}
	public Integer getItem_id() {
		return item_id;
	}
	public void setItem_id(Integer item_id) {
		this.item_id = item_id;
	}

}