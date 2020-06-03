package com.kroject.acnh.service;

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