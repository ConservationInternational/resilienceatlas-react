import {
  INDICATOR_VALUES,
  INDICATOR_HUMAN_READABLE_VALUES,
  INDICATOR_VALUE_DESC,
} from '@utilities/constants';

export const getIndexableIndicatorValue = value => {
  const index = INDICATOR_VALUES.indexOf(value);
  if (value === null || index === -1) {
    return null;
  }
  return index;
};

export const getHumanReadableIndicatorValue = value => {
  const index = getIndexableIndicatorValue(value);
  if (index === null) {
    return '';
  }
  return INDICATOR_HUMAN_READABLE_VALUES[index];
};

export const getIndexableIndicatorValueRange = () => [
  0,
  INDICATOR_VALUES.length - 1,
];

export const getRealIndicatorValueFromIndex = indexValue =>
  INDICATOR_VALUES[indexValue];

export const getHumanReadableIndicatorValueFromIndex = indexValue =>
  INDICATOR_HUMAN_READABLE_VALUES[indexValue];

export const getValueDescriptionFromIndex = indexValue =>
  INDICATOR_VALUE_DESC[indexValue];
