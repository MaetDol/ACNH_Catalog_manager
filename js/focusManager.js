class FocusManager {

  constructor() {
    this.ROW_CLASS = 'focus-row'  
    this.updateFocusableCollection();
    this.observer = new MutationObserver( (() => this.updateFocusableCollection()).bind(this) );
  }

  watchMutation( elem, option = {
      subtree: true,
      childList: true,
      attributes: true
    }) {
      this.observer.observe( elem, option );
  }

  updateFocusableCollection( elem=document.find('body') ) {
    this.focusableElements = this.getFocusableElements( elem );
    this.rowElements = Array.from( elem.find(`.${this.ROW_CLASS}`));
  }

  getFocusableElements( elem ) {
    return Array.from( elem.findAll('*'))
      .filter( e=> e.tabIndex != -1 && e.offsetParent !== null );
  }

  moveUp() {
    const lastIndex = this.rowElements.length - 1;
    this.moveToAdjacentRow( -1, val => val >= 0 ? val : lastIndex );
  }

  moveDown() {
    const rowElementsLength = this.rowElements.length;
    this.moveToAdjacentRow( 1, val => val >= rowElementsLength ? 0 : val );
  }

  moveToAdjacentRow( vector, toInRange ) {
    const focusedElement = this.getFocusedElement();
    const rowElement = focusedElement.findParentByClass( this.ROW_CLASS );
    if( isBodyElement( rowElement ) || isBodyElement( focusedElement )) {
      return this.moveToAdjacentElement( vector )
    }

    const currentRowIndex = this.rowElements.indexOf( rowElement );
    const isOriginRow = row => rowElement == row;
    const isEmptyRow = row => row.length === 0;
    let nextRowIndex = toInRange( currentRowIndex + vector );
    let nextRow = this.rowElements[ nextRowIndex ];
    let nextRowsFocusables = this.getFocusableElements( nextRow );
    
    while( isEmptyRow( nextRowsFocusables ) 
        && !isOriginRow( nextRow )) {
      nextRowIndex = toInRange( nextRowIndex + vector );
      nextRow = this.rowElements[ nextRowIndex ];
      nextRowsFocusables = this.getFocusableElements( nextRow );
    }
    const currentRowsFocusable = this.getFocusableElements( rowElement );
    const currentIndex = currentRowsFocusable.indexOf( focusedElement ) - vector;

    this.getNextFocusableElement({
      currentIndex: currentIndex,
      searchList: nextRowsFocusables,
      vector
    }).focus();

  }

  moveLeft() {
    const lastIndex = this.focusableElements.length -1;
    this.moveToAdjacentElement(-1);
  }
  
  moveRight() {
    const focusableElementsLength = this.focusableElements.length;
    this.moveToAdjacentElement(1);
  }

  moveToAdjacentElement( vector ) {

    this.getNextFocusableElement({
      currentIndex: this.getFocusedIndex(),
      searchList: this.focusableElements,
      vector
    }).focus();
  }

  getNextFocusableElement({ currentIndex, searchList, vector }) { 
    const toInRange = v => (v + searchList.length) % searchList.length;
    currentIndex = toInRange( currentIndex );
    let nextIndex = toInRange( currentIndex + vector );
    
    return searchList[ nextIndex ];
  }

  getFocusedElement() {
    return document.activeElement;
  }

  getFocusedIndex() {
    return this
      .focusableElements
      .indexOf( document.activeElement );
  }

}


// export { FocusManager };