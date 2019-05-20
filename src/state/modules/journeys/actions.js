import api, { createApiAction, PORT } from '../../utils/api';

const URL_JOURNEYS = '/journeys';

// Action constants
export const LOAD_PAGE_INDEX = createApiAction('journeys/LOAD_PAGE_INDEX');

export const loadPageIndex = () =>
  api(LOAD_PAGE_INDEX, ({ get }) =>
    get(URL_JOURNEYS, { baseURL: `${PORT}/api` }),
  );
