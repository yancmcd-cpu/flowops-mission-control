import { ActionQueueClient } from "@/components/domains/action-queue/ActionQueueClient";
import { PreviewWorkspaceFrame } from "@/components/preview/mission-control/PreviewWorkspaceFrame";

export default function MissionControlPreviewVariantBTasksPage() {
  return (
    <PreviewWorkspaceFrame variant="b" eyebrow="Primary Workspace" title="Tasks">
      <ActionQueueClient />
    </PreviewWorkspaceFrame>
  );
}
