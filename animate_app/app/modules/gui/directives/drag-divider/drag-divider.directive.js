let DragDividerController = class {
  constructor($element, $attrs, $document, $window, $scope){
    'ngInject';

    Object.assign(this, {
      element: $element,
      window: $window
    });

    this.divRatio = $attrs.divRatio;

    this.isVertical = $attrs.divDirection === 'vertical';
    this.divider = angular.element($element[0].querySelector('.divider'));

    this._setDividerClasses();

    // Drag EventListener
    this.divider.on('mousedown', (event) => {
      event.preventDefault();
      let offset = this._getWindowSize()-this._getElementSize();
      $document.on('mousemove', (event) => {
        let clientPos = this.isVertical ? event.clientY : event.clientX;
        if (clientPos > offset && clientPos < this._getElementSize()) {
          $scope.$apply( () => {
            this.divRatio = ((clientPos-(offset))*(100/this._getElementSize()))/100;
          });
        }
      });
      $document.on('mouseup', () => {
        $document.off('mousemove', this.mousemove);
        $document.off('mouseup', this.mouseup);
      });
    });
  }

  _getElementSize(){
    return this.isVertical ? this.element[0].clientHeight : this.element[0].clientWidth;
  }

  _getWindowSize(){
    return this.isVertical ? this.window.innerHeight : this.window.innerWidth;
  }

  _setDividerClasses(){
    // if set to vertical or else
    if (this.isVertical){
      angular.element(this.element).addClass('vertical-div');
      this.divider.addClass('vertical-divider');
    } else {
      angular.element(this.element).addClass('horizontal-div');
      this.divider.addClass('horizontal-divider');
    }
  }
  
}

export function DragDividerDirective() {
  'ngInject';
  return {
    restrict: 'EA',
    transclude: {
      'topSlot': 'topDiv',
      'bottomSlot': 'bottomDiv'
    },
    templateUrl: 'modules/gui/directives/drag-divider/drag-divider.html',
    controller: DragDividerController,
    controllerAs: 'ctrl',
    bindings: {
      divRatio: '='
    }
  }
}