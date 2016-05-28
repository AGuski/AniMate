let mainStateController = class {
	constructor(inputValue){
		'ngInject';
		this.value = "bar";
		this.inputValue = inputValue;
	}
}

export default {
  templateUrl: 'modules/core/states/main-state/main-state.html',
  controller: mainStateController,
  controllerAs: 'main',
  resolve: {
    inputValue: function(){
      return "wurst";
    }
  }
}