class FocusManager {

  constructor() {
    
    this.ROW_CLASS = 'focus-row'
    this.blurEvents = [];
    this.focusEvents = [];
    this.lastActivedElement = null;

    this.updateFocusableCollection();
  }

  addEventListener({ target, callback, event }) {

  }

  addWatchElasticElement() {

  }

  updateFocusableCollection( elem=document.find('body') ) {
    this.focusableElements = this.getFocusableElements( elem );
    this.rowElements = Array.from( elem.find(`.${this.ROW_CLASS}`));
  }

  getFocusableElements( elem ) {
    return Array.from( elem.find('*'))
      .filter( e=> e.tabIndex != -1 );
  }

  moveUp() {

  }

  moveDown() {
    const focusableElementsLength = this.focusableElements.length;
    this.moveToAdjacentRow( 1, val => val % focusableElementsLength );
  }

  moveToAdjacentRow( vector, toInRange ) {
    const focusedElement = this.getFocusedElement();
    const rowElement = focusedElement.findParentByClass( this.ROW_CLASS );
    if( isBodyElement(rowElement) ) {
      this.moveRight();
      return;
    }

    const currentRowIndex = this.rowElements.indexOf( rowElement );
    let nextRowIndex = currentRowIndex + vector;
    nextRowIndex = nextRowIndex > this.rowElements.length ? 0 : nextRowIndex;
    const nextRow = this.rowElements[ nextRowIndex ];
    const focusableElements = this.getFocusableElements( nextRow );

    const target = this.getNextFocusableElement({
      currentElement: focusableElements[ focusableElements.length -1 ],
      searchList: focusableElements,
      vector,
      toInRange
    });
    target.focus();

  }

  moveLeft() {
    const lastIndex = this.focusableElements.length -1;
    this.moveToAdjacentElement( -1, val => val >= 0 ? val : lastIndex );
  }
  
  moveRight() {
    const focusableElementsLength = this.focusableElements.length;
    this.moveToAdjacentElement( 1, val => val % focusableElementsLength );
  }

  moveToAdjacentElement( vector, toInRange ) {

    const target = this.getNextFocusableElement({
      currentElement: this.getFocusedElement(),
      searchList: this.focusableElements,
      vector, 
      toInRange
    });
    target.focus();
  }

  getNextFocusableElement({ currentElement, searchList, vector, toInRange }) {
    const currentIndex = searchList.indexOf( currentElement );
    let nextIndex = toInRange( currentIndex + vector );
    
    const isOriginTarget = () => nextIndex == currentIndex;
    const isDisplay = () => searchList[ nextIndex ].offsetParent !== null;

    while( !isDisplay() && !isOriginTarget() ) {
      nextIndex = toInRange( nextIndex + vector );
    }
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


// export {  FocusManager };