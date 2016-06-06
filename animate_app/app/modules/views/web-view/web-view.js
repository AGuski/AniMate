let webViewController = class {
  constructor($scope, $element, $compile){
    'ngInject';
    this.compile = $compile;
    this.element = $element;
    this.scope = $scope;

    this.webview = document.querySelector('webview');

    // Eventlistener - listens to $emit and $broadcast events
    this.scope.$on('injectScript', function(event, script) {
      event.currentScope.ctrl.execute(script);
    });
  }

  /* Custom Functions */

  refresh(){
    this.webview.reload();
  }

  execute(script){
    this.webview.executeScript({ code: script});
  }
}

export default {
  templateUrl: 'modules/views/web-view/web-view.html',
  controller: webViewController,
  controllerAs: 'ctrl',
  resolve: {}
}