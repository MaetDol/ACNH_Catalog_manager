package com.kroject.acnh.persistence;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.kroject.acnh.domain.SheetVO;

@Repository
public class SheetDAO {

    @Inject
    private SqlSession sqlSession;

    private static final String namespace = "";

	public SheetVO selectSheet(Integer sheetId) {
		// TODO Auto-generated method stub
		return null;
	}
}