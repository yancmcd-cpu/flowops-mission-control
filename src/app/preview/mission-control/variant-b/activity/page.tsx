import { ActivityTimeline } from "@/components/domains/activity/ActivityTimeline";
import { PreviewWorkspaceFrame } from "@/components/preview/mission-control/PreviewWorkspaceFrame";

export default function MissionControlPreviewVariantBActivityPage() {
  return (
    <PreviewWorkspaceFrame variant="b" eyebrow="System Workspace" title="Activity">
      <ActivityTimeline />
    </PreviewWorkspaceFrame>
  );
}
