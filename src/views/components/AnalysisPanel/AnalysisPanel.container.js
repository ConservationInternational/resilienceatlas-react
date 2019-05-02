import { connect } from 'react-redux';

import { setDrawing, setGeojson } from '@modules/map';

import { AnalysisPanel } from './AnalysisPanel.component';

const mapStateToProps = state => ({
  drawing: state.map.drawing,
  geojson: state.map.geojson,
});

const mapDispatchToProps = {
  setDrawing,
  setGeojson,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnalysisPanel);
