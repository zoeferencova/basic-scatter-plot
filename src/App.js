import React from 'react';
import { scaleLinear, format, extent } from 'd3';
import { useData } from './hooks/useData'
import { AxisBottom } from './components/AxisBottom'
import { AxisLeft } from './components/AxisLeft'
import { Marks } from './components/Marks'

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 70, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 50;

export const App = () => {
  const data = useData();

  if (!data) {
    return <pre>"Loading..."</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = d => d.petal_length;
  const xAxisLabel = "Petal Length";

  const yValue = d => d.sepal_width;
  const yAxisLabel = "Sepal Width";

  // Invoking format function only once
  const siFormat = format(".2s");

  // Using above formatter to format every tick (more performant
  // than invoking format function for every tick).
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace("G", "B");

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={10}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft
          yScale={yScale}
          innerWidth={innerWidth}
          tickOffset={8}
        />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <Marks
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          data={data}
          tooltipFormat={xAxisTickFormat}
          circleRadius={7}
        />
      </g>
    </svg>
  );
};

