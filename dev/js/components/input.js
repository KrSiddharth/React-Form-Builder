import React from 'react';
import Icon from '../components/icon'
require('../../scss/style.scss');


class Input extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.addLabel(this.props.componentKey, event.target.value, this.props.optionKey);

  }

  render() {
    const { inputType, value, placeholder, isOption, isValidForm } = this.props
    return (
      <div className='inputWrapper'>
        <input
          className={(isOption || inputType === 'shortAnswer') ? 'dotted' : ''}
          disabled={inputType === 'shortAnswer'}
          type="text"
          placeholder={placeholder ? placeholder : ''}
          value={value ? value : ''}
          onChange={this.handleChange}
        />
      {
        !isValidForm && value === '' && inputType !== 'shortAnswer' &&
        <div className='errorMessage'><Icon icon='error' /> <span>Field can't be empty</span></div>
      }
      </div>
    );
  }
}

export default Input;
