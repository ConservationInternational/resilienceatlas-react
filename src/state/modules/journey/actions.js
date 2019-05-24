import api, { createApiAction, PORT } from '../../utils/api';

// Action constants
export const LOAD_JOURNEY_INDEX = createApiAction(
  'journeys/LOAD_JOURNEY_INDEX',
);

export const SET_CURRENT_STEP = 'journey/SET_CURRENT_STEP';
export const SET_CURRENT_JOURNEY = 'journeys/SET_CURRENT_JOURNEY';

export const loadJourneyInfo = id =>
  api(LOAD_JOURNEY_INDEX, ({ get }) =>
    get(`/journeys/${id}`, { baseURL: `${PORT}/api` }),
  );

export const setCurrentStep = currentStep => ({
  type: SET_CURRENT_STEP,
  currentStep,
});

export const updateJourney = id => ({
  type: SET_CURRENT_JOURNEY,
  currentStep: 0,
  id,
});
