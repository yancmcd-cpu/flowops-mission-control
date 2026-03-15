import { ActionQueueClient } from "@/components/domains/action-queue/ActionQueueClient";
import { PreviewWorkspaceFrame } from "@/components/preview/mission-control/PreviewWorkspaceFrame";

export default function MissionControlPreviewVariantCTasksPage() {
  return (
    <PreviewWorkspaceFrame variant="c" eyebrow="Primary Workspace" title="Tasks">
      <ActionQueueClient />
    </PreviewWorkspaceFrame>
  );
}
