import { ReviewSplitView } from "@/components/domains/review/ReviewSplitView";
import { knowledgeReview } from "@/lib/mock-data";

export default function MissionControlPreviewKnowledgeReviewPage() {
  return <ReviewSplitView eyebrow="System Review" title="Knowledge Review" description="" items={knowledgeReview} />;
}
