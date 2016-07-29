export function modalFactory($rootScope, $compile, $templateCache){
	'ngInject';

	let modalContent, modalTitle;

	return {
		createModal,
		removeModal,
		getTitle
	};

	/**
	 *  Creates and displays a modal
	 *  $scope parameter is optional. It makes the parent scope available in the content template.
	 */
	function createModal(title, content, $scope) {
		modalTitle = title;
		// There can be only one modal!
		if (document.getElementById('modal')) {
			removeModal();
		}
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

	function getTitle(){
		return modalTitle;
	}
}