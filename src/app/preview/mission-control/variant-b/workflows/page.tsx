import { PreviewWorkspaceFrame } from "@/components/preview/mission-control/PreviewWorkspaceFrame";
import { WorkflowProgressView } from "@/components/domains/workflow/WorkflowProgressView";

export default function MissionControlPreviewVariantBWorkflowsPage() {
  return (
    <PreviewWorkspaceFrame variant="b" eyebrow="Execution Workspace" title="Workflows">
      <WorkflowProgressView />
    </PreviewWorkspaceFrame>
  );
}
