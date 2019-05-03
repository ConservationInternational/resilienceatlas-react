import { createReducer } from '../../utils';
import {
  LOAD,
  SET_ACTIVES,
  TOGGLE,
  SET_OPACITY,
  REORDER,
  SET_CHART_LIMIT,
} from './actions';
import { getPersistedLayers } from './utils';
import { merge } from '@utilities';

const persistedLayers = getPersistedLayers();

const initialState = {
  byId: {
    /* [layerId]: { layer } */
    ...persistedLayers.entities.persisted_layers,
  },
  all: [
    /* layerId */
  ],
  actives: [...persistedLayers.result],
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
    byId: merge(payload.entities.layers, state.byId),
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

  [SET_CHART_LIMIT]: (state, { id, chartLimit }) => ({
    ...state,
    byId: {
      ...state.byId,
      [id]: {
        ...state.byId[id],
        chartLimit,
      },
    },
  }),
});
