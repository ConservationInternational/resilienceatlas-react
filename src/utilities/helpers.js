import qs from 'qs';
import history from '../history';

/**
 * @param  {string} param name of query param you want to set
 * @param  {string} value value to set
 *
 * @returns  {void}
 */
export const setRouterParam = (param, value) => {
  const {
    location: { pathname, search },
  } = history;

  const params = new URLSearchParams(search.slice(1));
  params.set(param, value);

  history.replace({
    pathname,
    search: params.toString(),
  });
};

export const getRouterParam = param => {
  const {
    location: { search },
  } = history;

  const params = new URLSearchParams(search.slice(1));
  return params.get(param);
};

export const useRouterParams = () => {
  const {
    location: { pathname, search },
  } = history;

  const params = new URLSearchParams(search.slice(1));

  const getParam = (param, parser) => {
    const result = params.get(param);

    if (parser) return parser(result);
    return result;
  };

  const setParam = (param, value) => {
    params.set(param, value);

    history.replace({
      pathname,
      search: params.toString(),
    });
  };

  const removeParam = param => {
    params.delete(param);

    history.replace({
      pathname,
      search: params.toString(),
    });
  };

  return { getParam, setParam, removeParam };
};
/**
 * @param  {string} key key to sort on
 * @param  {boolean} desc=false to sort in descending order
 */
export const sortBy = (key, desc = false) => (a, b) => {
  if (a[key] > b[key]) return desc ? -1 : 1;
  if (a[key] < b[key]) return desc ? 1 : -1;
  return 0;
};

/**
 * @param  {function} onClick click handler to be bound to element
 *
 * @returns  {object} object of properties to semantically hanlde click
 */
export const clickable = onClick => ({
  onClick,
  tabIndex: 0,
  role: 'button',
  onKeyPress: e => (e.keyCode === 13 || e.charCode === 13) && onClick(),
});

/**
 * @param  {array} array input array
 *
 * @returns  {array} array of only unique values
 */
export const uniq = array => Array.from(new Set(array));
