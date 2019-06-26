import React from 'react';

export const CustomTooltip = ({ active, payload }) => {
  if (active) {
    return <div className="m-graph__tooltip">{payload[0].payload.count}</div>;
  }
  return null;
};
