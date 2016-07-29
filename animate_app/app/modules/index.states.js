/* index.states.js - register views here */
'use strict';

import mainView from './views/main-view/main-view';

import webView from './views/web-view/web-view';
import propertyView from './views/property-view/property-view';
import timelineView from './views/timeline-view/timeline-view';
import fileExportView from './views/file-export-view/file-export-view';
import settingsView from './views/settings-view/settings-view';

export function stateConfig ($stateProvider) {
  'ngInject';
  $stateProvider

  .state('main', {
    views: {
      'main': mainView,
      'fileExport': fileExportView,
      'settings': settingsView
    }
  })

  /* default view setup */
  .state('main.default', {
    views: {
      'top-left': webView,
      'top-right': propertyView,
      'bottom': timelineView
    }
  })

  /* swapped view setup */
  .state('main.swapped', {
    views: {
      'top-right': webView,
      'top-left': propertyView,
      'bottom': timelineView
    }
  })
}