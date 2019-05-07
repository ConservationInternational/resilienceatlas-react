import React, { FC, useState, useCallback } from 'react';
import cx from 'classnames';
import { useDropzone } from 'react-dropzone';

import Tabs from '@shared/Tabs';
import { useDownloadableReport } from '@utilities/hooks/downloadableReport';
import AnalysisContent from './AnalysisContent';

const ACCEPTED_EXTENSIONS = ['.json', '.geojson'];

interface P {
  drawing: Boolean;
  geojson: L.GeoJSON;
}

export const AnalysisPanel: FC<P> = ({
  // actions
  setDrawing,
  setGeojson,
  toggle,
  // data
  drawing,
  geojson,
  iso,
}) => {
  const [tab, setTab] = useState(geojson && !iso ? 'shape' : 'region');
  const switchTab = useCallback(
    e => {
      const newTab = e.target.dataset.tab;

      if (tab !== newTab) {
        setTab(newTab);
        setGeojson(null);
      }
    },
    [tab],
  );

  const toggleDrawing = useCallback(() => {
    setDrawing(!drawing);
  }, [drawing]);

  const resetAnalytics = useCallback(() => {
    setGeojson(null);
  }, []);

  const onDrop = useCallback(([file]) => {
    const regex = new RegExp(`((${ACCEPTED_EXTENSIONS.join('|')}))$`);

    if (!regex.test(file.name)) {
      window.alert(
        'Only .json and .geojson files are accepted. Please select a different file.',
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = e => {
      try {
        const json = JSON.parse(e.target.result);

        // Simple check to validate the format of the file
        const types = [
          'Feature',
          'FeatureCollection',
          'Point',
          'MultiPoint',
          'LineString',
          'MultiLineString',
          'Polygon',
          'MultiPolygon',
          'GeometryCollection',
        ];
        if (!json.type || !types.includes(json.type)) {
          throw new Error(
            'The file doesn\'t have a top-level "type" property correctly defined.',
          );
        }

        setGeojson(json);
      } catch (err) {
        console.error(err);
        window.alert(
          "The file can't be read. Make sure it's the GeoJSON is valid.",
        );
      }
    };

    reader.readAsText(file);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const downloadableReport = useDownloadableReport();

  return (
    <div className="m-sidebar analysis-panel" id="analysisPanelView">
      <div className="title">
        <button
          className="btn-analysis-panel-contract"
          type="button"
          onClick={toggle}
          aria-label="Contract analysis panel"
        />
        Analysis
      </div>
      <div className="content">
        <div id="analysisSelectorsView" className="m-analysis-selectors">
          <div className="m-analysis-model">
            <div className="tabs js-tabs">
              <button
                type="button"
                className={cx({ '-active': tab === 'region' })}
                data-tab="region"
                onClick={switchTab}
              >
                Country or region
              </button>
              <button
                type="button"
                className={cx({ '-active': tab === 'shape' })}
                data-tab="shape"
                onClick={switchTab}
              >
                Draw or upload shape
              </button>
            </div>

            {!geojson ? (
              <Tabs activeTab={tab} renderActiveOnly>
                <Tabs.Pane name="region">
                  <p>Select a country or region from the list below.</p>
                  <div className="m-search-analysis">
                    <svg className="icon-search">
                      <use
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        xlinkHref="#icon-search"
                      />
                    </svg>
                    <input
                      className="searchAnalysis"
                      placeholder="Type country"
                      type="search"
                    />
                    <div className="analysisSearchContent search-box" />
                  </div>
                </Tabs.Pane>
                <Tabs.Pane name="shape">
                  <p>
                    Draw on the map the area you want to analyze or pick a file.
                  </p>
                  <div className="buttons">
                    <button
                      type="button"
                      className="btn -primary js-toggle-draw"
                      onClick={toggleDrawing}
                    >
                      {drawing ? 'Cancel' : 'Start drawing'}
                    </button>
                    <br />
                    or
                    <br />
                    <button
                      {...getRootProps()}
                      type="button"
                      className={cx('btn -dotted', { '-active': isDragActive })}
                    >
                      {isDragActive
                        ? 'Drop here'
                        : 'Click here to select a GeoJSON file or drag and drop the file here'}
                    </button>
                    <input
                      {...getInputProps()}
                      hidden
                      accept=".json,.geojson"
                    />
                  </div>
                </Tabs.Pane>
              </Tabs>
            ) : (
              <>
                <AnalysisContent />
                <div className="buttons">
                  <a className="btn -primary" {...downloadableReport}>
                    Download PDF report
                  </a>
                  <button
                    type="button"
                    className="btn -secondary"
                    onClick={resetAnalytics}
                  >
                    Reset the analysis
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div id="analysisView" className="m-analysis" />
      </div>
    </div>
  );
};
