let timelineViewController = class {
  constructor(projectFactory){
    'ngInject';
    this.projectFactory=projectFactory;
    this.elements = projectFactory.getElements();
  }
  isActiveElement(element){
    if(this.projectFactory.isActiveElement(element)){
        return 'active';
    }
  }
  setActiveElement(element){
    console.log("click");
    this.projectFactory.setActiveElement(element);
  }
}

export default {
  templateUrl: 'modules/views/timeline-view/timeline-view.html',
  controller: timelineViewController,
  controllerAs: 'ctrl',
  resolve: {}
}