import mainStateController from './main-state.controller';

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