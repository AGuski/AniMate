chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('app.html', {
    'outerBounds': {
      'width': 1024,
      'height': 768
    }
  });
});