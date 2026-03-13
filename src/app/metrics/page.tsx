import { MetricsGrid } from "@/components/domains/metrics/MetricsGrid";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { PanelHeader } from "@/components/shared/PanelHeader";

export default function MetricsPage() {
  return (
    <GlassPanel className="overflow-hidden">
      <PanelHeader
        eyebrow="Operational Metrics"
        title="Operational Metrics"
        description="High-level operating metrics for queue health, review load, workflow continuity, and opportunity movement."
      />
      <div className="p-5 sm:p-6">
        <MetricsGrid />
      </div>
    </GlassPanel>
  );
}
