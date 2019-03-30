import api, { createApiAction } from '../../utils/api';
import { layer_group } from '../../schema';

const URL_LAYER_GROUPS = '/layer-groups';

// Action constants
export const LOAD = createApiAction('layer_groups/LOAD');

export const load = () =>
  api(LOAD, ({ get }) => get(URL_LAYER_GROUPS), {
    schema: [layer_group],
  });
