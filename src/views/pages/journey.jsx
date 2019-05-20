import React from 'react';
import Helmet from 'react-helmet';

import JourneyLanding from '@components/JourneyLanding';

const Journey = () => (
  <>
    <Helmet title="Journeys" />

    <div className="l-content">
      <div className="l-journey__intro" id="journeyIndexView">
        <JourneyLanding />
      </div>
    </div>
  </>
);

export default Journey;
