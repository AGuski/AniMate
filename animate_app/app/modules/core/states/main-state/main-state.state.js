let mainStateController = class {
	constructor($scope){
		'ngInject';
    this.$scope = $scope;
    this.injectUrl = "http://www.apple.com/";
	}

  injectAScript(){
    this.$scope.$broadcast('injectScript');
  }
}

export default {
  templateUrl: 'modules/core/states/main-state/main-state.html',
  controller: mainStateController,
  controllerAs: 'ctrl',
  resolve: {}
}