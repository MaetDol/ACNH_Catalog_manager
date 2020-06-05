
const searchWrapper = document.find('#search')[0];
const searchInput = document.find('#search_input')[0];
const searchResult = document.find('#search-item')[0];
const showSearchResult = _ => searchResult.classList.add('show');
const hideSearchResult = ({ relatedTarget }) => {
  if( !searchWrapper.contains( relatedTarget )) {
    searchResult.classList.remove('show');
  }
};
searchInput.addEventListener('focus', showSearchResult );
searchWrapper.addEventListener('focusout', hideSearchResult );
searchWrapper.addEventListener('keydown', ({ keyCode }) => {
  if( isPrintableKeyCode( keyCode )) {
    searchInput.focus();
  }
});


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

// 방향키로 포커스 이동
const focusManager = new FocusManager();
focusManager.watchMutation( filter );
focusManager.watchMutation( searchWrapper );
window.addEventListener('keydown', ({key}) => {
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

function isPrintableKeyCode( keyCode ) {
  // Reference: https://stackoverflow.com/a/12467610
  return keyCode == 32 || keyCode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
    (keyCode > 47 && keyCode < 58)   || // number keys
    (keyCode > 64 && keyCode < 91)   || // letter keys
    (keyCode > 95 && keyCode < 112)  || // numpad keys
    (keyCode > 185 && keyCode < 193) || // ;=,-./` (in order)
    (keyCode > 218 && keyCode < 223);   // [\]' (in order)
}
