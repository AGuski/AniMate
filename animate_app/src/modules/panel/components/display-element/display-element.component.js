/* This Directive displays an elemet as HTML text */
'use strict';

export function DisplayElementDirective(){
  'ngInject';
  return {
    templateUrl: 'modules/panel/components/display-element/display-element.html',
    controller: DisplayElementController,
    controllerAs: 'ctrl',
    bindToController: {
      element: '@'
    }
  };
}

class DisplayElementController {
  constructor() {
    'ngInject';
    this.value = 15;
  }

  setElement(el){
    this.element = el;
  }

  increaseValue(){
    this.value += 1;
  }
}