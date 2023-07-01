import {createStore,applyMiddleware} from 'redux';
import rootReducer from './reducers';
import Thunk from 'redux-thunk';

const store = createStore(rootReducer,{},applyMiddleware(Thunk));

export default store;