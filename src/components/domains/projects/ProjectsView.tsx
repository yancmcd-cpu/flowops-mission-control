"use client";

import { useMissionControlData } from "@/components/providers/MissionControlDataProvider";
import { Badge } from "@/components/shared/Badge";
import { DetailModal } from "@/components/shared/DetailModal";
import { GlassPanel } from "@/components/shared/GlassPanel";
import type { ProjectRecord } from "@/lib/types";
import { useMemo, useState, type ReactNode } from "react";

const stageOptions = [
  "All",
  "Idea",
  "Research",
  "Evaluation",
  "Solution Design",
  "Prototype",
  "Website / Asset Build",
  "Implementation",
  "Review / Approval",
  "Delivered - Live",
  "Optimization",
  "Closed / Archived",
] as const;

export function ProjectsView() {
  const {
    data: { projects },
  } = useMissionControlData();
  const [stageFilter, setStageFilter] = useState<(typeof stageOptions)[number]>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);

  const openProjects = useMemo(() => {
    return projects.filter(
      (project) =>
        project.projectStage !== "Closed / Archived" &&
        (stageFilter === "All" || project.projectStage === stageFilter),
    );
  }, [projects, stageFilter]);

  return (
    <>
      <div className="space-y-4">
        <GlassPanel>
          <div className="border-b border-white/8 px-5 py-4">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-primary">Projects</h2>
              </div>
              <label className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.22em] text-secondary">Stage Filter</span>
                <select
                  value={stageFilter}
                  onChange={(event) => setStageFilter(event.target.value as (typeof stageOptions)[number])}
                  className="w-full rounded-2xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-3 text-sm text-primary outline-none"
                >
                  {stageOptions.map((option) => (
                    <option key={option} value={option} className="bg-[#0f1522]">
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="hidden gap-4 border-t border-white/8 px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-secondary xl:grid xl:grid-cols-[1.15fr_120px_1.1fr_1fr_170px_110px_90px_100px]">
            <span>Project/Client Name</span>
            <span>Category</span>
            <span>Summary</span>
            <span>Next Step</span>
            <span>Stage</span>
            <span>Status</span>
            <span>Linked tasks</span>
            <span>Progress</span>
          </div>

          <div className="space-y-3 px-4 py-4 sm:px-5">
            {openProjects.length ? (
              openProjects.map((project) => (
                <button
                  key={project.projectId}
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="w-full rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-4 text-left transition hover:border-[#7a84ff]/20 hover:bg-[linear-gradient(180deg,rgba(132,145,255,0.08),rgba(255,255,255,0.02))]"
                >
                  <div className="grid gap-4 xl:grid-cols-[1.15fr_120px_1.1fr_1fr_170px_110px_90px_100px] xl:items-start">
                    <Cell label="Project/Client Name">
                      <p className="font-semibold text-primary">{project.projectName}</p>
                      <p className="mt-1 text-sm text-secondary">{project.linkedClient}</p>
                    </Cell>
                    <Cell label="Category">
                      <p className="text-sm text-primary">{project.projectCategory}</p>
                    </Cell>
                    <Cell label="Summary">
                      <p className="text-sm leading-6 text-primary">{project.summary}</p>
                    </Cell>
                    <Cell label="Next Step">
                      <p className="text-sm leading-6 text-primary">{project.nextProjectAction}</p>
                    </Cell>
                    <Cell label="Stage">
                      <p className="text-sm font-medium text-primary">{project.projectStage}</p>
                      <p className="mt-1 text-sm text-secondary">{project.currentPhase}</p>
                    </Cell>
                    <Cell label="Status">
                      <Badge tone={statusTone(project)}>{project.taskHealthStatus ?? "Open"}</Badge>
                    </Cell>
                    <Cell label="Linked tasks">
                      <p className="text-sm font-medium text-primary">{project.linkedTasks}</p>
                    </Cell>
                    <Cell label="Progress">
                      <p className="text-sm font-medium text-primary">{project.progress}%</p>
                      <div className="mt-2 h-2 rounded-full bg-white/[0.06]">
                        <div className="h-2 rounded-full bg-[linear-gradient(90deg,#57d8ff,#8a97ff)]" style={{ width: `${project.progress}%` }} />
                      </div>
                    </Cell>
                  </div>
                </button>
              ))
            ) : (
              <div className="rounded-[24px] bg-white/[0.03] px-4 py-5 text-sm leading-6 text-secondary">
                No projects are active yet. The first live project can be the FlowOps client-facing website once you create it in the operating system.
              </div>
            )}
          </div>
        </GlassPanel>
      </div>

      <DetailModal
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.projectName ?? ""}
        subtitle={selectedProject ? `${selectedProject.projectCategory} / ${selectedProject.projectTrack}` : undefined}
      >
        {selectedProject ? <ProjectModalBody project={selectedProject} /> : null}
      </DetailModal>
    </>
  );
}

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <span className="text-[10px] uppercase tracking-[0.18em] text-secondary xl:hidden">{label}</span>
      <div className="mt-1 xl:mt-0">{children}</div>
    </div>
  );
}

function ProjectModalBody({ project }: { project: ProjectRecord }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FieldCard label="Project/Client Name" value={`${project.projectName} / ${project.linkedClient}`} />
      <FieldCard label="Category" value={`${project.projectCategory} / ${project.projectTrack}`} />
      <FieldCard label="Summary" value={project.summary ?? ""} multiline />
      <FieldCard label="Next Step" value={project.nextProjectAction} multiline />
      <FieldCard label="Stage" value={`${project.projectStage} / ${project.currentPhase}`} />
      <FieldCard label="Status" value={project.taskHealthStatus ?? "Open"} />
      <FieldCard label="Linked tasks" value={String(project.linkedTasks)} />
      <FieldCard label="Progress" value={`${project.progress}%`} />
    </div>
  );
}

function FieldCard({ label, value, multiline }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div className="rounded-[22px] bg-white/[0.03] px-4 py-4">
      <p className="text-[10px] uppercase tracking-[0.22em] text-secondary">{label}</p>
      <p className={multiline ? "mt-3 text-sm leading-6 text-primary" : "mt-3 text-sm font-medium text-primary"}>{value}</p>
    </div>
  );
}

function statusTone(project: ProjectRecord) {
  if (project.taskHealthStatus === "Overdue") return "danger";
  if (project.taskHealthStatus === "Review") return "warning";
  if (project.taskHealthStatus === "In Progress") return "cyan";
  return "blue";
}
