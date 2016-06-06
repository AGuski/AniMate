"use strict";

import { runBlock } from './modules/index.run';
import { stateConfig } from './modules/index.states';

/* Components */
import appBarComponent from './modules/gui/components/app-bar/app-bar.component';
import timelineComponent from './modules/gui/components/timeline/timeline.component';
import collapseContainerComponent from './modules/gui/components/collapse-container/collapse-container.component';
import propertiesContainerComponent from './modules/gui/components/properties-container/properties-container.component';

/* Directives */
import { CompileDirective } from './modules/utils/directives/compile/compile.directive';

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
  .component('timeline', timelineComponent)
  .component('collapseContainer', collapseContainerComponent)
  .component('propertiesContainer', propertiesContainerComponent)

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
    $state.go('main.default');
  }]);