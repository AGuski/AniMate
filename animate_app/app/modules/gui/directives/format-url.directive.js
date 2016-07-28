export function FormatURLDirective() {
  'ngInject';
  return {
    restrict: 'A',
    require: 'ngModel',
    link: (scope, element, attr, ngModel) => {
      ngModel.$parsers.push(function(value){
        if (!/^https?:\/\//i.test(value)) {
          value = 'http://' + value;
        }
        return value;
      });
    }
  }
}