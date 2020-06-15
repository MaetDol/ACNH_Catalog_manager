class Sheet {
  
  constructor( element ) {
    this.ACNH_IMAGE_CDN = 'https://acnhcdn.com/latest/FtrIcon/';
    this.sheet = element;
    this.datas = new Map();
  }

  setData( item ) {
    this.datas.set( item.id, item );
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

    item.row.element = rowNode;
    item.variants = item.variants.reduce( (acc, val) => {
      acc.set( val.id, val );
      return acc;
    }, new Map());

    const previewImage = furniture.find('img');
    const variant = item.variants.get( item.preview_variant_id );
    const imageSrc = this.ACNH_IMAGE_CDN + variant.file_id;
    previewImage.src = imageSrc + '.png';
    previewImage.alt = `${item.name_kr} 사진`;
    
    this.setData( item );
    this.sheet.append( rowNode );

    const self = this;
    item.variants.forEach( e => {
      self.updateOwnedState( item, e.id );
    });
    this.updateCompleteState( item );    
  }

  removeItem( id ) {
    const item = this.getItem( id );
    const rowElement = item.row.element;
    rowElement.remove();
    this.removeItem( id );
  }

  removeItem( id ) {
    this.datas.delete( id );
  }

  hasItem( id ) {
    return this.datas.has( id );
  }

  getItem( id ) {
    return this.datas.get( id );
  }

  getVariant( item, id ) {
    return item.variants.get( id );
  }

  setVariant( itemId, variantId, state ) {
    const item = this.getItem( itemId );
    const variant = this.getVariant( item, variantId );
    
    variant.is_owned = state;
    this.updateOwnedState( item, variantId );
    this.updateCompleteState( item );
  }

  isComplete( itemId ) {
    const item = this.getItem( itemId );
    for( let [id, variant] of item.variants ) {
      if( !variant.is_owned ) {
        return false;
      }
    }
    return true;
  }

  isOwned( itemId, variantId ) {
    const item = this.getItem( itemId );
    const variant = this.getVariant( item, variantId );
    return variant.is_owned;
  }

  updateCompleteState( item ) {
    const isComplete = this.isComplete( item.id );
    item.row.is_complete = isComplete;
    if( isComplete ) {
      item.row.element.classList.add('complete');
    } else {
      item.row.element.classList.remove('complete');
    }
  }

  updateOwnedState( item, variantId ) {
    const isOwned = this.isOwned( item.id, variantId );
    const variantElement = item.row.element.find(`[data-variant-id="${variantId}"]`);
    if( isOwned ) {
      variantElement.classList.add('has');
    } else {
      variantElement.classList.remove('has');
    }
  }

  setCompleteRow( id, state ) {
    const item = this.getItem( id );
    const self = this;
    item.variants.forEach( e => {
      e.is_owned = state;
      self.updateOwnedState( item, e.id );
    });
    this.updateCompleteState( item );
  }

}

// export { Sheet };