let CollapseContainerController = class {

	constructor($q, propertyFactory, projectFactory) {
		'ngInject';
		this.visibility="hidden";
		this.data;
		this.project= projectFactory.getProject();
		this.actualElement = this.project._activeElement;
		propertyFactory.getData().then(
			(data) => {
				this.data = data;
			}
		);
	}
	toggle(){

		// TODO: implement with ngAnimate

		if(this.visibility==="hidden"){
			this.visibility="show";
		}else if(this.visibility==="hide"){
			this.visibility="show";
		}else{
			this.visibility="hide";
		}
	}
}

export default {
	templateUrl: 'modules/gui/components/collapse-container/collapse-container.html',
	controller: CollapseContainerController,
	controllerAs: 'ctrl',
	bindings: {
		category: '<'
	}
}