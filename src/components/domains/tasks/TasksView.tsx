"use client";

import { useMissionControlData } from "@/components/providers/MissionControlDataProvider";
import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { DetailModal } from "@/components/shared/DetailModal";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { PanelHeader } from "@/components/shared/PanelHeader";
import type { SystemTaskDecision, TaskRecord } from "@/lib/types";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const dateOptions = ["Today", "This Week", "This Month", "Custom"] as const;
const ownerOptions = ["All", "Yan", "System"] as const;
const statusOptions = ["All", "Open", "Review", "In Progress", "Complete", "Overdue"] as const;
const PAGE_SIZE = 10;
const priorityScore: Record<TaskRecord["priority"], number> = {
  Critical: 4,
  High: 3,
  Medium: 2,
  Low: 1,
};

export function TasksView() {
  const {
    data: { tasks: allTasks },
    applySystemTaskDecision,
  } = useMissionControlData();
  const [dateFilter, setDateFilter] = useState<(typeof dateOptions)[number]>("This Month");
  const [ownerFilter, setOwnerFilter] = useState<(typeof ownerOptions)[number]>("All");
  const [statusFilter, setStatusFilter] = useState<(typeof statusOptions)[number]>("All");
  const [page, setPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState<TaskRecord | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [decisionPending, setDecisionPending] = useState<SystemTaskDecision | null>(null);

  const filteredTasks = useMemo(() => {
    return allTasks
      .filter((task) => {
        const displayOwner = task.ownerType === "System" ? "System" : task.owner;
        const matchesOwner = ownerFilter === "All" || displayOwner === ownerFilter;

        const matchesStatus =
          statusFilter === "All" ||
          (statusFilter === "Overdue"
            ? Boolean(task.overdue)
            : statusFilter === "Complete"
              ? ["Complete", "Completed"].includes(task.status)
              : task.status === statusFilter);

        const matchesDate =
          dateFilter === "Custom" ||
          (dateFilter === "Today"
            ? task.dueDate === "2026-03-20"
            : dateFilter === "This Week"
              ? ["2026-03-20", "2026-03-21", "2026-03-22", "2026-03-23", "2026-03-24", "2026-03-25", "2026-03-26"].includes(task.dueDate)
              : task.dueDate.startsWith("2026-03"));

        return matchesOwner && matchesStatus && matchesDate;
      })
      .sort((left, right) => {
        if (left.overdue !== right.overdue) return left.overdue ? -1 : 1;
        const priorityDiff = priorityScore[right.priority] - priorityScore[left.priority];
        if (priorityDiff !== 0) return priorityDiff;
        return left.title.localeCompare(right.title);
      });
  }, [allTasks, dateFilter, ownerFilter, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filteredTasks.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visibleTasks = filteredTasks.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const openTasksCount = filteredTasks.filter((task) => !["Complete", "Completed"].includes(task.status) && !task.overdue).length;
  const overdueTasksCount = filteredTasks.filter((task) => task.overdue).length;

  useEffect(() => {
    setPage(1);
  }, [dateFilter, ownerFilter, statusFilter]);

  useEffect(() => {
    if (!selectedTask) return;
    const refreshed = allTasks.find((task) => task.id === selectedTask.id);
    if (refreshed) {
      setSelectedTask(refreshed);
    }
  }, [allTasks, selectedTask]);

  async function handleSystemDecision(decision: SystemTaskDecision) {
    if (!selectedTask) return;
    setDecisionPending(decision);
    try {
      await applySystemTaskDecision(selectedTask.id, decision);
    } finally {
      setDecisionPending(null);
    }
  }

  return (
    <>
      <div className="space-y-3">
        <GlassPanel>
          <div className="border-b border-white/8 px-5 py-4">
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div className="grid gap-px overflow-hidden rounded-[20px] bg-white/8 sm:grid-cols-2">
                <SummaryCard label="Open Tasks" value={openTasksCount} />
                <SummaryCard label="Overdue Tasks" value={overdueTasksCount} tone="danger" />
              </div>
              <div className="flex justify-start lg:justify-end">
                <Button variant="primary" className="gap-2" onClick={() => setCreateOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Create New Task
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-3 px-5 py-3 md:grid-cols-[1.2fr_1fr_1fr]">
            <CompactFilter label="Date" value={dateFilter} onChange={setDateFilter} options={dateOptions} />
            <CompactFilter label="Owner" value={ownerFilter} onChange={setOwnerFilter} options={ownerOptions} />
            <CompactFilter label="Status" value={statusFilter} onChange={setStatusFilter} options={statusOptions} />
          </div>
        </GlassPanel>

        <GlassPanel>
          <PanelHeader
            title="All Tasks"
            action={
              <div className="flex items-center gap-2">
                <span className="text-xs text-secondary">Page {currentPage} / {pageCount}</span>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03] text-secondary transition hover:text-primary disabled:opacity-40"
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03] text-secondary transition hover:text-primary disabled:opacity-40"
                  onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
                  disabled={currentPage === pageCount}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            }
          />
          <div className="hidden gap-4 border-b border-white/8 px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-secondary lg:grid lg:grid-cols-[90px_minmax(0,1.5fr)_100px_100px_110px_90px]">
            <span>Priority</span>
            <span>Task</span>
            <span>Category</span>
            <span>Owner</span>
            <span>Status</span>
            <span>Due Date</span>
          </div>
          <div className="space-y-2 px-4 py-3 sm:px-5">
            {visibleTasks.length ? (
              visibleTasks.map((task) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => {
                    setSelectedTask(task);
                    setEditMode(false);
                  }}
                  className="w-full rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-3 text-left transition hover:border-[#7a84ff]/20 hover:bg-[linear-gradient(180deg,rgba(132,145,255,0.08),rgba(255,255,255,0.02))]"
                >
                  <div className="grid gap-4 lg:grid-cols-[90px_minmax(0,1.5fr)_100px_100px_110px_90px] lg:items-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-secondary lg:hidden">Priority</span>
                      <div className="mt-1 lg:mt-0">
                        <Badge tone={priorityTone(task.priority)}>{task.priority}</Badge>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-secondary lg:hidden">Task</span>
                      <div className="mt-1 lg:mt-0">
                        <p className="font-semibold text-primary">{task.title}</p>
                        <p className="mt-1.5 text-sm leading-6 text-secondary">{task.details ?? task.notes}</p>
                        <p className="mt-1.5 text-sm text-[#c7d0ec]">{task.linkedProject ?? task.linkedOpportunityOrClient ?? "Standalone"}</p>
                      </div>
                    </div>
                    <MetaBlock label="Category" value={task.category ?? "Internal"} />
                    <MetaBlock label="Owner" value={displayOwner(task)} />
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-secondary lg:hidden">Status</span>
                      <div className="mt-1 lg:mt-0">
                        <Badge tone={statusTone(task)}>{task.overdue ? "Overdue" : normalizeStatus(task.status)}</Badge>
                      </div>
                    </div>
                    <MetaBlock label="Due Date" value={task.dueDate || "Open"} danger={Boolean(task.overdue)} />
                  </div>
                </button>
              ))
            ) : (
              <div className="rounded-[22px] bg-white/[0.03] px-4 py-5 text-sm leading-6 text-secondary">
                No tasks yet. Manual tasks and system-generated tasks will appear here once FlowOps starts creating live work items.
              </div>
            )}
          </div>
        </GlassPanel>
      </div>

        <DetailModal
        open={Boolean(selectedTask)}
        onClose={() => {
          setSelectedTask(null);
          setEditMode(false);
          setDecisionPending(null);
        }}
        title={selectedTask?.title ?? ""}
        subtitle={selectedTask ? `${selectedTask.category ?? "Internal"} / ${selectedTask.linkedProject ?? selectedTask.linkedOpportunityOrClient ?? "Standalone"}` : undefined}
      >
        {selectedTask ? (
          <TaskModalBody
            task={selectedTask}
            editMode={editMode}
            onEdit={() => setEditMode(true)}
            onSave={() => setEditMode(false)}
            onSystemDecision={handleSystemDecision}
            decisionPending={decisionPending}
          />
        ) : null}
      </DetailModal>

      <DetailModal open={createOpen} onClose={() => setCreateOpen(false)} title="Create New Task">
        <div className="space-y-4">
          <div className="rounded-[22px] bg-white/[0.03] px-4 py-4 text-sm leading-6 text-secondary">
            The create flow will write manual tasks here once the live state connection is approved. For now, this button is included so we can review placement, sizing, and modal behavior.
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setCreateOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </DetailModal>
    </>
  );
}

