import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { model } from '../../schema';

export const getSelected = state => state.predictive_models.selected;

export const getModels = state => state.predictive_models.byId;

export const getCategoies = state => state.predictive_models.categories;

export const getIndicators = state => state.predictive_models.indicators;

export const getIds = state => state.predictive_models.all;

export const makeAll = () =>
  createSelector(
    [getIds, getModels, getCategoies, getIndicators],
    (all, models, categories, indicators) =>
      denormalize(all, [model], { models, categories, indicators }),
  );

export const makeSelected = () => {
  const getAll = makeAll();

  return createSelector(
    [getAll, getSelected, getCategoies],
    (models, name, categoriesById) => {
      const selectedModel = models.find(m => m.name === name);
      if (!name || !selectedModel) return {};

      const { indicators } = selectedModel;
      const categoriesIds = [...new Set(indicators.map(ind => ind.category))];
      const categories = categoriesIds
        .map(catId => categoriesById[catId])
        .map(category => ({
          name: category.name,
          indicators: indicators.filter(ind => ind.category === category.id),
        }));

      return {
        ...selectedModel,
        categories,
      };
    },
  );
};
