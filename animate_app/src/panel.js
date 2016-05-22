/* Establishes the connection to the background.js */
"use strict";

console.log('init panel');

import { runBlock } from './modules/index.run';
import { stateConfig} from './modules/panel/index.states';

/* Controllers */
import { MainController } from './main.controller';

/* Directives */
import { DisplayElementDirective } from './modules/panel/components/display-element/display-element.component';


angular.module('aniMateApp', 
  [
    'ui.router', 
    'templates'
  ])

  .run(runBlock)
  .config(stateConfig)

  /* Controllers */
  .controller('mainCtrl', MainController)

  /* Directives */
  .directive('displayElement', DisplayElementDirective);


// Import normal javascript. Example: Connection to background page
import { bgPageConnection } from './modules/panel/connection.script';

