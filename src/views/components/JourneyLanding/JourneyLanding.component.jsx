import React, { useEffect } from 'react';
import JourneyControls from '../JourneyControls/JourneyControls.container';

const JourneyLanding = ({ landingInfo, loadJourneyInfo }) => {
  useEffect(() => {
    loadJourneyInfo();
  }, []);

  if (!landingInfo) return null;
  const journey = landingInfo[0];
  return (
    <div className={`m-journey--landing is-stretch ${journey.background}`}>
      <div className="row">
        <div className="large-12">
          <div className="intro">
            <h1>{journey.title}</h1>
            <h2>{journey.subtitle}</h2>
            <h3>{journey.theme}</h3>
          </div>
        </div>
      </div>
      <p className="credits">
        <a target="_blank" rel="noopener noreferrer" href={journey.creditsUrl}>
          {journey.credits}.
        </a>
      </p>
      <JourneyControls />
      <div className="logo" />
    </div>
  );
};

export default JourneyLanding;
