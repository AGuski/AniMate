/* index.states.js - register states here */
"use strict";

import mainState from './core/states/main-state/main-state.state';

export function stateConfig ($stateProvider) {
  'ngInject';
  $stateProvider

    // Example: imported State
    .state('main', mainState);
}