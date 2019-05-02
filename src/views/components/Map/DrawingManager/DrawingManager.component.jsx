import { FC, useEffect, useRef } from 'react';

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
    // persist from URL
    if (geojson) {
      layer.current = L.geoJSON(geojson);
      layer.current.addTo(map);
    }

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
    if (!geojson) {
      if (layer.current) {
        layer.current.remove();
      }

      removeParam('geojson');
    } else {
      setParam('geojson', JSON.stringify(geojson));
    }
  }, [geojson]);

  return null;
};
