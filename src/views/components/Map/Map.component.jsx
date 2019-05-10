import React, { useCallback, useEffect } from 'react';
import qs from 'qs';
import { Map as Maps, MapControls, ZoomControl } from 'vizzuality-components';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginLeaflet } from 'layer-manager/dist/layer-manager';

import { setRouterParam } from '@utilities';
import { BASEMAPS } from '@views/utils';

import Toolbar from './Toolbar';
import DrawingManager from './DrawingManager';
import MapOffset from './MapOffset';

const MapView = ({
  // actions
  loadLayers,
  loadLayerGroups,
  openBatch,
  // data
  layers: { loaded: layersLoaded },
  layer_groups: { loaded: layerGroupsLoaded },
  activeLayers,
  defaultActiveGroups,
  location,
  site,
  page,
  options,
  basemap = 'defaultmap',
  embed,
}) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
    parseArrays: true,
  });

  useEffect(() => {
    loadLayers();
    loadLayerGroups();
  }, []);

  useEffect(() => {
    if (layersLoaded && layerGroupsLoaded && defaultActiveGroups.length) {
      openBatch(defaultActiveGroups);
    }
  }, [layersLoaded, layerGroupsLoaded]);

  useEffect(() => {
    const hash = activeLayers.map(({ id, opacity, chartLimit }, order) => ({
      id,
      opacity,
      order,
      chartLimit,
    }));

    if (layersLoaded) {
      setRouterParam('layers', JSON.stringify(hash));
    }
  }, [activeLayers]);

  const getCenter = useCallback(() => {
    if (site.lat) {
      return { lat: site.lat, lng: site.lng };
    }
    return { lat: 3.86, lng: 47.28 };
  }, [site.lat]);

  return (
    <Maps
      customClass="m-map"
      basemap={{
        url: BASEMAPS[basemap].url,
      }}
      mapOptions={{
        ...options.map,
        zoom: query.zoom || 5,
        center: query.center ? qs.parse(query.center) : getCenter(),
        scrollWheelZoom: !embed,
        drawControl: true,
      }}
      events={{
        click: () => {},
        zoomend: (e, map) => {
          setRouterParam('zoom', map.getZoom());
        },
        dragend: (e, map) => {
          setRouterParam('center', qs.stringify(map.getCenter()));
        },
      }}
    >
      {map => (
        <>
          <LayerManager map={map} plugin={PluginLeaflet}>
            {activeLayers.map(l => (
              <Layer
                key={l.id}
                {...l}
                decodeParams={
                  l.decodeParams
                    ? { ...l.decodeParams, chartLimit: l.chartLimit || 100 }
                    : null
                }
              />
            ))}
          </LayerManager>

          <DrawingManager map={map} />

          {page !== 'report' && <MapOffset map={map} />}

          {page !== 'report' && (
            <MapControls customClass="c-map-controls">
              <Toolbar />
              <ZoomControl map={map} />
            </MapControls>
          )}
        </>
      )}
    </Maps>
  );
};

export default MapView;
