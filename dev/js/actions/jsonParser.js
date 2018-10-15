const jsonParser = (json) => {
    return {
        type: 'PARSE_JSON',
        payload: {
          json,
        }
    }
};



export const parseJson = (json) => {
  return (dispatch, getState) => {
    let components;
    let error = null;
    try {
      components = JSON.parse(json);
    } catch(e) {
      error = e;
    }

    //more checks need to be implemented

    if(!error){
      try {
        if(components && Array.isArray(components)) {
          components.forEach((component, i) => {
            if (!(typeof component === 'object')) {
              throw `Invalid Json: component at position ${i} isn't an object`;
            }
            if(!component.hasOwnProperty('type')){
              throw `Invalid Json: component at position ${i} doesn't have type property`;
            } else if(['text', 'radioButton', 'dropDown', 'shortAnswer'].indexOf(component.type) === -1) {
              throw `Invalid Json: component at position ${i} has wrong type property`;

            }
            if(component.hasOwnProperty('options')){
              if(!Array.isArray(component.options)){
                throw `Invalid Json: component's options at position ${i} isn't an array`;
                //need to check array's elements as well
              }
            } else if(component.type !== 'text' && component.type !== 'shortAnswer'){
              components[i].options = [''];
            }
            if(component.hasOwnProperty('isRequired')){
              if(!(typeof component.isRequired === 'boolean')){
                throw `Invalid Json: component's isRequired at position ${i} isn't a boolean`;
              }
            } else {
              component.isRequired = false;
            }
            if(component.hasOwnProperty('label')){
              if(!(typeof component.label === 'string')){
                throw `Invalid Json: component's label at position ${i} isn't a string`;
              }
            } else {
              component.label = '';
            }
          });
        } else {
          throw 'Invalid Json: components are not array';
        }
      } catch(e) {
        error = e;
      }
    }

    return new Promise(function(resolve, reject) {
      if (error) {
        reject(error);
      } else {
        dispatch(jsonParser(components));
        resolve();
      }
    });
  };
};
