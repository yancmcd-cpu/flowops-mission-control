import { GlassPanel } from "@/components/shared/GlassPanel";

type MetricCardProps = {
  label: string;
  value: string;
  trend: string;
  context: string;
};

export function MetricCard({ label, value, trend, context }: MetricCardProps) {
  return (
    <GlassPanel className="p-6">
      <p className="text-sm font-medium text-secondary">{label}</p>
      <p className="mt-3 text-4xl font-extrabold tracking-tight text-primary">{value}</p>
      <p className="mt-2 text-sm font-medium text-cyan">{trend}</p>
      <p className="mt-4 max-w-xs text-sm leading-6 text-secondary">{context}</p>
    </GlassPanel>
  );
}
