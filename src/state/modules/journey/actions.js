import api, { createApiAction, PORT } from '../../utils/api';

const URL_JOURNEY = '/journeys/1';

// Action constants
export const LOAD_JOURNEY_INDEX = createApiAction(
  'journeys/LOAD_JOURNEY_INDEX',
);

export const loadJourneyInfo = () =>
  api(LOAD_JOURNEY_INDEX, ({ get }) =>
    get(URL_JOURNEY, { baseURL: `${PORT}/api` }),
  );
