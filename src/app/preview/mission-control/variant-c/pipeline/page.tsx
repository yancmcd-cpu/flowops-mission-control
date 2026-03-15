import { OpportunityPipeline } from "@/components/domains/opportunities/OpportunityPipeline";
import { PreviewWorkspaceFrame } from "@/components/preview/mission-control/PreviewWorkspaceFrame";

export default function MissionControlPreviewVariantCPipelinePage() {
  return (
    <PreviewWorkspaceFrame variant="c" eyebrow="Commercial Workspace" title="Pipeline">
      <OpportunityPipeline />
    </PreviewWorkspaceFrame>
  );
}
