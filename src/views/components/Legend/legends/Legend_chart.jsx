import React, { Fragment, PureComponent } from 'react';
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

const data = range(0, 101, 1).map(d => ({
  x: d,
  y: d,
}));

class LegendRound extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      limit: 100,
    };
  }

  handleClick = ({ activeTooltipIndex }) =>
    this.setState({ limit: activeTooltipIndex });

  render() {
    const { limit } = this.state;

    return (
      <Fragment>
        <div className="m-legend__chart">
          <AreaChart
            width={250}
            height={250}
            data={data}
            margin={{ top: 30, right: 5, left: 10, bottom: 10 }}
            onClick={this.handleClick}
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
      </Fragment>
    );
  }
}

export default LegendRound;
