import { connect } from 'react-redux';
import { loadPageIndex as loadJourneys } from '@modules/journeys';
import {
  loadJourneyInfo,
  setCurrentStep,
  updateJourney,
} from '@modules/journey';

import Controls from './component';

const mapStateToProps = state => ({
  slidesInfo: state.journey.steps,
  currentStep: state.journey.currentStep,
  currentJourney: state.journey.id,
  journeysLength: state.journeys.pageIndex.data.length,
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
)(Controls);
