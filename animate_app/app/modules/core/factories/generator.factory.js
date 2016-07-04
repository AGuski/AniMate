export function generatorFactory() {
  'ngInject';

  var createOptionString = (indentation, key, value) => {
    if (typeof value === 'number') {
      return indentation+key+': '+value;
    } else {
      return indentation+key+': "'+value+'"';
    }
  }

  var createOptionsString = (indentation, options) => {
    var string = '{\n';
    var keys = Object.keys(options);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // adding tab for indention
      string += createOptionString(indentation+'\t', key, options[key]);
      // the last option does not get a , afterwards
      if (i < keys.length - 1) {
        string += ',\n';
      } else {
        string += '\n';
      }
    }
    string += indentation + '}';
    return string;
  }

  var createJQueryVar = (indentation, variableName, selector) => {
    return /*'\n'+indentation+'// create new element\n'+*/indentation+'var '+variableName+' = $("'+selector+'");\n';
  }

  var createNewTimeline = (indentation, variableName, options) => {
    var string = /*'\n'+indentation+'// create new timeline\n'+*/indentation+'var '+variableName+' = new TimelineMax(';
    string += createOptionsString(indentation, options);
    string += ');\n';
    return string;
  }

  var createKeyframe = (indentation, timeline, element, duration, options) => {
    var string = indentation+timeline+'.add(TweenMax.to('+element+', '+duration+', ';
    string += createOptionsString(indentation, options);
    string += '));\n';
    return string;
  }

  var createAnimation = (timeline, indentation) => {
    var element = timeline.element;

    var string = '';
    string += createJQueryVar(indentation, element.name, element.selector);
    string += createNewTimeline(indentation, timeline.name, timeline.attributes);
    // string += '\n'+indentation+'// create keyframes\n';
    element.keyframes.forEach((keyframe) => {
      string += createKeyframe(indentation, timeline.name, element.name, keyframe.time, keyframe.attributes);
    });
    string += '\n';
    return string;
  }

  var createAnimations = (timelines) => {
    var indentation = '\t';

    var string = '';
    string += '($(document).ready(function() {\n';
    timelines.forEach((timeline) => {
      string += createAnimation(timeline, indentation);
    });
    string += '}))();';
    return string;
  }

  return {
    generateCode: (timelines) => {
      return createAnimations(timelines);
    }
  }
}