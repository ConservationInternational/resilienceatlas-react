import { connect } from 'react-redux';

import {
  getActives,
  reorder,
  toggle as toggleLayer,
  setOpacity,
} from '@modules/layers';
import Legend from './Legend.component';

const mapStateToProps = state => {
  const activeLayers = getActives();

  return {
    activeLayers: activeLayers(state),
    loading: state.layers.actives.length > 0 && state.layers.loading,
  };
};

const mapDispatchToProps = {
  reorder,
  toggleLayer,
  setOpacity,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Legend);
