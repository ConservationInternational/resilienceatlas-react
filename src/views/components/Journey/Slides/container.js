import { connect } from 'react-redux';
import { loadPageIndex as loadJourneys } from '@modules/journeys';
import { loadJourneyInfo, setCurrentStep } from '@modules/journey';
import { load as loadCountries } from '@modules/countries';

import Slides from './component';

const mapStateToProps = state => ({
  loading: state.journey.loading,
  slidesInfo: state.journey.steps,
  currentStep: state.journey.currentStep,
  currentJourney: state.journey.id,
  journeys: state.journeys.pageIndex,
});

const mapDispatchToProps = {
  loadJourneys,
  loadJourneyInfo,
  setCurrentStep,
  loadCountries,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Slides);
