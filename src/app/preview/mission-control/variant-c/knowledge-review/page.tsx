import { ReviewSplitView } from "@/components/domains/review/ReviewSplitView";
import { PreviewWorkspaceFrame } from "@/components/preview/mission-control/PreviewWorkspaceFrame";
import { knowledgeReview } from "@/lib/mock-data";

export default function MissionControlPreviewVariantCKnowledgeReviewPage() {
  return (
    <PreviewWorkspaceFrame variant="c" eyebrow="System Workspace" title="Knowledge Review">
      <ReviewSplitView eyebrow="System Review" title="Knowledge Review" description="" items={knowledgeReview} />
    </PreviewWorkspaceFrame>
  );
}
