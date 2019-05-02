import { useRouterParams } from '@utilities';

const { getParam } = useRouterParams();

export const persistState = () => ({
  map: {
    geojson: getParam('geojson', JSON.parse),
  },
});
