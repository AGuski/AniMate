let webViewController = class {
  constructor($scope, $element, $compile, projectFactory){
    'ngInject';
    this.compile = $compile;
    this.element = $element;
    this.scope = $scope;

    this.webview = document.querySelector('webview');

    // the temporary Element from webview
    let temporaryElement;

    // save webViewMessage as temporaryElement;
    this.webview.addEventListener('consolemessage', function(e) {
      temporaryElement = JSON.parse(e.message);
    });

    this.webview.addEventListener('contentload', function(e) {
      // insert mouseOverListener which send comment to Controller
      let injectedListener = `document.body.addEventListener('mouseover',
        function(e) {
          e = e || window.event;
          let target = e.target || e.srcElement;
          // JSON of ElementProperties
          console.log('{ "name": "'+target.tagName+'", "class": "'+target.className+'", "id": "'+target.id+'" }');
        });`;

      this.executeScript({ code: injectedListener });
    });

    // create contextMenuElement 'add Element'
    this.webview.contextMenus.create({id: 'addElement', title: 'add Element', contexts: ['all']});

    // onClickes 'add Element'
    this.webview.contextMenus.onClicked.addListener(
      function(event){
        // add temporary Element
        projectFactory.addElement(temporaryElement);
      }
    );

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