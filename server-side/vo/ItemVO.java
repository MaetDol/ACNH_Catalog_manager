package com.kroject.acnh.domain;

import java.util.List;

public class ItemVO {
    
//	Item table
    private Integer id;
    private String name_en;
    private String name_kr;
    private Integer preview_variant_id;
    
//  Relative Informations
    private List<TagVO> tags;
    private List<VariantVO> variants;
    
	public List<TagVO> getTags() {
		return tags;
	}
	public void setTags(List<TagVO> tags) {
		this.tags = tags;
	}
	public List<VariantVO> getVariants() {
		return variants;
	}
	public void setVariants(List<VariantVO> variants) {
		this.variants = variants;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName_en() {
		return name_en;
	}
	public void setName_en(String name_en) {
		this.name_en = name_en;
	}
	public String getName_kr() {
		return name_kr;
	}
	public void setName_kr(String name_kr) {
		this.name_kr = name_kr;
	}
	public Integer getPreview_variant_id() {
		return preview_variant_id;
	}
	public void setPreview_variant_id(Integer preview_variant_id) {
		this.preview_variant_id = preview_variant_id;
	}

    
}