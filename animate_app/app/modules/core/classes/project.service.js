export function projectClassService(){
  'ngInject';
  return class {
    constructor() {
      this._elements = [];
      this._activeElement = null;
      this._pot = 0.0;
      this._length = 3.0;
    }

    addElement(element) {
      this._elements.push(element);
      this._activeElement = element;
    }

    setActiveElement(el) {
      this._activeElement = el;
    }

    getTimelinesForGeneration(loop) {
      const timelines = [];
      this._elements.forEach((el) => {
        timelines.push(el.convertElementForGeneration(loop));
      });
      return timelines;
    }
  }
}