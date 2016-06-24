let propertyViewController = class {
  constructor($rootScope, propertyFactory, projectFactory){
    'ngInject';
    this.project= projectFactory.getProject();
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
    this.rootScope.$broadcast('EmbedScript', script);
  }
  getElementTitle(){
    if(this.project._activeElement == null){
      return "Keine Auswahl";
    }
    return this.project._activeElement._name+" "+this.project._activeElement._class+" "+this.project._activeElement._id;
  }
}

export default {
  templateUrl: 'modules/views/property-view/property-view.html',
  controller: propertyViewController,
  controllerAs: 'ctrl',
  resolve: {}
}