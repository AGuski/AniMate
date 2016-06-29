export function modalFactory($rootScope, $compile, $templateCache){
	'ngInject';

	let modalContent;

	return {
		createModal,
		removeModal
	};

	/**
	 *  Creates and displays a modal
	 *  $scope parameter is optional. It makes the parent scope available in the content template.
	 */
	function createModal(title, content, $scope) {
		if (content.templateUrl !== undefined) {
			modalContent = $templateCache.get(content.templateUrl);
		} else {
			modalContent = content;
		}
		let scope = $scope ? $scope : $rootScope;
		let element = $compile(`<modal title="${title}">${modalContent}</modal>`)(scope)
		angular.element(document.querySelector('body'))
			.append(element);
	}

	function removeModal(){
		angular.element(document.querySelector('modal')).remove();
	}
}