import { connect } from 'react-redux';
import { loadPageIndex as loadJourneys } from '@modules/journeys';
import {
  loadJourneyInfo,
  setCurrentStep,
  updateJourney,
} from '@modules/journey';

import JourneyControls from './JourneyControls.component';

const mapStateToProps = state => ({
  slidesInfo: state.journey.steps,
  currentStep: state.journey.currentStep,
  currentJourney: state.journey.id,
  journeys: state.journeys.pageIndex,
});

const mapDispatchToProps = {
  loadJourneys,
  loadJourneyInfo,
  setCurrentStep,
  updateJourney,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JourneyControls);
