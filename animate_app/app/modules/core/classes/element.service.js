export function elementClassService(Keyframe, Timeline) {
  'ngInject';
  return class {
    constructor(object, title) {
      this._object = object;
      this._timeline = new Timeline();
      this._title=title || "default";
    }

    getTitel() {
      return this._title;
    }
    
    getTagName() {
      return this._object.tagName;
    }
    
    getClass() {
      return this._object.className || " --- ";
    }
    
    getId() {
      return this._object.id || " --- ";
    }
    
    addKeyframe(keyframe) {
      this._timeline.addKeyframe(keyframe);
    }

    convertElementForGeneration(loop) {
      const o = this._object;
      const tag = o.tagName.toLowerCase();
      let idSelector = '';
      if (o.id) {
        idSelector = '#' + o.id;
      }
      let classSelector = '';
      if (o.className) {
        classSelector = '.' + o.className.replace(/[ ]+/g, '.');
      }
      const selector = tag + idSelector + classSelector;
      const name = tag + o.id.replace(/[_ \-]*/g, '') + o.className.replace(/[_ \-]*/g, '');
      const timeline = {
        name: 'timeline' + name,
        attributes: {
          repeat: loop, 
          repeatDelay: 1
        }
      }
      const element = {
        name: 'element' + name,
        selector: selector
      };
      // only gets the converted keyframes
      const keyframes = this._timeline.convertTimelineForGeneration();

      element.keyframes = keyframes;
      timeline.element = element;
      return timeline;
    }
  }
}