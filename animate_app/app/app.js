"use strict";

import { runBlock } from './modules/index.run';
import { stateConfig} from './modules/index.states';

/* Components */
import appBarComponent from './modules/gui/components/app-bar-component/app-bar.component';
import anWebviewComponent from './modules/an-webview/an-webview.component';

/* Directives */
import { CompileDirective } from './modules/core/directives/compile/compile.directive';

angular.module('aniMateApp', [
    'ui.router',
    'ngAnimate',
    'ngSanitize',
    'templates'
  ])

  .run(runBlock)
  .config(stateConfig)

  /* Components */
  .component('appBar', appBarComponent)
  .component('anWebview', anWebviewComponent)

  /* Directives */
  .directive('compile', CompileDirective)

  .config(function($sceProvider) {
    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects.
    $sceProvider.enabled(false);
  })

  .run(['$state', function ($state) {
		$state.go('main');
	}]);