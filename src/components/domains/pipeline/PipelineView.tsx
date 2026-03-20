"use client";

import { useMissionControlData } from "@/components/providers/MissionControlDataProvider";
import { Badge } from "@/components/shared/Badge";
import { DetailModal } from "@/components/shared/DetailModal";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { PanelHeader } from "@/components/shared/PanelHeader";
import type { OpportunityRecord } from "@/lib/types";
import { useMemo, useState, type ReactNode } from "react";

const stageOptions = [
  "All",
  "Initial Contact",
  "Discovery",
  "Prototype/Proposal Sent",
  "In Negotiation",
  "Closed Won",
  "Closed Lost",
] as const;

const stageAccent: Record<string, string> = {
  "Initial Contact": "from-cyan/18",
  Discovery: "from-[#7a84ff]/18",
  "Prototype/Proposal Sent": "from-[#a273ff]/18",
  "In Negotiation": "from-amber-400/18",
  "Closed Won": "from-emerald-400/18",
  "Closed Lost": "from-rose-400/18",
};

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function PipelineView() {
  const {
    data: { agencyOverview, opportunities, pipelineStageSummary },
  } = useMissionControlData();
  const [stageFilter, setStageFilter] = useState<(typeof stageOptions)[number]>("All");
  const [selectedRecord, setSelectedRecord] = useState<OpportunityRecord | null>(null);
  const urgent = opportunities.filter((item) => item.urgent).length;

  const filteredRecords = useMemo(() => {
    return stageFilter === "All" ? opportunities : opportunities.filter((item) => item.pipelineStage === stageFilter);
  }, [opportunities, stageFilter]);

  return (
    <>
      <div className="space-y-4">
        <GlassPanel>
          <PanelHeader title="Pipeline Overview" />
          <div className="grid gap-px bg-white/8 lg:grid-cols-3">
            <SummaryCard label="Open Opportunities" value={agencyOverview.openOpportunitiesCount} />
            <SummaryCard label="Total Pipeline Revenue" value={currency(agencyOverview.clientPipelineValue)} bright />
            <SummaryCard label="Urgent" value={urgent} danger />
          </div>
          <div className="grid gap-3 px-4 py-4 md:grid-cols-2 xl:grid-cols-3">
            {pipelineStageSummary.map((stage) => (
              <div
                key={stage.stage}
                className={`rounded-[22px] bg-[linear-gradient(180deg,rgba(14,19,30,0.98),rgba(8,11,18,0.98))] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ring-1 ring-white/8 bg-gradient-to-br ${stageAccent[stage.stage] ?? "from-white/6"} to-transparent`}
              >
                <p className="text-[10px] uppercase tracking-[0.22em] text-secondary">{stage.stage}</p>
                <div className="mt-4 flex items-end justify-between gap-3">
                  <p className="text-[1.7rem] font-bold tracking-[-0.06em] text-primary">{stage.count}</p>
                  <p className="text-sm font-medium text-primary">{currency(stage.revenue)}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel>
          <div className="border-b border-white/8 px-5 py-4">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-primary">Pipeline</h2>
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

          <div className="hidden gap-4 border-b border-white/8 px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-secondary xl:grid xl:grid-cols-[1fr_1.4fr_110px_1.2fr_110px_110px]">
            <span>Client Name</span>
            <span>Summary details</span>
            <span>Status</span>
            <span>Next Step</span>
            <span>Due Date</span>
            <span>Value $</span>
          </div>

          <div className="space-y-3 px-4 py-4 sm:px-5">
            {filteredRecords.length ? (
              filteredRecords.map((record) => (
                <button
                  key={record.opportunityId}
                  type="button"
                  onClick={() => setSelectedRecord(record)}
                  className="w-full rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-4 text-left transition hover:border-[#7a84ff]/20 hover:bg-[linear-gradient(180deg,rgba(132,145,255,0.08),rgba(255,255,255,0.02))]"
                >
                  <div className="grid gap-4 xl:grid-cols-[1fr_1.4fr_110px_1.2fr_110px_110px] xl:items-start">
                    <Cell label="Client Name">
                      <p className="font-semibold text-primary">{record.opportunityName}</p>
                      <p className="mt-1 text-sm text-secondary">
                        {record.recordType === "contact" ? "Prospect" : "Opportunity"}
                        {record.campaignName ? ` / ${record.campaignName}` : ""}
                      </p>
                    </Cell>
                    <Cell label="Summary details">
                      <p className="text-sm leading-6 text-primary">{record.summary}</p>
                    </Cell>
                    <Cell label="Status">
                      <Badge tone={record.urgent ? "danger" : record.status === "Review" ? "warning" : record.status === "In Progress" ? "cyan" : "blue"}>
                        {record.urgent ? "Urgent" : record.status ?? "Open"}
                      </Badge>
                    </Cell>
                    <Cell label="Next Step">
                      <p className="text-sm leading-6 text-primary">{record.nextOpportunityAction}</p>
                    </Cell>
                    <Cell label="Due Date">
                      <p className="text-sm font-medium text-primary">{record.nextStepDueDate || "Open"}</p>
                    </Cell>
                    <Cell label="Value $">
                      <p className="text-sm font-medium text-primary">{record.pipelineValue}</p>
                    </Cell>
                  </div>
                </button>
              ))
            ) : (
              <div className="rounded-[24px] bg-white/[0.03] px-4 py-5 text-sm leading-6 text-secondary">
                No outreach records yet. Campaigns, prospects, and opportunities will start appearing here once FlowOps begins market outreach.
              </div>
            )}
          </div>
        </GlassPanel>
      </div>

      <DetailModal
        open={Boolean(selectedRecord)}
        onClose={() => setSelectedRecord(null)}
        title={selectedRecord?.opportunityName ?? ""}
        subtitle={selectedRecord ? `${selectedRecord.recordType === "contact" ? "Prospect" : "Opportunity"} / ${selectedRecord.pipelineStage}` : undefined}
      >
        {selectedRecord ? <PipelineModalBody record={selectedRecord} /> : null}
      </DetailModal>
    </>
  );
}

function SummaryCard({ label, value, bright, danger }: { label: string; value: number | string; bright?: boolean; danger?: boolean }) {
  return (
    <div
      className={
        danger
          ? "bg-[linear-gradient(180deg,rgba(255,107,122,0.10),rgba(255,255,255,0.02))] px-5 py-5"
          : bright
            ? "bg-[linear-gradient(180deg,rgba(87,216,255,0.12),rgba(255,255,255,0.02))] px-5 py-5"
            : "bg-[linear-gradient(180deg,rgba(12,17,28,0.98),rgba(8,11,16,0.98))] px-5 py-5"
      }
    >
      <p className="text-[10px] uppercase tracking-[0.22em] text-secondary">{label}</p>
      <p className={danger ? "mt-3 text-[2rem] font-bold tracking-[-0.06em] text-rose-200" : "mt-3 text-[2rem] font-bold tracking-[-0.06em] text-primary"}>{value}</p>
    </div>
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

function PipelineModalBody({ record }: { record: OpportunityRecord }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FieldCard label="Client Name" value={record.opportunityName} />
      <FieldCard label="Status" value={record.urgent ? "Urgent" : record.status ?? "Open"} />
      <FieldCard label="Summary details" value={record.summary ?? ""} multiline />
      <FieldCard label="Next Step" value={record.nextOpportunityAction} multiline />
      <FieldCard label="Due Date" value={record.nextStepDueDate || "Open"} />
      <FieldCard label="Value $" value={record.pipelineValue} />
      <FieldCard label="Record Type" value={record.recordType === "contact" ? "Prospect" : "Opportunity"} />
      <FieldCard label="Campaign" value={record.campaignName || "None"} />
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
