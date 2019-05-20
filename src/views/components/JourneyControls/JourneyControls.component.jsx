import React, { useEffect, useState } from 'react';
import cx from 'classnames';

const JourneyControls = ({ loadJourneyInfo, id, step }) => {
  useEffect(() => {
    loadJourneyInfo();
  }, []);

  const initialStep = 0;
  const [currentStep, setPage] = useState(initialStep);

  return (
    <div className={cx('m-controls', { 'is-first': step.number === 0 })}>
      <button
        type="button"
        id="btn-prev"
        mode="sub"
        className={cx({ 'is-hidden': step.number === 0 })}
        onClick={() => setPage(currentStep - 1)}
      >
        back
      </button>
      <a
        href={`/journeys/${id + 1}`}
        id="btn-next-journey"
        className={cx({ 'is-hidden': step.number === 0 })}
      >
        Next journey
      </a>
      <button
        type="button"
        id="btn-next"
        onClick={() => setPage(currentStep + 1)}
      >
        continue
      </button>
    </div>
  );
};

export default JourneyControls;
