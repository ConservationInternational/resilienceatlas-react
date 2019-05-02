import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './modules';
import normalizrMiddleware from './middlewares/normalizrMiddleware';
import { persistState } from './utils';

const initialState = persistState();
// eslint-disable-next-line no-underscore-dangle
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers(reducers),
  initialState,
  composeEnhancer(applyMiddleware(thunkMiddleware, normalizrMiddleware)),
);
