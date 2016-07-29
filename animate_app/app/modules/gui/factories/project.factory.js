export function projectFactory(Element, Project){
  'ngInject';

  let project = new Project();

  return {
    addElement,
    removeElement,
    getElements,
    getProject,
    getProjectLength,
    getTime,
    getTimelinesForGeneration
  };
  function addElement(el) {
    project.addElement(new Element(el, "Element_"+project._elements.length));
  }
  function removeElement(el) {
    project.removeElement(el);
  }
  function getElements() {
    return project._elements;
  }
  function getProject() {
    return project;
  }
  function getProjectLength() {
    return project._length;
  }
  function getTime() {
    return project._dot;
  }
  function getTimelinesForGeneration(loop) {
    return project.getTimelinesForGeneration(loop);
  }
}