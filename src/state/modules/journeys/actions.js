import api, { createApiAction, PORT } from '../../utils/api';

const URL_JOURNEYS = '/journeys';
const URL_JOURNEYS_PAGE_INDEX = '/journeys/journeysPageIndex.json';

// Action constants
export const LOAD_PAGE_INDEX = createApiAction('journeys/LOAD_PAGE_INDEX');

export const loadPageIndex = () =>
  api(LOAD_PAGE_INDEX, ({ get }) =>
    get(URL_JOURNEYS_PAGE_INDEX, { baseURL: `${PORT}/api` }),
  );
