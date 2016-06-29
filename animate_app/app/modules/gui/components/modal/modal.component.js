let ModalController = class {
  constructor(modalFactory) {
    'ngInject';
    this.modalFactory = modalFactory;
  }

  close(){
    this.modalFactory.removeModal();
  }
}

export default {
  templateUrl: 'modules/gui/components/modal/modal.html',
  controller: ModalController,
  bindings: {
    title: '@'
  },
  transclude: true
}