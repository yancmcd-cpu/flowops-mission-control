import { Badge } from "@/components/shared/Badge";
import { MiniBarChart, SparkAreaChart } from "@/components/preview/mission-control/PreviewCharts";
import { VariantSwitcher } from "@/components/preview/mission-control/VariantSwitcher";
import {
  projectProgressBreakdown,
  leadTask,
  pipelineRevenueLabel,
  pipelineStageBreakdown,
  supportingPriority,
  taskPreview,
  taskStatusBreakdown,
  workflowState,
} from "@/components/preview/mission-control/variant-data";
import { opportunities, projects, workflows } from "@/lib/mock-data";
import Link from "next/link";

export function MissionControlVariantB() {
  return (
    <div className="space-y-6">
      <VariantSwitcher current="/preview/mission-control/variant-b" />

      <section className="rounded-[36px] bg-[linear-gradient(180deg,rgba(20,18,45,0.98),rgba(10,11,24,0.99))] p-6 shadow-[0_30px_100px_rgba(5,7,20,0.42)]">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)_300px]">
          <div className="rounded-[30px] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-5">
            <p className="text-[10px] uppercase tracking-[0.28em] text-secondary">Command Priority</p>
            <h2 className="mt-4 text-[1.85rem] font-semibold tracking-[-0.05em] text-primary">{leadTask?.title}</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-primary/85">{leadTask?.notes}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge tone="cyan">Next Action</Badge>
              <Badge tone="warning">{leadTask?.priority}</Badge>
              <Badge tone="blue">{leadTask?.owner}</Badge>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[28px] bg-[linear-gradient(135deg,rgba(122,132,255,0.20),rgba(162,115,255,0.10),rgba(255,255,255,0.02))] p-5 shadow-[0_18px_50px_rgba(122,132,255,0.18)]">
              <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">Pipeline Revenue</p>
              <p className="mt-3 text-4xl font-extrabold tracking-[-0.06em] text-primary">{pipelineRevenueLabel}</p>
              <p className="mt-3 text-sm text-secondary">{opportunities.length} active opportunities in view</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">Active Clients</p>
                <p className="mt-2 text-3xl font-bold text-primary">{projects.length}</p>
              </div>
              <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">Workflow Pressure</p>
                <p className="mt-2 text-3xl font-bold text-rose-300">{workflowState.blocked}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[30px] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-5">
            <p className="text-[10px] uppercase tracking-[0.28em] text-secondary">Supporting Focus</p>
            <div className="mt-4 space-y-3">
              {supportingPriority.map((task) => (
                <div key={task.id} className="rounded-[22px] bg-black/10 px-4 py-4">
                  <p className="text-sm font-semibold text-primary">{task.title}</p>
                  <p className="mt-2 text-sm text-secondary">{task.linkedProject ?? task.linkedOpportunityOrClient ?? task.linkedWorkflow ?? "Standalone"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_280px]">
          <div className="rounded-[30px] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">Pipeline Stage Value</p>
                <p className="mt-2 text-sm text-secondary">Stage-by-stage commercial weight across the active pipeline.</p>
              </div>
              <span className="rounded-full bg-black/10 px-3 py-1.5 text-xs text-secondary">{pipelineStageBreakdown.length} stages</span>
            </div>
            <div className="mt-4 h-40">
              <SparkAreaChart values={pipelineStageBreakdown.map((item) => item.value)} stroke="#8e7dff" fill="rgba(142,125,255,0.18)" />
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-4">
              {pipelineStageBreakdown.map((item) => (
                <div key={item.label} className="rounded-[16px] bg-black/10 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-secondary">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold text-primary">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(item.value)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[30px] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-5">
            <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">Task Status Load</p>
            <div className="mt-4">
              <MiniBarChart values={taskStatusBreakdown.map((item) => item.value)} colors={["#7a84ff", "#41d6ff", "#a273ff", "#ffba4a", "#8ea4ff"]} height={140} />
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {taskStatusBreakdown.map((item) => (
                <div key={item.label} className="rounded-[16px] bg-black/10 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-secondary">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold text-primary">{item.value} tasks</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)]">
        <section className="rounded-[34px] bg-[linear-gradient(180deg,rgba(19,18,42,0.98),rgba(9,11,20,0.98))] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-secondary">Tasks</p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-primary">Operational queue preview</h3>
            </div>
            <Link href="/preview/mission-control/tasks" className="text-sm font-medium text-cyan">
              Open Tasks
            </Link>
          </div>
          <div className="mt-5 grid gap-3">
            {taskPreview.map((task, index) => (
              <Link key={task.id} href="/preview/mission-control/tasks" className="block rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.018))] px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-primary">{task.title}</p>
                    <p className="mt-1 text-sm text-secondary">{task.owner} / {task.dueDate}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.18em] text-secondary">0{index + 1}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid gap-6">
          <section className="rounded-[30px] bg-[linear-gradient(180deg,rgba(17,18,35,0.98),rgba(10,12,21,0.98))] p-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold tracking-tight text-primary">Projects</h3>
              <Link href="/preview/mission-control/projects" className="text-sm font-medium text-cyan">
                View all
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {projects.map((project) => (
                <Link key={project.projectId} href="/preview/mission-control/projects" className="block rounded-[22px] bg-white/[0.03] px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-primary">{project.projectName}</p>
                    <Badge tone={project.blockers > 0 ? "warning" : "cyan"}>{project.blockers > 0 ? "blocked" : "moving"}</Badge>
                  </div>
                  <p className="mt-3 text-sm text-secondary">{project.currentPhase}</p>
                </Link>
              ))}
            </div>
            <div className="mt-4 rounded-[22px] bg-white/[0.03] px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">Project Progress Snapshot</p>
              <div className="mt-4">
                <MiniBarChart values={projectProgressBreakdown.map((item) => item.value)} colors={["#8e7dff", "#41d6ff", "#7a84ff"]} height={100} />
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {projectProgressBreakdown.map((item) => (
                  <div key={item.label} className="rounded-[16px] bg-black/10 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-secondary">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold text-primary">{item.value}%</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[30px] bg-[linear-gradient(180deg,rgba(17,18,35,0.98),rgba(10,12,21,0.98))] p-6">
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
            <div className="mt-4 space-y-3">
              {workflows.map((workflow) => (
                <Link key={workflow.id} href="/preview/mission-control/workflows" className="block rounded-[22px] bg-white/[0.03] px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-primary">{workflow.activeWorkflow}</p>
                    <span className={workflow.workflowStatus === "Blocked" ? "text-rose-300" : "text-cyan"}>{workflow.workflowStatus}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
