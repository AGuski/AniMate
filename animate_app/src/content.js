// content.js
"use strict";

console.log("Content Script loading...");

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
    	console.log("Blah");
	}
  }
);

// Do Stuff with inspectedElement from devtools.js
function doSelectedElement(el) {
    console.log(el);
}