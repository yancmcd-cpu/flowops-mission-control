import { blockerCount, pipelineRevenueLabel, reviewCount, urgentCount } from "@/components/preview/mission-control/variant-data";
import { opportunities, projects, tasks, workflows } from "@/lib/mock-data";
import type { PreviewVariant } from "@/lib/preview-navigation";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import type { ReactNode } from "react";

type PreviewWorkspaceFrameProps = {
  variant: PreviewVariant;
  eyebrow: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
};

const variantShell: Record<PreviewVariant, string> = {
  base: "rounded-[34px] bg-[linear-gradient(180deg,rgba(17,21,32,0.96),rgba(10,13,20,0.96))] shadow-[0_22px_72px_rgba(0,0,0,0.24)] ring-1 ring-white/6",
  a: "rounded-[36px] bg-[linear-gradient(180deg,rgba(19,22,32,0.94),rgba(12,15,22,0.94))] shadow-[0_24px_70px_rgba(0,0,0,0.22)]",
  b: "rounded-[36px] bg-[linear-gradient(180deg,rgba(20,18,45,0.96),rgba(10,11,24,0.96))] shadow-[0_28px_90px_rgba(0,0,0,0.32)]",
  c: "rounded-[34px] bg-[linear-gradient(180deg,rgba(18,23,35,0.96),rgba(10,13,20,0.96))] shadow-[0_22px_72px_rgba(0,0,0,0.24)]",
};

function getWorkspaceMetrics(title: string) {
  switch (title) {
    case "Tasks":
      return [
        { label: "Open Work", value: String(tasks.filter((task) => !["Completed", "Archived"].includes(task.status)).length) },
        { label: "Next Actions", value: String(tasks.filter((task) => task.nextAction).length) },
        { label: "Waiting Review", value: String(tasks.filter((task) => ["Review", "Inbox"].includes(task.status)).length) },
      ];
    case "Projects":
      return [
        { label: "Active Clients", value: String(projects.length) },
        { label: "Avg Progress", value: `${Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / Math.max(projects.length, 1))}%` },
        { label: "Delivery Blockers", value: String(projects.reduce((sum, project) => sum + project.blockers, 0)) },
      ];
    case "Pipeline":
      return [
        { label: "Open Opportunities", value: String(opportunities.length) },
        { label: "Pipeline Revenue", value: pipelineRevenueLabel },
        { label: "Awaiting Reply", value: String(opportunities.filter((opportunity) => opportunity.classificationStatus.includes("Awaiting")).length) },
      ];
    case "Workflows":
      return [
        { label: "Active", value: String(workflows.filter((workflow) => workflow.workflowStatus === "Active").length) },
        { label: "Queued", value: String(workflows.reduce((count, workflow) => count + workflow.nodes.filter((node) => node.status === "Queued").length, 0)) },
        { label: "Blocked", value: String(workflows.filter((workflow) => workflow.workflowStatus === "Blocked").length) },
      ];
    default:
      return [
        { label: "Urgent", value: String(urgentCount) },
        { label: "Reviews", value: String(reviewCount) },
        { label: "Blockers", value: String(blockerCount) },
      ];
  }
}

