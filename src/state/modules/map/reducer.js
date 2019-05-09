import { createReducer } from '../../utils';
import { SET_GEOJSON, SET_DRAWING } from './actions';
import { getRouterParam } from '@utilities';

const initialState = {
  drawing: false,
  geojson: getRouterParam('geojson', JSON.parse),
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
});
