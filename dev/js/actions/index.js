export const addComponent = () => {
    return {
        type: 'ADD_COMPONENT',
    }
};

export const changeComponentType = (path, value) => {
    return {
        type: 'CHANGE_COMPONENT_TYPE',
        payload: {
          path,
          value
        }
    }
};

export const removeComponent = (path) => {
    return {
        type: 'REMOVE_COMPONENT',
        payload: {
          path
        }
    }
};

export const moveComponent = (componentKey, direction) => {
    return {
        type: 'MOVE_COMPONENT',
        payload: {
          componentKey,
          direction
        }
    }
};

export const addOption = (componentKey) => {
    return {
        type: 'ADD_OPTION',
        payload: {
          componentKey
        }
    }
};

export const makeComponentActive = (componentKey) => {
    return {
        type: 'MAKE_COMPONENT_ACTIVE',
        payload: {
          componentKey
        }
    }
};

export const addLabel = (componentKey, label, optionKey) => {
    return {
        type: 'ADD_LABEL',
        payload: {
          componentKey,
          label,
          optionKey
        }
    }
};

export const makeMandatory = (componentKey, value) => {
    return {
        type: 'MAKE_MANDATORY',
        payload: {
          componentKey,
          value
        }
    }
};

const formValidation = (isValid) => {
    return {
        type: 'VALIDATE_FORM',
        payload: {
          isValid,
        }
    }
};

export function validateForm() {
  return (dispatch, getState) => {
    let components = getState().builder.components;
    let isError = false;
    components.forEach((component, i) => {
      if(component.label === ''){
        isError = true;
      }
      if(component.options){
        component.options.every((option) => {
          if(option === ''){
            isError = true;
            return false;
          }
          return true;
        })
      }
    });

    return new Promise(function(resolve, reject) {
      if (isError) {
        dispatch(formValidation(false));
        reject();
      } else {
        dispatch(formValidation(true));
        resolve();
      }
    });
  };
}
