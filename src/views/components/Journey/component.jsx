import React, { useEffect } from 'react';

// Components
import Slides from '@components/Journey/Slides';

const Journey = ({
  loadCountries,
  loadLayers,
  currentJourney,
  loadJourneys,
  loadJourneyInfo,
  loading,
}) => {
  useEffect(() => {
    loadCountries();
    loadLayers();
    loadJourneys(currentJourney);
    loadJourneyInfo(currentJourney);
  }, [currentJourney, loading]);

  return <Slides />;
};

export default Journey;
