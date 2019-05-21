import api, { createApiAction } from '../../utils/api';
import { model } from '../../schema';

const URL_MODELS = '/models';

// Action constants
export const LOAD = createApiAction('models/LOAD');

export const SELECT = 'models / SELECT';
export const TOGGLE_INDICATOR = 'models / TOGGLE_INDICATOR';
export const UDPATE_INDICATOR = 'models / UPDATE_INDICATOR';

// Actions
export const select = name => ({
  type: SELECT,
  name,
});

export const toggleIndicator = id => ({
  type: TOGGLE_INDICATOR,
  id,
});

export const updateIndicator = (id, indexableValue) => ({
  type: UDPATE_INDICATOR,
  id,
  indexableValue,
});

export const load = () => (dispatch, getState) => {
  const state = getState();
  const siteScope = state.site.id;

  return dispatch(
    api(LOAD, ({ get }) => get(URL_MODELS, { params: { siteScope } }), {
      schema: [model],
      includedSchema: 'union',
    }),
  );
};
