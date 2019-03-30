import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { load as loadLayers, getGrouped } from '@modules/layers';
import { load as loadLayerGroups } from '@modules/layer_groups';

import MapView from './Map.component';

const mapStateToProps = state => {
  const groupedLayers = getGrouped();
  return {
    site: state.site,
    grouped: groupedLayers(state),
  };
};

const mapDispatchToProps = {
  loadLayers,
  loadLayerGroups,
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(MapView);
