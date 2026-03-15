import { ReviewSplitView } from "@/components/domains/review/ReviewSplitView";
import { skillFactoryReview } from "@/lib/mock-data";

export default function MissionControlPreviewSkillFactoryPage() {
  return <ReviewSplitView eyebrow="System Review" title="Skill Factory" description="" items={skillFactoryReview} />;
}
