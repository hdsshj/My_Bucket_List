import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import bucket from './modules/bucket';

//미들 웨어
const middlewares = [thunk];
// 루트 리듀서
const rootReducer = combineReducers({bucket});
const enhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, enhancer);

export default store;

