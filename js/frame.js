function init() {

  const findFunction = function( query ) {
    return this.querySelectorAll( query );
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
