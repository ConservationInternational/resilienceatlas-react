import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  load as loadLayers,
  setActives,
  getGrouped,
  getActives,
  makeDefaultActives,
} from '@modules/layers';
import { load as loadLayerGroups, openBatch } from '@modules/layer_groups';

import MapView from './Map.component';

const makeMapStateToProps = () => {
  const groupedLayers = getGrouped();
  const defaultActives = makeDefaultActives();

  const mapStateToProps = state => ({
    site: state.site,
    layers: state.layers,
    drawing: state.map.drawing,
    geojson: state.map.geojson,
    layer_groups: state.layer_groups,
    activeLayers: getActives(state),
    defaultActiveGroups: defaultActives(state),
    grouped: groupedLayers(state),
  });

  return mapStateToProps;
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
    makeMapStateToProps,
    mapDispatchToProps,
  ),
)(MapView);
