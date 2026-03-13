import { ReviewSplitView } from "@/components/domains/review/ReviewSplitView";
import { skillFactoryReview } from "@/lib/mock-data";

export default function SkillFactoryReviewPage() {
  return (
    <ReviewSplitView
      eyebrow="Skill Factory Review"
      title="Skill Factory Review"
      description="Queue and disposition state for candidate skills, curated with human review and bounded write-back controls."
      items={skillFactoryReview}
    />
  );
}
