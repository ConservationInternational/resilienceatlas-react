import { connect } from 'react-redux';

import { getActives } from 'state/modules/layers';
import Legend from './Legend.component';

const mapStateToProps = state => {
  const activeLayers = getActives();

  return {
    activeLayers: activeLayers(state),
  };
};

export default connect(mapStateToProps)(Legend);
