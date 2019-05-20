import { connect } from 'react-redux';
import { loadJourneyInfo } from '@modules/journey';

import JourneyControls from './JourneyControls.component';

const mapStateToProps = state => ({
  landingInfo: state.journey.steps,
  id: state.journey.id,
  step: state.journey.steps[0],
});

const mapDispatchToProps = {
  loadJourneyInfo,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JourneyControls);
