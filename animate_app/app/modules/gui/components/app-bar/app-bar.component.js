let AppBarController = class {
	constructor() {
		'ngInject';
		this.title="AniMate";
	}
}

export default {
	templateUrl: 'modules/gui/components/app-bar/app-bar.html',
	controller: AppBarController,
	controllerAs: 'ctrl',
	bindings:{}
}