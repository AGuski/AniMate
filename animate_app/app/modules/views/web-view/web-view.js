let webViewController = class {
  constructor($scope, $element, $compile, projectFactory){
    'ngInject';
    this.compile = $compile;
    this.element = $element;
    this.scope = $scope;

    this.webview = document.querySelector('webview');
    var isLoading = false;

    // the temporary Element from webview
    let temporaryElement;

    // save webViewMessage as temporaryElement;
         this.webview.addEventListener('consolemessage', function(e) {
         temporaryElement = JSON.parse(e.message);
         });

         this.webview.addEventListener('contentload', function(e) {
         // insert mouseOverListener which send comment to Controller
         let injectedListener = `document.body.addEventListener('click',
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

  }

  /* Custom Functions */

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

  execute(script){
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

