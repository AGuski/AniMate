export function projectFactory(Element, Project){
  'ngInject';

  let project = new Project();

  return {
    addElement,
    getElements,
    isActiveElement,
    setActiveElement
  };

  function addElement(el){
    let tempElement = new Element(el.name, el.class, el.id);
    project.addElement(tempElement);
  }
  function getElements(){
    return project._elements;
  }
  function isActiveElement(el){
      return project._activeElement.equalsByDescription(el);
  }
  function setActiveElement(el){
      return project._activeElement=el;
  }
}