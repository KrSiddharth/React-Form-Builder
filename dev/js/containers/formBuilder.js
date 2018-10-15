import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Input from '../components/input';
import BuildComponent from '../components/buildComponent';
import FormComponent from '../components/formComponent';
import JsonParser from '../components/jsonParser';
import {
  addComponent,
  changeComponentType,
  removeComponent,
  moveComponent,
  addOption,
  makeComponentActive,
  addLabel,
  makeMandatory,
  validateForm
} from '../actions/index'

import { parseJson } from '../actions/jsonParser'

class FormBuilder extends Component {

  constructor(props) {
    super(props);

    this.downloadJson = this.downloadJson.bind(this);
  }

  downloadJson() {
    this.props.validateForm().then(() => {
      this.download.click();
    }).catch(() => {
      console.log('catch');
    });
  }

    render() {
      const {
        removeComponent,
        changeComponentType,
        moveComponent,
        addOption,
        makeComponentActive,
        activeComponent,
        addLabel,
        makeMandatory,
        isValidForm,
        parseJson
      } = this.props;
        return (
            <div>
              <div className='form-component-wrapper'>
                  {
                    this.props.components.map((component,i) => (
                      <BuildComponent
                        changeComponentType={changeComponentType}
                        component={component}
                        totalComponents={this.props.components.length}
                        removeComponent={removeComponent}
                        moveComponent={moveComponent}
                        addOption={addOption}
                        addLabel={addLabel}
                        makeComponentActive={makeComponentActive}
                        componentKey={i}
                        activeComponent={activeComponent}
                        makeMandatory={makeMandatory}
                        key={i}
                        isValidForm={isValidForm}
                      />
                    ))
                  }
              </div>
              <div className='form-component-wrapper topAlign'>
                  {
                    this.props.components.map((component,i) => (
                      <FormComponent
                        component={component}
                        componentKey={i}
                        key={i}
                      />
                    ))
                  }
              </div>
              <div className='actionButtons'>
                <button onClick={this.props.addComponent}>Add Component</button>
                <button onClick={this.downloadJson}>Download JSON</button>
                <a ref={download => this.download = download} href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.props.components))}`} download='form.json'> Download</a>
              </div>
              <JsonParser parseJson={parseJson}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        components: state.builder.components,
        activeComponent: state.builder.activeComponent,
        isValidForm: state.builder.isValidForm
    };
}


function matchDispatchToProps(dispatch){
    return bindActionCreators(
      {
        addComponent: addComponent,
        changeComponentType: changeComponentType,
        removeComponent: removeComponent,
        moveComponent: moveComponent,
        addOption: addOption,
        makeComponentActive: makeComponentActive,
        addLabel: addLabel,
        makeMandatory: makeMandatory,
        validateForm: validateForm,
        parseJson: parseJson
      }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(FormBuilder);
