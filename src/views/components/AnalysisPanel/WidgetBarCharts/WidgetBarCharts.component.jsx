import React, { FC } from 'react';
import cx from 'classnames';
import { useFetch } from '@utilities/hooks';

const url = 'https://cdb-cdn.resilienceatlas.org/user/ra/api/v2/sql';

const Widget = ({ widgetName, name, slug, analysisQuery, meta_short }) => {
  const [data, loading, loaded, error] = useFetch(url, { q: analysisQuery });

  console.log(data);
  const noData = loaded && (!data || !data.length);

  return (
    <div
      id={slug}
      className={cx('m-widget', {
        [widgetName]: !!widgetName,
        'is-loading': loading,
      })}
    >
      <div className="name">{name}</div>
      {noData ? (
        <div className="widget-no-data">
          <h3>NO DATA AVAILABLE</h3>
        </div>
      ) : (
        <div
          id={`${slug}-graph`}
          className="widget-bar-chart graph bar-chart"
        />
      )}

      {meta_short && (
        <div className="meta-short">
          {'meta_short'}
          <button
            type="button"
            className="btn-analysis-info"
            data-info="{{metadata}}"
            data-name="{{name}}"
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

interface P {
  activeLayers: Object[];
}

export const WidgetBarCharts: FC<P> = ({ activeLayers }) => {
  const analyzable = activeLayers.filter(l => l.analysisSuitable);

  if (!activeLayers.length) {
    return 'Please toggle some layers on to analyze them.';
  }

  if (!analyzable.length) {
    return 'None of the active layers can be analyzed.';
  }

  return (
    <div className="analysis-content">
      {analyzable.map(layer => (
        <Widget key={layer.slug} {...layer} />
      ))}

      {activeLayers.length !== analyzable.length && (
        <p>Some active layers can&apos;t be analyzed.</p>
      )}
    </div>
  );
};
