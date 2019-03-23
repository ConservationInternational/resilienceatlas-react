import api, { createApiAction } from '../../utils/api';

const URL_SITE = '/site';

// Action constants
export const LOAD = createApiAction('site/LOAD');

export const load = () => api(LOAD, ({ get }) => get(URL_SITE));
