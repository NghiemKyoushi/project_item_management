import { createStore } from 'redux';
import reducers1 from './reducers/index';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { reducers } from './reducers/reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["users"]
  }

const persistedReducer = persistReducer(persistConfig, reducers1);

const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const persistor = persistStore(store);

export default store;
