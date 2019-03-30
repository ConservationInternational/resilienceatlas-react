import api, { createApiAction } from '../../utils/api';
import { layer, source } from '../../schema';

const URL_LAYERS = `/layers?lang=${window.currentLocation || 'en'}`;

// Action constants
export const LOAD = createApiAction('layers/LOAD');

export const load = () =>
  api(LOAD, ({ get }) => get(URL_LAYERS), {
    schema: [layer],
    includedSchema: [source],
  });
