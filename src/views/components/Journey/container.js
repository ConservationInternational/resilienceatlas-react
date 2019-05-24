import { connect } from 'react-redux';
import { loadPageIndex as loadJourneys } from '@modules/journeys';
import { loadJourneyInfo } from '@modules/journey';
import { load as loadCountries } from '@modules/countries';
import { load as loadLayers } from '@modules/layers';

import Journey from './component';

const mapStateToProps = state => ({
  journeys: state.journeys.pageIndex,
  currentJourney: state.journey.id,
});

const mapDispatchToProps = {
  loadCountries,
  loadLayers,
  loadJourneys,
  loadJourneyInfo,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Journey);
