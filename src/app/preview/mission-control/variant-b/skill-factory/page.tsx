import { ReviewSplitView } from "@/components/domains/review/ReviewSplitView";
import { PreviewWorkspaceFrame } from "@/components/preview/mission-control/PreviewWorkspaceFrame";
import { skillFactoryReview } from "@/lib/mock-data";

export default function MissionControlPreviewVariantBSkillFactoryPage() {
  return (
    <PreviewWorkspaceFrame variant="b" eyebrow="System Workspace" title="Skill Factory">
      <ReviewSplitView eyebrow="System Review" title="Skill Factory" description="" items={skillFactoryReview} />
    </PreviewWorkspaceFrame>
  );
}
