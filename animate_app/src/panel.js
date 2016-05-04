/* Establishes the connection to the background.js */
"use strict";

var bgPageConnection = chrome.runtime.connect({
    name: "panel"
});


bgPageConnection.postMessage({
    content: "Message from Panel!"
});

/* Called when message from the Background Page is received */
bgPageConnection.onMessage.addListener(function(message) {

	window.document.body.appendChild(document.createTextNode(message.content));

	/* Example: return the message to background.js */
	//bgPageConnection.postMessage({content: message});

});