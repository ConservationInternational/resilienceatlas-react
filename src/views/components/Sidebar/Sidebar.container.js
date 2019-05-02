import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from './Sidebar.component';

const mapStateToProps = state => ({
  geojson: state.map.geojson,
});

export default compose(
  withRouter,
  connect(mapStateToProps),
)(Sidebar);
