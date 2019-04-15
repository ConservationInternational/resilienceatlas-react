import React from 'react';
import Helmet from 'react-helmet';
import MapView from 'views/components/Map';
import Sidebar from 'views/components/Sidebar';
import Legend from 'views/components/Legend';

const MapPage = () => (
  <>
    <Helmet title="Map" />

    <Sidebar />

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

      <Legend />
    </div>
  </>
);

export default MapPage;
