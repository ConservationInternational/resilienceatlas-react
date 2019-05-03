import { connect } from 'react-redux';
import { getActives } from '@modules/layers';

import { WidgetBarCharts } from './WidgetBarCharts.component';

const mapStateToProps = state => {
  const actives = getActives();

  return {
    activeLayers: actives(state),
  };
};

export default connect(mapStateToProps)(WidgetBarCharts);
