"use strict";

import { runBlock } from './modules/index.run';
import { stateConfig} from './modules/index.states';

/* Components */
import anWebviewComponent from './modules/an-webview/an-webview.component';
import appBarComponent from './modules/gui/components/app-bar/app-bar.component';
import timelineComponent from './modules/gui/components/timeline/timeline.component';
import collapseContainerComponent from './modules/gui/components/collapse-container/collapse-container.component';
import timelinePanel from './modules/gui/components/timeline-panel/timeline-panel.component';
import propertyListComponent from './modules/gui/components/property-list/property-list.component';
import formContainerComponent from './modules/gui/components/formular-container/formular-container.component';
/* Directives */
import { CompileDirective } from './modules/core/directives/compile/compile.directive';

/* Factories */
import { propertyFactory } from './modules/gui/factories/property.factory';


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
  .component('timeline', timelineComponent)
  .component('timelinePanel', timelinePanel)
  .component('collapseContainer', collapseContainerComponent)
  .component('formularContainer', formContainerComponent)
  .component('propertyList', propertyListComponent)

  /* Directives */
  .directive('compile', CompileDirective)

  .config(function($sceProvider) {
    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects.
    $sceProvider.enabled(false);
  })

  /* Factories */
  .factory('propertyFactory',propertyFactory)

  .run(['$state', function ($state) {
		$state.go('main');
	}]);