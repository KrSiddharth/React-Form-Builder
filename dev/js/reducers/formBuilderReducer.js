const initialState = {
  components: [
    {
      type: 'text',
      label: '',
      isRequired: false
    }
  ],
  activeComponent: null,
  isValidForm: true,
};

function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
};

export default function reducer(state=initialState, { type, payload })  {

  if(type === 'ADD_COMPONENT') {
    const updatedComponents = Array.from(state.components);
    updatedComponents.push({
      type: 'text',
      label: '',
      isRequired: false
    });
    return Object.assign({}, state, { components: updatedComponents });
  }

  if(type === 'CHANGE_COMPONENT_TYPE') {
    const updatedComponents = Array.from(state.components);
    updatedComponents[payload.path].type = payload.value;
    if (payload.value === 'radioButton' || payload.value === 'dropDown') {
      updatedComponents[payload.path].options = [''];
    } else if(updatedComponents[payload.path].hasOwnProperty('options')){
      delete updatedComponents[payload.path].options;
    }
    return Object.assign({}, state, { components: updatedComponents });
  }

  if(type === 'REMOVE_COMPONENT') {
    const updatedComponents = Array.from(state.components);
    updatedComponents.splice(payload.path, 1);
    return Object.assign({}, state, { components: updatedComponents });
  }

  if(type === 'MOVE_COMPONENT') {
    let updatedComponents = Array.from(state.components);
    updatedComponents = array_move(updatedComponents, payload.componentKey, payload.componentKey + payload.direction);
    return Object.assign({}, state, { components: updatedComponents });
  }

  if(type === 'ADD_OPTION') {
    let updatedComponents = Array.from(state.components);
    updatedComponents[payload.componentKey].options.push('');
    return Object.assign({}, state, { components: updatedComponents });
  }

  if(type === 'MAKE_COMPONENT_ACTIVE') {
    return Object.assign({}, state, { activeComponent: payload.componentKey });
  }

  if(type === 'ADD_LABEL') {
    const updatedComponents = Array.from(state.components);
    if(payload.optionKey !== undefined){
      updatedComponents[payload.componentKey].options[payload.optionKey] = payload.label;
    } else {
      updatedComponents[payload.componentKey].label = payload.label;
    }
    return Object.assign({}, state, { components: updatedComponents });
  }

  if(type === 'MAKE_MANDATORY') {
    const updatedComponents = Array.from(state.components);
    updatedComponents[payload.componentKey].isRequired = payload.value;
    return Object.assign({}, state, { components: updatedComponents });
  }

  if(type === 'VALIDATE_FORM') {
    return Object.assign({}, state, { isValidForm: payload.isValid });
  }

  if(type === 'PARSE_JSON') {
    return Object.assign({}, state, { components: payload.json });
  }
  return state;
}
