import React, { useEffect } from 'react';

// Components
import Slides from '@components/Journey/Slides';

const Journey = ({
  currentJourney,
  loadJourneys,
  loadJourneyInfo,
  loadCountries,
}) => {
  useEffect(() => {
    loadCountries();
    loadJourneys(currentJourney);
    loadJourneyInfo(currentJourney);
  }, [currentJourney]);

  return <Slides />;
};

export default Journey;
