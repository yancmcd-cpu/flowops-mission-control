import { Badge } from "@/components/shared/Badge";
import { DonutChart, MiniBarChart, SparkAreaChart } from "@/components/preview/mission-control/PreviewCharts";
import { VariantSwitcher } from "@/components/preview/mission-control/VariantSwitcher";
import {
  clientLoadBreakdown,
  leadTask,
  pipelineRevenueLabel,
  pipelineStageBreakdown,
  reviewCount,
  supportingPriority,
  taskPreview,
  urgentCount,
  workflowMix,
  workflowState,
} from "@/components/preview/mission-control/variant-data";
import { opportunities, projects, workflows } from "@/lib/mock-data";
import Link from "next/link";

export function MissionControlVariantA() {
  return (
    <div className="space-y-6">
      <VariantSwitcher current="/preview/mission-control/variant-a" />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.24fr)_360px]">
        <section className="rounded-[34px] bg-[linear-gradient(180deg,rgba(17,22,34,0.98),rgba(10,13,20,0.98))] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.34)]">
          <p className="text-[10px] uppercase tracking-[0.28em] text-secondary">Command Priority</p>
          <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_220px]">
            <div className="rounded-[28px] bg-[linear-gradient(135deg,rgba(122,132,255,0.18),rgba(65,214,255,0.08)_55%,rgba(255,255,255,0.02))] p-6 shadow-[0_18px_50px_rgba(90,108,255,0.18)]">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="cyan">Lead Focus</Badge>
                {leadTask?.nextAction ? <Badge tone="cyan">Next Action</Badge> : null}
              </div>
              <h2 className="mt-4 max-w-2xl text-[2rem] font-semibold tracking-[-0.05em] text-primary">{leadTask?.title}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-primary/88">{leadTask?.notes}</p>
              <div className="mt-6 flex flex-wrap gap-6 text-sm text-secondary">
                <span>{leadTask?.owner}</span>
                <span>{leadTask?.dueDate}</span>
                <span>{leadTask?.linkedProject ?? leadTask?.linkedOpportunityOrClient ?? "Standalone"}</span>
              </div>
            </div>

            <div className="space-y-3">
              {supportingPriority.map((task) => (
                <div key={task.id} className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-primary">{task.title}</p>
                    {task.nextAction ? <Badge tone="cyan">Next</Badge> : null}
                  </div>
                  <div className="mt-3 space-y-1 text-sm text-secondary">
                    <p>{task.owner}</p>
                    <p>{task.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">Pipeline by Stage</p>
                <p className="mt-2 text-sm text-secondary">Commercial value across the current opportunity stages.</p>
              </div>
              <span className="text-2xl font-bold tracking-[-0.05em] text-primary">{pipelineRevenueLabel}</span>
            </div>
            <div className="mt-4 h-44">
              <SparkAreaChart values={pipelineStageBreakdown.map((item) => item.value)} stroke="#7a84ff" fill="rgba(122,132,255,0.16)" />
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-4">
              {pipelineStageBreakdown.map((item) => (
                <div key={item.label} className="rounded-[18px] bg-white/[0.03] px-3 py-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-secondary">{item.label}</p>
                  <p className="mt-2 text-sm font-semibold text-primary">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(item.value)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-3">
          <div className="rounded-[28px] bg-[linear-gradient(180deg,rgba(22,28,42,0.98),rgba(12,16,24,0.98))] px-5 py-5">
            <p className="text-[10px] uppercase tracking-[0.28em] text-secondary">Pipeline Revenue</p>
            <p className="mt-3 text-4xl font-extrabold tracking-[-0.05em] text-primary">{pipelineRevenueLabel}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">Active Clients</p>
              <p className="mt-2 text-3xl font-bold tracking-[-0.05em] text-primary">{projects.length}</p>
            </div>
            <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">Open Opportunities</p>
              <p className="mt-2 text-3xl font-bold tracking-[-0.05em] text-primary">{opportunities.length}</p>
            </div>
            <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">Blocked Workflows</p>
              <p className="mt-2 text-3xl font-bold tracking-[-0.05em] text-rose-300">{workflowState.blocked}</p>
            </div>
            <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-secondary">Agency Signal Mix</p>
              <div className="mt-4">
                <DonutChart segments={workflowMix} centerValue={String(urgentCount)} centerLabel="urgent" />
              </div>
              <p className="mt-3 text-sm text-secondary">{reviewCount} reviews are waiting behind active execution work.</p>
            </div>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
        <section className="rounded-[32px] bg-[linear-gradient(180deg,rgba(16,21,31,0.98),rgba(10,13,19,0.98))] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-secondary">Tasks</p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-primary">Top 5 operator priorities</h3>
            </div>
            <Link href="/preview/mission-control/tasks" className="text-sm font-medium text-cyan">
              Open Tasks
            </Link>
          </div>
          <div className="mt-5 space-y-3">
            {taskPreview.map((task) => (
              <Link key={task.id} href="/preview/mission-control/tasks" className="block rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-4 py-4 transition hover:-translate-y-0.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-primary">{task.title}</p>
                    <p className="mt-1 text-sm text-secondary">{task.linkedProject ?? task.linkedOpportunityOrClient ?? task.linkedWorkflow ?? "Standalone"}</p>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    <Badge tone={task.priority === "Critical" ? "danger" : task.priority === "High" ? "warning" : task.priority === "Medium" ? "cyan" : "muted"}>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid gap-6">
          <section className="rounded-[30px] bg-[linear-gradient(180deg,rgba(16,21,31,0.98),rgba(10,13,19,0.98))] p-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold tracking-tight text-primary">Projects</h3>
              <Link href="/preview/mission-control/projects" className="text-sm font-medium text-cyan">
                View all
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {projects.map((project) => (
                <Link key={project.projectId} href="/preview/mission-control/projects" className="block rounded-[22px] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-primary">{project.projectName}</p>
                    <span className="text-sm text-primary">{project.progress}%</span>
                  </div>
                  <p className="mt-2 text-sm text-secondary">{project.nextProjectAction}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[30px] bg-[linear-gradient(180deg,rgba(16,21,31,0.98),rgba(10,13,19,0.98))] p-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold tracking-tight text-primary">Workflow Health</h3>
              <Link href="/preview/mission-control/workflows" className="text-sm font-medium text-cyan">
                View all
              </Link>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[20px] bg-white/[0.03] px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">Active</p>
                <p className="mt-2 text-3xl font-bold text-primary">{workflowState.active}</p>
              </div>
              <div className="rounded-[20px] bg-white/[0.03] px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">Queued</p>
                <p className="mt-2 text-3xl font-bold text-primary">{workflowState.queued}</p>
              </div>
              <div className="rounded-[20px] bg-white/[0.03] px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">Blocked</p>
                <p className="mt-2 text-3xl font-bold text-rose-300">{workflowState.blocked}</p>
              </div>
            </div>
            <div className="mt-5 rounded-[22px] bg-white/[0.03] px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">Client Delivery Load</p>
              <div className="mt-4">
                <MiniBarChart values={clientLoadBreakdown.map((item) => item.value)} colors={["#41d6ff", "#7a84ff", "#8ea4ff"]} height={112} />
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {clientLoadBreakdown.map((item) => (
                  <div key={item.label} className="rounded-[16px] bg-white/[0.02] px-3 py-2">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-secondary">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold text-primary">{item.value} linked tasks</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
