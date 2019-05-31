import { connect } from 'react-redux';

import {
  toggleSidebar as toggleOpen,
  toggleAnalysis,
  setTab,
} from '@modules/ui';
import { load as loadModels } from '@modules/predictive_models';

import Sidebar from './Sidebar.component';

const mapStateToProps = state => ({
  tab: state.ui.tab,
  geojson: state.map.geojson,
  opened: state.ui.sidebar,
  analysisOpened: state.ui.analysisPanel,
  models: state.predictive_models.all,
  modelsLoaded: state.predictive_models.loaded,
  siteLoaded: state.site.loaded,
});

const mapDispatchToProps = {
  toggleOpen,
  toggleAnalysis,
  setTab,
  loadModels,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
