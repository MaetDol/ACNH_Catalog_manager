class Sheet {
  
  constructor( element ) {
    this.sheet = element;
    this.datas = [];
  }
  
  addItem( item ) {
    // 삽입 정렬 이용?ee
  }

  removeItem( id ) {
    // 삽입 정렬 이용?
    const index = this.indexOfId( id );
    const rowElement = this.datas[index].element;
  }

  hasItem( id ) {
    // 삽입 정렬 이용?
  }

  indexOfId( id ) {
    const getPivot = ( start, end ) => start + Math.floor( (end - start) / 2 );
    let end = this.datas.length;
    let start = 0;
    let pivot = getPivot( start, end );

    while( end >= start ) {
      const compareId = this.datas[pivot].id;
      console.log('----------')
      console.log( start, end, pivot );
      console.log( compareId, id );
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
    return -1;
  }

  setVariant( variantId, state ) {
    console.log('setVariant ', variantId, state );
  }

  setVariations( id, state ) {
    console.log('setVariations ', id, state );
  }

}

// export { Sheet };