import { createSelector } from 'reselect';
import { sortBy } from '@utilities';

import { denormalize } from 'normalizr';
import {
  getGroups,
  getCategories,
  getSubCategories,
  getSubGroups,
  makeDefaultActives,
} from '../layer_groups';
import { layer } from '../../schema';

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
      if (!groups.length || !g_categories.length) {
        console.info('There aren`t groups setted.');
        return groups;
      }
      return groups.sort(sortBy('order')).map(g => {
        const groupLayers = published.filter(l => l.group === g.id);

        const categories = g_categories.filter(c => c.father === g.id);

        return {
          ...g,
          active: g.active || g_defaultActive.some(id => id === g.id),
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
              active: c.active || g_defaultActive.some(id => id === c.id),
              layers: layers
                .sort(byDashboardOrder)
                .map(l => ({ ...l, opacity_text: getOpacityText(l.opacity) })),
              subcategory: subcategories.map(sc => {
                const layers = published.filter(l => l.group === sc.id);

                const subgroups = g_subgroups.filter(sg => sg.father === sc.id);

                return {
                  ...sc,
                  active: sc.active || g_defaultActive.some(id => id === sc.id),
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
