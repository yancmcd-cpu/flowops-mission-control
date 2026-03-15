import { MetricsGrid } from "@/components/domains/metrics/MetricsGrid";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { PanelHeader } from "@/components/shared/PanelHeader";

export default function MissionControlPreviewMetricsPage() {
  return (
    <GlassPanel className="overflow-hidden">
      <PanelHeader eyebrow="Operational Metrics" title="Operational Metrics" />
      <div className="p-5 sm:p-6">
        <MetricsGrid />
      </div>
    </GlassPanel>
  );
}
