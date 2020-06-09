
const sheetBody = document.find('.table-wrapper table tbody')[0];
const sheet = new Sheet( sheetBody );


// 검색창 관련 코드들
const searchWrapper = document.find('#search')[0];
const searchInput = document.find('#search_input')[0];
const searchResult = document.find('#search-item')[0];
const showSearchResult = _ => searchResult.classList.add('show');
const hideSearchResult = ({ relatedTarget }) => {
  if( !searchWrapper.contains( relatedTarget )) {
    searchResult.classList.remove('show');
  }
};
const focusSearchInput = ({ keyCode }) => {
  if( isPrintableKeyCode( keyCode )) {
    searchInput.focus();
  }
};
const autoComplete = e => {
  // const datas = search( e.target.value );
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
  
  let elements = '';
  for( let data of datas ) {
    const isAdded = sheet.hasItem( data.id ) ? 'added' : '';
    elements += `
      <li class="${isAdded} focus-row" data-item-id="${data.id}">
          <div class="image-wrapper">
              <img src="acnhcdn사이트/${data.variants[0].file_id}" alt="${data.name_kr} 사진">
          </div>
          <div class="text-wrapper">
              <button>
                  <span class="kr">${data.name_kr}</span>
                  <span class="en text small light">${data.name_en}</span>
              </button>
          </div>
      </li>`;
  }
  searchResult.innerHTML = elements;
};
const addOrRemoveItemToSheet = ({ key, target }) => {
  console.log(e)
  if( key.toLowerCase() == 'enter' ) {
    const li = target.findParentByClass('focus-row');
    const itemId = li.dataset.itemId;
    
    if( sheetItems[itemId] ) {
      
    }
  }
};
searchInput.addEventListener('focus', showSearchResult );
searchWrapper.addEventListener('focusout', hideSearchResult );
searchWrapper.addEventListener('keydown', focusSearchInput );
searchWrapper.addEventListener('input', autoComplete );
searchWrapper.addEventListener('keydown', addOrRemoveItemToSheet );


// 필터창 관련 코드들
const filter = document.find('#filter')[0];
const showFilterButton = filter.find('.show-list')[0];
const applicableFilters = document.find('#applicable-filters')[0];
const showApplicableFilters = _ => applicableFilters.classList.add('show');
const hideApplicableFilters = ({ relatedTarget }) => {
  if( !filter.contains( relatedTarget )) {
    applicableFilters.classList.remove('show');
  }
};
showFilterButton.addEventListener('focus', showApplicableFilters );
filter.addEventListener('focusout', hideApplicableFilters );


// 시트 클릭 이벤트
sheetBody.addEventListener('click', ({ target, path }) => {
  let pressedButton = false;
  for( let elem of path ) {
    
    if( elem.tagName === 'BUTTON' ) {
      pressedButton = true;
    }

    if( elem.tagName?.match(/^TH|^TD/) ) {
      if( pressedButton ) {
        console.log(target, elem.className )
      }
    }
  }
});


// 방향키로 포커스 이동
const focusManager = new FocusManager();
focusManager.watchMutation( filter );
focusManager.watchMutation( searchWrapper );
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
  return keyCode == 32 || keyCode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
    (keyCode > 47 && keyCode < 58)   || // number keys
    (keyCode > 64 && keyCode < 91)   || // letter keys
    (keyCode > 95 && keyCode < 112)  || // numpad keys
    (keyCode > 185 && keyCode < 193) || // ;=,-./` (in order)
    (keyCode > 218 && keyCode < 223);   // [\]' (in order)
}
