export function timelineClassService(){
  'ngInject';
  return class{
    constructor(){
      console.log("Timeline Created");
      this.repeat = false;
      this.Keyframes = null;
    }
  }
}