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

export const useRouterParams = () => {
  const {
    location: { pathname, search },
  } = history;

  const params = new URLSearchParams(search.slice(1));

  const get = (param, parser) => {
    const result = params.get(param);

    if (parser) return parser(result);
    return result;
  };

  const set = (param, value) => {
    params.set(param, value);

    history.replace({
      pathname,
      search: params.toString(),
    });
  };

  return [get, set];
};
/**
 * @param  {} key key to sort on
 * @param  {} desc=false to sort in descending order
 */
export const sortBy = (key, desc = false) => (a, b) => {
  if (a[key] > b[key]) return desc ? -1 : 1;
  if (a[key] < b[key]) return desc ? 1 : -1;
  return 0;
};

export const clickable = onClick => ({
  onClick,
  tabIndex: 0,
  role: 'button',
  onKeyPress: e => (e.keyCode === 13 || e.charCode === 13) && onClick(),
});
