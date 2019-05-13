import { createReducer } from '../../utils';
import { SET_GEOJSON, SET_DRAWING, SET_BASEMAP } from './actions';
import { getRouterParam } from '@utilities';

const initialState = {
  drawing: false,
  geojson: getRouterParam('geojson', JSON.parse),
  basemap: getRouterParam('basemap') || 'defaultmap',
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
});
