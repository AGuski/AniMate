let webViewController = class {
  constructor($scope, $window, modalFactory, projectFactory, settingsService, $timeout){
    'ngInject';

    this.scope = $scope;
    this.settingsService = settingsService;
    this.timeout = $timeout;
    this.webview = document.querySelector('webview');

    settingsService.getAppSetting('homepage', (value) => {
      this.url = value;
    });

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

    /* If injectLibByDefault is true, inject it here */
    settingsService.getAppSetting('injectLibByDefault', (value) => {
      if (value) {
        settingsService.getAppSetting('defaultLibrary', (value) => {
          let script = { code: `
            var animateLibInjector = document.createElement('script');
            animateLibInjector.setAttribute('src','${value}');
            document.head.appendChild(animateLibInjector);
          ` };
          this.scope.$emit('addScript','loadGSLib', script);
        });
      }
    });

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
          this.errorMessage = event.data.message;
          /* templateUrl used as example */
          modalFactory.createModal('Sorry, element import failed!', {
            templateUrl: 'modules/views/web-view/error-modal.html'
          }, $scope);

          break;
      }
    });

    // Eventlistener - listens to $emit and $broadcast events
    this.scope.$on('injectScript', function(event, script) {
      event.currentScope.ctrl.execute(script);
    });

    // Eventlistener - To have access to the scope of the website and third party js, scripts must be embedded.
    this.scope.$on('EmbedScript', function(event, script) {
      let embeddScript = 
      ` var script = document.createElement('script');
        script.textContent = '${script}';
        document.head.appendChild(script);
        script.remove();`
      event.currentScope.ctrl.execute(embeddScript);
    });

    this.scope.$on('addScript', (event, name, script) =>{



      this.webview.addContentScripts([
          {
            name: name,
            matches: ['http://*/*', 'https://*/*'],
            js: script,
            run_at: 'document_end' // <--- Maybe make this argument too...
          }
        ]);
    });

    this.scope.$on('removeScripts', (events, scriptArray) => {
      this.webview.removeContentScripts(scriptArray);
    });

    this.scope.$on('refreshWebview', ()=> {
      this.refresh();
    });
  }

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

  execute(script) {
    this.webview.executeScript({ code: script});
  }

  getHome(){
    this.settingsService.getAppSetting('homepage', (value) => {
      this.url = value;
      this.timeout(this.webview.reload(), 100);
    });
  }


}

export default {
  templateUrl: 'modules/views/web-view/web-view.html',
  controller: webViewController,
  controllerAs: 'ctrl',
  resolve: {}
}