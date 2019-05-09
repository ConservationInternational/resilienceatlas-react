import { createReducer } from '../../utils';
import { TOGGLE_SIDEBAR, TOGGLE_ANALYSIS_PANEL } from './actions';
import { getRouterParam } from '@utilities';

const geojson = getRouterParam('geojson');

const initialState = {
  sidebar: true,
  analysisPanel: !!geojson,
};

export default createReducer(initialState)({
  [TOGGLE_SIDEBAR]: state => ({
    ...state,
    sidebar: !state.sidebar,
  }),

  [TOGGLE_ANALYSIS_PANEL]: state => ({
    ...state,
    analysisPanel: !state.analysisPanel,
  }),
});
