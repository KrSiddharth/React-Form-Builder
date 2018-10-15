import React from 'react';
import Input from '../components/input'
import Icon from '../components/icon'
require('../../scss/style.scss');


class FormComponent extends React.Component {

  render() {
    const {component, componentKey} = this.props;
    return (
      <div>
        <div className='formComponent'><span className='label'>{component.label}</span>
          {
            component.isRequired && <span className='requiredMark'>*</span>
          }
        {
          component.type === 'shortAnswer' &&
          <div><Input /></div>
        }
        {
          component.type === 'radioButton' && component.options.map((option, i) => (
            <div className='mySm'><input type="radio" key={`radioButton${i}`} name={`radioButton${componentKey}`} value={option} /> <span>{option}</span></div>))
        }
        {
          component.type === 'dropDown' && <div>
            <select className='mySm'>
            {component.options.map((option, i) => (
              <option key={`select${i}`} value={option}>{option}</option>))}
            </select>
          </div>
        }
        </div>
      </div>
    );
  }
}

export default FormComponent;
