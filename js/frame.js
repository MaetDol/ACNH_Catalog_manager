function init() {

  const findFunction = function( query ) {
    const elems = this.querySelectorAll( query );
    return elems.length === 1 ? elems[0] : elems;
  }

  Document.prototype.find = findFunction;
  HTMLElement.prototype.find = findFunction;
  HTMLElement.prototype.toggleClass = function (str) {
    let on = true;
    if( this.classList.contains( str )) {
      this.classList.remove(str)
      on = false;
    } else {
      this.classList.add(str);
    }
    return on;
  }
}
init();
