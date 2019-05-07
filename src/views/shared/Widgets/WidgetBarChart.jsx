import React, { FC, useCallback } from 'react';
import { useWidget } from '@utilities/hooks';

interface P {
  name: string;
  slug: string;
  query: string;
  meta_short: string;
  hasLine: boolean;
  metadata: string;
  xAxisTickFormatter: any;
  verticalLabels: boolean;
}

export const WidgetBarChart: FC<P> = ({
  name,
  slug,
  query,
  meta_short,
  metadata,
  hasLine,
  verticalLabels,
  xAxisTickFormatter,
  unit,
  unitZ,
}) => {
  const parseData = useCallback(
    ({ rows }) =>
      rows.map(value => ({
        x: value.min,
        y: value.count,
        value: value.y,
        color: value.y < 0 ? '#D8D8D8' : '#0089CC',
        ...(hasLine
          ? {
              color: '#D8D8D8',
              lineColor: '#0089CC',
            }
          : {}),
      })),
    [hasLine],
  );
  const { rootWidgetProps, data, noData } = useWidget(
    { name, slug },
    query,
    parseData,
  );

  return (
    <div {...rootWidgetProps()}>
      <div className="name">{name}</div>
      {noData ? (
        <div className="widget-no-data">
          <h3>NO DATA AVAILABLE</h3>
        </div>
      ) : (
        // <Bars
        //   id={`widget-${slug}-graph`}
        //   className="widget-bar-chart graph bar-chart"
        //   data={data}
        //   barWidth={22}
        //   barSeparation={13}
        //   hover
        //   interpolate="basis"
        //   unit={unit}
        //   unitZ={unitZ}
        //   hasLine={hasLine}
        //   xAxisTickFormatter={xAxisTickFormatter}
        //   verticalLabels={verticalLabels}
        // />
        <div />
      )}

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
