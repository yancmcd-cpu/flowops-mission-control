import { metrics } from "@/lib/mock-data";

export function MetricsGrid() {
  const [primary, secondary, ...rest] = metrics;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="rounded-[30px] bg-[linear-gradient(135deg,rgba(122,132,255,0.18),rgba(65,214,255,0.12)_55%,rgba(255,255,255,0.02))] p-6 shadow-[0_24px_72px_rgba(90,108,255,0.20)] ring-1 ring-[#7a84ff]/18">
          <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">{primary.label}</p>
          <p className="mt-4 text-5xl font-extrabold tracking-[-0.06em] text-primary">{primary.value}</p>
          <p className="mt-3 text-sm font-medium text-cyan">{primary.trend}</p>
          <p className="mt-5 max-w-md text-sm leading-6 text-secondary">{primary.context}</p>
        </div>
        <div className="rounded-[30px] bg-[linear-gradient(135deg,rgba(162,115,255,0.14),rgba(255,255,255,0.02))] p-6 ring-1 ring-[#a273ff]/16">
          <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">{secondary.label}</p>
          <p className="mt-4 text-4xl font-extrabold tracking-[-0.05em] text-primary">{secondary.value}</p>
          <p className="mt-3 text-sm font-medium text-[#cdb6ff]">{secondary.trend}</p>
          <p className="mt-5 text-sm leading-6 text-secondary">{secondary.context}</p>
        </div>
      </div>
      <div className="grid gap-px overflow-hidden rounded-[28px] bg-white/8 md:grid-cols-2 xl:grid-cols-4">
        {rest.map((metric) => (
          <div key={metric.id} className="bg-[linear-gradient(180deg,rgba(12,16,24,0.96),rgba(8,11,16,0.96))] px-5 py-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">{metric.label}</p>
            <p className="mt-3 text-3xl font-extrabold tracking-[-0.05em] text-primary">{metric.value}</p>
            <p className="mt-3 text-sm font-medium text-cyan">{metric.trend}</p>
            <p className="mt-4 text-sm leading-6 text-secondary">{metric.context}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
