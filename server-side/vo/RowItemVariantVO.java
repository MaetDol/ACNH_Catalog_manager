package com.kroject.acnh.domain;

public class RowItemVariantVO {
    
    private Integer id;
    private Boolean is_owned;
    private Integer row_id;
    private Integer variant_id;
    
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Boolean getIs_owned() {
		return is_owned;
	}
	public void setIs_owned(Boolean is_owned) {
		this.is_owned = is_owned;
	}
	public Integer getRow_id() {
		return row_id;
	}
	public void setRow_id(Integer row_id) {
		this.row_id = row_id;
	}
	public Integer getVariant_id() {
		return variant_id;
	}
	public void setVariant_id(Integer variant_id) {
		this.variant_id = variant_id;
	}
}