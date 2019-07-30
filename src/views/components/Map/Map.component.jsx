import React, { useCallback, useEffect, useContext } from 'react';
import qs from 'qs';
import { Map as Maps, MapControls, ZoomControl } from 'vizzuality-components';
import { LayerManager, Layer } from 'resilience-layer-manager/dist/components';
import { PluginLeaflet } from 'resilience-layer-manager/dist/layer-manager';

import { TABS } from '@components/Sidebar';

import { BASEMAPS } from '@views/utils';

import { LayerManagerContext } from '@contexts/layerManagerCtx';
import { setRouterParam } from '@utilities';

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
  model_layer,
  defaultActiveGroups,
  location,
  tab,
  site,
  page,
  options,
  basemap,
  embed,
}) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
    parseArrays: true,
  });

  const layerManagerRef = useContext(LayerManagerContext);

  useEffect(() => {
    if (!layersLoaded) loadLayers();
    if (!layerGroupsLoaded) loadLayerGroups();
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
    if (query.center) {
      const decodeCenter = decodeURIComponent(query.center);
      if (decodeCenter && decodeCenter[0] === '{') {
        return JSON.parse(decodeCenter);
      }
      const center = qs.parse(query.center);
      return center;
    }

    if (site.latitude) {
      return { lat: site.latitude, lng: site.longitude };
    }

    return { lat: 3.86, lng: 47.28 };
  }, [site.latitude, query.center]);

  return (
    <Maps
      customClass="m-map"
      basemap={{
        url: BASEMAPS[basemap].url,
      }}
      mapOptions={{
        ...options.map,
        zoom: query.zoom || site.zoom_level || 5,
        center: getCenter(),
        scrollWheelZoom: !embed,
        drawControl: true,
      }}
      events={{
        click: e => {},
        zoomend: (e, map) => {
          const mapZoom = map.getZoom();

          if (mapZoom !== (+site.zoom_level || 5)) {
            setRouterParam('zoom', map.getZoom());
          } else {
            // clear param if it's default
            setRouterParam('zoom');
          }

          // Update map center in url, because it basically changed
          // after 'pinches' and zoom in/out from mousewheel.
          setRouterParam('center', qs.stringify(map.getCenter()));
        },
        dragend: (e, map) => {
          setRouterParam('center', qs.stringify(map.getCenter()));
        },
      }}
    >
      {map => (
        <>
          <LayerManager map={map} plugin={PluginLeaflet} ref={layerManagerRef}>
            {tab === TABS.LAYERS &&
              activeLayers.map(l => (
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
            {tab === TABS.MODELS && model_layer && <Layer {...model_layer} />}
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
