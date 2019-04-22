import api, { createApiAction } from '../../utils/api';
import { layer_group } from '../../schema';

const URL_LAYER_GROUPS = '/layer-groups';

// Action constants
export const LOAD = createApiAction('layer_groups/LOAD');
export const OPEN_BATCH = 'layer_groups / OPEN_BATCH';

// Actions
export const openBatch = (ids = []) => ({
  type: OPEN_BATCH,
  ids,
});

export const load = () =>
  api(LOAD, ({ get }) => get(URL_LAYER_GROUPS), {
    schema: [layer_group],
  });
