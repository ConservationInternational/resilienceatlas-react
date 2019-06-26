import { connect } from 'react-redux';
import { loadPageIndex as loadJourneys } from '@modules/journeys';
import { updateJourney } from '@modules/journey';

import JourneysIntrolist from './JourneysIntrolist.component';

const mapStateToProps = state => ({
  journeys: state.journeys.pageIndex,
});

const mapDispatchToProps = {
  loadJourneys,
  updateJourney,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JourneysIntrolist);
