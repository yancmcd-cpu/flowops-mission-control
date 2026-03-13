"use client";

import { TaskBoard } from "@/components/domains/action-queue/TaskBoard";
import { TaskDrawer } from "@/components/domains/action-queue/TaskDrawer";
import { TaskFilters } from "@/components/domains/action-queue/TaskFilters";
import { TaskTable } from "@/components/domains/action-queue/TaskTable";
import { Badge } from "@/components/shared/Badge";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { PanelHeader } from "@/components/shared/PanelHeader";
import { tasks as allTasks } from "@/lib/mock-data";
import type { TaskRecord } from "@/lib/types";
import { useMemo, useState } from "react";

export function ActionQueueClient() {
  const [owner, setOwner] = useState("All");
  const [source, setSource] = useState("All");
  const [entity, setEntity] = useState("All");
  const [status, setStatus] = useState("All");
  const [view, setView] = useState<"list" | "board">("list");
  const [selectedTask, setSelectedTask] = useState<TaskRecord | null>(null);

  const tasks = useMemo(() => {
    return allTasks.filter((task) => {
      const matchesOwner = owner === "All" || task.owner === owner;
      const matchesSource = source === "All" || task.source === source;
      const matchesStatus = status === "All" || task.status === status;
      const isLinked = Boolean(task.linkedProject || task.linkedWorkflow || task.linkedOpportunityOrClient);
      const matchesEntity = entity === "All" || (entity === "Linked" ? isLinked : !isLinked);
      return matchesOwner && matchesSource && matchesStatus && matchesEntity;
    });
  }, [owner, source, status, entity]);

  const openCount = tasks.filter((task) => !["Completed", "Archived"].includes(task.status)).length;
  const inboxCount = tasks.filter((task) => task.status === "Inbox").length;
  const waitingCount = tasks.filter((task) => task.status === "Waiting").length;
  const nextActionCount = tasks.filter((task) => task.nextAction).length;

  return (
    <>
      <GlassPanel className="overflow-hidden">
        <PanelHeader
          eyebrow="Queue Pressure"
          title="Action Queue"
          description="A triage surface for priority, context, ownership, due timing, and next-action execution."
          action={<Badge tone="cyan">{tasks.length} visible</Badge>}
        />
        <div className="grid gap-px bg-white/8 lg:grid-cols-4">
          <div className="bg-[linear-gradient(135deg,rgba(122,132,255,0.16),rgba(255,255,255,0.02))] px-5 py-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Open Queue</p>
            <p className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-primary">{openCount}</p>
          </div>
          <div className="bg-[linear-gradient(135deg,rgba(90,108,255,0.12),rgba(255,255,255,0.02))] px-5 py-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Inbox</p>
            <p className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-primary">{inboxCount}</p>
          </div>
          <div className="bg-[linear-gradient(135deg,rgba(255,191,95,0.12),rgba(255,255,255,0.02))] px-5 py-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Waiting</p>
            <p className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-amber-300">{waitingCount}</p>
          </div>
          <div className="bg-[linear-gradient(135deg,rgba(65,214,255,0.14),rgba(255,255,255,0.02))] px-5 py-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Next Actions</p>
            <p className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-cyan">{nextActionCount}</p>
          </div>
        </div>
        <TaskFilters
          owner={owner}
          onOwnerChange={setOwner}
          source={source}
          onSourceChange={setSource}
          entity={entity}
          onEntityChange={setEntity}
          status={status}
          onStatusChange={setStatus}
          view={view}
          onViewChange={setView}
        />
        <div className="p-0">
          {view === "list" ? (
            <TaskTable tasks={tasks} onSelectTask={setSelectedTask} />
          ) : (
            <div className="p-5 sm:p-6">
              <TaskBoard tasks={tasks} onSelectTask={setSelectedTask} />
            </div>
          )}
        </div>
      </GlassPanel>
      <TaskDrawer task={selectedTask} onClose={() => setSelectedTask(null)} />
    </>
  );
}
