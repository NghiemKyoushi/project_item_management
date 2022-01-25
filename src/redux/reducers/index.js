import {combineReducers} from 'redux';
import { itemReducers, reducers } from './reducers';


const reducers1 = combineReducers({
    users: reducers,
    item: itemReducers
})

export default reducers1;