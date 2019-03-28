import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MapView from './Map.component';

const mapStateToProps = state => ({
  site: state.site,
});

export default compose(
  withRouter,
  connect(mapStateToProps),
)(MapView);
