import state2Controller from './state2.controller';

export default {
  templateUrl: 'modules/panel/states/state2/state2.html',
  controller: state2Controller,
  controllerAs: 'state2',
  resolve: {
    inputValue: function(){
      return "foo";
    }
  }
}