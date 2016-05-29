/* background.js */
"use strict";

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window.html', {
    'outerBounds': {
      'width': 640,
      'height': 500
    }
  });
});