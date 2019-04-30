import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setDrawing } from '@modules/map';

import { AnalysisPanel } from './AnalysisPanel.component';

const mapStateToProps = state => {
  return {
    drawing: state.map.drawing,
  };
};

const mapDispatchToProps = {
  setDrawing,
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(AnalysisPanel);
