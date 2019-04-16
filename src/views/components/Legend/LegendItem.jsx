import React from 'react';
import legends from './legends';

const LegendItem = ({ legend: legendStr }) => {
  if (legendStr) {
    const legend = JSON.parse(legendStr);
    const { type } = legend;

    return React.createElement(legends[type], legend);
  }
  return null;
};

export default LegendItem;
