import round from './Legend_round';
import custom from './Legend_custom';
import border from './Legend_border';
import choropleth from './Legend_choropleth';
import chart from './Legend_chart';

export default {
  custom,
  border,
  choropleth,
  // need to export an object because of dash
  'legend-round': round,
  chart,
};
