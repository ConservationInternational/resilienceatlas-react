import { connect } from 'react-redux';
import { loadJourneyInfo } from '@modules/journey';

import JourneyLanding from './JourneyLanding.component';

const mapStateToProps = state => ({
  landingInfo: state.journey.steps,
});

const mapDispatchToProps = {
  loadJourneyInfo,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JourneyLanding);
