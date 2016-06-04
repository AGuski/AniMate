export function propertyFactory($http){
  'ngInject';

  return{
    getData
  };

  function getData(){
    return $http.get("assets/properties.json")
    .then(properties => properties.data);
  }
}