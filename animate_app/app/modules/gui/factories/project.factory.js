export function projectFactory(){
  'ngInject';

  let elements = [];

  return{
    addElement,
    getElements
  };

  function addElement(el){
    console.log("added Element: { name: "+el.name+", class: "+el.class+", id: "+el.id+" }");
    // elements.push(new Element(el.name, el.class, el.id));
  }
  function getElements(){
    return elements;
  }
}