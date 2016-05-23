/* index.states.js - register states here */
"use strict";

import mainState from './core/states/main-state/main-state.state';

export function stateConfig ($stateProvider) {
  'ngInject';
  $stateProvider

    // Example: imported State
    .state('main', mainState)

    // Example: inline State
    .state('about', {
      template: '<h1>{{aboutState.title}}</h1><a ui-sref="main"><button>Back</button></a>',
      controller: function(){
        this.title = 'About this App';
      },
      controllerAs: 'aboutState'
    });
}