import React, { FC } from 'react';
import { WidgetBarChart } from '@shared/Widgets/WidgetBarChart';

interface P {
  activeLayers: Object[];
  geojson: L.GeoJSON;
}

export const BarChartsList: FC<P> = ({ activeLayers, geojson }) => {
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
          meta_short={l.name}
          metadata={JSON.parse(l.info)}
          geojson={geojson}
        />
      ))}

      {activeLayers.length !== analyzable.length && (
        <p>Some active layers can&apos;t be analyzed.</p>
      )}
    </div>
  );
};
