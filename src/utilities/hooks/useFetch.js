import { useReducer, useEffect, useRef } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import createReducer from '../../state/utils/createReducer';
import { createApiAction, get } from '../../state/utils/api';

type FetchResult = [any, boolean, boolean, any];

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
/**
 * @param  {string} url
 * @param  {AxiosRequestConfig} config
 * @param  {array} deps=[] React useEffect dependencies to execute fetch on
 *
 * @returns {array} [data, loading, lodaed, error]
 */
export const useFetch = (
  url: string,
  config: AxiosRequestConfig,
  deps = [],
  parseData: Function,
): FetchResult => {
  const source = useRef(axios.CancelToken.source());
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    dispatch({ type: FETCH.REQUEST });

    get(url, { ...config, cancelToken: source.current.token })
      .then(({ data }) =>
        dispatch({
          type: FETCH.SUCCESS,
          data: parseData ? parseData(data) : data,
        }),
      )
      .catch(error => dispatch({ type: FETCH.FAIL, error }));

    return () => {
      if (state.loading) {
        source.current.cancel(
          'Operation canceled because tagret component was unmounted.',
        );
      }
    };
  }, deps);

  return [state.data, state.loading, state.loaded, state.error];
};
