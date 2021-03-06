import { subdomain } from '@utilities/getSubdomain';
import api, { createApiAction } from '../../utils/api';
import { layer, source } from '../../schema';

const URL_LAYERS = `/layers?lang=${window.currentLocation || 'en'}`;

// Action constants
export const LOAD = createApiAction('layers/LOAD');
export const TOGGLE = 'layers / TOGGLE';
export const SET_ACTIVES = 'layers / SET_ACTIVES';
export const SET_OPACITY = 'layers / SET_OPACITY';
export const SET_CHART_LIMIT = 'layers / SET_CHART_LIMIT';
export const REORDER = 'layers / REORDER';

export const load = () =>
  api(
    LOAD,
    ({ get }) => get(URL_LAYERS, { params: { site_scope: subdomain } }),
    {
      schema: [layer],
      includedSchema: [source],
    },
  );

export const setActives = actives => ({
  type: SET_ACTIVES,
  actives,
});

export const toggle = id => ({
  type: TOGGLE,
  id,
});

export const reorder = (startIndex, endIndex) => ({
  type: REORDER,
  startIndex,
  endIndex,
});

export const setOpacity = (id, opacity) => ({
  type: SET_OPACITY,
  id,
  opacity,
});

export const setChartLimit = (id, chartLimit) => ({
  type: SET_CHART_LIMIT,
  id,
  chartLimit,
});
