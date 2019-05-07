import cx from 'classnames';
import { useMemo, useCallback } from 'react';
import { useFetch } from './useFetch';
import { getRouterParam } from '@utilities';

const sqlApi = 'https://cdb-cdn.resilienceatlas.org/user/ra/api/v2/sql';

interface WidgetOptions {
  name: string;
  slug: string;
}
/**
 * @param  {WidgetOptions} options
 * @param  {String} query
 * @param  {Function} parseData
 */
export const useWidget = ({ name, slug }: WidgetOptions, query, parseData) => {
  const q = useMemo(() => {
    const geojson = getRouterParam('geojson', JSON.parse);
    const geometry = geojson.features
      ? geojson.features[0].geometry
      : geojson.geometry;

    return query.replace(/{{geometry}}/g, JSON.stringify(geometry));
  }, []);
  const [data, loading, loaded, error] = useFetch(
    sqlApi,
    {
      params: { q },
    },
    [],
    parseData,
  );

  const rootWidgetProps = useCallback(
    () => ({
      id: `widget-${slug}`,
      className: cx('m-widget', {
        'is-loading': loading,
        loaded,
      }),
    }),
    [loading],
  );

  const noData = !loaded || (!data || !data.length);

  return {
    data,
    rootWidgetProps,
    noData,
  };
};
