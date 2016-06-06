/* index.states.js - register views here */
"use strict";

import mainView from './views/main-view/main-view';

import webView from './views/web-view/web-view';
import propertyView from './views/property-view/property-view';
import timelineView from './views/timeline-view/timeline-view';
// import fileView from './views/file-view/file-view';

export function stateConfig ($stateProvider) {
  'ngInject';
  $stateProvider

    .state('main', mainView)

      /* default view setup */
      .state('main.default', {
        resolve: {},
        views: {
          "top-left": webView,
          "top-right": propertyView,
          "bottom": timelineView
        }
      })

      /* alternative view setup */
      .state('main.defaultSwap', {
        resolve: {},
        views: {
          "top-left": propertyView,
          "top-right": webView,
          "bottom": timelineView
        }
      });
}