function init() {

  const findFunction = function( query ) {
    const elems = this.querySelectorAll( query );
    return elems.length === 1 ? elems[0] : elems;
  };

  Document.prototype.find = findFunction;
  HTMLElement.prototype.find = findFunction;
  HTMLElement.prototype.toggleClass = function( str ) {
    let on = true;
    if( this.classList.contains( str )) {
      this.classList.remove(str)
      on = false;
    } else {
      this.classList.add(str);
    }
    return on;
  };

  HTMLElement.prototype.hasClass = function( cls ) { return this.classList.contains( cls )};
  HTMLElement.prototype.findParentByClass = function( cls ) {

    let parent = this.parentElement;
    while( !isBodyElement( parent ) && !parent.hasClass( cls ) ) {
      parent = parent.parentElement;
    }
    return parent;
  };
}
init();

function isBodyElement(e) {
  return e.tagName == document.find('body').tagName;
}