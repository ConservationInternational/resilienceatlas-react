import React, { useEffect } from 'react';

// Components
import Slides from '@components/Journey/Slides';

const Journey = ({
  loadCountries,
  loadLayers,
  currentJourney,
  loadJourneys,
  loadJourneyInfo,
}) => {
  useEffect(() => {
    loadCountries();
    loadLayers();
    loadJourneys(currentJourney);
    loadJourneyInfo(currentJourney);
  }, [currentJourney]);

  return <Slides />;
};

export default Journey;
