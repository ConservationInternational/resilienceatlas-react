import { createSelector } from 'reselect';
import { sortBy } from '@utilities';

import { getById as getSources } from '../sources';
import {
  getGroups,
  getCategories,
  getSubCategories,
  getSubGroups,
} from '../layer_groups';

export const getById = state => state.layers.byId;

export const getAll = state => state.layers.all;

export const getPublished = createSelector(
  [getById, getAll],
  (byId, all) => all.map(id => byId[id]).filter(i => i.published),
);

export const getGrouped = () =>
  createSelector(
    [getPublished, getGroups, getCategories, getSubCategories, getSubGroups],
    (published, groups, g_categories, g_subcategories, g_subgroups) => {
      if (!groups.length || !g_categories.length) {
        console.info('There aren`t groups setted.');
        return published;
      }
      return groups.sort(sortBy('order')).map(g => {
        const groupLayers = published.filter(l => l.group === g.id);

        groupLayers.map(layer => ({
          ...layer,
          opacity_text: layer.opacity * 100,
        }));

        const categories = g_categories.filter(c => c.father === g.id);

        return {
          ...g,
          active: groupLayers.some(layer => layer.active),
          layers: groupLayers.sort(sortBy('dashboard_order')),
          categories: categories.map(c => {
            const layers = published.filter(l => l.group === c.id);

            layers.map(layer => ({
              ...layer,
              opacity_text: layer.opacity * 100,
            }));

            const subcategories = g_subcategories.filter(
              s => s.father === c.id,
            );

            return {
              ...c,
              active: layers.some(layer => layer.active),
              subcategory: subcategories.map(sc => {
                const layers = published.filter(l => l.group === sc.id);

                layers.map(layer => ({
                  ...layer,
                  opacity_text: layer.opacity * 100,
                }));

                const subgroups = g_subgroups.filter(sg => sg.father === sc.id);

                return {
                  ...sc,
                  active: layers.some(layer => layer.active),
                  subgroup: subgroups.map(sg => ({
                    ...sg,
                    layers: published.reduce((acc, layer) => {
                      if (layer.group === sg.id)
                        return {
                          ...layer,
                          opacity_text: layer.opacity * 100,
                        };
                    }, []),
                  })),
                  layers: layers.sort(sortBy('dashboard_order')),
                };
              }),
              layers: layers.sort(sortBy('dashboard_order')),
            };
          }),
        };
      });
    },
  );
