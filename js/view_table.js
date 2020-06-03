
const onFocusCallbacks = [];
const applicableFilters = document.find('#applicable-filters');

const searchWrapper = document.find('#search');
const searchInput = document.find('#search_input');
const searchResult = document.find('#search-item');
const showSearchResult = _ => searchResult.classList.add('show');
const hideSearchResult = _ => searchResult.classList.remove('show');

searchInput.addEventListener('focus', showSearchResult );
searchWrapper.addEventListener('keydown', ({ keyCode }) => {
  if( isPrintableKeyCode( keyCode )) {
    searchInput.focus();
  }
});

// 방향키로 포커스 이동
window.addEventListener('keydown', ({key}) => {
  switch( key ) {
    case 'ArrowLeft':
    case 'ArrowUp':
      break;
    case 'ArrowRight':
    case 'ArrowDown':
      break;
  }
});

function isPrintableKeyCode( keyCode ) {
  // Reference: https://stackoverflow.com/a/12467610
  return keyCode == 32 || keyCode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
    (keyCode > 47 && keyCode < 58)   || // number keys
    (keyCode > 64 && keyCode < 91)   || // letter keys
    (keyCode > 95 && keyCode < 112)  || // numpad keys
    (keyCode > 185 && keyCode < 193) || // ;=,-./` (in order)
    (keyCode > 218 && keyCode < 223);   // [\]' (in order)
}
