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
import range from 'lodash/range';

import { setChartLimit } from '@modules/layers';

// TODO: get rid of lodash
const data = [
  0,
  2.05508061,
  3.7499696,
  5.38517013,
  6.91635385,
  8.34350437,
  9.67606083,
  11.12127677,
  12.43743375,
  13.77748698,
  15.10927975,
  16.32841825,
  17.52866954,
  18.72956306,
  19.86002177,
  21.09025866,
  22.48647809,
  23.814556,
  25.01411736,
  26.19026005,
  27.30970383,
  28.4129262,
  29.44996357,
  30.44515848,
  31.46656156,
  32.6487571,
  33.83900523,
  35.02866924,
  36.21527553,
  37.36903071,
  38.40453029,
  39.41843212,
  40.61407149,
  41.68683887,
  42.74731874,
  44.07854676,
  45.40311694,
  46.88615799,
  48.05282056,
  49.07671511,
  50.30195117,
  51.36160254,
  52.66664028,
  53.97203565,
  55.49933314,
  56.97777271,
  58.56280923,
  59.80709791,
  60.93358397,
  62.25542426,
  63.13425899,
  64.66529965,
  66.00288749,
  67.32183695,
  68.44183803,
  69.49189901,
  70.54706812,
  71.50152326,
  72.59225249,
  73.26723933,
  73.60104918,
  74.41167235,
  76.04689002,
  77.56842375,
  79.19940352,
  80.91644049,
  82.51173496,
  83.99749398,
  85.24200916,
  86.19004488,
  87.18736172,
  87.97225356,
  88.75588775,
  89.56472874,
  90.31472802,
  91.05879068,
  91.76142216,
  92.35617518,
  93.03478003,
  93.65968108,
  94.45409775,
  94.97106671,
  95.45334578,
  95.94527483,
  96.41263485,
  96.90747261,
  97.27087617,
  97.6112783,
  97.90148139,
  98.1492281,
  98.39149714,
  98.64248037,
  98.81209731,
  98.97941351,
  99.13289547,
  99.28067327,
  99.42895174,
  99.55150485,
  99.6802032,
  99.81128573,
  99.97612238,
].map((d, i) => ({
  x: i,
  y: d,
}));

const LegendChart = ({ changeLimit, limit = 100 }) => (
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
        ticks={[0, 50, 100]}
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
        ticks={[0, 50, 100]}
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
        x1={0}
        x2={limit}
        y1={0}
        y2={100}
        stroke="red"
        strokeOpacity={0.3}
      />
    </AreaChart>
  </div>
);

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
