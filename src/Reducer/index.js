import { combineReducers } from 'redux';
import LayDs from './InitialState';
const myReducer = combineReducers({
    Auth: LayDs
});
export default myReducer;