export function PreviewWorkspaceFrame({ variant, eyebrow, title, action, children }: PreviewWorkspaceFrameProps) {
  const workspaceMetrics = getWorkspaceMetrics(title);
  const alerts = (
    <div className="flex flex-wrap items-center gap-2">
      <span className="rounded-full bg-[linear-gradient(90deg,rgba(255,107,122,0.14),rgba(255,255,255,0.02))] px-3 py-1.5 text-xs font-medium text-rose-200">
        {blockerCount} blockers
      </span>
      <span className="rounded-full bg-[linear-gradient(90deg,rgba(65,214,255,0.12),rgba(255,255,255,0.02))] px-3 py-1.5 text-xs font-medium text-cyan">
        {urgentCount} urgent
      </span>
      <span className="rounded-full bg-[linear-gradient(90deg,rgba(255,186,74,0.14),rgba(255,255,255,0.02))] px-3 py-1.5 text-xs font-medium text-amber-200">
        {reviewCount} review
      </span>
    </div>
  );

  const utility = (
    <div className="flex min-w-[220px] items-center gap-2 rounded-2xl bg-white/[0.04] px-4 py-3 text-sm text-secondary shadow-[0_12px_24px_rgba(0,0,0,0.14)]">
      <Search className="h-4 w-4" />
      <span>Search workspace</span>
    </div>
  );

  return (
    <section className={cn("overflow-hidden p-6", variantShell[variant])}>
      {variant === "a" ? (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-secondary">{eyebrow}</p>
              <h1 className="mt-2 text-[1.4rem] font-semibold tracking-[-0.04em] text-primary">{title}</h1>
            </div>
            <div className="flex flex-col items-start gap-3 xl:items-end">
              {utility}
              {alerts}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[26px] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] px-4 py-4">
            <span className="text-sm text-secondary">Clean operational workspace with emphasis on task clarity and soft separation.</span>
            {action}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {workspaceMetrics.map((metric) => (
              <div key={metric.label} className="rounded-[22px] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">{metric.label}</p>
                <p className="mt-2 text-2xl font-bold tracking-[-0.05em] text-primary">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {variant === "b" ? (
        <div className="rounded-[30px] bg-[linear-gradient(180deg,rgba(112,88,255,0.14),rgba(255,255,255,0.02))] px-5 py-5 shadow-[0_18px_44px_rgba(90,108,255,0.10)]">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-secondary">{eyebrow}</p>
              <h1 className="mt-2 text-[1.55rem] font-semibold tracking-[-0.05em] text-primary">{title}</h1>
            </div>
            <div className="flex flex-col items-start gap-3 xl:items-end">
              {alerts}
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-black/10 px-3 py-1.5 text-xs text-secondary">Pipeline revenue {pipelineRevenueLabel}</span>
                {action}
              </div>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {workspaceMetrics.map((metric, index) => (
              <div
                key={metric.label}
                className={cn(
                  "rounded-[24px] px-4 py-4",
                  index === 0
                    ? "bg-[linear-gradient(180deg,rgba(122,132,255,0.16),rgba(255,255,255,0.02))]"
                    : "bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]",
                )}
              >
                <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">{metric.label}</p>
                <p className="mt-2 text-2xl font-bold tracking-[-0.05em] text-primary">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {variant === "c" ? (
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-secondary">{eyebrow}</p>
            <h1 className="mt-2 text-[1.45rem] font-semibold tracking-[-0.04em] text-primary">{title}</h1>
          </div>
          <div className="flex flex-wrap items-start justify-start gap-3 lg:justify-end">
            {utility}
            {action}
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:col-span-2">
            <div className="rounded-[22px] bg-[linear-gradient(180deg,rgba(122,132,255,0.12),rgba(255,255,255,0.02))] px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">Pipeline Revenue</p>
              <p className="mt-2 text-2xl font-bold tracking-[-0.05em] text-primary">{pipelineRevenueLabel}</p>
            </div>
            <div className="rounded-[22px] bg-[linear-gradient(180deg,rgba(65,214,255,0.10),rgba(255,255,255,0.02))] px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">Urgent Work</p>
              <p className="mt-2 text-2xl font-bold tracking-[-0.05em] text-primary">{urgentCount}</p>
            </div>
            <div className="rounded-[22px] bg-[linear-gradient(180deg,rgba(255,107,122,0.12),rgba(255,255,255,0.02))] px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">Blockers</p>
              <p className="mt-2 text-2xl font-bold tracking-[-0.05em] text-rose-300">{blockerCount}</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:col-span-2">
            {workspaceMetrics.map((metric) => (
              <div key={metric.label} className="rounded-[22px] bg-white/[0.03] px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">{metric.label}</p>
                <p className="mt-2 text-2xl font-bold tracking-[-0.05em] text-primary">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {variant === "base" ? (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-secondary">{eyebrow}</p>
            <h1 className="mt-2 text-[1.4rem] font-semibold tracking-[-0.04em] text-primary">{title}</h1>
          </div>
          {action}
        </div>
      ) : null}
      <div
        className={cn(
          "mt-6",
          variant === "a" && "rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.028),rgba(255,255,255,0.012))] p-1.5",
          variant === "b" && "rounded-[30px] bg-[linear-gradient(180deg,rgba(255,255,255,0.022),rgba(0,0,0,0.08))] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
          variant === "c" && "rounded-[26px] bg-white/[0.025] p-1.5",
        )}
      >
        {children}
      </div>
    </section>
  );
}
