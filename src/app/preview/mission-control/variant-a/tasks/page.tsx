import { ActionQueueClient } from "@/components/domains/action-queue/ActionQueueClient";
import { PreviewWorkspaceFrame } from "@/components/preview/mission-control/PreviewWorkspaceFrame";

export default function MissionControlPreviewVariantATasksPage() {
  return (
    <PreviewWorkspaceFrame variant="a" eyebrow="Primary Workspace" title="Tasks">
      <ActionQueueClient />
    </PreviewWorkspaceFrame>
  );
}
