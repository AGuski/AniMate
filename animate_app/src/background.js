/* background.js */
"use strict";

/*
  Connections & Message handling
 */

var connections = {};

/* Called when another script connects via runtime.connect() */
chrome.runtime.onConnect.addListener(function(connection) {

  /* Register the connection for the first time */
  connections[connection.name] = connection;
  console.log("Connected to: ", connection.name);


  /* Adds the on message behavior on the connection */
  /* all message handling  -- needs to be outsourced */
  var messageListener = function(message){

    switch (connection.name) {
      case 'devtools':
        /*  Receive Message from devtools.js */
        console.log("Message received: ", message.content);

        /* Example: return Message to devtools.js */
        connection.postMessage({content: "To DevTools from Background!"});
        break;


      case 'panel':
        /*  Receive Message from panel.js */
        console.log("Message received: ", message.content);

        /* Example: return Message to panel.js */
        connection.postMessage({content: "To Panel from Background!"});
        break;

      default:
        console.log('This connection is not implemented');
    }

  }

  connection.onMessage.addListener(messageListener);

  /* Removes the listener on disconnect */
  connection.onDisconnect.addListener(function(connection) {
    connection.onMessage.removeListener(messageListener);

    var tabs = Object.keys(connections);
    for (var i=0, len=tabs.length; i < len; i++) {
      if (connections[tabs[i]] == connection) {
        delete connections[tabs[i]]
        break;
      }
    }
  });
  

});


/* Called when the user clicks on the browser action. Callback argument 'tab' returns the current open tab. */
chrome.browserAction.onClicked.addListener(function(tab) {

  /* Example: Send a message to the active tab */
  /* chrome.tabs. -> communicates with the content Script */
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });

});