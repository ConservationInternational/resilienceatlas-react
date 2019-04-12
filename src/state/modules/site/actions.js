import api, { createApiAction } from '../../utils/api';
import { site_scopes } from '../../schema';

const URL_SITE = '/site';

// Action constants
export const LOAD = createApiAction('site/LOAD');

export const load = () =>
  api(LOAD, ({ get }) => get(URL_SITE), { schema: site_scopes });
