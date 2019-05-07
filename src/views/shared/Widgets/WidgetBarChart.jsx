import React, { FC, useCallback } from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Bar, Tooltip } from 'recharts';

import { useWidget } from '@utilities/hooks';
import { CustomTooltip } from './CustomTooltip';

interface P {
  name: string;
  slug: string;
  query: string;
  meta_short: string;
  metadata: string;
  geojson: L.GeoJSON;
}

export const WidgetBarChart: FC<P> = ({
  name,
  slug,
  query,
  meta_short,
  metadata,
  geojson,
}) => {
  const parseData = useCallback(({ rows }) => rows, []);
  const { rootWidgetProps, loaded, data, noData } = useWidget(
    { slug, geojson },
    query,
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
          <BarChart
            data={data}
            width={400}
            height={240}
            margin={{ top: 40, bottom: 50 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="2 2" />
            <XAxis
              dataKey="min"
              interval={0}
              tick={{
                angle: -90,
                fill: '#999',
                dx: -6,
              }}
              tickFormatter={v => v.toFixed(3)}
              textAnchor="end"
              tickLine={false}
            />
            <YAxis
              allowDataOverflow
              axisLine={false}
              tickLine={false}
              tickCount={10}
              tick={{ fill: '#999' }}
              padding={{ right: 20 }}
            />

            <Tooltip content={CustomTooltip} />
            <Bar dataKey="count" fill="#0089CC" />
          </BarChart>
        ))}

      {meta_short && (
        <div className="meta-short">
          {meta_short}
          <button
            type="button"
            className="btn-analysis-info"
            data-info={metadata}
            data-name={name}
          >
            <svg className="icon icon-info">
              <use xlinkHref="#icon-info" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

WidgetBarChart.defaultProps = {
  widgetName: '',
};
