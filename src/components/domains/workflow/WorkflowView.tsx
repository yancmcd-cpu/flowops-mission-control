"use client";

import { useMissionControlData } from "@/components/providers/MissionControlDataProvider";
import { Badge } from "@/components/shared/Badge";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { PanelHeader } from "@/components/shared/PanelHeader";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

const statusTone = {
  Blocked: "danger",
  Review: "warning",
  Active: "cyan",
  Complete: "muted",
  Open: "blue",
} as const;

export function WorkflowView() {
  const {
    data: { workflows },
  } = useMissionControlData();
  const [openId, setOpenId] = useState(workflows[0]?.id ?? "");

  return (
    <div className="space-y-5">
      <GlassPanel>
        <PanelHeader title="Workflow" />
        <div className="space-y-3 px-4 py-4 sm:px-5">
          {workflows.length ? (
            workflows.map((workflow) => {
              const expanded = workflow.id === openId;

              return (
                <div key={workflow.id} className="overflow-hidden rounded-[26px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
                  <button
                    type="button"
                    onClick={() => setOpenId(expanded ? "" : workflow.id)}
                    className="w-full px-4 py-4 text-left transition hover:bg-white/[0.03]"
                  >
                    <div className="grid gap-4 xl:grid-cols-[1.1fr_170px_120px_120px_minmax(0,1fr)_36px] xl:items-center">
                      <RowCell label="Name">
                        <p className="font-semibold text-primary">{workflow.linkedProject}</p>
                        <p className="mt-1 text-sm text-secondary">{workflow.activeWorkflow}</p>
                      </RowCell>
                      <RowCell label="Stage">
                        <p className="text-sm font-medium text-primary">{workflow.projectStage}</p>
                      </RowCell>
                      <RowCell label="Status">
                        <Badge tone={statusTone[workflow.workflowStatus as keyof typeof statusTone] ?? "blue"}>{workflow.workflowStatus}</Badge>
                      </RowCell>
                      <RowCell label="Next Due Date">
                        <p className={workflow.workflowStatus === "Blocked" ? "text-sm font-medium text-rose-200" : "text-sm font-medium text-primary"}>
                          {workflow.nextDueDate || "Open"}
                        </p>
                      </RowCell>
                      <RowCell label="Current Step">
                        <p className="text-sm leading-6 text-primary">{workflow.currentStep}</p>
                      </RowCell>
                      <div className="hidden justify-end xl:flex">
                        <ChevronDown className={cn("h-5 w-5 text-secondary transition", expanded ? "rotate-180 text-primary" : "")} />
                      </div>
                    </div>
                  </button>

                  {expanded ? (
                    <div className="border-t border-white/8 bg-[linear-gradient(180deg,rgba(10,14,22,0.96),rgba(7,10,16,0.98))] px-4 py-5">
                      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                        <div className="space-y-4">
                          <div className="rounded-[24px] bg-white/[0.03] px-4 py-4">
                            <p className="text-[10px] uppercase tracking-[0.22em] text-secondary">Client name</p>
                            <p className="mt-3 text-sm font-medium text-primary">{extractSummaryValue(workflow.leftSummary, "Client")}</p>
                          </div>
                          <div className="rounded-[24px] bg-white/[0.03] px-4 py-4">
                            <p className="text-[10px] uppercase tracking-[0.22em] text-secondary">Commercial stage</p>
                            <p className="mt-3 text-sm font-medium text-primary">{extractSummaryValue(workflow.leftSummary, "Commercial stage")}</p>
                          </div>
                          <div className="rounded-[24px] bg-white/[0.03] px-4 py-4">
                            <p className="text-[10px] uppercase tracking-[0.22em] text-secondary">Linked tasks</p>
                            <p className="mt-3 text-sm font-medium text-primary">{extractSummaryValue(workflow.leftSummary, "Tasks")}</p>
                          </div>
                          <div className="rounded-[24px] bg-white/[0.03] px-4 py-4">
                            <p className="text-[10px] uppercase tracking-[0.22em] text-secondary">Blockers</p>
                            <div className="mt-3 space-y-3">
                              {workflow.blockingIssues.length ? (
                                workflow.blockingIssues.map((issue) => (
                                  <div key={issue} className="rounded-2xl bg-[linear-gradient(180deg,rgba(255,107,122,0.12),rgba(255,255,255,0.02))] px-3 py-3 text-sm text-rose-100">
                                    {issue}
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-secondary">No active blockers.</p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="rounded-[24px] bg-white/[0.03] px-4 py-4">
                          <p className="text-[10px] uppercase tracking-[0.22em] text-secondary">Stage progression</p>
                          <div className="relative mt-5">
                            <span className="absolute bottom-4 left-[10px] top-2 w-px bg-[linear-gradient(180deg,rgba(87,216,255,0.22),rgba(255,255,255,0.08),rgba(138,151,255,0.22))]" />
                            <div className="space-y-4">
                              {workflow.nodes.map((node, index) => (
                                <div key={node.id} className="grid gap-3 md:grid-cols-[22px_minmax(0,1fr)_120px] md:items-start">
                                  <div className="relative flex justify-center">
                                    <span
                                      className={cn(
                                        "mt-1 h-3 w-3 rounded-full",
                                        node.status === "Blocked"
                                          ? "bg-rose-400 shadow-[0_0_16px_rgba(255,107,122,0.5)]"
                                          : node.status === "Active"
                                            ? "bg-cyan shadow-[0_0_18px_rgba(87,216,255,0.55)] ring-4 ring-cyan/10"
                                            : node.status === "Complete"
                                              ? "bg-[#8b97ff]"
                                              : "bg-white/25",
                                      )}
                                    />
                                    {index !== workflow.nodes.length - 1 ? <span className="absolute top-5 h-[calc(100%+0.8rem)] w-px bg-white/5" /> : null}
                                  </div>
                                  <div>
                                    <p className="font-semibold text-primary">{node.name}</p>
                                    <p className="mt-1 text-sm leading-6 text-secondary">{node.summary}</p>
                                  </div>
                                  <div className="md:text-right">
                                    <Badge tone={statusTone[node.status as keyof typeof statusTone] ?? "muted"}>{node.status}</Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })
          ) : (
            <div className="rounded-[24px] bg-white/[0.03] px-4 py-5 text-sm leading-6 text-secondary">
              No workflows are active yet. Workflow progress will appear here once the first FlowOps project is opened and linked to a delivery workflow.
            </div>
          )}
        </div>
      </GlassPanel>
    </div>
  );
}

function RowCell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <span className="text-[10px] uppercase tracking-[0.18em] text-secondary xl:hidden">{label}</span>
      <div className="mt-1 xl:mt-0">{children}</div>
    </div>
  );
}

function extractSummaryValue(summary: string[] | undefined, key: string) {
  return summary?.find((item) => item.startsWith(`${key}:`))?.replace(`${key}:`, "").trim() ?? "Open";
}
