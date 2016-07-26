export function keyframeClassService(){
  'ngInject';
  return class{
    constructor(_pot) {
      this._pot = _pot;
      this._properties = [];  //{'name': '', 'value': ''}
    }

    addProperty(property) {
      let filtered = this._properties.filter((e) => {
        return e.name === property.name;
      });
      if (filtered.length === 0) {
        this._properties.push(property);
      } else {
        filtered[0].value = property.value;
      }
    }

    hasProperty(propertyname){
      return this._properties === undefined;
    }

    convertPropertiesForGeneration() {
      const properties = {};
      this._properties.forEach((el) => {
        properties[el.name] = el.value;
      });
      return properties;
    }

    convertKeyframeForGeneration() {
      return {
        time: this._pot,
        attributes: this.convertPropertiesForGeneration()
      }
    }
  };
}