import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { AnalysisPanel } from './AnalysisPanel.component';

export default compose(
  withRouter,
  connect(),
)(AnalysisPanel);
