import { createReducer } from '../../utils';
import { LOAD } from './actions';

const initialState = {
  byId: {
    /* [layerId]: { layer } */
  },
  all: [
    /* layerId */
  ],
  loading: false,
  loaded: false,
  error: null,
};

export default createReducer(initialState)({
  [LOAD.REQUEST]: state => ({
    ...state,
    loading: true,
    error: null,
  }),
  [LOAD.SUCCESS]: (state, { payload }) => ({
    ...state,
    byId: payload.entities.layer_groups,
    all: payload.result,
    loaded: true,
    loading: false,
  }),

  [LOAD.FAIL]: state => ({
    ...state,
    loading: false,
    error: true,
  }),
});
