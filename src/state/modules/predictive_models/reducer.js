import qs from 'qs';
import { createReducer } from '../../utils';
import { LOAD, SELECT, TOGGLE_INDICATOR, UDPATE_INDICATOR } from './actions';
import { getRouterParam } from '@utilities';
import {
  getIndexableIndicatorValueRange,
  getRealIndicatorValueFromIndex,
  getHumanReadableIndicatorValueFromIndex,
} from './utils';

const initialState = {
  byId: {
    /* [modelId]: { model } */
  },
  all: [
    /* modelId */
  ],
  selected: getRouterParam('model', qs.parse).name,
  indicators: {
    /* [indicatorId]: { indicator } */
  },
  categories: {
    /* [categoryId]: { category } */
  },
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

  [LOAD.SUCCESS]: (state, { payload, included }) => ({
    ...state,
    byId: payload.entities.models,
    all: payload.result,
    categories: included.entities.categories,
    indicators: included.entities.indicators,
    loading: false,
    loaded: true,
  }),

  [LOAD.FAIL]: (state, { error }) => ({
    ...initialState,
    loading: false,
    error,
  }),

  [SELECT]: (state, { name }) => ({
    ...state,
    selected: name,
  }),

  [TOGGLE_INDICATOR]: (state, { id }) => {
    const indicator = state.indicators[id];
    const [min, max] = getIndexableIndicatorValueRange();
    const indexableValue = indicator.value ? null : (max - min) / 2;

    return {
      ...state,
      indicators: {
        ...state.indicators,
        [id]: {
          ...indicator,
          value: getRealIndicatorValueFromIndex(indexableValue),
          indexableValue,
          humanReadableValue: getHumanReadableIndicatorValueFromIndex(
            indexableValue,
          ),
        },
      },
    };
  },

  [UDPATE_INDICATOR]: (state, { id, indexableValue }) => ({
    ...state,
    indicators: {
      ...state.indicators,
      [id]: {
        ...state.indicators[id],
        value: getRealIndicatorValueFromIndex(indexableValue),
        indexableValue,
        humanReadableValue: getHumanReadableIndicatorValueFromIndex(
          indexableValue,
        ),
      },
    },
  }),
});
