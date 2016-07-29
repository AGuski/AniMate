let AppBarController = class {
  constructor($element, $state, modalFactory) {
    'ngInject';
    this.state = $state;
    this.element = $element;
    this.logo = 'assets/logo.png';
    this.title='AniMate';
    this.modalFactory = modalFactory;
  }

  toggleSettings(){
    const SETTINGS_TITLE = 'Settings';
    if (document.getElementById('modal') && this.modalFactory.getTitle() === SETTINGS_TITLE) {
      this.modalFactory.removeModal();
    } else {
      this.modalFactory.createModal(SETTINGS_TITLE, '<div ui-view="settings"></div>');
    }
  }

  toggleFileExport(){
    const MODAL_TITLE = 'File Export';
    if (document.getElementById('modal') && this.modalFactory.getTitle() === MODAL_TITLE) {
      this.modalFactory.removeModal();
    } else {
      this.modalFactory.createModal(MODAL_TITLE, '<div ui-view="fileExport"></div>');
    }
  }

  /*
   * Takes an array with states as strings and switches betweet them in a circle
   */
  rotateStates(states) {
		states.forEach((state, index) => {
			if (this.state.includes(state)) {
				this.state.go(states[(index+1)%states.length]);
      }
		});
  }

  /*
   * Toggles between a parent and its child state.
   */
  toggleChildState (childState) {
    if (this.state.get(childState)) {
      this.state.go(childState);
    } else if (this.state.includes('main.*'+childState)) {
      this.state.go('^');
    }
  }

  hasState(state) {
    return this.state.includes('main.*'+state);
  }

}

export default {
  templateUrl: 'modules/gui/components/app-bar/app-bar.html',
  controller: AppBarController,
  controllerAs: 'ctrl',
  bindings:{}
}