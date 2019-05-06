import { useReducer, useEffect } from 'react';
import createReducer from '../../state/utils/createReducer';
import { createApiAction, get } from '../../state/utils/api';

const FETCH = createApiAction('FETCH');

const initialState = {
  loading: false,
  loaded: false,
  error: null,
  data: null,
};

const fetchReducer = createReducer(initialState)({
  [FETCH.REQUEST]: state => ({
    ...state,
    loading: true,
    error: null,
  }),

  [FETCH.SUCCESS]: (state, { data }) => ({
    ...state,
    loading: false,
    loaded: true,
    data,
  }),

  [FETCH.FAIL]: (state, { error }) => ({
    ...state,
    loading: false,
    loaded: true,
    error,
  }),
});

export const useFetch = (url, body, deps = []) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    dispatch({ type: FETCH.REQUEST });

    get(url, { data: body })
      .then(data => dispatch({ type: FETCH.SUCCESS, data }))
      .catch(error => dispatch({ type: FETCH.FAIL, error }));
  }, deps);

  return [state.data, state.loading, state.loaded, state.error];
};
