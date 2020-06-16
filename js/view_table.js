
const sheetBody = document.find('.table-wrapper table tbody');
const sheet = new Sheet( sheetBody );


// 검색창 관련 코드들
const searchWrapper = document.find('#search');
const searchInput = document.find('#search_input');
const searchResult = document.find('#search-item');
const showSearchResult = _ => searchResult.classList.add('show');
const hideSearchResult = (e) => {
  if( !searchWrapper.contains( e.relatedTarget )) {
    searchResult.classList.remove('show');
  }
};
const focusSearchInput = ({ keyCode }) => {
  if( isPrintableKeyCode( keyCode )) {
    searchInput.focus();
  }
};
const autoComplete = e => {
  // const datas = await search( e.target.value );
  const datas = [
    {
      id: 132,
      name_en: 'English name!',
      name_kr: '한국 명칭!',
      preview_variant_id: '34sd4sQAaP',
      tags: [
        {
          id:1,
          category: 'Source',
          content: '너굴 상점'
        }, {
          id:2,
          category: 'HHA Concept',
          content: '야외 가구'
        },
      ],
      variants: [
        {
          id: 1,
          color_en: 'white',
          color_kr: '화이트',
          file_id: '34sd4sQAaP0_1',
          item_id: 132
        }, {
          id: 2,
          color_en: 'yellow',
          color_kr: '노랑',
          file_id: '34sd4sQAaP0_2',
          item_id: 132
        }
      ]
    }, {
      id: 136,
      name_en: 'Some cute name!',
      name_kr: '뀨잉!',
      preview_variant_id: 'aqwssA0_1',
      tags: [
        {
          id:1,
          category: 'Source',
          content: '너굴 상점'
        }, {
          id:3,
          category: 'HHA Concept',
          content: '큐트'
        },
      ],
      variants: [
        {
          id: 3,
          color_en: 'white',
          color_kr: '화이트',
          file_id: 'aqwssA0_1',
          item_id: 136
        }, {
          id: 4,
          color_en: 'yellow',
          color_kr: '노랑',
          file_id: 'aqwssA0_2',
          item_id: 136
        }
      ]
    },
  ];
  
  // Replace to Template tag
  let elements = [];
  for( let data of datas ) {
    const itemTemplate = document.find('#searchDropdownItem').content;
    const li = itemTemplate.cloneNode( true ).find('li');
    
    const isAdded = sheet.hasItem( data.id );
    if( isAdded ) {
      li.classList.add('added');
    }
    li.dataset.id = data.id;

    const img = li.find('img');
    img.src = sheet.ACNH_IMAGE_CDN + data.variants[0].file_id;
    img.alt = data.name_kr;

    li.find('.kr').textContent = data.name_kr;
    li.find('.en').textContent = data.name_en;

    elements.push(li);
  }
  searchResult.innerHTML = '';
  elements.forEach( e => searchResult.appendChild(e) );
};
const addOrRemoveItemToSheet = ({ target, path }) => {
  const li = findByTagName( path, 'LI');
  if( li === null ) {
    return;
  }
  
  const itemId = li.dataset.itemId;
  const item = sheet.getItem( itemId );
  const hasItem = sheet.hasItem( itemId );
};
searchInput.addEventListener('focus', showSearchResult );
searchWrapper.addEventListener('focusout', hideSearchResult );
searchWrapper.addEventListener('click', addOrRemoveItemToSheet );
searchWrapper.addEventListener('keydown', focusSearchInput );
searchWrapper.addEventListener('input', autoComplete );

// 필터창 관련 코드들
const filter = document.find('#filter');
const showFilterButton = filter.find('.show-list');
const applicableFilters = document.find('#applicable-filters');
const showApplicableFilters = _ => applicableFilters.classList.add('show');
const hideApplicableFilters = ({ relatedTarget }) => {
  if( !filter.contains( relatedTarget )) {
    applicableFilters.classList.remove('show');
  }
};
showFilterButton.addEventListener('focus', showApplicableFilters );
filter.addEventListener('focusout', hideApplicableFilters );


// 시트 클릭 이벤트
const findByQuery = (list, query) => {
  for( let e of list ) {
    if( query(e) ) {
      return e;
    }
  }
  return null;
};
const findByTagName = (list, tagName) => {
  return findByQuery( list, e => e.tagName === tagName );
};
const findByClassName = (list, cls) => {
  return findByQuery( list, e => e.classList && e.hasClass(cls) );
};
const getRowInfo = ({ path }) => {
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


// 방향키로 포커스 이동
const focusManager = new FocusManager();
focusManager.watchMutation( filter );
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

async function search( keyword ) {
  // 첫번째 검색 결과를 이용해서 클라이언트측에서 검색?
  return await fetch(`/search/${keyword}`).json();
}

function isPrintableKeyCode( keyCode ) {
  // Reference: https://stackoverflow.com/a/12467610
  return(keyCode > 47 && keyCode < 58)   || // number keys
    (keyCode > 64 && keyCode < 91)   || // letter keys
    (keyCode > 95 && keyCode < 112)  || // numpad keys
    (keyCode > 185 && keyCode < 193) || // ;=,-./` (in order)
    (keyCode > 218 && keyCode < 223);   // [\]' (in order)
}
