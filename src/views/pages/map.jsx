import React from 'react';
import Helmet from 'react-helmet';
import MapView from '@components/Map';
import Sidebar from '@components/Sidebar';
import Legend from '@components/Legend';

import Loader from '@shared/Loader';

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

      <Loader />

      <Legend />
    </div>
  </>
);

export default MapPage;
