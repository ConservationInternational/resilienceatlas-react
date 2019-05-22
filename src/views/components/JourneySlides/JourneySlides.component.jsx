import React, { useEffect } from 'react';

// Components
import JourneyLanding from '@components/JourneyLanding';
import JourneyConclusion from '@components/JourneyConclusion';
import JourneyEmbed from '@components/JourneyEmbed';
import JourneyChapter from '@components/JourneyChapter';
import JourneyControls from '@components/JourneyControls';

const JourneySlides = ({
  slidesInfo,
  currentStep,
  currentJourney,
  loadJourneys,
  loadJourneyInfo,
  setCurrentStep,
}) => {
  useEffect(() => {
    loadJourneys(currentJourney);
    loadJourneyInfo(currentJourney);
  }, [currentStep, currentJourney]);

  if (!slidesInfo) return null;
  const journeyInfo = slidesInfo[currentStep];

  return (
    <div className="l-journey" id="journeyIndexView">
      {journeyInfo.type === 'landing' && (
        <JourneyLanding
          background={journeyInfo.background}
          title={journeyInfo.title}
          subtitle={journeyInfo.subtitle}
          theme={journeyInfo.theme}
        />
      )}
      {journeyInfo.type === 'conclusion' && (
        <JourneyConclusion
          background={journeyInfo.background}
          title={journeyInfo.title}
          subtitle={journeyInfo.subtitle}
          content={journeyInfo.content}
        />
      )}
      {journeyInfo.type === 'embed' && (
        <JourneyEmbed
          theme={journeyInfo.theme}
          mapUrl={journeyInfo.mapUrl}
          btnUrl={journeyInfo.btnUrl}
          maskSql={journeyInfo.maskSql}
          aside={journeyInfo.aside}
        />
      )}
      {journeyInfo.type === 'chapter' && (
        <JourneyChapter
          background={journeyInfo.background}
          title={journeyInfo.title}
          content={journeyInfo.content}
        />
      )}
      <JourneyControls
        journey={journeyInfo}
        slidesInfo={slidesInfo}
        id={currentJourney}
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
      />

      {journeyInfo.type !== 'embed'}
      <p className="credits">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={journeyInfo.creditsUrl}
        >
          {journeyInfo.credits}
        </a>
      </p>
    </div>
  );
};

export default JourneySlides;
