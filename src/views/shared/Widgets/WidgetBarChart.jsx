import React, { FC, useCallback } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  Tooltip,
} from 'recharts';

import InfoWindow from '@components/InfoWindow';

import { useWidget, formatNumber } from '@utilities';
import { CustomTooltip } from './CustomTooltip';

const tickOptions = { fill: '#999', fontSize: 14 };

interface P {
  name: string;
  slug: string;
  query: string;
  meta_short: string;
  metadata: string;
  geojson: L.GeoJSON;
}

export const WidgetBarChart: FC<P> = ({
  responsive,
  name,
  slug,
  analysisQuery,
  analysisBody,
  meta_short,
  metadata,
  geojson,
}) => {
  const parseData = useCallback(({ rows }) => rows, []);
  const { rootWidgetProps, loaded, data, noData } = useWidget(
    { slug, geojson },
    { analysisQuery, analysisBody },
    parseData,
  );

  return (
    <div {...rootWidgetProps()}>
      <div className="name">{name}</div>
      {loaded &&
        (noData ? (
          <div className="widget-no-data">
            <h3>NO DATA AVAILABLE</h3>
          </div>
        ) : (
          <ResponsiveContainer
            width={responsive ? 670 : 400}
            height={responsive ? 300 : 240}
          >
            <BarChart data={data} margin={{ top: 40, bottom: 50 }}>
              <CartesianGrid vertical={false} strokeDasharray="2 2" />
              <XAxis
                dataKey="min"
                interval={0}
                tick={{
                  ...tickOptions,
                  angle: -90,
                  dx: -6,
                }}
                tickFormatter={value =>
                  formatNumber({
                    value,
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  })
                }
                textAnchor="end"
                tickLine={false}
              />
              <YAxis
                allowDataOverflow
                axisLine={false}
                tickLine={false}
                tickCount={10}
                tickFormatter={value =>
                  formatNumber({
                    value,
                    formatFrom: 1e3,
                    maximumFractionDigits: 0,
                  })
                }
                tick={{ ...tickOptions }}
                padding={{ right: 20 }}
              />

              <Tooltip content={CustomTooltip} />
              <Bar
                barSize={responsive ? 18 : 12}
                dataKey="count"
                fill="#0089CC"
              />
            </BarChart>
          </ResponsiveContainer>
        ))}

      {meta_short && (
        <div className="meta-short">
          {meta_short}
          {metadata && (
            <button
              type="button"
              className="btn-analysis-info"
              data-info={metadata}
              data-name={name}
              onClick={() => InfoWindow.show(name, metadata)}
            >
              <svg className="icon icon-info">
                <use xlinkHref="#icon-info" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

WidgetBarChart.defaultProps = {
  widgetName: '',
};
