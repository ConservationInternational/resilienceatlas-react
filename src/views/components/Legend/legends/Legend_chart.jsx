import React from 'react';
import { connect } from 'react-redux';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  ReferenceArea,
} from 'recharts';

import { setChartLimit } from '@modules/layers';

const LegendChart = ({ changeLimit, limit = 100, data }) => {
  const len = data.length;
  const min = data[0];
  const mid = data[Math.round(len / 2) - 1];
  const max = data[len - 1];

  return (
    <div className="m-legend__chart">
      <AreaChart
        width={250}
        height={250}
        data={data}
        margin={{ top: 30, right: 5, left: 10, bottom: 10 }}
        onClick={changeLimit}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="x"
          ticks={[min.x, mid.x, max.x]}
          interval="preserveStartEnd"
          fontSize={10}
        >
          <Label
            value="Proportion of study area protected"
            offset={-200}
            position="insideTop"
            fontSize={9}
            style={{ textTransform: 'uppercase' }}
          />
        </XAxis>
        <YAxis
          width={40}
          dataKey="y"
          ticks={[min.y, mid.y, max.y]}
          fontSize={10}
          label={{
            value: 'Proportion of carbon storage saved',
            angle: -90,
            position: 'insideBottomLeft',
            fontSize: 9,
            offset: 0,
            style: { textTransform: 'uppercase' },
          }}
        />
        <Area
          type="monotone"
          dataKey="y"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={1}
          activeDot={{ r: 3, stroke: '#8884d8' }}
        />
        <ReferenceArea
          x1={min.x}
          x2={limit}
          y1={min.y}
          y2={max.y}
          stroke="red"
          strokeOpacity={0.3}
        />
      </AreaChart>
    </div>
  );
};

const mapDispatchToProps = (dispatch, { layerId }) => ({
  changeLimit: value => {
    if (value && value.activeTooltipIndex)
      dispatch(setChartLimit(layerId, value.activeTooltipIndex));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(LegendChart);
