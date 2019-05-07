import React, { FC } from 'react';
import { WidgetBarChart } from '@shared/Widgets/WidgetBarChart';

interface P {
  activeLayers: Object[];
}

export const BarChartsList: FC<P> = ({ activeLayers }) => {
  const analyzable = activeLayers.filter(l => l.analysisSuitable);

  if (!activeLayers.length) {
    return 'Please toggle some layers on to analyze them.';
  }

  if (!analyzable.length) {
    return 'None of the active layers can be analyzed.';
  }

  return (
    <div className="analysis-content">
      {analyzable.map(l => (
        <WidgetBarChart
          key={l.slug}
          slug={l.slug}
          query={l.analysisQuery}
          name={l.name}
          hasLine={false}
          meta_short={l.name}
          metadata={JSON.parse(l.info)}
          // xAxisTickFormatter={d3.format('.3f')}
          verticalLabels
        />
      ))}

      {activeLayers.length !== analyzable.length && (
        <p>Some active layers can&apos;t be analyzed.</p>
      )}
    </div>
  );
};
