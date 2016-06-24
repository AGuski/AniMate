let TimelineController = class {
  constructor(Keyframe, projectFactory) {
    'ngInject';
    this.timeline = this.element._timeline;
    this.keyframes = this.element._timeline._keyframes;
    this.project = projectFactory.getProject();
    this.projectLength = projectFactory.getProjectLength();
    this.draggedKey = null;
  }
  getStyling(key){
    let positionLeft = (100*(key._pot/this.projectLength))+'%';
    return {'left': 'calc('+positionLeft+' - 7px)'};
  }
  selectKeyframe(keyframe){
    this.project._pot = keyframe._pot;
    console.log(keyframe._properties);
  }
  drag(key){
    this.draggedKey = key;
  }
  move(key){
    if(this.draggedKey === key){
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