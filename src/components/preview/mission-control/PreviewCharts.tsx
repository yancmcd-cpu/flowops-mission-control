type MiniBarChartProps = {
  values: number[];
  colors?: string[];
  height?: number;
};

export function MiniBarChart({ values, colors = ["#7a84ff", "#41d6ff"], height = 172 }: MiniBarChartProps) {
  const max = Math.max(...values, 1);

  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {values.map((value, index) => {
        const size = Math.max((value / max) * height, 18);
        const color = colors[index % colors.length];

        return (
          <div key={`${value}-${index}`} className="flex min-w-0 flex-1 items-end">
            <div
              className="w-full rounded-t-[14px] shadow-[0_10px_20px_rgba(0,0,0,0.18)]"
              style={{
                height: `${size}px`,
                background: `linear-gradient(180deg, ${color}, rgba(255,255,255,0.08))`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

type SparkAreaChartProps = {
  values: number[];
  stroke?: string;
  fill?: string;
  height?: number;
};

export function SparkAreaChart({
  values,
  stroke = "#7a84ff",
  fill = "rgba(122,132,255,0.14)",
  height = 168,
}: SparkAreaChartProps) {
  const width = 520;
  const max = Math.max(...values, 1);
  const min = Math.min(...values);
  const range = Math.max(max - min, 1);

  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * width;
      const y = height - ((value - min) / range) * (height - 22) - 10;
      return `${x},${y}`;
    })
    .join(" ");

  const area = `0,${height} ${points} ${width},${height}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="preview-area-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={fill} />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#preview-area-fill)" />
      <polyline
        points={points}
        fill="none"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type DonutChartProps = {
  segments: { label: string; value: number; color: string }[];
  centerValue: string;
  centerLabel: string;
};

export function DonutChart({ segments, centerValue, centerLabel }: DonutChartProps) {
  const total = Math.max(
    segments.reduce((sum, segment) => sum + segment.value, 0),
    1,
  );
  const gradient = segments
    .reduce<{ start: number; end: number; color: string }[]>((acc, segment) => {
      const lastEnd = acc.at(-1)?.end ?? 0;
      const end = lastEnd + (segment.value / total) * 100;
      acc.push({ start: lastEnd, end, color: segment.color });
      return acc;
    }, [])
    .map((segment) => `${segment.color} ${segment.start}% ${segment.end}%`)
    .join(", ");

  return (
    <div className="flex items-center gap-5">
      <div
        className="relative h-32 w-32 rounded-full"
        style={{
          background: `conic-gradient(${gradient})`,
          boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
        }}
      >
        <div className="absolute inset-[18px] flex flex-col items-center justify-center rounded-full bg-[rgba(8,11,18,0.94)]">
          <span className="text-xl font-bold tracking-[-0.05em] text-primary">{centerValue}</span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.24em] text-secondary">{centerLabel}</span>
        </div>
      </div>
      <div className="space-y-2.5">
        {segments.map((segment) => (
          <div key={segment.label} className="flex items-center gap-2 text-sm text-secondary">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: segment.color }} />
            <span>{segment.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
