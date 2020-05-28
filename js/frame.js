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

function createElement({tag, textContent, htmlContent, classes, id}) {
  let elem = document.createElement(tag);
  if( htmlContent ) {
    elem.innerHTML = htmlContent;
  }
  if( textContent ) {
    textContent.split('\n').map( t => elem.append( new Text(t) ));
  }
  if( id ) {
    elem.setAttribute('id', id);
  }
  if( classes ) {
    elem.className = classes.join(' ');
  }
  return elem;
}