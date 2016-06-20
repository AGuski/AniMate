export const projectConst = class{
  
  constructor(){
    'ngInject';
    this._elements = [];
    this._activeElement = null;
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