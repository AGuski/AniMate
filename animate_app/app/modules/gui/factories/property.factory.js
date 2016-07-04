export function propertyFactory($http){
  'ngInject';

  let data = $http.get("assets/properties.json").then(function (properties) {
    return properties.data;
  });
  
  return{
    getData
  }

  function getData(){
    return data;
  }
  
}