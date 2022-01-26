import {combineReducers} from 'redux';
import { itemReducers, reducers, homeReducer, itemExpireReducer } from './reducers';


const reducers1 = combineReducers({
    users: reducers,
    item: itemReducers,
    home: homeReducer,
    itemExpired: itemExpireReducer
})

export default reducers1;