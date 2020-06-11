package com.kroject.acnh.domain;

public class VariantVO {

    private Integer id;
    private String color_en;
    private String color_kr;
    private String file_id;
    private Integer item_id;

	// Row item variant data
	private RowItemVariantVO rowItemVariantVo;
    
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getColor_en() {
		return color_en;
	}
	public void setColor_en(String color_en) {
		this.color_en = color_en;
	}
	public String getColor_kr() {
		return color_kr;
	}
	public void setColor_kr(String color_kr) {
		this.color_kr = color_kr;
	}
	public String getFile_id() {
		return file_id;
	}
	public void setFile_id(String file_id) {
		this.file_id = file_id;
	}
	public Integer getItem_id() {
		return item_id;
	}
	public void setItem_id(Integer item_id) {
		this.item_id = item_id;
	}

}