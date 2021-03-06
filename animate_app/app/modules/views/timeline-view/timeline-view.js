let timelineViewController = class {
  constructor(projectFactory, generatorFactory, Keyframe, $rootScope) {
    'ngInject';
    this.projectFactory = projectFactory;
    this.generatorFactory = generatorFactory;
    this.$rootScope = $rootScope;
    this.project = projectFactory.getProject();
    this.elements = this.project._elements;
    this.Keyframe = Keyframe;
    this.partnumber = 12;
    this.playmarkerEl = document.getElementById('play-marker');
    this.timelineControlsEl = document.getElementById('timeline-controls');
    this.timeEl = document.getElementsByClassName('time')[0];
    this.playmarkerEl.style.left=(this.timeEl.offsetWidth)+"px";
    this.loop = 0;
    this.activeLoop = {};
  }

  play(){
    let code = this.generatorFactory.generateInjectibleCode(this.projectFactory.getTimelinesForGeneration(this.loop));
    code = this.generatorFactory.minifie(code);
    this.$rootScope.$broadcast('EmbedScript', code);
  }

  repeat(){
    if (this.loop === -1) {
      this.activeLoop = {};
      this.loop = 0;
    } else {
      this.activeLoop = {'color': '#222'};
      this.loop = -1;
    }
  }

  getPartStyles(){
    return { 'width': 100/this.partnumber+'%'};
  }

  getPartNumber(){
    let array = new Array(this.partnumber);
    for(let a = 0; a<array.length; a++){
      array[a] = a;
    }
    return array;
  }

  /* returns the activeElementClass to the active Element*/
  isActiveElement(element) {
    if(this.project._activeElement === element){
      return 'active';
    }
  }

  /* sets the active Element */
  setActiveElement(element) {
    this.project._activeElement = element;
  }

  /* adds a Keyframe to active Element */
  addKeyframe() {
    if(this.project._activeElement !== null){
      this.project._activeElement.addKeyframe(new this.Keyframe(this.project._pot));
    }
  }

  /* removes the active Element */
  removeElement(element) {
    this.project.removeElement(element);
  }
  

  /* prints the time as mm:ss:msms */
  printTime(){
    let min = Math.floor(this.project._pot/60);
    let sec = Math.floor(this.project._pot)-min*60;
    let msec = Math.floor((this.project._pot-Math.floor(this.project._pot))*1000);
    if(sec<10) sec = "0"+sec;
    if(min<10) min = "0"+min;
    return min+":"+sec+":"+msec;
  }

  /* sets the time while clicking on the time-scale */
  doClick(event){
    var x = event.clientX-document.getElementById('time-scale').getBoundingClientRect().left;
    this.project._pot = this.project._length*(x)/document.getElementById('time-scale').clientWidth;
    this.playmarkerEl.style.left = (event.x-this.timelineControlsEl.offsetWidth)+"px";
  }
}

export default {
  templateUrl: 'modules/views/timeline-view/timeline-view.html',
  controller: timelineViewController,
  controllerAs: 'ctrl',
  resolve: {}
}