import qs from 'qs';
import { getRouterParam } from '@utilities';

export const getPersistedLayers = () => {
  const persistedLayers = getRouterParam('layers');

  return persistedLayers ? JSON.parse(persistedLayers).map(l => l.id) : [];
};
