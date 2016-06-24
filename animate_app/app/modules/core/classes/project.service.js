export function projectClassService(){
  'ngInject';
  return class{
    constructor(){
      this._elements = [];
      this._activeElement = null;
      this._pot = 0.3;
      this._length = 3.0;
    }
    addElement(el){
      if(!this.exists(el)){
        this._elements.push(el);
        this._activeElement = el;
      }
    }
    setActiveElement(el){
      this._activeElement = el;
    }
    exists(el){
      for(let i = 0; i<this._elements.length; i++){
        if(el.equalsByDescription(this._elements[i])){
          return true;
        }
      }
      return false;
    }
  }
}