import { EXPIRY_DATASETS } from '../data/businessData.js';

const B = 300;
const H = 340;
const TOP = 60;
const PLOT_H = B - TOP;
const X0 = 20;
const X1 = 590;

// Direct port of the mockup's vanilla-SVG chart renderer.
export default function BizExpiriesChart({ mode = 'weekly' }) {
  const data = EXPIRY_DATASETS[mode];
  const slot = (X1 - X0) / data.values.length;
  const barWidth = Math.min(30, slot * 0.6);

  const bars = [];
  let tooltip = null;

  data.values.forEach((value, index) => {
    const height = (value / data.yMax) * PLOT_H;
    const centerX = X0 + slot * index + slot / 2;
    const isPeak = index === data.peak;

    bars.push(
      <rect
        key={`bar-${index}`}
        x={centerX - barWidth / 2}
        y={B - height}
        width={barWidth}
        height={height}
        rx="2"
        fill={isPeak ? 'url(#bizPeakFill)' : '#D5DEEA'}
      />,
    );

    if (isPeak) {
      const tipY = B - height - 52;
      tooltip = (
        <g key="tooltip">
          <rect x={centerX - 90} y={tipY} width="180" height="30" rx="4" fill="#0B1F3A" />
          <path
            d={`M${centerX - 6} ${tipY + 30}L${centerX} ${tipY + 36}L${centerX + 6} ${tipY + 30}z`}
            fill="#0B1F3A"
          />
          <text
            x={centerX}
            y={tipY + 20}
            textAnchor="middle"
            fontFamily="inherit"
            fontSize="14"
            fontWeight="700"
            fill="#fff"
          >
            {data.tip}
          </text>
        </g>
      );
    }
  });

  return (
    <svg viewBox={`0 0 600 ${H}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={data.aria}>
      <defs>
        <linearGradient id="bizPeakFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3FFFB2" />
          <stop offset="1" stopColor="#2389E3" />
        </linearGradient>
      </defs>

      <g stroke="#E5EAF2" strokeWidth="1">
        {data.ticks.map((tick) => {
          const y = B - (tick / data.yMax) * PLOT_H;
          return <line key={`grid-${tick}`} x1={X0} y1={y} x2={X1} y2={y} />;
        })}
      </g>

      <g fontFamily="inherit" fontSize="15" fill="#5F6E85" textAnchor="end">
        {data.ticks.map((tick) => {
          const y = B - (tick / data.yMax) * PLOT_H + 4;
          return (
            <text key={`tick-${tick}`} x="12" y={y}>
              {tick}
            </text>
          );
        })}
      </g>

      <g>{bars}</g>
      {tooltip}

      <g fontFamily="inherit" fontSize="15" fill="#5F6E85">
        {data.values.map((_, index) => {
          const label = data.labels[index];
          if (!label) return null;
          const centerX = X0 + slot * index + slot / 2;
          return (
            <text key={`label-${index}`} x={centerX} y={H - 12} textAnchor="middle">
              {label}
            </text>
          );
        })}
      </g>
    </svg>
  );
}
