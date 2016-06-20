chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('app.html', {
    'outerBounds': {
      'width': 1024,
      'height': 768
    }
  });
});

/*

/!**
* Listens for the app restarting then re-creates the window.
*
* @see http://developer.chrome.com/apps/app.runtime.html
    *!/
chrome.app.runtime.onRestarted.addListener(function() {
  runApp();
});

/!**
 * Creates the window for the application.
 *
 * @see http://developer.chrome.com/apps/app.window.html
 *!/
function runApp() {
  chrome.app.window.create('browser.html', {
    id: "browserWinID",
    innerBounds: {
      'width': 1024,
      'height': 768
    }
  });
}
*/
