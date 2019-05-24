import React, { useEffect } from 'react';

// Components
import Slides from '@components/Journey/Slides';

const Journey = ({
  currentJourney,
  loadJourneys,
  loadCountries,
  loadJourneyInfo,
  loadLayers,
}) => {
  useEffect(() => {
    loadLayers();
    loadCountries();
    loadJourneys(currentJourney);
    loadJourneyInfo(currentJourney);
  }, [currentJourney]);

  return <Slides />;
};

export default Journey;