function SummaryCard({ label, value, tone }: { label: string; value: number; tone?: "danger" }) {
  return (
    <div className={tone === "danger" ? "bg-[linear-gradient(180deg,rgba(255,107,122,0.10),rgba(255,255,255,0.02))] px-4 py-3" : "bg-[linear-gradient(180deg,rgba(12,17,28,0.98),rgba(8,11,16,0.98))] px-4 py-3"}>
      <p className="text-[10px] uppercase tracking-[0.2em] text-secondary">{label}</p>
      <p className={tone === "danger" ? "mt-1.5 text-[1.45rem] font-bold tracking-[-0.06em] text-rose-200" : "mt-1.5 text-[1.45rem] font-bold tracking-[-0.06em] text-primary"}>{value}</p>
    </div>
  );
}

function CompactFilter<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: readonly T[];
}) {
  return (
    <label className="space-y-1.5">
      <span className="text-[10px] uppercase tracking-[0.2em] text-secondary">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="w-full rounded-2xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-2.5 text-sm text-primary outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-[#0f1522]">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function MetaBlock({ label, value, danger }: { label: string; value: string; danger?: boolean }) {
  return (
    <div>
      <span className="text-[10px] uppercase tracking-[0.18em] text-secondary lg:hidden">{label}</span>
      <p className={danger ? "mt-1 text-sm text-rose-200 lg:mt-0" : "mt-1 text-sm text-primary lg:mt-0"}>{value}</p>
    </div>
  );
}

function TaskModalBody({
  task,
  editMode,
  onEdit,
  onSave,
  onSystemDecision,
  decisionPending,
}: {
  task: TaskRecord;
  editMode: boolean;
  onEdit: () => void;
  onSave: () => void;
  onSystemDecision: (decision: SystemTaskDecision) => Promise<void>;
  decisionPending: SystemTaskDecision | null;
}) {
  return (
    <div className="space-y-5">
      {task.ownerType === "System" || task.source === "system" ? (
        <div className="rounded-[24px] border border-cyan/15 bg-[linear-gradient(180deg,rgba(87,216,255,0.10),rgba(255,255,255,0.03))] px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-cyan/80">System Task Question</p>
              <p className="mt-2 text-sm leading-6 text-primary">{task.systemDecisionPrompt ?? "This system-generated task needs a decision before the OS acts on it."}</p>
              {task.systemSuggestedAction ? <p className="mt-2 text-sm text-secondary">Suggested action: {task.systemSuggestedAction}</p> : null}
            </div>
            <Badge tone={task.systemDecisionState === "Deferred" ? "warning" : task.systemDecisionState === "Reassigned" ? "blue" : task.systemDecisionState === "Accepted" ? "cyan" : "muted"}>
              {task.systemDecisionState ?? "Pending"}
            </Badge>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {(["Proceed", "Defer", "Reassign"] as const).map((decision) => (
              <Button
                key={decision}
                variant={decision === "Proceed" ? "primary" : "secondary"}
                onClick={() => onSystemDecision(decision)}
                disabled={Boolean(decisionPending)}
              >
                {decisionPending === decision ? `${decision}...` : decision}
              </Button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <FieldCard label="Priority" value={task.priority} />
        <FieldCard label="Category" value={task.category ?? "Internal"} />
        <FieldCard label="Owner" value={displayOwner(task)} />
        <FieldCard label="Status" value={task.overdue ? "Overdue" : normalizeStatus(task.status)} />
        <FieldCard label="Due Date" value={task.dueDate || "Open"} />
        <FieldCard label="Linked Record" value={task.linkedProject ?? task.linkedOpportunityOrClient ?? "Standalone"} />
        <div className="md:col-span-2">
          <FieldCard label="Task" value={task.details ?? task.notes} multiline />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        {!editMode ? (
          <>
            <Button variant="secondary" onClick={onEdit}>
              Edit
            </Button>
            <Button variant="primary" onClick={onSave}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={onSave}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onSave}>
              Save
            </Button>
          </>
        )}
      </div>
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

function displayOwner(task: TaskRecord) {
  return task.ownerType === "System" ? "System" : task.owner;
}

function priorityTone(priority: TaskRecord["priority"]) {
  if (priority === "Critical") return "danger";
  if (priority === "High") return "warning";
  if (priority === "Medium") return "blue";
  return "muted";
}

function statusTone(task: TaskRecord) {
  if (task.overdue) return "danger";
  if (task.status === "Review") return "warning";
  if (task.status === "In Progress") return "cyan";
  if (["Complete", "Completed"].includes(task.status)) return "muted";
  return "blue";
}

function normalizeStatus(status: TaskRecord["status"]) {
  return ["Complete", "Completed"].includes(status) ? "Complete" : status;
}
