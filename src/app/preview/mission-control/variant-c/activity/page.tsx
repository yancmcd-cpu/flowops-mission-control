import { ActivityTimeline } from "@/components/domains/activity/ActivityTimeline";
import { PreviewWorkspaceFrame } from "@/components/preview/mission-control/PreviewWorkspaceFrame";

export default function MissionControlPreviewVariantCActivityPage() {
  return (
    <PreviewWorkspaceFrame variant="c" eyebrow="System Workspace" title="Activity">
      <ActivityTimeline />
    </PreviewWorkspaceFrame>
  );
}
