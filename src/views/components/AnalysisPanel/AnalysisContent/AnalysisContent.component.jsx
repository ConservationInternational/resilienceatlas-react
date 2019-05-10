import React, { FC } from 'react';
import { WidgetBarChart } from '@shared/Widgets/WidgetBarChart';

interface P {
  activeLayers: Object[];
  geojson: L.GeoJSON;
}

export const BarChartsList: FC<P> = ({
  responsiveCharts,
  activeLayers,
  layers: { actives, loaded },
  geojson,
}) => {
  if (actives.length && !loaded)
    return <center>Waiting until layers loaded...</center>;

  const analyzable = activeLayers.filter(l => l.analysisSuitable);

  if (!activeLayers.length) {
    return <center>Please toggle some layers on to analyze them.</center>;
  }

  if (!analyzable.length) {
    return <center>None of the active layers can be analyzed.</center>;
  }

  return (
    <div className="analysis-content">
      {analyzable.map(l => (
        <WidgetBarChart
          key={l.slug}
          responsive={responsiveCharts}
          slug={l.slug}
          type={l.type}
          analysisQuery={l.analysisQuery}
          analysisBody={l.analysisBody}
          name={l.name}
          meta_short={l.name}
          metadata={JSON.parse(l.info || 'null')}
          geojson={geojson}
        />
      ))}

      {activeLayers.length !== analyzable.length && (
        <p>Some active layers can&apos;t be analyzed.</p>
      )}
    </div>
  );
};
