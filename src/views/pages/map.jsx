import React from 'react';
import Helmet from 'react-helmet';
import MapView from '@components/Map';
import Sidebar from '@components/Sidebar';
import Legend from '@components/Legend';
import InfoWindow from '@components/InfoWindow';

import { LayerManagerProvider } from '@contexts/layerManagerCtx';

import Loader from '@shared/Loader';

const MapPage = () => (
  <LayerManagerProvider>
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

      <InfoWindow />
    </div>
  </LayerManagerProvider>
);

export default MapPage;
