"use client";

import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import type { TaskRecord } from "@/lib/types";
import { X } from "lucide-react";

type TaskDrawerProps = {
  task: TaskRecord | null;
  onClose: () => void;
};

export function TaskDrawer({ task, onClose }: TaskDrawerProps) {
  if (!task) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(6,8,14,0.68)] backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 w-full max-w-xl bg-[linear-gradient(180deg,rgba(18,24,38,0.99),rgba(10,14,24,0.99))] shadow-[0_38px_110px_rgba(0,0,0,0.58)] ring-1 ring-white/10 backdrop-blur-xl">
        <div className="border-b border-white/8 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-secondary">Task Detail</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-primary">{task.title}</h2>
            </div>
            <button
              aria-label="Close task details"
              className="rounded-2xl bg-white/[0.04] p-3 text-secondary ring-1 ring-white/8 transition hover:-translate-y-0.5 hover:text-primary hover:shadow-[0_14px_28px_rgba(0,0,0,0.18)]"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge tone={task.source === "system" ? "blue" : "cyan"}>{task.source}</Badge>
            <Badge>{task.status}</Badge>
            <Badge tone="warning">{task.priority}</Badge>
            {task.nextAction ? <Badge tone="cyan">Next Action</Badge> : null}
          </div>
        </div>
        <div className="space-y-6 overflow-y-auto px-6 py-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 ring-1 ring-white/8">
              <p className="text-xs uppercase tracking-[0.18em] text-secondary">Owner</p>
              <p className="mt-2 text-sm font-semibold text-primary">{task.owner}</p>
            </div>
            <div className="rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 ring-1 ring-white/8">
              <p className="text-xs uppercase tracking-[0.18em] text-secondary">Due Date</p>
              <p className="mt-2 text-sm font-semibold text-primary">{task.dueDate}</p>
            </div>
            <div className="rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 ring-1 ring-white/8">
              <p className="text-xs uppercase tracking-[0.18em] text-secondary">Linked Project</p>
              <p className="mt-2 text-sm font-semibold text-primary">{task.linkedProject ?? "Standalone"}</p>
            </div>
            <div className="rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 ring-1 ring-white/8">
              <p className="text-xs uppercase tracking-[0.18em] text-secondary">Linked Workflow</p>
              <p className="mt-2 text-sm font-semibold text-primary">{task.linkedWorkflow ?? "None"}</p>
            </div>
            <div className="rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 ring-1 ring-white/8 sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.18em] text-secondary">Linked Opportunity / Client</p>
              <p className="mt-2 text-sm font-semibold text-primary">{task.linkedOpportunityOrClient ?? "None"}</p>
            </div>
          </div>
          <div className="rounded-[24px] bg-[linear-gradient(135deg,rgba(122,132,255,0.14),rgba(255,255,255,0.02))] p-5 shadow-[0_16px_32px_rgba(90,108,255,0.10)] ring-1 ring-[#7a84ff]/14">
            <p className="text-xs uppercase tracking-[0.18em] text-secondary">Operational Notes</p>
            <p className="mt-3 text-sm leading-7 text-primary">{task.notes}</p>
          </div>
          <div className="flex flex-wrap gap-3 border-t border-white/8 pt-3">
            <Button variant="primary" disabled title="Mock controlled write-back action">
              Mark Complete
            </Button>
            <Button variant="secondary" disabled title="Mock controlled write-back action">
              Defer Reminder
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
