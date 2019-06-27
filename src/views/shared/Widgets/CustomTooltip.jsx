import React from 'react';
import { formatNumber } from '@utilities';

export const CustomTooltip = ({ active, payload, units }) => {
  if (active) {
    return (
      <div className="m-graph__tooltip">
        {formatNumber({
          value: payload[0].payload.count,
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })}
        {units}
      </div>
    );
  }
  return null;
};
