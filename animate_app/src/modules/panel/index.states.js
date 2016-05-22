/* index.states.js - register states here */
"use strict";

import state2State from './states/state2/state2.state';

export function stateConfig ($stateProvider) {
  'ngInject';
  $stateProvider
    .state('state1', {
      // templateUrl: 'modules/panel/views/viewA.html',
      template: '<h1>{{state1.title}}</h1>',
      controller: function(){
        this.title = 'My Title';
      },
      controllerAs: 'state1'
    })

    .state('state2', state2State)
}

