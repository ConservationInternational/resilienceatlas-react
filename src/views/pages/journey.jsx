import React from 'react';
import Helmet from 'react-helmet';

import JourneySlides from '@components/JourneySlides';

const Journey = () => (
  <>
    <Helmet title="Journeys" />

    <div className="l-content">
      <JourneySlides />
    </div>
  </>
);

export default Journey;
