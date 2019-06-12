import React from 'react';

// Components
import Loader from '@shared/Loader';
import Landing from '@components/Journey/Landing';
import Conclusion from '@components/Journey/Conclusion';
import Embed from '@components/Journey/Embed';
import Chapter from '@components/Journey/Chapter';
import Controls from '@components/Journey/Controls';

const Slides = ({
  loading,
  slidesInfo,
  currentStep,
  currentJourney,
  setCurrentStep,
}) => {
  if (!slidesInfo) return null;
  const journeyInfo = slidesInfo[currentStep];

  return (
    <div className="l-journey" id="journeyIndexView">
      {loading && <Loader loading={loading} />}
      {!loading && journeyInfo.type === 'landing' && (
        <Landing {...journeyInfo} />
      )}
      {!loading && journeyInfo.type === 'conclusion' && (
        <Conclusion {...journeyInfo} />
      )}
      {!loading && journeyInfo.type === 'embed' && (
        <Embed
          {...journeyInfo}
          currentStep={currentStep}
          currentJourney={currentJourney}
        />
      )}
      {!loading && journeyInfo.type === 'chapter' && (
        <Chapter {...journeyInfo} />
      )}
      <Controls
        {...journeyInfo}
        id={currentJourney}
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
      />

      {!loading && journeyInfo.type !== 'embed'}
      <p className={`credits ${journeyInfo.type}`}>
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

export default Slides;
