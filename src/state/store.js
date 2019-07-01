import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './modules';
import normalizrMiddleware from './middlewares/normalizrMiddleware';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const composeEnhancer = composeWithDevTools({});

export default createStore(
  combineReducers(reducers),
  composeEnhancer(applyMiddleware(thunkMiddleware, normalizrMiddleware)),
);
