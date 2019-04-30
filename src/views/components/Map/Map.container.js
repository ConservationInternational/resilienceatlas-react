import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  load as loadLayers,
  setActives,
  getGrouped,
  getActives,
} from '@modules/layers';
import {
  load as loadLayerGroups,
  openBatch,
  makeDefaultActives,
} from '@modules/layer_groups';

import MapView from './Map.component';

const mapStateToProps = state => {
  const groupedLayers = getGrouped();
  const activeLayers = getActives();
  const defaultActives = makeDefaultActives();

  return {
    site: state.site,
    layers: state.layers,
    drawing: state.map.drawing,
    layer_groups: state.layer_groups,
    activeLayers: activeLayers(state),
    defaultActiveGroups: defaultActives(state),
    grouped: groupedLayers(state),
  };
};

const mapDispatchToProps = {
  loadLayers,
  loadLayerGroups,
  setActives,
  openBatch,
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(MapView);
