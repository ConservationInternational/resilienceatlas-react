import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { toggle, setOpacity } from 'state/modules/layers';

import Layer from './Layer.component';

const mapDispatchToProps = {
  toggle,
  setOpacity,
};

export default compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps,
  ),
)(Layer);
