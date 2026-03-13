import { Badge } from "@/components/shared/Badge";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { PanelHeader } from "@/components/shared/PanelHeader";
import { projects } from "@/lib/mock-data";

const columns = ["Proposal", "Active", "Implementation", "Complete"];
const columnSurfaceMap: Record<string, string> = {
  Proposal: "bg-[linear-gradient(180deg,rgba(122,132,255,0.12),rgba(255,255,255,0.02))] ring-[#7a84ff]/12",
  Active: "bg-[linear-gradient(180deg,rgba(65,214,255,0.10),rgba(255,255,255,0.02))] ring-cyan/12",
  Implementation: "bg-[linear-gradient(180deg,rgba(255,191,95,0.10),rgba(255,255,255,0.02))] ring-amber-400/12",
  Complete: "bg-[linear-gradient(180deg,rgba(67,209,141,0.10),rgba(255,255,255,0.02))] ring-emerald-400/12",
};

export function ProjectPipeline() {
  return (
    <GlassPanel className="overflow-hidden">
      <PanelHeader
        eyebrow="Project State"
        title="Projects"
        description="Project monitoring arranged as progress rows with stronger blocker and next-step visibility."
      />
      <div className="grid gap-px bg-white/8 xl:grid-cols-4">
        {columns.map((column) => {
          const items = projects.filter((project) => project.projectStatus === column);
          return (
            <div key={column} className="bg-[linear-gradient(180deg,rgba(10,14,22,0.96),rgba(7,10,16,0.96))] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-primary">{column}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-tertiary">Project Stage</p>
                </div>
                <span className="rounded-full bg-white/[0.05] px-3 py-1 text-sm text-secondary ring-1 ring-white/8">{items.length}</span>
              </div>
              <div className="mt-4 space-y-3">
                {items.map((project) => (
                  <div key={project.projectId} className={`rounded-[24px] px-4 py-4 ring-1 ${columnSurfaceMap[column]}`}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-primary">{project.projectName}</p>
                        <p className="mt-1 text-sm text-secondary">{project.linkedClient}</p>
                      </div>
                      {project.blockers > 0 ? <Badge tone="warning">{project.blockers} blockers</Badge> : <Badge tone={column === "Complete" ? "muted" : "cyan"}>{column === "Complete" ? "stable" : "moving"}</Badge>}
                    </div>
                    <div className="mt-4 grid gap-2 text-sm text-secondary">
                      <div className="flex items-center justify-between gap-3">
                        <span>Phase</span>
                        <span className="text-primary">{project.currentPhase}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>Owner</span>
                        <span className="text-primary">{project.ownerRole}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>Next Step</span>
                        <span className={project.blockers > 0 ? "text-amber-300" : "text-primary"}>{project.nextProjectAction}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>Linked Tasks</span>
                        <span className="text-primary">{project.linkedTasks}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}
