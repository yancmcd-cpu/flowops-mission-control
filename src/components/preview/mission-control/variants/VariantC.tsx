import { Badge } from "@/components/shared/Badge";
import { MiniBarChart } from "@/components/preview/mission-control/PreviewCharts";
import { VariantSwitcher } from "@/components/preview/mission-control/VariantSwitcher";
import {
  openTaskCount,
  pipelineRevenueLabel,
  pipelineStageBreakdown,
  projectProgressBreakdown,
  taskPreview,
  workflowNodeBreakdown,
  workflowState,
} from "@/components/preview/mission-control/variant-data";
import { opportunities, projects, workflows } from "@/lib/mock-data";
import Link from "next/link";

export function MissionControlVariantC({ showSwitcher = true }: { showSwitcher?: boolean }) {
  return (
    <div className="space-y-6">
      {showSwitcher ? <VariantSwitcher current="/preview/mission-control/variant-c" /> : null}

      <div className="grid gap-4 xl:grid-cols-5">
        {[
          { label: "Pipeline Revenue", value: pipelineRevenueLabel, tone: "text-primary", tint: "from-[#7a84ff]/14" },
          { label: "Open Work", value: String(openTaskCount), tone: "text-primary", tint: "from-cyan/12" },
          { label: "Active Clients", value: String(projects.length), tone: "text-primary", tint: "from-emerald-400/10" },
          { label: "Open Opportunities", value: String(opportunities.length), tone: "text-primary", tint: "from-[#a273ff]/10" },
          { label: "Blocked", value: String(workflowState.blocked), tone: "text-rose-300", tint: "from-rose-400/10" },
        ].map((item) => (
          <section
            key={item.label}
            className={`rounded-[28px] bg-[linear-gradient(180deg,rgba(18,23,35,0.98),rgba(10,13,20,0.98))] bg-gradient-to-br p-5 shadow-[0_18px_50px_rgba(0,0,0,0.24)] ${item.tint}`}
          >
            <p className="text-[10px] uppercase tracking-[0.26em] text-secondary">{item.label}</p>
            <p className={`mt-3 text-[1.9rem] font-extrabold tracking-[-0.06em] ${item.tone}`}>{item.value}</p>
          </section>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
        <section className="rounded-[34px] bg-[linear-gradient(180deg,rgba(17,21,32,0.98),rgba(10,13,20,0.98))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-secondary">Tasks</p>
              <h2 className="mt-2 text-[1.65rem] font-semibold tracking-[-0.05em] text-primary">Operational queue preview</h2>
            </div>
            <Link href="/preview/mission-control/tasks" className="text-sm font-medium text-cyan">
              Open Tasks
            </Link>
          </div>
          <div className="mt-5 overflow-hidden rounded-[26px] bg-white/[0.03]">
            <div className="grid grid-cols-[minmax(0,1.2fr)_170px_120px] gap-4 px-5 py-4 text-[10px] uppercase tracking-[0.22em] text-secondary">
              <span>Task</span>
              <span>Context</span>
              <span>Status</span>
            </div>
            {taskPreview.map((task, index) => (
              <Link
                key={task.id}
                href="/preview/mission-control/tasks"
                className={`grid grid-cols-[minmax(0,1.2fr)_170px_120px] gap-4 px-5 py-4 ${index !== taskPreview.length - 1 ? "border-t border-white/6" : ""}`}
              >
                <div>
                  <p className="text-sm font-semibold text-primary">{task.title}</p>
                  <p className="mt-1 text-sm text-secondary">{task.owner} / {task.dueDate}</p>
                </div>
                <p className="text-sm text-secondary">{task.linkedProject ?? task.linkedOpportunityOrClient ?? task.linkedWorkflow ?? "Standalone"}</p>
                <div className="flex items-center justify-start">
                  <Badge tone={task.nextAction ? "cyan" : task.priority === "Critical" ? "danger" : task.priority === "High" ? "warning" : "muted"}>
                    {task.nextAction ? "Next" : task.priority}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid gap-6">
          <section className="rounded-[30px] bg-[linear-gradient(180deg,rgba(18,23,35,0.98),rgba(10,13,20,0.98))] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">Project Progress</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-primary">Delivery progress by client</h3>
              </div>
              <span className="text-sm font-medium text-primary">{projects.length} active clients</span>
            </div>
            <div className="mt-5">
              <MiniBarChart values={projectProgressBreakdown.map((item) => item.value)} colors={["#41d6ff", "#7a84ff", "#8ea4ff"]} height={160} />
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {projectProgressBreakdown.map((item) => (
                <div key={item.label} className="rounded-[16px] bg-white/[0.02] px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-secondary">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold text-primary">{item.value}% complete</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[30px] bg-[linear-gradient(180deg,rgba(18,23,35,0.98),rgba(10,13,20,0.98))] p-6">
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
                    <span className="text-sm text-primary">{project.progress}%</span>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-white/[0.06]">
                    <div className="h-1.5 rounded-full bg-[linear-gradient(90deg,#7a84ff,#5b6cff)]" style={{ width: `${project.progress}%` }} />
                  </div>
                  <p className="mt-3 text-sm text-secondary">{project.nextProjectAction}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[30px] bg-[linear-gradient(180deg,rgba(18,23,35,0.98),rgba(10,13,20,0.98))] p-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold tracking-tight text-primary">Pipeline + Workflow</h3>
              <Link href="/preview/mission-control/pipeline" className="text-sm font-medium text-cyan">
                View all
              </Link>
            </div>
            <div className="mt-4 grid gap-3">
              <div className="rounded-[22px] bg-white/[0.03] px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">Pipeline by Stage</p>
                <div className="mt-4">
                  <MiniBarChart values={pipelineStageBreakdown.map((item) => item.value)} colors={["#7a84ff", "#41d6ff", "#a273ff", "#ffba4a"]} height={120} />
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {pipelineStageBreakdown.map((item) => (
                    <div key={item.label} className="rounded-[16px] bg-white/[0.02] px-3 py-2">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-secondary">{item.label}</p>
                      <p className="mt-1 text-sm font-semibold text-primary">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(item.value)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
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
              <div className="rounded-[22px] bg-white/[0.03] px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">Workflow Workload by Flow</p>
                <div className="mt-4">
                  <MiniBarChart values={workflowNodeBreakdown.map((item) => item.value)} colors={["#41d6ff", "#7a84ff", "#ff6b7a"]} height={100} />
                </div>
                <div className="mt-3 space-y-2">
                  {workflows.map((workflow) => (
                    <Link key={workflow.id} href="/preview/mission-control/workflows" className="flex items-center justify-between rounded-[18px] bg-white/[0.02] px-4 py-3">
                      <span className="text-sm font-medium text-primary">{workflow.activeWorkflow}</span>
                      <span className={workflow.workflowStatus === "Blocked" ? "text-rose-300" : "text-cyan"}>{workflow.workflowStatus}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
