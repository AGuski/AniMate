let propertyViewController = class {
  constructor($rootScope, propertyFactory){
    'ngInject';

    this.data;
    propertyFactory.getData().then(
      (data) => {
        this.data = data;
      }
    );

    this.injectUrl = "https://www.microsoft.com/de-de/windows";
    this.rootScope = $rootScope;
  }

  injectAScript(script){
    this.rootScope.$broadcast('injectScript', script);
  }
}

export default {
  templateUrl: 'modules/views/property-view/property-view.html',
  controller: propertyViewController,
  controllerAs: 'ctrl',
  resolve: {}
}