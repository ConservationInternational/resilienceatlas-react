import axios from 'axios';

export const PORT =
  process.env.NODE_ENV === 'production' || process.env.API_PROD === true
    ? process.env.REACT_APP_API_PROD
    : process.env.REACT_APP_API_HOST;

const defaultConfig = {
  baseURL: `${PORT}/api`,
  headers: {
    Accept: 'application/json, text/javascript, */*; q=0.01',
    'Content-Type': 'application/json',
  },
};

let axiosInstance = axios.create(defaultConfig);

export const updateApi = config => {
  axiosInstance = axios.create({ ...defaultConfig, ...config });
};

export const createApiAction = (name = '') => {
  const prefix = name.split('/').join(' / ');

  return {
    REQUEST: `${prefix} / REQUEST`,
    SUCCESS: `${prefix} / SUCCESS`,
    FAIL: `${prefix} / FAIL`,
  };
};

export const makeRequest = (method, url, options = {}) => {
  const { data, params, options: overrides } = options;
  const headers = { ...axiosInstance.defaults.headers, ...options.headers };

  return axiosInstance({
    method,
    url,
    data,
    params,
    headers,
    ...overrides,
  }).catch(error =>
    error.response
      ? Promise.reject({
          error: true,
          ...error.response,
        })
      : Promise.reject({ error: error.message }),
  );
};

export const get = (url, config) => makeRequest('get', url, config);
export const post = (url, config) => makeRequest('post', url, config);
export const put = (url, config) => makeRequest('put', url, config);
export const patch = (url, config) => makeRequest('patch', url, config);
export const del = (url, config) => makeRequest('delete', url, config);
export const requestHandlers = { get, post, put, patch, del };

/**
 * Redux API helper for request -> success/fail flow
 * @param apiAction - can be created using `createApiAction`
 * @param cb - callback which executes requests
 * @returns {function(*, *)}
 */
export default (apiAction, cb, meta) => dispatch => {
  dispatch({ type: apiAction.REQUEST, meta });

  return cb(requestHandlers)
    .then(({ data, status, headers }) => {
      dispatch({
        type: apiAction.SUCCESS,
        payload: { ...data, status, headers },
        meta,
      });
    })
    .catch(error => {
      if (error.error) {
        dispatch({
          type: apiAction.FAIL,
          meta,
        });
      } else {
        console.error(error);
      }
    });
};
