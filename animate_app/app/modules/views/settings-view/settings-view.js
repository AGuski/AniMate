let settingsViewController = class {
  constructor($rootScope, settingsService) {
    'ngInject';

    this.rootScope = $rootScope;
    this.settingsService = settingsService;
    
    /* Get settings from Storage */
    this.settingsService.getAllAppSettings((items) => {
      this.settings = items;
    });
  }

  toggleAutoInjection() {
    this.settingsService.storeAppSetting({ 
      injectLibByDefault: this.settings.injectLibByDefault
    });
    if (this.settings.injectLibByDefault) {
      this.settingsService.getAppSetting('defaultLibrary', (value) => {
        let script = { code: `
          var animateLibInjector = document.createElement('script');
          animateLibInjector.setAttribute('src','${value}');
          animateLibInjector.async="async";
          document.head.appendChild(animateLibInjector);
        ` };
        this.rootScope.$broadcast('addScript','loadGSLib', script);
      });
    } else {
      this.rootScope.$broadcast('removeScripts', ['loadGSLib']);
    }
    this.rootScope.$broadcast('refreshWebview');
  }

  saveKeyValue(key, value) {
    let object = {};
    object[key] = value;
    this.settingsService.storeAppSetting(object);
  }

}

export default {
  templateUrl: 'modules/views/settings-view/settings-view.html',
  controller: settingsViewController,
  controllerAs: 'ctrl'
}