import React, { useEffect } from 'react';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

const Controls = ({
  slidesInfo,
  id,
  currentJourney,
  setCurrentStep,
  currentStep,
  updateJourney,
  journeysLength,
}) => {
  useEffect(() => {
    updateJourney(currentJourney);
  }, [currentJourney]);

  return (
    <div className={cx('m-controls', { 'is-first': currentStep === 0 })}>
      <NavLink
        to={`/journeys/${id}?step=${currentStep}`}
        id="btn-prev"
        className={cx({ 'is-hidden': currentStep === 0 })}
        onClick={() => setCurrentStep(currentStep - 1)}
      >
        back
      </NavLink>
      <NavLink
        to={`/journeys/${id + 1}`}
        id="btn-next-journey"
        className={cx({ 'is-hidden': currentStep !== slidesInfo.length - 1 })}
        onClick={() => {
          // eslint-disable-next-line
          journeysLength === id ? updateJourney(1) : updateJourney(id + 1);
        }}
      >
        Next journey
      </NavLink>
      <NavLink
        to={`/journeys/${id}?step=${currentStep}`}
        id="btn-next"
        className={cx({ 'is-hidden': currentStep === slidesInfo.length - 1 })}
        onClick={() => setCurrentStep(currentStep + 1)}
      >
        continue
      </NavLink>
    </div>
  );
};

export default Controls;
