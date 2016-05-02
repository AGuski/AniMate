/* devtools.js */


/* Creates the AniMate Panel in the devtools UI */
chrome.devtools.panels.create("AniMate",
    "MyPanelIcon.png",
    "Panel.html",
    function(panel) {

    }
);


/* Establishes the connection to the background.js */
var bgPageConnection = chrome.runtime.connect({
    name: 'devtools'
});


/* Sends Messages to background.js */
bgPageConnection.postMessage({content: "Message from DevTools!"});


/* Called when message from the Background Page is received */
bgPageConnection.onMessage.addListener(function(message) {


	/* Example: return the message to background.js */
	//bgPageConnection.postMessage({content: message});

 	chrome.devtools.inspectedWindow.eval("doSelectedElement($0)",
	{ useContentScriptContext: true });

});

