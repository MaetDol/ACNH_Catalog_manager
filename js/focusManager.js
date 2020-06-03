class FocusManager {

  constructor() {
    
    this.blurEvents = [];
    this.focusableCollection = [];
    this.focusEvents = [];
    this.lastActivedElement = null;

  }

  addEventListener({ target, callback, event }) {

  }

  addWatchElasticElement() {

  }

  updateFocusableCollection( elem=document ) {
    const focusableList = 
      Array.from( elem.find('body *'))
      .filter( e => e.tabIndex != -1 );
  }

  focusDown() {

  }

  focusUp() {

  }

  focusLeft() {

  }
  
  focusRight() {

  }

}

export default FocusManager;