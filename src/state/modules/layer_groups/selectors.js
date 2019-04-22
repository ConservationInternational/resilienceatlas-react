import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { layer_group } from '../../schema';
import { getActives } from '../layers/selectors';

export const getById = state => state.layer_groups.byId;

export const getAll = state => state.layer_groups.all;

export const getPublished = createSelector(
  [getById, getAll],
  (layer_groups, all) => denormalize(all, [layer_group], { layer_groups }),
  // TODO: add published column to layers groups
  // .filter(lg => lg.published),
);

export const getGroups = createSelector(
  getPublished,
  published => published.filter(lg => !lg.father),
);

export const getCategories = createSelector(
  getPublished,
  published => published.filter(lg => !!lg.father),
);

export const getSubCategories = createSelector(
  getPublished,
  published => published.filter(lg => lg.group_type === 'subcategory'),
);

export const getSubGroups = createSelector(
  getPublished,
  published => published.filter(lg => lg.group_type === 'subgroup'),
);

export const getCategoriesByGroup = groupId =>
  createSelector(
    getPublished,
    published => published.filter(lg => groupId === lg.father),
  );

export const makeDefaultActives = () => {
  const makeActiveLayers = getActives();

  return createSelector(
    [makeActiveLayers, getById],
    (activeLayers, byId) => {
      const result = new Set();
      const collectIds = (id, entities) => {
        result.add(id);

        const { father } = entities[id] || {};
        if (father) collectIds(father, entities);
      };

      if (activeLayers.length > 0) {
        activeLayers.map(l => collectIds(l.group, byId));
      }

      return [...result];
    },
  );
};
