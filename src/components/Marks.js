export const Marks = ({ data, xScale, yScale, xValue, yValue, tooltipFormat, circleRadius }) => (
  data.map((d, i) => (
    <circle
      key={i}
      className="mark"
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      r={circleRadius}
    >
      <title>{tooltipFormat(xValue(d))}, {tooltipFormat(yValue(d))}</title>
    </circle>
  ))
)