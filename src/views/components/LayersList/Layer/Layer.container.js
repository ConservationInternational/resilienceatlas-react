import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { toggle, setOpacity, getLayerActive } from '@modules/layers';

import Layer from './Layer.component';

const mapStateToProps = (state, { id }) => {
  const isActive = getLayerActive(id);

  return {
    isActive: isActive(state),
  };
};

const mapDispatchToProps = {
  toggle,
  setOpacity,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Layer);
