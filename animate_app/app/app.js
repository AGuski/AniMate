"use strict";

console.log('App init...');

import { runBlock } from './modules/index.run';
import { stateConfig} from './modules/index.states';

/* Components */
import appBarComponent from './modules/gui/components/app-bar-component/app-bar.component';


angular.module('aniMateApp', [
    'ui.router',
    'ngAnimate',
    'templates'
  ])

  .run(runBlock)
  .config(stateConfig)

  /* Components */
  .component('appBar', appBarComponent)

  .run(['$state', function ($state) {
		$state.go('main');
	}]);