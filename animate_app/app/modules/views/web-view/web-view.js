let webViewController = class {
  constructor($scope, projectFactory, $window){
    'ngInject';

    this.scope = $scope;
    this.webview = document.querySelector('webview');

    this.webview.addContentScripts([
      {
        name: 'domJSON',
        matches: ['http://*/*', 'https://*/*'],
        js: { files: ['./inject/domJSON.js'] },
        run_at: 'document_start'
      }, {
        name: 'element-service',
        matches: ['http://*/*', 'https://*/*'],
        js: { files: ['./inject/element-service.js'] },
        run_at: 'document_start'
      }
    ]);

    /* dynamic creation of the elements in context menu */
    chrome.runtime.onMessage.addListener((message) => {
      this.webview.contextMenus.removeAll();
      this.webview.contextMenus.create({id: 'addElement', title: 'get Element', contexts: ['all']});
      message.elements.forEach((element, index) => {
        this.webview.contextMenus.create({
          id: 'sel'+index, 
          title: element, 
          contexts: ['all'], 
          onclick: () => 
            this.webview.contentWindow.postMessage({message: 'getElement', 'elIndex': index}, '*'), 
          parentId: 'addElement'});
      });
    });

    // listens for return message from webview
    $window.addEventListener("message", (event) => {
      switch (event.data.type) {
        case 'element':
          console.log(event.data.element);
          projectFactory.addElement(event.data.element);
          break;
        case 'error':
          console.log(event.data.message);

          // TODO: Display the error as a message in UI

          break;
      }
    });

    // Eventlistener - listens to $emit and $broadcast events
    this.scope.$on('injectScript', function(event, script) {
      event.currentScope.ctrl.execute(script);
    });
  }

  /* Custom Functions */

  refresh() {
    this.webview.reload();
  }

  execute(script) {
    this.webview.executeScript({ code: script});
  }
}

export default {
  templateUrl: 'modules/views/web-view/web-view.html',
  controller: webViewController,
  controllerAs: 'ctrl',
  resolve: {}
}