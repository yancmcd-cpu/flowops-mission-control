import { MetricsGrid } from "@/components/domains/metrics/MetricsGrid";
import { PreviewWorkspaceFrame } from "@/components/preview/mission-control/PreviewWorkspaceFrame";

export default function MissionControlPreviewVariantAMetricsPage() {
  return (
    <PreviewWorkspaceFrame variant="a" eyebrow="System Workspace" title="Metrics">
      <MetricsGrid />
    </PreviewWorkspaceFrame>
  );
}
