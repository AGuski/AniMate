let propertiesContainerController = class {
	constructor(projectFactory) {
		'ngInject';
		this.project = projectFactory.getProject();
		this.activeElement=this.project._activeElement;
	}
	getValue(name){
		if(this.project._activeElement === null) return "";
		let defaultValue = this.project._activeElement._object.style[name];
		// return this.project._activeElement._timeline.getProperty(this.project._pot, name);
		return defaultValue;
	}
	changeValue(name, value){
		return this.project._activeElement._timeline.addProperty(this.project._pot, name, value);
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
};

export default {
	templateUrl: 'modules/gui/components/properties-container/properties-container.html',
	controller: propertiesContainerController,
	controllerAs: 'ctrl',
	bindings: {
		content: '<'
	}
};