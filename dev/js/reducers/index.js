import {combineReducers} from 'redux';
import formBuilderReducer from './formBuilderReducer';

const allReducers = combineReducers({
    builder: formBuilderReducer,
});

export default allReducers
