export function elementClassService(Keyframe){
  'ngInject';
  return class{
    constructor(_name, _class, _id){
      this._name = _name;
      this._class = _class;
      this._id = _id;
      this._keyframes = [];
    }
    addKeyframe(keyframe){
      this._keyframes.push(keyframe);
      this._keyframes.sort(function(a, b){
        if(a._pot>b._pot){
          return 1;
        }else if(a._pot<b._pot){
          return -1;
        }else{
          return 0;
        }
      });
      console.log(this._keyframes);
    }
    equalsByDescription(el){
      return this._name === el._name &&
      this._class === el._class &&
      this._id === el._id;
    }
  }
}