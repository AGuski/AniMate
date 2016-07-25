let TimelineController = class {
  constructor(Keyframe, projectFactory, $document, $element, $scope) {
    'ngInject';
    this.timeline = this.element._timeline;
    this.keyframes = this.element._timeline._keyframes;
    this.project = projectFactory.getProject();
    this.projectLength = projectFactory.getProjectLength();
    this.selectedKeyframe = null;

    // Drag EventListener
    $element.on('mousedown', (event) => {
      event.preventDefault();
      if (angular.element(event.target).hasClass('keyframe')) {
        $document.on('mousemove', (event) => {
            let relativePos = (event.clientX-document.getElementById('time-scale').getBoundingClientRect().left)/document.getElementById('time-scale').clientWidth;
            if (relativePos > 0 && relativePos < 1) {
              this.selectedKeyframe._pot=this.project._length*relativePos;
              $scope.$apply();
            }
        });
        $document.on('mouseup', () => {
          $document.off('mousemove', this.mousemove);
          $document.off('mouseup', this.mouseup);
        });
      }
    });

  }
  getStyling(key){
    let positionLeft = (100*(key._pot/this.projectLength))+'%';
    return {'left': 'calc('+positionLeft+' - 7px)'};
  }
  selectKeyframe(keyframe){
    this.project._pot = keyframe._pot;
    this.selectedKeyframe = keyframe;
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