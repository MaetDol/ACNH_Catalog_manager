package com.kroject.acnh.domain;

import java.util.List;

public class UserSheetVO {
    
    private SheetVO sheet;
    private List<RowVO> rows;
    private List<ItemVO> items;
    private List<TagVO> tags;
    private List<List<RowItemVariantVO>> rowItemVariants;
    
	public SheetVO getSheet() {
		return sheet;
	}
	public void setSheet(SheetVO sheet) {
		this.sheet = sheet;
	}
	public List<RowVO> getRows() {
		return rows;
	}
	public void setRows(List<RowVO> rows) {
		this.rows = rows;
	}
	public List<ItemVO> getItem() {
		return items;
	}
	public void setItem(List<ItemVO> item) {
		this.items = item;
	}
	public List<TagVO> getTags() {
		return tags;
	}
	public void setTags(List<TagVO> tags) {
		this.tags = tags;
	}
	public List<List<RowItemVariantVO>> getRowItemVariants() {
		return rowItemVariants;
	}
	public void setRowItemVariants(List<List<RowItemVariantVO>> rowItemVariants) {
		this.rowItemVariants = rowItemVariants;
	}
	
	
	
	public void addVariants(List<RowItemVariantVO> variants) {
		this.rowItemVariants.add( variants );
	}
	public void addItem(ItemVO item) {
		this.items.add( item );
	}
    
}