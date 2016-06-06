let propertiesContainerController = class {
	constructor() {
	'ngInject';
	}
	next(name){
		console.log("next Keyframe: "+name);
	}
	activation(name){
		console.log("activation Keyframe: "+name);
	}
	previous(name){
		console.log("previous Keyframe: "+name);
	}

	isSelection(type) {
		return type === 'selection';
	}

}

export default {
	templateUrl: 'modules/gui/components/properties-container/properties-container.html',
	controller: propertiesContainerController,
	controllerAs: 'ctrl',
	bindings: {
		content: '<'
	}
}