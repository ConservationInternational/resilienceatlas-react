import React from 'react';
import Helmet from 'react-helmet';
import MapView from '@components/Map';

const MapPage = () => (
  <>
    <Helmet title="Map" />

    <div className="l-sidebar--fullscreen">
      <div className="l-sidebar-content">
        <div className="m-sidebar analysis-panel" id="analysisPanelView">
          <div className="title">
            <button
              className="btn-analysis-panel-contract"
              type="button"
              aria-label="Contract analysis panel"
            >
              Analysis
            </button>
          </div>
          <div className="content">
            <div id="analysisSelectorsView" className="m-analysis-selectors" />
            <div id="analysisView" className="m-analysis" />
          </div>
        </div>
        <div className="m-sidebar" id="sidebarView" />
        <button
          className="btn-sidebar-toggle"
          type="button"
          aria-label="Toggle sidebar"
        />
        <button
          className="btn-analysis-panel-expand"
          type="button"
          aria-label="Expand analysis panel"
        >
          Analysis
        </button>
      </div>
    </div>

    <div className="l-content--fullscreen">
      <MapView
        options={{
          map: {
            minZoom: 2,
            maxZoom: 25,
            zoomControl: false,
          },
        }}
      />

      <div className="m-loader" id="loader">
        loading
      </div>
      <div className="m-toolbar" id="toolbarView" />

      <div className="m-legend" id="legendView" />
    </div>
  </>
);

export default MapPage;
