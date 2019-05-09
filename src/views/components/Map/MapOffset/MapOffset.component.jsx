import { FC, useEffect } from 'react';

interface P {
  map: L.Map;
}

export const MapOffset: FC<P> = ({ map, sidebarOpened, analysisOpened }) => {
  useEffect(() => {
    const sidebarWidth = document.querySelector('.l-sidebar--fullscreen')
      .clientWidth;
    const analysisWidth = document.querySelector('.analysis-panel').clientWidth;
    const center = map.getCenter();
    const zoom = map.getZoom();
    const offset =
      (sidebarOpened ? sidebarWidth : 0) + (analysisOpened ? analysisWidth : 0);

    map.setActiveArea({
      position: 'absolute',
      top: '0',
      left: `${offset}px`,
      right: '0',
      height: '100%',
    });

    map.setView(center, zoom, { animate: true });
  }, [sidebarOpened, analysisOpened]);

  return null;
};
