import cx from 'classnames';
import { useMemo, useCallback } from 'react';
import { useFetch } from './useFetch';

const sqlApi = 'https://cdb-cdn.resilienceatlas.org/user/ra/api/v2/sql';

interface WidgetOptions {
  slug: string;
  geojson: L.GeoJSON;
}
/**
 * @param  {WidgetOptions} options
 * @param  {String} query
 * @param  {Function} parseData
 */
export const useWidget = (
  { slug, geojson }: WidgetOptions,
  query,
  parseData,
) => {
  const q = useMemo(() => {
    const geometry = geojson.features
      ? geojson.features[0].geometry
      : geojson.geometry;

    return query.replace(/{{geometry}}/g, JSON.stringify(geometry));
  }, [geojson]);
  const [data, loading, loaded, error] = useFetch(
    sqlApi,
    { params: { q } },
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

  const noData = !data || !data.length;

  return {
    rootWidgetProps,
    loaded,
    loading,
    data,
    noData,
  };
};
