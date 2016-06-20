let webViewController = class {
  constructor($scope, projectFactory, $window){
    'ngInject';

    this.scope = $scope;
    this.webview = document.querySelector('webview');
    var isLoading = false;

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



/*    this.webview('#location-form').onsubmit = function(e) {
      e.preventDefault();
      navigateTo(document.querySelector('#location').value);
    };


    this.webview.addEventListener('exit', handleExit);
    this.webview.addEventListener('loadstart', handleLoadStart);
    this.webview.addEventListener('loadstop', handleLoadStop);
    this.webview.addEventListener('loadabort', handleLoadAbort);
    this.webview.addEventListener('loadredirect', handleLoadRedirect);

    //checken
    function handleExit(event) {
      console.log(event.type);
      document.body.classList.add('exited');
      if (event.type == 'abnormal') {
        document.body.classList.add('crashed');
      } else if (event.type == 'killed') {
        document.body.classList.add('killed');
      }
    }

    function resetExitedState() {
      document.body.classList.remove('exited');
      document.body.classList.remove('crashed');
      document.body.classList.remove('killed');
    }

    function handleLoadStart(event) {
      document.body.classList.add('loading');
      isLoading = true;

      resetExitedState();
      if (!event.isTopLevel) {
        return;
      }
      document.querySelector('#location').value = event.url;
    }

    function handleLoadStop(event) {
      // We don't remove the loading class immediately, instead we let the animation
      // finish, so that the spinner doesn't jerkily reset back to the 0 position.
      isLoading = false;
    }

    function handleLoadAbort(event) {
      console.log('LoadAbort');
      console.log('  url: ' + event.url);
      console.log('  isTopLevel: ' + event.isTopLevel);
      console.log('  type: ' + event.type);
    }

    function handleLoadRedirect(event) {
      resetExitedState();
      if (!event.isTopLevel) {
        return;
      }
      document.querySelector('#location').value = event.newUrl;
    }

    function navigateTo(url) {
        resetExitedState();
        document.querySelector('webview').src = url;
    }*/


  

  /* Custom Functions */


  refresh() {
    this.webview.reload();
  }
  backTo(){
    this.webview.back();
  }

  forward(){
    this.webview.forward();
  }

/*
  home(){
    navigateTo('http://www.google.com/');
  }
*/

  refresh(){
      this.webview.reload();

  }

  execute(script) {
    this.webview.executeScript({ code: script});
  }
/*
    navigateTo(){
        this.webview.go();
    }*/

}

export default {
  templateUrl: 'modules/views/web-view/web-view.html',
  controller: webViewController,
  controllerAs: 'ctrl',
  resolve: {}
}

