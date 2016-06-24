export function keyframeClassService(){
  'ngInject';
  return class{
    constructor(_pot){
      this._pot=_pot;
    }
    getPot(){
      return this.pot;
    }
  }
}