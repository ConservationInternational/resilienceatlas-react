import { createReducer } from '../../utils';
import {
  SET_GEOJSON,
  SET_DRAWING,
  SET_BASEMAP,
  SET_BOUNDS,
  SET_ISO,
} from './actions';
import { getRouterParam, subdomain } from '@utilities';

const initialState = {
  drawing: false,
  geojson: getRouterParam('geojson', JSON.parse),
  bounds: null,
  iso: getRouterParam('iso'),
  basemap:
    getRouterParam('basemap') ||
    (subdomain === 'atlas' ? 'satellite' : 'defaultmap'),
};

export default createReducer(initialState)({
  [SET_DRAWING]: (state, { payload }) => ({
    ...state,
    drawing: payload,
  }),

  [SET_GEOJSON]: (state, { payload }) => ({
    ...state,
    geojson: payload,
  }),

  [SET_BASEMAP]: (state, { payload }) => ({
    ...state,
    basemap: payload,
  }),

  [SET_BOUNDS]: (state, { payload }) => ({
    ...state,
    bounds: payload,
  }),
  [SET_ISO]: (state, { payload }) => ({
    ...state,
    iso: payload,
  }),
});
