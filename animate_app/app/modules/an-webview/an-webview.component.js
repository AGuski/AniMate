let AnWebviewController = class {
	constructor($scope, $element, $compile) {
   'ngInject';
   this.compile = $compile;
   this.element = $element;
   this.scope = $scope;

		// Eventlistener - listens to $emit and $broadcast events
		this.scope.$on('injectScript', function(event) {
			event.currentScope.ctrl.execute();
		});
	}

	/* Component lifecycle function */
	$onInit(){
		this.getUrl();
	}

  /* Custom Functions */

  /* recompiles the webview tag */
  getUrl(){
    this.compile(this.element.find('webview').contents())(this.scope);
    this.webview = document.querySelector('webview');

    // TODO: Let other modules know, that the webview is recompiled

  }

  refresh(){
    this.webview.reload();
  }

  execute(){
    this.webview.executeScript({ code: `${this.script}`});
  }
}

export default {
	templateUrl: 'modules/an-webview/an-webview.html',
	controller: AnWebviewController,
	controllerAs: 'ctrl',
	bindings:{
		source: '@',
		autosize: '@',
		script: '@'
	}
}