class Search {

  constructor({ searchWrapper, sheet }) {
    this.targetSheet = sheet;
    this.wrapper = searchWrapper;
    this.dropdown = searchWrapper.find('#search-item');
    this.input = searchWrapper.find('#search-input');

    this.input.addEventListener('focus', this.showDropdown.bind( this ));
    this.wrapper.addEventListener('focusout', this.hideDropdown.bind( this ));
    this.wrapper.addEventListener('click', this.toggleSheetItem.bind( this ));
    this.wrapper.addEventListener('keydown', this.focusSearchInput.bind( this ));
    this.wrapper.addEventListener('input', this.autoComplete.bind( this ));
  }

  showDropdown() {
    this.dropdown.classList.add('show');
  }

  hideDropdown({ relatedTarget }) {
    if( !this.wrapper.contains( relatedTarget )) {
      this.dropdown.classList.remove('show');
    }
  }

  focusSearchInput({ keyCode }) {
    if( isPrintableKeyCode( keyCode )) {
      this.input.focus();
    }
  }

  toggleSheetItem({ path }) {
    const li = findByTagName( path, 'LI');
    if( li === null ) {
      return;
    }
  
    const itemId = parseInt( li.dataset.itemId );
    const hasItem = this.targetSheet.hasItem( itemId );
    const isDeleted = hasItem && this.targetSheet.isDeleted( itemId );
    let item = this.targetSheet.getItem( itemId );
    if( hasItem && !isDeleted ) {
      this.removeSheetItem( li, item );
      return;
    } else if( !hasItem ) {
      // Get data using fetch or something whatever
    }
    this.addItemToSheet( li, item );
  }

  addItemToSheet( li, item ) {
    this.targetSheet.addItem( item );
    li.classList.add('added');
  }

  removeSheetItem( li, item ) {
    this.targetSheet.removeItem( item.id );
    li.classList.remove('added');
  }

  autoComplete(e) {
    // const datas = await search( e.target.value );
    const datas = searchDatas;
    
    let elements = [];
    const itemTemplate = document.find('#searchDropdownItem').content;
    for( let data of datas ) {
      const li = itemTemplate.cloneNode( true ).find('li');
      
      const isAdded = this.targetSheet.hasItem( data.id );
      if( isAdded ) {
        li.classList.add('added');
      }
      li.dataset.itemId = data.id;
  
      const img = li.find('img');
      img.src = this.targetSheet.ACNH_IMAGE_CDN + data.variants[0].file_id;
      img.alt = data.name_kr;
  
      li.find('.kr').textContent = data.name_kr;
      li.find('.en').textContent = data.name_en;
  
      elements.push(li);
    }
    this.dropdown.innerHTML = '';
    elements.forEach( e => this.dropdown.appendChild(e) );
  }
}


function isPrintableKeyCode( keyCode ) {
  // Reference: https://stackoverflow.com/a/12467610
  return(keyCode > 47 && keyCode < 58)   || // number keys
    (keyCode > 64 && keyCode < 91)   || // letter keys
    (keyCode > 95 && keyCode < 112)  || // numpad keys
    (keyCode > 185 && keyCode < 193) || // ;=,-./` (in order)
    (keyCode > 218 && keyCode < 223);   // [\]' (in order)
}

// export { Search };