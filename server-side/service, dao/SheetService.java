package com.kroject.acnh.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.kroject.acnh.domain.ItemVO;
import com.kroject.acnh.domain.RowItemVariantVO;
import com.kroject.acnh.domain.RowVO;
import com.kroject.acnh.domain.UserSheetVO;
import com.kroject.acnh.persistence.ItemDAO;
import com.kroject.acnh.persistence.RowDAO;
import com.kroject.acnh.persistence.SheetDAO;

@Service
public class SheetService {

    @Inject
    private SheetDAO sheetDao;

    @Inject
    private RowDAO rowDao;

    @Inject
    private ItemDAO itemDao;

    public UserSheetVO getSpecificSheet( Integer sheetId ) {
        
        UserSheetVO userSheet = new UserSheetVO();
        List<RowVO> rows = rowDao.selectSheetRows( sheetId );

        for( RowVO row : rows ) {
            final ItemVO item = itemDao.selectItem( row.getItem_id() );
            userSheet.addItem( item );
    
            final List<RowItemVariantVO> variants = 
                rowDao.selectRowItemVariants( row.getId() );
            userSheet.addVariants( variants );
        }

        userSheet.setSheet( sheetDao.selectSheet( sheetId ));
        userSheet.setRows( rows );
        return userSheet;
    }
}