let AppBarController = class {
	constructor() {
		'ngInject';
		this.title="AniMate";
	}
}

export default {
	templateUrl: 'modules/gui/components/app-bar-component/app-bar.html',
	controller: AppBarController,
	controllerAs: 'ctrl',
	bindings:{}
}