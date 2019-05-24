import { connect } from 'react-redux';
import { loadPageIndex as loadJourneys } from '@modules/journeys';
import { loadJourneyInfo } from '@modules/journey';
import { load as loadCountries } from '@modules/countries';
import { load as loadLayers } from '@modules/layers';

import Journey from './component';

const mapStateToProps = state => ({
  currentJourney: state.journey.id,
  journeys: state.journeys.pageIndex,
});

const mapDispatchToProps = {
  loadJourneys,
  loadJourneyInfo,
  loadCountries,
  loadLayers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Journey);
