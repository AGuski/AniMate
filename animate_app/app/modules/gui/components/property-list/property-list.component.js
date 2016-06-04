let PropertyListController = class {
	constructor($q, propertyFactory) {
		'ngInject';

		this.data;
		propertyFactory.getData().then(
			(data) => {
				this.data = data;
			}
		);
	}
}

export default {
	templateUrl: 'modules/gui/components/property-list/property-list.html',
	controller: PropertyListController,
	controllerAs: 'ctrl',
	bindings:{}
}