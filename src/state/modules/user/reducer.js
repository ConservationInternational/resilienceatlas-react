import { createReducer } from '../../utils';
import { LOGIN, SIGNUP, EDIT_PROFILE, LOGOUT } from './actions';

const initialState = {
  ...JSON.parse(localStorage.getItem('resilience_user')),
};

export default createReducer(initialState)({
  [LOGIN]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),

  [SIGNUP]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),

  [EDIT_PROFILE]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),

  [LOGOUT]: () => ({}),
});
