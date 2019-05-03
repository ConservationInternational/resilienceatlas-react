import React, { FC } from 'react';

interface P {
  activeLayers: Object[];
}

export const WidgetBarCharts: FC<P> = ({ activeLayers }) => {
  const analyzable = activeLayers.filter(l => l.analysisSuitable);

  if (!activeLayers.length) {
    return 'Please toggle some layers on to analyze them.';
  }

  if (!analyzable.length) {
    return 'None of the active layers can be analyzed.';
  }

  return (
    <div className="analysis-content">
      {/* {analyzable.map(l => (
        
      ))} */}

      {activeLayers.length !== analyzable.length && (
        <p>Some active layers can&apos;t be analyzed.</p>
      )}
    </div>
  );
};
