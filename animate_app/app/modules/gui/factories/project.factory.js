export function projectFactory(Element, Project){
  'ngInject';

  let project = new Project();

  return {
    addElement,
    getElements,
    getProject,
    getProjectLength,
    getTime
  };
  function addElement(el){
    project.addElement(new Element(el, "Element_"+project._elements.length));
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
  function getTime(){
    return project._dot;
  }
}