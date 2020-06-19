const createTagButton = document.find('#add-tag');
const createVariantbutotn = document.find('#add-variant');

createTagButton.addEventListener('click', _=> {
  const node = cloneTemplate('tag-template');
  document.find('#tags ol').append( node );
});

createVariantbutotn.addEventListener('click', _=> {
  const inputWrapper = document.find('#variant-input');
  const node = cloneTemplate('variant-template', ({prop, name}) => {
    prop.value = inputWrapper.find(`#${name}`).value;
  });
  document.find('#variants').append( node );
});

function cloneTemplate( id, propSetter=_=>0 ) {
  const template = document.find(`#${id}` );
  let nodeCount = Number( template.dataset.count );
  
  const node = template.content.cloneNode( true ).find('li');
  const type = node.dataset.type;
  const properties = node.children;
  for( const prop of properties ) {
    const name = prop.dataset.property;
    if( !name ) {
      continue;
    }
    prop.name = `${type}[${nodeCount}].${name}`;
    propSetter({ node, type, prop, name });
  }
  template.dataset.count = nodeCount +1;
  return node;
}