import { FC, useEffect, useRef } from 'react';
import qs from 'qs';

import { useRouterParams } from '@utilities';

interface P {
  setGeojson: (value: L.GeoJSON) => void;
  map: L.Map;
  drawing: Boolean;
  geojson: L.GeoJSON;
}

export const DrawingManager: FC<P> = ({
  setGeojson,
  setDrawing,
  map,
  drawing,
  geojson,
}) => {
  const { setParam, removeParam } = useRouterParams();
  const layer = useRef(null);

  useEffect(() => {
    // bind pm events
    map.on('pm:drawstart', () => {
      if (layer.current) {
        setGeojson(null);
      }
    });

    map.on('pm:create', e => {
      layer.current = e.layer;
      setGeojson(e.layer.toGeoJSON());
      setDrawing(false);
    });
  }, []);

  // drawing toggler
  useEffect(() => {
    if (drawing) {
      map.pm.enableDraw('Polygon');
    } else {
      map.pm.disableDraw('Polygon');
    }
  }, [drawing]);

  // clear drawing if deleted from redux
  useEffect(() => {
    if (layer.current) {
      // clear if geojson exists and was updated
      layer.current.remove();
      map.removeLayer(layer.current);
    }

    if (geojson) {
      layer.current = L.geoJSON(geojson);
      layer.current.setZIndex(2000);
      layer.current.addTo(map);

      const layerBounds = layer.current.getBounds();
      map.invalidateSize();

      map.fitBounds(layerBounds, { animate: true });

      setParam('zoom', map.getZoom());
      setParam('center', qs.stringify(layerBounds.getCenter()));
      setParam('geojson', JSON.stringify(geojson));
    } else {
      removeParam('geojson');
    }
  }, [geojson]);

  return null;
};
