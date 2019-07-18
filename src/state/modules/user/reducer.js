import { createReducer } from '../../utils';
import { LOGIN, EDIT_PROFILE, LOGOUT, LOAD_PROFILE } from './actions';

const initialState = {
  auth_token: null,
  loading: false,
  loaded: false,
  error: null,
};

export default createReducer(initialState)({
  [LOGIN]: (state, { auth_token }) => ({
    ...state,
    auth_token,
  }),

  [LOAD_PROFILE.REQUEST]: state => ({
    ...state,
    loading: true,
    error: null,
  }),

  [LOAD_PROFILE.SUCCESS]: state => ({
    ...state,
    loading: false,
    loaded: true,
  }),

  [LOAD_PROFILE.FAIL]: (state, { error }) => ({
    ...state,
    loading: true,
    error,
  }),

  [EDIT_PROFILE]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),

  [LOGOUT]: () => initialState,
});
