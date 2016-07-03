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
  }
}