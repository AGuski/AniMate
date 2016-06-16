export const elementConst = class{
	
	constructor(_name, _class, _id){
    'ngInject';
      this._name = _name;
      this._class = _class;
      this._id = _id;
      this._keyframes = [];
    }

    equalsByDescription(el){
      return this._name === el._name &&
      this._class === el._class &&
      this._id === el._id;
    }
};