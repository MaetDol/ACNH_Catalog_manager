package com.kroject.acnh.service;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.kroject.acnh.domain.ItemVO;
import com.kroject.acnh.persistence.ItemDAO;

@Service
public class ItemService {
	
	@Inject
	private ItemDAO itemDao;
	
	public void addItemWithInfo( ItemVO itemVo ) {
//		Ʈ�����? Ʈ����ų�? ������ �ѹ��� �����ϰԲ� �����ִ°� �װ� ����ұ�?
//		������ �μ�Ʈ�� �ش� ������ ID�� ��ȯ���ش�.
//		variants ���Խ� mybatis���� foreach��� ����
	}
}
