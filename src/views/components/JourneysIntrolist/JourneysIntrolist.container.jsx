import { connect } from 'react-redux';
import { loadPageIndex as loadJourneys } from '@modules/journeys';

import JourneysIntrolist from './JourneysIntrolist.component';

const mapStateToProps = state => ({
  journeys: state.journeys.pageIndex,
});

const mapDispatchToProps = {
  loadJourneys,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JourneysIntrolist);
