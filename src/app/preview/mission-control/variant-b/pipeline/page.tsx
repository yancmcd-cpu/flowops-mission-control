import { OpportunityPipeline } from "@/components/domains/opportunities/OpportunityPipeline";
import { PreviewWorkspaceFrame } from "@/components/preview/mission-control/PreviewWorkspaceFrame";

export default function MissionControlPreviewVariantBPipelinePage() {
  return (
    <PreviewWorkspaceFrame variant="b" eyebrow="Commercial Workspace" title="Pipeline">
      <OpportunityPipeline />
    </PreviewWorkspaceFrame>
  );
}
