import { ProjectPipeline } from "@/components/domains/projects/ProjectPipeline";
import { PreviewWorkspaceFrame } from "@/components/preview/mission-control/PreviewWorkspaceFrame";

export default function MissionControlPreviewVariantCProjectsPage() {
  return (
    <PreviewWorkspaceFrame variant="c" eyebrow="Delivery Workspace" title="Projects">
      <ProjectPipeline />
    </PreviewWorkspaceFrame>
  );
}
