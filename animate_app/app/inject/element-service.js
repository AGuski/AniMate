/**
 * This script handles the element selection and return to the main app
 */

/* This variable will probably not exist on any website */
var an1M4t3 = {};


/* Define Aniframe selection frame */
var aniframe = document.createElement("aniframe");
aniframe.style.border = "4px solid rgb(255, 0, 0)";
aniframe.style.position = "fixed";
aniframe.style.pointerEvents = "none";
aniframe.innerHTML = "Hello";

/*************** Event Listeners **************/

window.addEventListener ('DOMContentLoaded', () => {
  document.body.appendChild(aniframe);
});

window.addEventListener('mouseover', () => {
  an1M4t3.elementList = document.querySelectorAll(':not(aniframe):hover');
  an1M4t3.topElement = an1M4t3.elementList[an1M4t3.elementList.length-1];

  /* Send elements to webview contextMenu */
  chrome.runtime.sendMessage({elements: getElementIdentifiers(an1M4t3.elementList)});

  /* Set the frame around the selected Element */
  //setAniframe(an1M4t3.topElement);
});

window.addEventListener('message', (event) => {
  if (event.data.message === 'getElement') {
    try {
      var elementJSON = domJSON.toJSON(an1M4t3.elementList[event.data.elIndex], {
        metadata: false,
        computedStyle: true,
        deep: 0
      });
      event.source.postMessage({type: 'element', element: elementJSON}, '*');
    } catch(e) {
      event.source.postMessage({type: 'error', message: e+""}, '*');
    }
  }
});

/************** Helper Functions **************/

/**
 * Returns a string to give the user a possibility to identify the element
 */
function getElementIdentifiers(elementArray) {
  return Array.from(elementArray).map((element) => {
    var elClass = element.getAttribute("class") || "";
    var elId = element.getAttribute("id") || "";
    return `<${element.tagName}> class="${elClass}" id="${elId}"`;
  });
}

/**
 * sets the position & size of the aniframe - NOT SATISFACTORY!!
 */
function setAniframe(element) {
  aniframe.style.width = element.offsetWidth+"px";
  aniframe.style.height = element.offsetHeight+"px";
  aniframe.style.left = element.offsetLeft+"px";
  aniframe.style.top = element.offsetTop+"px";
}
