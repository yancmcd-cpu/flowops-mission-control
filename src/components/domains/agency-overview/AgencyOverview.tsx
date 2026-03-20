"use client";

import { useMissionControlData } from "@/components/providers/MissionControlDataProvider";
import { Badge } from "@/components/shared/Badge";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { PanelHeader } from "@/components/shared/PanelHeader";

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

const stageAccent: Record<string, string> = {
  "Initial Contact": "from-cyan/20",
  Discovery: "from-[#7a84ff]/20",
  "Prototype/Proposal Sent": "from-[#a273ff]/20",
  "In Negotiation": "from-amber-400/20",
  "Closed Won": "from-emerald-400/20",
  "Closed Lost": "from-rose-400/20",
};

export function AgencyOverview() {
  const {
    data: { agencyOverview, deliveryProgress, pipelineStageSummary, tasks },
  } = useMissionControlData();
  const overdueTasks = tasks.filter((task) => task.overdue);

  return (
    <div className="space-y-3">
      <GlassPanel>
        <PanelHeader title="Agency Overview" />
        <div className="grid gap-px bg-white/8 sm:grid-cols-2 xl:grid-cols-4">
          <OverviewStat
            label="Agency Revenue"
            value={currency(agencyOverview.activeClientsRevenue)}
            helper={`Recurring ${currency(agencyOverview.recurringRevenue)} / One-off ${currency(agencyOverview.oneOffRevenue)}`}
          />
          <OverviewStat
            label="Client Pipeline"
            value={currency(agencyOverview.clientPipelineValue)}
            helper={`${agencyOverview.openOpportunitiesCount} open opportunities`}
            bright
          />
          <OverviewStat
            label="Active Clients"
            value={String(agencyOverview.activeClientsCount)}
            helper={`${agencyOverview.openProjectsCount} open projects`}
          />
          <OverviewStat
            label="Expired Clients"
            value={String(agencyOverview.expiredClientsCount)}
            helper={currency(agencyOverview.expiredClientsRevenue)}
            danger
          />
        </div>
      </GlassPanel>

      <div className="grid gap-3 xl:grid-cols-12">
        <GlassPanel className="xl:col-span-3">
          <PanelHeader title="Overdue Attention" />
          <div className="space-y-2 px-3 py-3">
            {overdueTasks.length ? (
              overdueTasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-[20px] bg-[linear-gradient(180deg,rgba(255,107,122,0.13),rgba(255,255,255,0.03))] px-3 py-3 ring-1 ring-rose-400/16"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-primary">{task.title}</p>
                      <p className="mt-1.5 text-sm text-secondary">{task.linkedProject ?? task.linkedOpportunityOrClient ?? "Internal"}</p>
                    </div>
                    <Badge tone="danger">Due {task.dueDate}</Badge>
                  </div>
                </div>
              ))
            ) : (
              <EmptyMessage text="No overdue tasks yet. This will populate once FlowOps starts creating live task records." />
            )}
          </div>
        </GlassPanel>

        <GlassPanel className="xl:col-span-5">
          <PanelHeader title="Current Pipeline By Stage" />
          <div className="grid gap-2 px-3 py-3 md:grid-cols-2 xl:grid-cols-3">
            {pipelineStageSummary.map((stage) => (
              <div
                key={stage.stage}
                className={`rounded-[20px] bg-[linear-gradient(180deg,rgba(14,19,30,0.98),rgba(8,11,18,0.98))] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ring-1 ring-white/8 bg-gradient-to-br ${stageAccent[stage.stage] ?? "from-white/6"} to-transparent`}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-secondary">{stage.stage}</p>
                <div className="mt-3 flex items-end justify-between gap-3">
                  <p className="text-[1.5rem] font-bold tracking-[-0.06em] text-primary">{stage.count}</p>
                  <p className="text-sm font-medium text-primary">{currency(stage.revenue)}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="xl:col-span-4">
          <PanelHeader title="Progress By Client / Project" />
          <div className="space-y-2 px-3 py-3">
            {deliveryProgress.length ? (
              deliveryProgress.map((item) => (
                <div key={item.label} className="rounded-[20px] bg-white/[0.03] px-3 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-primary">{item.label}</p>
                      <p className="mt-1 text-sm text-secondary">{item.stage}</p>
                    </div>
                    <p className="text-sm font-semibold text-primary">{item.progress}%</p>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/[0.06]">
                    <div className="h-2 rounded-full bg-[linear-gradient(90deg,#57d8ff,#8a97ff)]" style={{ width: `${item.progress}%` }} />
                  </div>
                </div>
              ))
            ) : (
              <EmptyMessage text="No projects are in delivery yet. The first live progress bar will appear when the FlowOps website project is created." />
            )}
          </div>
        </GlassPanel>
      </div>

      <GlassPanel>
        <PanelHeader title="Clients, Pipeline, And Task Pressure" />
        <div className="grid gap-px bg-white/8 md:grid-cols-2">
          <SummaryBlock
            title="Clients + Pipeline"
            rows={[
              ["Active Clients", String(agencyOverview.activeClientsCount)],
              ["Open Opportunities", String(agencyOverview.openOpportunitiesCount)],
              ["Open Projects", String(agencyOverview.openProjectsCount)],
              ["Expired Clients", String(agencyOverview.expiredClientsCount)],
            ]}
            toneMap={{ "Expired Clients": "text-rose-200" }}
          />
          <SummaryBlock
            title="Overdue Tasks"
            rows={[
              ["Overdue", String(agencyOverview.overdueTasksCount)],
              ["Review", String(agencyOverview.reviewTasksCount)],
            ]}
            toneMap={{ Overdue: "text-rose-200", Review: "text-amber-200" }}
            danger
          />
        </div>
      </GlassPanel>
    </div>
  );
}

function EmptyMessage({ text }: { text: string }) {
  return <div className="rounded-[20px] bg-white/[0.03] px-3 py-4 text-sm leading-6 text-secondary">{text}</div>;
}

function OverviewStat({
  label,
  value,
  helper,
  danger,
  bright,
}: {
  label: string;
  value: string;
  helper: string;
  danger?: boolean;
  bright?: boolean;
}) {
  return (
    <div
      className={
        danger
          ? "bg-[linear-gradient(180deg,rgba(255,107,122,0.14),rgba(255,255,255,0.02))] px-4 py-4"
          : bright
            ? "bg-[linear-gradient(180deg,rgba(96,207,255,0.13),rgba(255,255,255,0.02))] px-4 py-4"
            : "bg-[linear-gradient(180deg,rgba(122,132,255,0.10),rgba(255,255,255,0.02))] px-4 py-4"
      }
    >
      <p className="text-[10px] uppercase tracking-[0.22em] text-secondary">{label}</p>
      <p className={`mt-2 text-[1.65rem] font-bold tracking-[-0.06em] ${danger ? "text-rose-200" : "text-primary"}`}>{value}</p>
      <p className="mt-1.5 text-sm text-secondary">{helper}</p>
    </div>
  );
}

function SummaryBlock({
  title,
  rows,
  toneMap,
  danger,
}: {
  title: string;
  rows: [string, string][];
  toneMap?: Record<string, string>;
  danger?: boolean;
}) {
  return (
    <div className={danger ? "bg-[linear-gradient(180deg,rgba(255,107,122,0.07),rgba(8,11,16,0.98))] px-4 py-4" : "bg-[linear-gradient(180deg,rgba(12,17,28,0.98),rgba(8,11,16,0.98))] px-4 py-4"}>
      <p className="text-[10px] uppercase tracking-[0.22em] text-secondary">{title}</p>
      <div className="mt-3 space-y-2.5 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-3">
            <span className="text-secondary">{label}</span>
            <span className={toneMap?.[label] ?? "text-primary"}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
