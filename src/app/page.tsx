import { Badge } from "@/components/shared/Badge";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { PanelHeader } from "@/components/shared/PanelHeader";
import { activityFeed, opportunities, projects, tasks, workflows } from "@/lib/mock-data";
import { ArrowRight, CircleAlert, GitBranch, Sparkles } from "lucide-react";

const nextBestActions = tasks.filter((task) => task.nextAction).slice(0, 4);
const openTasks = tasks.filter((task) => !["Completed", "Archived"].includes(task.status)).length;
const reviewLoad = tasks.filter((task) => task.status === "Review").length;
const manualTasks = tasks.filter((task) => task.source === "manual").length;
const blockers = workflows.reduce((count, workflow) => count + workflow.blockingIssues.length, 0);

export default function OverviewPage() {
  const leadAction = nextBestActions[0];
  const supportingActions = nextBestActions.slice(1);

  return (
    <div className="space-y-6">
      <GlassPanel className="overflow-hidden">
        <PanelHeader
          title="Command Priority"
          description="Immediate intervention and next-best work surfaced as a decisive action stack."
        />
        <div className="grid gap-px bg-white/8 lg:grid-cols-[minmax(0,1.28fr)_360px]">
          <div className="bg-[linear-gradient(180deg,rgba(12,17,28,0.98),rgba(8,11,17,0.98))] p-5 sm:p-6">
            {leadAction ? (
              <div className="rounded-[28px] bg-[linear-gradient(135deg,rgba(122,132,255,0.22),rgba(65,214,255,0.12)_52%,rgba(255,255,255,0.02))] p-6 shadow-[0_24px_70px_rgba(90,108,255,0.18)] ring-1 ring-[#7a84ff]/18">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-[#cfd5ff]">Operator Focus</span>
                  <Badge tone={leadAction.source === "system" ? "blue" : "cyan"}>{leadAction.source}</Badge>
                  <Badge tone="cyan">Next Action</Badge>
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div className="space-y-4">
                    <h2 className="max-w-2xl text-2xl font-semibold tracking-[-0.05em] text-primary">{leadAction.title}</h2>
                    <div className="grid gap-4 text-sm text-secondary sm:grid-cols-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-tertiary">Due</p>
                        <p className="mt-1 font-medium text-primary">{leadAction.dueDate}</p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-tertiary">Owner</p>
                        <p className="mt-1 font-medium text-primary">{leadAction.owner}</p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-tertiary">Context</p>
                        <p className="mt-1 font-medium text-primary">{leadAction.linkedProject ?? leadAction.linkedWorkflow ?? leadAction.linkedOpportunityOrClient ?? "Standalone"}</p>
                      </div>
                    </div>
                    <p className="max-w-2xl text-sm leading-7 text-primary/92">{leadAction.notes}</p>
                  </div>
                  <div className="hidden rounded-3xl bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-4 text-cyan shadow-[0_0_24px_rgba(65,214,255,0.16)] ring-1 ring-cyan/12 lg:flex lg:flex-col lg:items-center lg:justify-center">
                    <Sparkles className="h-5 w-5" />
                    <ArrowRight className="mt-4 h-5 w-5" />
                  </div>
                </div>
              </div>
            ) : null}

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {supportingActions.map((task, index) => (
                <div
                  key={task.id}
                  className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-5 py-4 ring-1 ring-white/8 transition hover:-translate-y-0.5 hover:ring-[#7a84ff]/16"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-secondary">Priority {index + 2}</span>
                    <Badge tone={task.source === "system" ? "blue" : "cyan"}>{task.source}</Badge>
                  </div>
                  <h3 className="mt-3 text-base font-semibold tracking-[-0.03em] text-primary">{task.title}</h3>
                  <div className="mt-4 space-y-1.5 text-sm text-secondary">
                    <p>Due {task.dueDate}</p>
                    <p>{task.owner}</p>
                    <p className="truncate">{task.linkedProject ?? task.linkedWorkflow ?? task.linkedOpportunityOrClient ?? "Standalone"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[linear-gradient(180deg,rgba(10,14,22,0.98),rgba(7,10,16,0.98))] p-5 sm:p-6">
            <p className="text-[11px] uppercase tracking-[0.24em] text-secondary">Intervention Watch</p>
            <div className="mt-4 space-y-4">
              <div className="rounded-[24px] bg-[linear-gradient(135deg,rgba(255,191,95,0.12),rgba(255,255,255,0.02))] p-4 ring-1 ring-amber-400/20">
                <div className="flex items-start gap-3">
                  <CircleAlert className="mt-0.5 h-5 w-5 text-amber-300" />
                  <div>
                    <p className="text-sm font-semibold text-primary">Blockers require operator attention</p>
                    <p className="mt-2 text-sm text-secondary">{blockers} blocker signals are active across current workflows.</p>
                  </div>
                </div>
              </div>
              <div className="grid gap-3">
                <div className="rounded-[22px] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-4 ring-1 ring-white/8">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-secondary">Urgent Reviews</p>
                  <p className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-primary">{reviewLoad}</p>
                </div>
                <div className="rounded-[22px] bg-[linear-gradient(180deg,rgba(122,132,255,0.10),rgba(255,255,255,0.02))] px-4 py-4 ring-1 ring-[#7a84ff]/14">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-secondary">Manual Follow-Through</p>
                  <p className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-primary">{manualTasks}</p>
                </div>
                <div className="rounded-[22px] bg-[linear-gradient(180deg,rgba(65,214,255,0.10),rgba(255,255,255,0.02))] px-4 py-4 ring-1 ring-cyan/14">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-secondary">Open Workload</p>
                  <p className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-primary">{openTasks}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="overflow-hidden">
        <PanelHeader
          title="Operational Pulse"
          description="Pressure and throughput grouped as one telemetry strip instead of separate widgets."
        />
        <div className="grid gap-px overflow-hidden rounded-[28px] bg-white/8 lg:grid-cols-4">
          <div className="bg-[linear-gradient(135deg,rgba(122,132,255,0.16),rgba(255,255,255,0.02))] px-5 py-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Open Work</p>
            <p className="mt-3 text-4xl font-extrabold tracking-[-0.05em] text-primary">{openTasks}</p>
          </div>
          <div className="bg-[linear-gradient(135deg,rgba(162,115,255,0.14),rgba(255,255,255,0.02))] px-5 py-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Review Load</p>
            <p className="mt-3 text-4xl font-extrabold tracking-[-0.05em] text-primary">{reviewLoad}</p>
          </div>
          <div className="bg-[linear-gradient(135deg,rgba(65,214,255,0.14),rgba(255,255,255,0.02))] px-5 py-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Manual Tasks</p>
            <p className="mt-3 text-4xl font-extrabold tracking-[-0.05em] text-primary">{manualTasks}</p>
          </div>
          <div className="bg-[linear-gradient(135deg,rgba(255,107,122,0.14),rgba(255,255,255,0.02))] px-5 py-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Blockers</p>
            <p className="mt-3 text-4xl font-extrabold tracking-[-0.05em] text-rose-300">{blockers}</p>
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="overflow-hidden">
        <PanelHeader
          title="Pipeline Signals"
          description="Projects, opportunities, and workflow state summarized as monitoring rows instead of equal cards."
        />
        <div className="grid gap-px bg-white/8 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)_minmax(0,0.9fr)]">
          <div className="bg-[linear-gradient(180deg,rgba(12,17,28,0.96),rgba(8,11,16,0.96))] p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Projects</p>
              <Badge tone="cyan">{projects.length}</Badge>
            </div>
            <div className="mt-4 space-y-3">
              {projects.map((project) => (
                <div key={project.projectId} className="grid gap-3 rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-4 ring-1 ring-white/8 md:grid-cols-[minmax(0,1fr)_150px]">
                  <div>
                    <p className="text-sm font-semibold text-primary">{project.projectName}</p>
                    <p className="mt-1 text-sm text-secondary">{project.currentPhase}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-tertiary">{project.linkedClient}</p>
                  </div>
                  <div className="space-y-1 text-sm text-right">
                    <p className={project.blockers > 0 ? "text-amber-300" : "text-cyan"}>{project.blockers > 0 ? `${project.blockers} blockers` : "Moving"}</p>
                    <p className="text-secondary">{project.nextProjectAction}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[linear-gradient(180deg,rgba(10,15,24,0.96),rgba(7,10,16,0.96))] p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Opportunities</p>
              <Badge tone="blue">{opportunities.length}</Badge>
            </div>
            <div className="mt-4 space-y-3">
              {opportunities.map((item) => (
                <div key={item.opportunityId} className="rounded-[24px] bg-[linear-gradient(180deg,rgba(122,132,255,0.08),rgba(255,255,255,0.02))] px-4 py-4 ring-1 ring-[#7a84ff]/12">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-primary">{item.opportunityName}</p>
                    <span className="text-xs uppercase tracking-[0.18em] text-secondary">{item.pipelineStage}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-3 text-sm">
                    <span className="text-secondary">{item.owner}</span>
                    <span className="text-secondary">{item.classificationStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[linear-gradient(180deg,rgba(10,15,24,0.96),rgba(7,10,16,0.96))] p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Workflow State</p>
              <GitBranch className="h-4 w-4 text-cyan" />
            </div>
            <div className="mt-4 space-y-3">
              {workflows.map((workflow) => (
                <div key={workflow.id} className="rounded-[24px] bg-[linear-gradient(180deg,rgba(65,214,255,0.08),rgba(255,255,255,0.02))] px-4 py-4 ring-1 ring-cyan/12">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-primary">{workflow.activeWorkflow}</p>
                    <span className={workflow.workflowStatus === "Blocked" ? "text-rose-300" : "text-cyan"}>{workflow.workflowStatus}</span>
                  </div>
                  <p className="mt-2 text-sm text-secondary">{workflow.currentStep}</p>
                  <p className="mt-1 text-sm text-secondary">Next: {workflow.nextWorkflowCandidate}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="overflow-hidden">
        <PanelHeader
          title="Recent Activity"
          description="Recent movement rendered as an operational ledger for timestamp-first scanning."
        />
        <div className="bg-[linear-gradient(180deg,rgba(8,11,16,0.98),rgba(6,8,12,0.98))] px-5 py-4 font-mono text-[13px] sm:px-6">
          {activityFeed.map((item, index) => (
            <div
              key={item.id}
              className={`grid gap-3 py-3 md:grid-cols-[100px_170px_minmax(0,1fr)] ${index !== activityFeed.length - 1 ? "border-b border-white/8" : ""}`}
            >
              <span className="text-secondary">{item.activityTime}</span>
              <span className="flex items-center gap-2 text-cyan">
                <span className="h-2 w-2 rounded-full bg-current shadow-[0_0_12px_currentColor]" />
                {item.activityType}
              </span>
              <span className="text-primary">{item.summary}</span>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
