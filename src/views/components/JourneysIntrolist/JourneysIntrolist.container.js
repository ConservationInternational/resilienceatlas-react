import { connect } from 'react-redux';
import {
  load as loadJourneys,
  makeAll as makeAllJourneys,
} from '@modules/journeys';

import JourneysIntrolist from './JourneysIntrolist.component';

const makeMapStateToProps = () => {
  const getAllJourneys = makeAllJourneys();

  const mapStateToProps = state => ({
    journeys: getAllJourneys(state),
    journeysLoaded: state.journeys.loaded,
  });

  return mapStateToProps;
};

const mapDispatchToProps = {
  loadJourneys,
};

export default connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(JourneysIntrolist);
