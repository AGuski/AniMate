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

    removeElement(element) {
      var index = this._elements.indexOf(element);
      if (index !== -1) {
        this._elements.splice(index, 1);
      }
      if (this._activeElement === element) {
        this._activeElement = undefined;
      }
      
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