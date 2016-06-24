export function projectFactory(Element, Project){
  'ngInject';

  let project = new Project();

  return {
    addElement,
    getElements,
    getProject,
    getProjectLength
  };

  function addElement(el){
    let tempElement = new Element(el.name, el.class, el.id);
    project.addElement(tempElement);
  }
  function getElements(){
    return project._elements;
  }
  function getProject(){
    return project;
  }
  function getProjectLength(){
    return project._length;
  }
}