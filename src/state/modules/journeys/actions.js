import api, { createApiAction, PORT, get } from '../../utils/api';

const URL_JOURNEYS = '/journeys';
const URL_JOURNEYS_PAGE_INDEX = '/journeys/journeysPageIndex.json';

// Action constants
export const LOAD_PAGE_INDEX = createApiAction('journeys/LOAD_PAGE_INDEX');

export const loadPageIndex = () => dispatch => {
  dispatch({ type: LOAD_PAGE_INDEX.REQUEST });

  // need custom thunk because response don't have a data field, but simple json
  get(URL_JOURNEYS_PAGE_INDEX, { options: { baseURL: PORT } })
    .then(res => {
      dispatch({ type: LOAD_PAGE_INDEX.SUCCESS, payload: res.data });
    })
    .catch(error => {
      dispatch({ type: LOAD_PAGE_INDEX.FAIL, error });
    });
};
