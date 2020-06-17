function init() {

  const findFunction = function( query ) {
    return this.querySelector( query );
  }
  const findAllFunction = function( query ) {
    return this.querySelectorAll( query );
  };
  const hasClass = function( cls ) { return this.classList.contains( cls )};
  const findParentByClass = function( cls ) {
    let parent = this.parentElement;
    while( parent?.classList && !parent.hasClass( cls )) {
      parent = parent.parentElement;
    }
    return parent;
  };

  const targetObjects = [
    Document, HTMLElement, DocumentFragment,
  ];
  targetObjects.forEach( obj => {
    obj.prototype.find = findFunction;
    obj.prototype.findAll = findAllFunction;
    obj.prototype.findParentByClass = findParentByClass;
    obj.prototype.hasClass = hasClass;
  });
  
}
init();

function isBodyElement(e) {
  return e.tagName == document.find('body').tagName;
}

function binarySearch( list, id, getNearIndex ) {
  if( !list.length ) {
    return 0;
  }

  const getPivot = ( start, end ) => start + Math.floor( (end - start) / 2 );
  let end = list.length -1;
  let start = 0;
  let pivot = getPivot( start, end );

  while( end >= start ) {
    const compareId = list[pivot];
    if( compareId === id ) {
      return pivot;
    } else if( compareId > id ) {
      end = pivot-1;
      pivot = getPivot( start, end );
    } else {
      start = pivot+1;
      pivot = getPivot( start, end );
    }
  }

  if( getNearIndex ) {
    return getPivot( start, end );
  }
  return -1;
}

function findByQuery (list, query) {
  for( let e of list ) {
    if( query(e) ) {
      return e;
    }
  }
  return null;
}

function findByTagName (list, tagName) {
  return findByQuery( list, e => e.tagName === tagName );
}

function findByClassName (list, cls) {
  return findByQuery( list, e => e.classList && e.hasClass(cls) );
}