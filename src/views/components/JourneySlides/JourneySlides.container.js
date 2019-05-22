import { connect } from 'react-redux';
import { loadPageIndex as loadJourneys } from '@modules/journeys';
import { loadJourneyInfo, setCurrentStep } from '@modules/journey';

import JourneySlides from './JourneySlides.component';

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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JourneySlides);
