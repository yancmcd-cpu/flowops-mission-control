import { PreviewWorkspaceFrame } from "@/components/preview/mission-control/PreviewWorkspaceFrame";
import { WorkflowProgressView } from "@/components/domains/workflow/WorkflowProgressView";

export default function MissionControlPreviewVariantAWorkflowsPage() {
  return (
    <PreviewWorkspaceFrame variant="a" eyebrow="Execution Workspace" title="Workflows">
      <WorkflowProgressView />
    </PreviewWorkspaceFrame>
  );
}
