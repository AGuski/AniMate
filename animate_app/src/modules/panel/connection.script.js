export let bgPageConnection = chrome.runtime.connect({
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

console.log('importet connection script!');