let TimelineController = class {
  constructor(Keyframe, projectFactory) {
    'ngInject';
    this.keyframes = this.element._keyframes;
    this.element.addKeyframe(new Keyframe(1.0));
    this.element.addKeyframe(new Keyframe(2.0));
    this.element.addKeyframe(new Keyframe(0.5));
    this.project = projectFactory.getProject();
    this.projectLength = projectFactory.getProjectLength();
    this.draggedKey = null;
  }
  getStyling(key){
    let positionLeft = (100*(key._pot/this.projectLength))+'%';
    return {'left': positionLeft};
  }
  selectKeyframe(keyframe){
    this.project._pot = keyframe._pot;
  }
  drag(key){
    this.draggedKey = key;
  }
  move(key){
    if(this.draggedKey == key){
      key._pot=this.project._length*(event.clientX-document.getElementById('time-scale').getBoundingClientRect().left)/document.getElementById('time-scale').clientWidth;
    }
  }
  drop(){
    this.draggedKey = null;
  }
}

export default {
  templateUrl: 'modules/gui/components/timeline/timeline.html',
  controller: TimelineController,
  controllerAs: 'ctrl',
  bindings:{
    'element': '<'
  }
}