import React from 'react';
import Input from '../components/input'
import Icon from '../components/icon'
require('../../scss/style.scss');


class BuildComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isActive: false};

    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
  }

  handleChange(event) {
    this.props.changeComponentType(this.props.componentKey, event.target.value);
  }

  handleRemove() {
    this.props.removeComponent(this.props.componentKey);
  }

  handleMove(direction) {
    this.props.moveComponent(this.props.componentKey, direction);
  }

  handleAddOption() {
    this.props.addOption(this.props.componentKey);
  }

  handleClick() {
    this.props.makeComponentActive(this.props.componentKey);
  }

  handleCheckBoxChange(event) {
    this.props.makeMandatory(this.props.componentKey, event.target.checked);
  }

  render() {
    const {activeComponent, componentKey, addLabel, component, isValidForm} = this.props;
    return (
      <div onClick={this.handleClick} className={activeComponent === componentKey ? 'activeComponent formComponent' : 'formComponent'}>
        <div>
          <Input isValidForm={isValidForm} addLabel={addLabel} value={component.label} componentKey={componentKey}/>
          <select className='topAlign mxMd' onChange={this.handleChange} value={component.type}>
            <option value="text">Text</option>
            <option value="shortAnswer">Short Answer</option>
            <option value="radioButton">Radio Button</option>
            <option value="dropDown">Dropdown</option>
          </select>
          {
            this.props.totalComponents !== 1 &&
            <span className='inline-block topAlign mxSm' onClick={this.handleRemove}>
              <Icon width='25' height='25' icon='delete' />
            </span>
          }
          {
            this.props.componentKey !== 0 &&
            <span className='inline-block topAlign mxSm' onClick={() => this.handleMove(-1)}>
              <Icon icon='up' />
            </span>
          }
          {
            this.props.totalComponents !== 1 && this.props.componentKey !== (this.props.totalComponents -1) &&
            <span className='inline-block topAlign mxSm' onClick={() => this.handleMove(1)}>
              <Icon icon='down' />
            </span>
          }
        </div>
        <div>
          { component.type === 'shortAnswer' &&
            <Input inputType='shortAnswer' dotted value='Answer comes here'/>
          }
          { (component.type === 'radioButton' ||  component.type === 'dropDown') &&
            <div>
              <ul>
                {component.options.map((option, i) => (<li key={i}><Input isValidForm={isValidForm} isOption addLabel={addLabel} value={option} componentKey={componentKey} optionKey={i} placeholder={`Option ${i+1}`}/></li>))}
              </ul>
              <span className='addOption' onClick={this.handleAddOption}>Add Option</span>
            </div>
          }
          {
            component.type !== 'text' && <div className='requiredInput'>
              <input
                className='checkbox'
                name="isMandatory"
                type="checkbox"
                checked={component.isRequired}
                onChange={this.handleCheckBoxChange} />
              <span className='addOption'>Required</span>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default BuildComponent;
