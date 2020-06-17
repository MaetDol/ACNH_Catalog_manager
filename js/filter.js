class Filter {
  
  constructor({ filterWrapper, sheet }) {

    this.tags = new Map();
    this.appliedTags = new Map();

    this.targetSheet = sheet;
    this.wrapper = filterWrapper;
    this.dropdown = filterWrapper.find('#applicable-filters');
    this.appliedTagWrapper = filterWrapper.find('#applied-filters');

    const dropdownButton = filterWrapper.find('.show-list');
    dropdownButton.addEventListener('focus', this.showApplicableFilters.bind( this ));
    filterWrapper.addEventListener('focusout', this.hideApplicableFilters.bind( this ));
    this.dropdown.addEventListener('click', this.toggleAppliedTag.bind( this ));
    this.appliedTagWrapper.addEventListener('click', this.disapplyEvent.bind( this ));
  }

  createDropdownItem( tag ) {

    const template = document.find('#filterDropdownItem').content;
    const tagNode = template.cloneNode( true ).find('li');
    tagNode.dataset.tagId = tag.id;
    tagNode.find('button').textContent = tag.content;

    return tagNode;
  }

  createAppliedTag( tag ) {

    const template = documnet.find('#appliedTagItem').content;
    const tagNode = template.cloneNode( true ).find('li');
    tagNode.dataset.tagId = tag.id;
    /*
      제작 가능/불가능 말고 토글버튼을 달아서 바꿀 수 있게 할까?
    */
  }

  setTag( tagId ) {

  }

  applyTag( tagId ) {

  }

  disapplyEvent({ path }) {
    const li = findByTagName( path, 'LI');
    const id = parseInt( li.dataset.tagId );
    li.remove();
    this.disapplyTag( id );
  }

  disapplyTag( tagId ) {
    
  }

  toggleAppliedTag({ path }) {

    const li = findByTagName( path, 'LI');
    if( li === null ) {
      return;
    }

    const tagId = parseInt( li.dataset.tagId );
    const isApplied = this.isAppliedTag( tagId );
    if( isApplied ) {
      this.disapplyTag( tagId );
    } else {
      this.applyTag( tagId );
    }
  }

  getTag( tagId ) {
    return this.tags.get( tagId );
  }

  isAppliedTag( tagId ) {
    return this.getTag( tagId ).applied.state;
  }

  addDropdownItem() {

  }

  removeDropdownItem() {

  }

  showApplicableFilters() {
    this.dropdown.classList.add('show');
  }

  hideApplicableFilters({ relatedTarget }) {
    if( !this.wrapper.contains( relatedTarget )) {
      this.dropdown.classList.remove('show');
    }
  }

}