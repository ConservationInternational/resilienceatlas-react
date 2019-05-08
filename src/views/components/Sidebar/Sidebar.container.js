import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { toggleSidebar as toggleOpen, toggleAnalysis } from '@modules/ui';

import Sidebar from './Sidebar.component';

const mapStateToProps = state => ({
  geojson: state.map.geojson,
  opened: state.ui.sidebar,
  analysisOpened: state.ui.analysisPanel,
});

const mapDispatchToProps = {
  toggleOpen,
  toggleAnalysis,
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Sidebar);
