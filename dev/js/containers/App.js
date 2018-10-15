import React from 'react';
import FormBuilder from '../containers/formBuilder'
import Icon from '../components/icon'
require('../../scss/style.scss');

const App = () => (
    <div>
        <header>
          <h2 className='white-font'>
            <Icon icon='react' width='50' height='50' viewBox='0 0 180 180'/>
            React Form Builder</h2>
        </header>
        <FormBuilder />
    </div>
);

export default App;
