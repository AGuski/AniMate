let CollapseContainerController = class {

	constructor($q, propertyFactory) {
		'ngInject';
		this.visibility="hidden";
		this.data;
		propertyFactory.getData().then(
			(data) => {
				this.data = data;
			}
		);
	}
	toggle(){

		// TODO: implement with ngAnimate

		console.log(this.visibility);
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