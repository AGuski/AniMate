"use strict";

import { runBlock } from './modules/index.run';
import { stateConfig } from './modules/index.states';

/* Components */
import appBarComponent from './modules/gui/components/app-bar/app-bar.component';
import timelineComponent from './modules/gui/components/timeline/timeline.component';
import collapseContainerComponent from './modules/gui/components/collapse-container/collapse-container.component';
import propertiesContainerComponent from './modules/gui/components/properties-container/properties-container.component';
import modalComponent from './modules/gui/components/modal/modal.component';

/* Directives */
import { CompileDirective } from './modules/utils/directives/compile/compile.directive';
import { DragDividerDirective } from './modules/gui/directives/drag-divider/drag-divider.directive';

/* Factories */
import { propertyFactory } from './modules/gui/factories/property.factory';
import { projectFactory } from './modules/gui/factories/project.factory';
import { modalFactory } from './Modules/gui/factories/modal.factory';

/* Constants */
import { projectConst } from './modules/gui/constants/project.constant';
import { elementConst } from './modules/gui/constants/element.constant';
import { keyframeConst } from './modules/gui/constants/keyframe.constant';

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
  .component('modal', modalComponent)

  /* Directives */
  .directive('compile', CompileDirective)
  .directive('dragDivider', DragDividerDirective)

  /* Factories */
  .factory('propertyFactory',propertyFactory)
  .factory('projectFactory',projectFactory)
  .factory('modalFactory', modalFactory)

  /* Constants */
  .constant('Project', projectConst)
  .constant('Element', elementConst)
  .constant('Keyframe', keyframeConst)

  .config(function($sceProvider) {
    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects.
    $sceProvider.enabled(false);
  })

  .run(['$state', function ($state) {
    $state.go('main.default');
  }]);