import { Badge } from "@/components/shared/Badge";
import { GlassPanel } from "@/components/shared/GlassPanel";
import type { TaskRecord, TaskStatus } from "@/lib/types";

const boardStatuses: TaskStatus[] = ["Inbox", "To Do", "In Progress", "Waiting", "Review", "Completed", "Archived"];

type TaskBoardProps = {
  tasks: TaskRecord[];
  onSelectTask: (task: TaskRecord) => void;
};

export function TaskBoard({ tasks, onSelectTask }: TaskBoardProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-4 2xl:grid-cols-7">
      {boardStatuses.map((status) => {
        const column = tasks.filter((task) => task.status === status);
        return (
          <GlassPanel key={status} className="overflow-visible">
            <div
              className={`border-b border-white/8 px-4 py-4 ${
                status === "Waiting"
                  ? "bg-amber-400/8"
                  : status === "Review"
                    ? "bg-[#7a84ff]/10"
                    : status === "In Progress"
                      ? "bg-cyan/8"
                      : "bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-primary">{status}</h3>
                <span className="text-xs text-secondary">{column.length}</span>
              </div>
            </div>
            <div className="space-y-2 p-3">
              {column.map((task) => (
                <button key={task.id} className={cnTaskRow(task.nextAction)} onClick={() => onSelectTask(task)}>
                  <div className="flex items-start justify-between gap-2">
                    <p className="pr-1 text-sm font-semibold leading-5 text-primary">{task.title}</p>
                    {task.nextAction ? <Badge tone="cyan" className="signal-pulse mt-0.5 self-start">Next</Badge> : null}
                  </div>
                  <p className="mt-2 text-sm text-secondary">{task.linkedProject ?? task.linkedWorkflow ?? task.linkedOpportunityOrClient ?? "Standalone"}</p>
                  <div className="mt-3 flex items-center justify-between gap-3 text-xs text-secondary">
                    <span>{task.owner}</span>
                    <span>{task.dueDate}</span>
                  </div>
                </button>
              ))}
            </div>
          </GlassPanel>
        );
      })}
    </div>
  );
}

function cnTaskRow(nextAction: boolean) {
  return [
    "w-full overflow-visible rounded-2xl px-4 py-4 text-left transition ring-1 ring-white/8 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(0,0,0,0.18)]",
    nextAction
      ? "bg-[linear-gradient(135deg,rgba(65,214,255,0.16),rgba(122,132,255,0.08),rgba(255,255,255,0.02))] shadow-[0_14px_30px_rgba(65,214,255,0.12)]"
      : "bg-white/[0.03] hover:bg-[linear-gradient(135deg,rgba(122,132,255,0.08),rgba(255,255,255,0.03))]",
  ].join(" ");
}
