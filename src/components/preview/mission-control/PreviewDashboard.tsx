import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { VariantSwitcher } from "@/components/preview/mission-control/VariantSwitcher";
import { PanelHeader } from "@/components/shared/PanelHeader";
import { opportunities, projects, tasks, workflows } from "@/lib/mock-data";
import { ArrowRight, CircleAlert, GitBranch } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const priorityRank = { Critical: 4, High: 3, Medium: 2, Low: 1 };
const focusTasks = tasks
  .filter((task) => !["Completed", "Archived"].includes(task.status))
  .sort((left, right) => {
    const leftScore = (left.nextAction ? 10 : 0) + priorityRank[left.priority];
    const rightScore = (right.nextAction ? 10 : 0) + priorityRank[right.priority];
    return rightScore - leftScore;
  });

const leadTask = focusTasks[0];
const supportingPriority = focusTasks.slice(1, 4);
const taskPreview = focusTasks.slice(0, 5);

const workflowState = {
  active: workflows.filter((workflow) => workflow.workflowStatus === "Active").length,
  blocked: workflows.filter((workflow) => workflow.workflowStatus === "Blocked").length,
  queued: workflows.reduce((count, workflow) => count + workflow.nodes.filter((node) => node.status === "Queued").length, 0),
};

const pipelineRevenue = opportunities.reduce((sum, opportunity) => {
  return sum + Number(opportunity.pipelineValue.replace(/[$,]/g, ""));
}, 0);

const pipelineRevenueLabel = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format(pipelineRevenue);

function LinkButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-11 items-center justify-center rounded-2xl border border-[#7a84ff]/40 bg-[linear-gradient(135deg,#8390ff,#5b6cff)] px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_34px_rgba(90,108,255,0.34)] transition duration-150 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_16px_36px_rgba(90,108,255,0.26)]"
    >
      {children}
    </Link>
  );
}

