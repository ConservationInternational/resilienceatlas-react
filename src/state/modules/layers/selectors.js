import { createSelector } from 'reselect';
import { sortBy } from 'utilities';

import { getById as getSources } from '../sources';
import {
  getGroups,
  getCategories,
  getSubCategories,
  getSubGroups,
} from '../layer_groups';

const byDashboardOrder = sortBy('dashboard_order');
const getOpacityText = v => parseInt(v * 100, 10);

export const getById = state => state.layers.byId;

export const getAll = state => state.layers.all;

export const getPublished = createSelector(
  [getById, getAll],
  (byId, all) => all.map(id => byId[id]).filter(i => i.published),
);

export const getActives = () =>
  createSelector(
    [getPublished],
    published => published.filter(l => l.active),
  );

export const getGrouped = () =>
  createSelector(
    [getPublished, getGroups, getCategories, getSubCategories, getSubGroups],
    (published, groups, g_categories, g_subcategories, g_subgroups) => {
      if (!groups.length || !g_categories.length) {
        console.info('There aren`t groups setted.');
        return groups;
      }
      return groups.sort(sortBy('order')).map(g => {
        const groupLayers = published.filter(l => l.group === g.id);

        const categories = g_categories.filter(c => c.father === g.id);

        return {
          ...g,
          active: groupLayers.some(layer => layer.active),
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
              active: layers.some(layer => layer.active),
              layers: layers
                .sort(byDashboardOrder)
                .map(l => ({ ...l, opacity_text: getOpacityText(l.opacity) })),
              subcategory: subcategories.map(sc => {
                const layers = published.filter(l => l.group === sc.id);

                const subgroups = g_subgroups.filter(sg => sg.father === sc.id);

                return {
                  ...sc,
                  active: layers.some(layer => layer.active),
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
