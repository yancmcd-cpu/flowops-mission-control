import { ReviewSplitView } from "@/components/domains/review/ReviewSplitView";
import { knowledgeReview } from "@/lib/mock-data";

export default function KnowledgeReviewPage() {
  return (
    <ReviewSplitView
      eyebrow="Knowledge Review"
      title="Knowledge Review"
      description="Review queue and canonical-ingestion readiness for structured knowledge updates."
      items={knowledgeReview}
    />
  );
}
