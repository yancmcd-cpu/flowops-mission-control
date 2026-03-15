import { OpportunityPipeline } from "@/components/domains/opportunities/OpportunityPipeline";
import { PreviewWorkspaceFrame } from "@/components/preview/mission-control/PreviewWorkspaceFrame";

export default function MissionControlPreviewVariantAPipelinePage() {
  return (
    <PreviewWorkspaceFrame variant="a" eyebrow="Commercial Workspace" title="Pipeline">
      <OpportunityPipeline />
    </PreviewWorkspaceFrame>
  );
}
