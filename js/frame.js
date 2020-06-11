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