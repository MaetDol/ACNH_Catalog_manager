class Sheet {
  
  constructor( element ) {
    this.ACNH_IMAGE_CDN = 'https://acnhcdn.com/latest/FtrIcon/';
    this.sheet = element;
    this.datas = [];
  }
  
  addItem( item ) {

    const rowNode = 
      document.find('#sheetRow')
        .content
        .cloneNode( true )
        .find('tr');
    rowNode.dataset.itemId = item.id;
    
    const furniture = rowNode.find('.furniture-name');
    furniture.find('.kr').textContent = item.name_kr;
    furniture.find('.en').textContent = item.name_en;

    const previewImage = furniture.find('img');
    previewImage.src = this.ACNH_IMAGE_CDN + item.variants[0].file_id + '.png';
    previewImage.alt = `${item.name_kr} 사진`;
    
    const variantUl = rowNode.find('.variations ul');
    const variantTemplate = document.find('#variantItem').content;
    for( let variant of item.variants ) {

      const variantElement = 
        variantTemplate
        .cloneNode( true )
        .find('li');
      variantElement.dataset.variantId = variant.id;
      variantElement.find('.color-name').textContent = variant.color_kr;

      const variantImage = variantElement.find('img');
      variantImage.src = this.ACNH_IMAGE_CDN + variant.file_id + '.png';
      variantImage.alt = variant.color_kr;

      variantUl.append( variantElement );
    }

    const prevIndex = this.indexOfItem( item.id, true );
    item.row_element = rowNode;
    this.datas.splice( prevIndex+1, 0, item );

    // datas 순서에 맞게 삽입해야 할까?
    this.sheet.append( rowNode );
  }

  removeItem( id ) {
    const item = this.getItem( id );
    const rowElement = item.row_element;
    rowElement.remove();
    this.datas.splice( id, 1 );
  }

  hasItem( id ) {
    return this.indexOfItem( id ) !== -1;
  }

  getItem( id ) {
    const index = this.indexOfItem( id );
    return this.datas[index];
  }

  indexOfItem( id, getNearIndex ) {
    return this.indexOfId( this.datas, id, getNearIndex );
  }

  indexOfVariant( item, id ) {
    return this.indexOfId( item.variants, id );
  }

  indexOfId( list, id, getNearIndex ) {
    if( !list.length ) {
      return 0;
    }

    const getPivot = ( start, end ) => start + Math.floor( (end - start) / 2 );
    let end = list.length -1;
    let start = 0;
    let pivot = getPivot( start, end );

    while( end >= start ) {
      const compareId = list[pivot].id;
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

  setVariant( itemId, variantId, state ) {
    const item = this.getItem( itemId );
    const index = this.indexOfVariant( item, variantId );
    const variant = item.variants[index];
    
    variant.is_owned = state;
    const variantElement = item.row_element.find(`[data-variant-id="${variantId}"]`);
    if( state ) {
      variantElement.classList.add('has');
    } else {
      variantElement.classList.remove('has');
    }
    
    const completeState = this.isComplete( itemId );
    this.setCompleteRow( itemId, completeState );
  }

  isComplete( itemId ) {
    const item = this.getItem( itemId );
    for( let variant of item.variants ) {
      if( !variant.is_owned ) {
        return false;
      }
    }
    return true;
  }

  setCompleteRow( id, state ) {
    const item = this.getItem( id );
    const rowElement = item.row_element;

    item.variants.forEach( e => e.is_owned = state );
    if( state ) {
      rowElement.classList.add('complete');
      rowElement.findAll('.variations li').forEach( e => e.classList.add('has') );
    } else {
      rowElement.classList.remove('complete');
      rowElement.findAll('.variations li.has').forEach( e => e.classList.remove('has') );
    }
  }

}

// export { Sheet };