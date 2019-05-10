import { connect } from 'react-redux';
import { getActives } from '@modules/layers';

import { BarChartsList } from './AnalysisContent.component';

const mapStateToProps = state => ({
  activeLayers: getActives(state),
  geojson: state.map.geojson,
});

export default connect(mapStateToProps)(BarChartsList);
