export function timelineClassService(Keyframe){
  'ngInject';
  return class{
    constructor(){
      this.repeat = false;
      this._keyframes = [];
    }
    getProperty(time, name){

      let before = null;
      let after = null;
      this._keyframes.forEach((keyframe)=>{
        if(keyframe.hasProperty()){
          if(keyframe._pot<time){
            before = keyframe['name'];
          }else if(keyframe._pot>time){
            after = keyframe['name'];
          }else{
            before = keyframe['name'];
            after = keyframe['name'];
          }
        }
      });
      if(before === null){
        before = "default";
      }
      if(after === null){
        after = before;
      }
      return "D: "+before+" & "+after;
    }
    
    addProperty(time, name, value){
      let filtered = this._keyframes.filter((e) =>{
        return e._pot === time;
      });
      if(filtered.length === 0){
        let addedKeyframe = new Keyframe(time);
        addedKeyframe.addProperty({"name": name, "value": value});
        this._keyframes.push(addedKeyframe);
        this.sortKeyframes();
      }else{
        filtered[0].addProperty({"name": name, "value": value});
      }
    }

    addKeyframe(keyframe) {
      let filtered = this._keyframes.filter((e) => {
        return e._pot === keyframe._pot;
      });
      if(filtered.length === 0){
        this._keyframes.push(keyframe);
        this.sortKeyframes();
      }else{
        return;
      }
    }

    sortKeyframes(){
      this._keyframes.sort((a, b) => {
        if(a._pot > b._pot) {
          return 1;
        }else if(a._pot < b._pot) {
          return -1;
        }else {
          return 0;
        }
      });
    }
  };
}