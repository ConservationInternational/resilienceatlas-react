import cx from 'classnames';
import { AxiosRequestConfig } from 'axios';
import { useMemo, useCallback } from 'react';
import { useAxios } from './useAxios';

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
  {
    analysisQuery,
    analysisBody,
  }: { analysisQuery: string, analysisBody: string },
  parseData: Function,
) => {
  const query = useMemo((): AxiosRequestConfig => {
    const geometry = geojson.features
      ? geojson.features[0].geometry
      : geojson.geometry;

    if (analysisBody) {
      const { assetId } = JSON.parse(analysisBody);

      return {
        method: 'post',
        url: analysisQuery,
        data: {
          assetId,
          geometry,
        },
      };
    }

    const q = analysisQuery.replace(/{{geometry}}/g, JSON.stringify(geometry));

    return {
      method: 'get',
      url: sqlApi,
      params: {
        q,
      },
    };
  }, [geojson]);
  const [data, loading, loaded, error] = useAxios(query, [], parseData);

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
