import { PreviewWorkspaceFrame } from "@/components/preview/mission-control/PreviewWorkspaceFrame";
import { WorkflowProgressView } from "@/components/domains/workflow/WorkflowProgressView";

export default function MissionControlPreviewVariantCWorkflowsPage() {
  return (
    <PreviewWorkspaceFrame variant="c" eyebrow="Execution Workspace" title="Workflows">
      <WorkflowProgressView />
    </PreviewWorkspaceFrame>
  );
}
