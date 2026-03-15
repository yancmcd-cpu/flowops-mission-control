import { MetricsGrid } from "@/components/domains/metrics/MetricsGrid";
import { PreviewWorkspaceFrame } from "@/components/preview/mission-control/PreviewWorkspaceFrame";

export default function MissionControlPreviewVariantBMetricsPage() {
  return (
    <PreviewWorkspaceFrame variant="b" eyebrow="System Workspace" title="Metrics">
      <MetricsGrid />
    </PreviewWorkspaceFrame>
  );
}
