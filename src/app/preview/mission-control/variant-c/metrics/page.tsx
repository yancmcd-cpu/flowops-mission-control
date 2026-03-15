import { MetricsGrid } from "@/components/domains/metrics/MetricsGrid";
import { PreviewWorkspaceFrame } from "@/components/preview/mission-control/PreviewWorkspaceFrame";

export default function MissionControlPreviewVariantCMetricsPage() {
  return (
    <PreviewWorkspaceFrame variant="c" eyebrow="System Workspace" title="Metrics">
      <MetricsGrid />
    </PreviewWorkspaceFrame>
  );
}
