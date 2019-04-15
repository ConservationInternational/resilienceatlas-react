import { createReducer } from '../../utils';
import { LOAD, SET_ACTIVES, TOGGLE, SET_OPACITY, REORDER } from './actions';
import { getPersistedLayers } from './utils';

const initialState = {
  byId: {
    /* [layerId]: { layer } */
  },
  all: [
    /* layerId */
  ],
  actives: getPersistedLayers(),
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

  [TOGGLE]: (state, { id }) => {
    const actives = new Set(state.actives);

    if (actives.has(id)) actives.delete(id);
    else actives.add(id);

    return {
      ...state,
      actives: [...actives],
    };
  },

  [REORDER]: (state, { startIndex, endIndex }) => {
    const actives = [...state.actives];
    const [removed] = actives.splice(startIndex, 1);
    actives.splice(endIndex, 0, removed);

    return {
      ...state,
      actives,
    };
  },

  [SET_OPACITY]: (state, { id, opacity }) => ({
    ...state,
    byId: {
      ...state.byId,
      [id]: {
        ...state.byId[id],
        opacity,
      },
    },
  }),
});
