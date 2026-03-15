import { ActivityTimeline } from "@/components/domains/activity/ActivityTimeline";
import { PreviewWorkspaceFrame } from "@/components/preview/mission-control/PreviewWorkspaceFrame";

export default function MissionControlPreviewVariantAActivityPage() {
  return (
    <PreviewWorkspaceFrame variant="a" eyebrow="System Workspace" title="Activity">
      <ActivityTimeline />
    </PreviewWorkspaceFrame>
  );
}
