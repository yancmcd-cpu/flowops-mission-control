import { ProjectPipeline } from "@/components/domains/projects/ProjectPipeline";
import { PreviewWorkspaceFrame } from "@/components/preview/mission-control/PreviewWorkspaceFrame";

export default function MissionControlPreviewVariantAProjectsPage() {
  return (
    <PreviewWorkspaceFrame variant="a" eyebrow="Delivery Workspace" title="Projects">
      <ProjectPipeline />
    </PreviewWorkspaceFrame>
  );
}
