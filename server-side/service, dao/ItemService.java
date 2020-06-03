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
//		트랜잭션? 트랜잭셔널? 쿼리문 한번에 성공하게끔 도와주는거 그거 사용할까?
//		아이템 인서트시 해당 아이템 ID를 반환해준다.
//		variants 삽입시 mybatis에서 foreach사용 검토
	}
}
