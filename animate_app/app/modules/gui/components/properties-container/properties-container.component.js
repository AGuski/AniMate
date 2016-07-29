let propertiesContainerController = class {
	constructor(projectFactory, $scope) {
		'ngInject';
		this.project = projectFactory.getProject();
		this.activeElement = this.project._activeElement;

		for(let x in this.content){
			this.content[x].value = "";
		}

		$scope.$on('selectKeyframe', (event, keyframe)=>{
			this.activeElement = this.project._activeElement;
			for(let x in this.content){
				if(keyframe.contains(this.content[x].name)){
					this.content[x].value = keyframe.getValue(this.content[x].name);
				}else{
					this.content[x].value = this.activeElement.getValue(this.content[x].name);
				}
			}
		});

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