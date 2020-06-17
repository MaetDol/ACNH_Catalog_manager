
const sheetBody = document.find('.table-wrapper table tbody');
const sheet = new Sheet( sheetBody );

const filterWrapper = document.find('#filter');
const filter = new Filter({ filterWrapper, sheet });

const searchWrapper = document.find('#search');
const search = new Search({ searchWrapper, sheet });


// 시트 클릭 이벤트
sheetBody.addEventListener('click', e => {
  const {tdClass, item} = getRowInfo( e );
  if( !tdClass ) {
    return;
  }

  let state;
  switch( tdClass ) {
    case 'complete-stamp':
      state = item.row.is_complete;
      sheet.setCompleteRow( item.id, !state );
      break;
    case 'variations':
      const li = findByTagName( e.path, 'LI');
      const variantId = Number( li.dataset.variantId );
      const variant = sheet.getVariant( item, variantId );
      state = variant.is_owned;
      sheet.setVariant( item.id, variantId, !state );
      break;
    case 'delete':
      sheet.removeItem( item.id );
      break;
  }
});
function getRowInfo({ path }) {
  const clickedButton = findByTagName( path, 'BUTTON');
  if( !clickedButton ) {
    return {};
  }

  const td = findByTagName( path, 'TD');
  const tdClass = td.className;
  const itemId = Number( td.parentElement.dataset.itemId );
  const item = sheet.getItem( itemId );
  return { tdClass, item };
};

// 방향키로 포커스 이동
const focusManager = new FocusManager();
focusManager.watchMutation( filterWrapper );
focusManager.watchMutation( searchWrapper );
focusManager.watchMutation( sheetBody );
window.addEventListener('keydown', ({ key }) => {
  switch( key ) {
    case 'ArrowLeft':
      focusManager.moveLeft();
      break;
    case 'ArrowUp':
      focusManager.moveUp();
      break;
    case 'ArrowRight':
      focusManager.moveRight();
      break;
    case 'ArrowDown':
      focusManager.moveDown();
      break;
  }
});

async function fetchSearch( keyword ) {
  // 첫번째 검색 결과를 이용해서 클라이언트측에서 검색?
  return await fetch(`/search/${keyword}`).json();
}