export function PreviewDashboard() {
  return (
    <div className="space-y-6">
      <VariantSwitcher current="/preview/mission-control" />

      <GlassPanel className="overflow-hidden">
        <PanelHeader eyebrow="Operational Focus" title="Command Priority" />
        <div className="grid gap-px bg-white/8 xl:grid-cols-[minmax(0,1.18fr)_360px]">
          <div className="bg-[linear-gradient(180deg,rgba(12,17,28,0.98),rgba(8,11,17,0.98))] p-5 sm:p-6">
            {leadTask ? (
              <div className="rounded-[28px] bg-[linear-gradient(135deg,rgba(122,132,255,0.22),rgba(65,214,255,0.12)_52%,rgba(255,255,255,0.02))] p-6 shadow-[0_24px_70px_rgba(90,108,255,0.18)] ring-1 ring-[#7a84ff]/18">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-[#cfd5ff]">Lead Priority</span>
                  <Badge tone={leadTask.source === "system" ? "blue" : "cyan"}>{leadTask.source}</Badge>
                  {leadTask.nextAction ? <Badge tone="cyan">Next Action</Badge> : null}
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div className="space-y-4">
                    <h2 className="max-w-2xl text-2xl font-semibold tracking-[-0.05em] text-primary">{leadTask.title}</h2>
                    <div className="grid gap-4 text-sm text-secondary sm:grid-cols-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-tertiary">Due</p>
                        <p className="mt-1 font-medium text-primary">{leadTask.dueDate}</p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-tertiary">Owner</p>
                        <p className="mt-1 font-medium text-primary">{leadTask.owner}</p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-tertiary">Context</p>
                        <p className="mt-1 font-medium text-primary">{leadTask.linkedProject ?? leadTask.linkedWorkflow ?? leadTask.linkedOpportunityOrClient ?? "Standalone"}</p>
                      </div>
                    </div>
                    <p className="max-w-2xl text-sm leading-7 text-primary/92">{leadTask.notes}</p>
                    <div className="flex flex-wrap gap-3">
                      <LinkButton href="/preview/mission-control/tasks">Open Tasks</LinkButton>
                      <Button variant="secondary" disabled title="Preview only">
                        Mark reviewed
                      </Button>
                    </div>
                  </div>
                  <div className="hidden rounded-3xl bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-4 text-cyan shadow-[0_0_24px_rgba(65,214,255,0.16)] ring-1 ring-cyan/12 xl:flex xl:flex-col xl:items-center xl:justify-center">
                    <CircleAlert className="h-5 w-5" />
                    <ArrowRight className="mt-4 h-5 w-5" />
                  </div>
                </div>
              </div>
            ) : null}

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {supportingPriority.map((task, index) => (
                <div key={task.id} className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-5 py-4 ring-1 ring-white/8">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-secondary">Focus {index + 2}</span>
                    {task.nextAction ? <Badge tone="cyan">Next</Badge> : <Badge tone={task.source === "system" ? "blue" : "cyan"}>{task.source}</Badge>}
                  </div>
                  <h3 className="mt-3 text-base font-semibold tracking-[-0.03em] text-primary">{task.title}</h3>
                  <div className="mt-4 space-y-1.5 text-sm text-secondary">
                    <p>{task.owner}</p>
                    <p>Due {task.dueDate}</p>
                    <p className="truncate">{task.linkedProject ?? task.linkedWorkflow ?? task.linkedOpportunityOrClient ?? "Standalone"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[linear-gradient(180deg,rgba(10,14,22,0.98),rgba(7,10,16,0.98))] p-5 sm:p-6">
            <p className="text-[11px] uppercase tracking-[0.24em] text-secondary">Operational Pressure</p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-[22px] bg-[linear-gradient(180deg,rgba(162,115,255,0.12),rgba(255,255,255,0.02))] px-4 py-4 ring-1 ring-[#a273ff]/16">
                <p className="text-[11px] uppercase tracking-[0.2em] text-secondary">Pipeline Revenue</p>
                <p className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-primary">{pipelineRevenueLabel}</p>
              </div>
              <div className="rounded-[22px] bg-[linear-gradient(180deg,rgba(65,214,255,0.10),rgba(255,255,255,0.02))] px-4 py-4 ring-1 ring-cyan/14">
                <p className="text-[11px] uppercase tracking-[0.2em] text-secondary">Next Actions</p>
                <p className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-primary">{tasks.filter((task) => task.nextAction).length}</p>
              </div>
              <div className="rounded-[22px] bg-[linear-gradient(180deg,rgba(162,115,255,0.10),rgba(255,255,255,0.02))] px-4 py-4 ring-1 ring-[#a273ff]/14">
                <p className="text-[11px] uppercase tracking-[0.2em] text-secondary">Pending Reviews</p>
                <p className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-primary">{tasks.filter((task) => task.status === "Review").length}</p>
              </div>
              <div className="rounded-[22px] bg-[linear-gradient(180deg,rgba(122,132,255,0.10),rgba(255,255,255,0.02))] px-4 py-4 ring-1 ring-[#7a84ff]/14">
                <p className="text-[11px] uppercase tracking-[0.2em] text-secondary">Active Clients</p>
                <p className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-primary">{projects.length}</p>
              </div>
              <div className="rounded-[22px] bg-[linear-gradient(180deg,rgba(255,107,122,0.14),rgba(255,255,255,0.02))] px-4 py-4 ring-1 ring-rose-400/16">
                <p className="text-[11px] uppercase tracking-[0.2em] text-secondary">Blockers</p>
                <p className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-rose-300">{workflows.reduce((count, workflow) => count + workflow.blockingIssues.length, 0)}</p>
              </div>
            </div>
          </div>
        </div>
      </GlassPanel>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
        <GlassPanel className="overflow-hidden">
          <PanelHeader
            eyebrow="Primary Workspace"
            title="Tasks"
            action={
              <LinkButton href="/preview/mission-control/tasks">
                Open Tasks
              </LinkButton>
            }
          />
          <div className="p-5 sm:p-6">
            <div className="space-y-3">
              {taskPreview.map((task) => (
                <Link
                  key={task.id}
                  href="/preview/mission-control/tasks"
                  className={`block rounded-[24px] px-4 py-4 ring-1 transition ${
                    task.nextAction
                      ? "bg-[linear-gradient(135deg,rgba(65,214,255,0.14),rgba(122,132,255,0.08),rgba(255,255,255,0.02))] ring-cyan/16 shadow-[0_14px_30px_rgba(65,214,255,0.10)]"
                      : "bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] ring-white/8 hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-primary">{task.title}</p>
                      <p className="mt-1 text-sm text-secondary">{task.linkedProject ?? task.linkedWorkflow ?? task.linkedOpportunityOrClient ?? "Standalone"}</p>
                    </div>
                    <div className="flex flex-wrap justify-end gap-2">
                      {task.nextAction ? <Badge tone="cyan">Next Action</Badge> : null}
                      <Badge tone={task.priority === "Critical" ? "danger" : task.priority === "High" ? "warning" : task.priority === "Medium" ? "cyan" : "muted"}>
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 text-sm text-secondary">
                    <span>{task.owner}</span>
                    <span>{task.dueDate}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </GlassPanel>

        <div className="grid gap-6">
          <GlassPanel className="overflow-hidden">
            <PanelHeader eyebrow="Delivery Snapshot" title="Projects" action={<LinkButton href="/preview/mission-control/projects">Open Projects</LinkButton>} />
            <div className="p-5 sm:p-6">
              <div className="space-y-3">
                {projects.map((project) => (
                  <Link key={project.projectId} href="/preview/mission-control/projects" className="block rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-4 ring-1 ring-white/8">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-primary">{project.projectName}</p>
                        <p className="mt-1 text-sm text-secondary">{project.currentPhase}</p>
                      </div>
                      {project.blockers > 0 ? <Badge tone="warning">{project.blockers} blockers</Badge> : <Badge tone="cyan">moving</Badge>}
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                      <span className="text-secondary">{project.ownerRole}</span>
                      <span className="text-primary">{project.progress}%</span>
                    </div>
                    <p className="mt-2 text-sm text-secondary">{project.nextProjectAction}</p>
                  </Link>
                ))}
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="overflow-hidden">
            <PanelHeader eyebrow="Commercial Snapshot" title="Pipeline" action={<LinkButton href="/preview/mission-control/pipeline">Open Pipeline</LinkButton>} />
            <div className="p-5 sm:p-6">
              <div className="space-y-3">
                {opportunities.map((opportunity) => (
                  <Link key={opportunity.opportunityId} href="/preview/mission-control/pipeline" className="block rounded-[24px] bg-[linear-gradient(180deg,rgba(122,132,255,0.08),rgba(255,255,255,0.02))] px-4 py-4 ring-1 ring-[#7a84ff]/12">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-primary">{opportunity.opportunityName}</p>
                        <p className="mt-1 text-sm text-secondary">{opportunity.pipelineStage}</p>
                      </div>
                      <span className="text-sm font-medium text-primary">{opportunity.pipelineValue}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3 text-sm text-secondary">
                      <span>{opportunity.owner}</span>
                      <span>{opportunity.classificationStatus}</span>
                    </div>
                    <p className="mt-2 text-sm text-secondary">{opportunity.nextOpportunityAction}</p>
                  </Link>
                ))}
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>

      <GlassPanel className="overflow-hidden">
        <PanelHeader eyebrow="Execution Visibility" title="Workflow Health" action={<LinkButton href="/preview/mission-control/workflows">Open Workflows</LinkButton>} />
        <div className="grid gap-px bg-white/8 xl:grid-cols-[220px_minmax(0,1fr)]">
          <div className="bg-[linear-gradient(180deg,rgba(10,14,22,0.98),rgba(7,10,16,0.98))] p-5 sm:p-6">
            <div className="grid gap-3">
              <div className="rounded-[22px] bg-[linear-gradient(180deg,rgba(65,214,255,0.10),rgba(255,255,255,0.02))] px-4 py-4 ring-1 ring-cyan/14">
                <p className="text-[11px] uppercase tracking-[0.2em] text-secondary">Active</p>
                <p className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-primary">{workflowState.active}</p>
              </div>
              <div className="rounded-[22px] bg-[linear-gradient(180deg,rgba(255,107,122,0.10),rgba(255,255,255,0.02))] px-4 py-4 ring-1 ring-rose-400/14">
                <p className="text-[11px] uppercase tracking-[0.2em] text-secondary">Blocked</p>
                <p className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-rose-300">{workflowState.blocked}</p>
              </div>
              <div className="rounded-[22px] bg-[linear-gradient(180deg,rgba(122,132,255,0.10),rgba(255,255,255,0.02))] px-4 py-4 ring-1 ring-[#7a84ff]/14">
                <p className="text-[11px] uppercase tracking-[0.2em] text-secondary">Queued</p>
                <p className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-primary">{workflowState.queued}</p>
              </div>
            </div>
          </div>
          <div className="bg-[linear-gradient(180deg,rgba(12,17,28,0.98),rgba(8,11,16,0.98))] p-5 sm:p-6">
            <div className="grid gap-3 xl:grid-cols-3">
              {workflows.map((workflow) => (
                <Link key={workflow.id} href="/preview/mission-control/workflows" className="block rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-4 ring-1 ring-white/8">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-primary">{workflow.activeWorkflow}</p>
                    <span className={workflow.workflowStatus === "Blocked" ? "text-rose-300" : "text-cyan"}>
                      <GitBranch className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-secondary">{workflow.currentStep}</p>
                  <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                    <span className={workflow.workflowStatus === "Blocked" ? "text-rose-300" : "text-cyan"}>{workflow.workflowStatus}</span>
                    <span className="text-secondary">{workflow.nextWorkflowCandidate}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
