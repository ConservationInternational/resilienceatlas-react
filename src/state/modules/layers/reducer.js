import { createReducer } from '../../utils';
import { LOAD, SET_ACTIVES, TOGGLE } from './actions';

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
    byId: payload.entities.layers,
    all: payload.result,
    loading: false,
    loaded: true,
  }),

  [LOAD.FAIL]: state => ({
    ...state,
    loading: false,
    error: true,
  }),

  [SET_ACTIVES]: (state, { ids }) => ({
    ...state,
    byId: {
      ...state.byId,
      ...ids.reduce(
        (acc, id) => ({
          ...acc,
          [id]: {
            ...state.byId[id],
            active: true,
          },
        }),
        {},
      ),
    },
  }),

  [TOGGLE]: (state, { id }) => ({
    ...state,
    byId: {
      ...state.byId,
      [id]: {
        ...state.byId[id],
        active: !state.byId[id].active,
      },
    },
  }),
});
