function init() {

  const findFunction = function( query ) {
    return this.querySelectorAll( query );
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
    if( isBodyElement(this) ) {
      return this;
    }
    let parent = this.parentElement;
    while( !isBodyElement( parent ) && !parent.hasClass( cls ) ) {
      parent = parent.parentElement;
    }
    return parent;
  };
}
init();

function isBodyElement(e) {
  return e.tagName == document.find('body')[0].tagName;
}