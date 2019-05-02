import { createReducer } from '../../utils';
import { SET_GEOJSON, SET_DRAWING } from './actions';

export const initialState = {
  drawing: false,
  geojson: null,
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
