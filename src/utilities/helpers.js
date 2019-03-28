import history from '../history';
/**
 * @param  {string} param name of query param you want to set
 * @param  {string} value value to set
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
