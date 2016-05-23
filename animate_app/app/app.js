"use strict";

console.log('App init...');

import { runBlock } from './modules/index.run';
import { stateConfig} from './modules/index.states';


angular.module('aniMateApp',
  [
    'ui.router', 
    'templates'
  ])

  .run(runBlock)
  .config(stateConfig)
  .run(['$state', function ($state) {
		$state.go('main');
	}]);