import { createSelector } from 'reselect';
import { sortBy } from '@utilities';

import { denormalize } from 'normalizr';
import {
  getById as getGroupsById,
  getGroups,
  getCategories,
  getSubCategories,
  getSubGroups,
} from '../layer_groups';
import { layer } from '../../schema';
import { getActiveFromDefaults } from './utils';

const byDashboardOrder = sortBy('dashboard_order');
const getOpacityText = v => parseInt(v * 100, 10);

export const getLoaded = state => state.layers.loaded;

export const getById = state => state.layers.byId;

export const getAllIds = state => state.layers.all;

export const getActiveIds = state => state.layers.actives;

export const getPublished = createSelector(
  [getAllIds, getById],
  (all, layers) =>
    denormalize(all, [layer], { layers }).filter(i => i.published),
);

export const getActives = () =>
  createSelector(
    [getActiveIds, getById, getLoaded],
    (ids, layers, loaded) =>
      loaded ? denormalize(ids, [layer], { layers }) : [],
  );

export const makeDefaultActives = () => {
  const makeActiveLayers = getActives();

  return createSelector(
    [makeActiveLayers, getGroupsById],
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

export const getGrouped = () => {
  const getDefaultActives = makeDefaultActives();

  return createSelector(
    [
      getPublished,
      getGroups,
      getCategories,
      getSubCategories,
      getSubGroups,
      getDefaultActives,
    ],
    (
      published,
      groups,
      g_categories,
      g_subcategories,
      g_subgroups,
      g_defaultActive,
    ) => {
      const isActive = getActiveFromDefaults(g_defaultActive);
      if (!groups.length || !g_categories.length) {
        console.info('There aren`t groups setted.');
        return groups;
      }
      return groups.sort(sortBy('order')).map(g => {
        const groupLayers = published.filter(l => l.group === g.id);

        const categories = g_categories.filter(c => c.father === g.id);

        return {
          ...g,
          active: isActive(g),
          layers: groupLayers
            .sort(byDashboardOrder)
            .map(l => ({ ...l, opacity_text: getOpacityText(l.opacity) })),
          categories: categories.map(c => {
            const layers = published.filter(l => l.group === c.id);

            const subcategories = g_subcategories.filter(
              s => s.father === c.id,
            );

            return {
              ...c,
              active: isActive(c),
              layers: layers
                .sort(byDashboardOrder)
                .map(l => ({ ...l, opacity_text: getOpacityText(l.opacity) })),
              subcategory: subcategories.map(sc => {
                const layers = published.filter(l => l.group === sc.id);

                const subgroups = g_subgroups.filter(sg => sg.father === sc.id);

                return {
                  ...sc,
                  active: isActive(sc),
                  layers: layers.sort(byDashboardOrder).map(l => ({
                    ...l,
                    opacity_text: getOpacityText(l.opacity),
                  })),
                  subgroup: subgroups.map(sg => ({
                    ...sg,
                    layers: published
                      .filter(layer => layer.group === sg.id)
                      .map(l => ({
                        ...l,
                        opacity_text: getOpacityText(l.opacity),
                      })),
                  })),
                };
              }),
            };
          }),
        };
      });
    },
  );
};

export const getLayerActive = id =>
  createSelector(
    getActiveIds,
    ids => new Set(ids).has(id),
  );
