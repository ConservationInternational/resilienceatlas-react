import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getUserLoggedIn } from '@modules/user';

import DownloadWindow from './DownloadWindow.component';

const mapStateToProps = state => ({
  userLoggedIn: getUserLoggedIn(state),
});

export default withRouter(connect(mapStateToProps)(DownloadWindow));
