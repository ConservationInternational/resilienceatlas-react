import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  load as loadLayers,
  setActives,
  getGrouped,
  getActives,
} from 'state/modules/layers';
import { load as loadLayerGroups } from 'state/modules/layer_groups';

import MapView from './Map.component';

const mapStateToProps = state => {
  const groupedLayers = getGrouped();
  const activeLayers = getActives();

  return {
    site: state.site,
    layers: state.layers,
    layer_groups: state.layer_groups,
    activeLayers: activeLayers(state),
    grouped: groupedLayers(state),
  };
};

const mapDispatchToProps = {
  loadLayers,
  loadLayerGroups,
  setActives,
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(MapView);
