let AppBarController = class {
  constructor($element, $state) {
    'ngInject';
    this.state = $state;
    this.element = $element;
    this.title='AniMate';
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