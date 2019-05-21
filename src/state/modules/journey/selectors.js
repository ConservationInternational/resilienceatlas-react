import { createSelector } from 'reselect';

export const getSteps = state => state.journey;
export const currentStep = state => state.journey.curentStep;
