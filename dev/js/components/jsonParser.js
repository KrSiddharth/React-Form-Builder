import React from 'react';
import Icon from '../components/icon'
require('../../scss/style.scss');


class JsonParser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      error: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.parseJson = this.parseJson.bind(this);
  }

  handleChange(event) {
    this.setState({error: null});
    this.setState({value: event.target.value});
  }

  parseJson() {
    this.setState({error: null});
    this.props.parseJson(this.state.value).then(() => {
      console.log('parsed');
    }).catch((e) => {
      this.setState({error: e});
    });
  }

  render() {
    return (
      <div className='parserWrapper'>
        <textarea value={this.state.value} onChange={this.handleChange}></textarea>
        {
          this.state.error &&
          <div className='errorMessage block'><Icon icon='error' /> <span>{`${this.state.error}`}</span></div>
        }
        <button onClick={this.parseJson}>Parse JSON</button>
      </div>
    );
  }
}

export default JsonParser;
