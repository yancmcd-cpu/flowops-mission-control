import { ProjectPipeline } from "@/components/domains/projects/ProjectPipeline";
import { PreviewWorkspaceFrame } from "@/components/preview/mission-control/PreviewWorkspaceFrame";

export default function MissionControlPreviewVariantBProjectsPage() {
  return (
    <PreviewWorkspaceFrame variant="b" eyebrow="Delivery Workspace" title="Projects">
      <ProjectPipeline />
    </PreviewWorkspaceFrame>
  );
}
