import { Badge } from "@/components/shared/Badge";
import type { TaskRecord } from "@/lib/types";
import { cn } from "@/lib/utils";

const priorityLaneMap: Record<TaskRecord["priority"], string> = {
  Critical: "bg-rose-400",
  High: "bg-amber-400",
  Medium: "bg-cyan",
  Low: "bg-blue",
};

const statusToneMap: Record<TaskRecord["status"], "cyan" | "blue" | "muted" | "warning" | "danger"> = {
  Inbox: "blue",
  "To Do": "muted",
  Open: "blue",
  "In Progress": "cyan",
  Waiting: "warning",
  Review: "blue",
  Complete: "cyan",
  Completed: "cyan",
  Archived: "muted",
};

type TaskTableProps = {
  tasks: TaskRecord[];
  onSelectTask: (task: TaskRecord) => void;
};

export function TaskTable({ tasks, onSelectTask }: TaskTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-0">
        <thead className="bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]">
          <tr className="text-left text-[11px] uppercase tracking-[0.22em] text-secondary">
            <th className="w-10 px-4 py-4 font-medium">Pri</th>
            <th className="px-4 py-4 font-medium">Task</th>
            <th className="px-4 py-4 font-medium">Context</th>
            <th className="px-4 py-4 font-medium">Owner / Due</th>
            <th className="px-4 py-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const context = task.linkedProject ?? task.linkedWorkflow ?? task.linkedOpportunityOrClient ?? "Standalone";
            return (
              <tr
                key={task.id}
                className={cn(
                  "cursor-pointer transition hover:bg-[linear-gradient(90deg,rgba(122,132,255,0.10),rgba(255,255,255,0.02))] hover:shadow-[inset_0_0_0_1px_rgba(122,132,255,0.08)]",
                  task.nextAction &&
                    "bg-[linear-gradient(90deg,rgba(65,214,255,0.12),rgba(255,255,255,0.02))] shadow-[inset_3px_0_0_rgba(65,214,255,0.55)]",
                )}
                onClick={() => onSelectTask(task)}
              >
                <td className="border-b border-white/8 px-4 py-4 align-top">
                  <div className="flex items-center justify-center">
                    <span className={cn("block h-10 w-1.5 rounded-full shadow-[0_0_16px_currentColor]", priorityLaneMap[task.priority])} />
                  </div>
                </td>
                <td className="border-b border-white/8 px-4 py-4 align-top">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-primary">{task.title}</p>
                      {task.nextAction ? <Badge tone="cyan">Next Action</Badge> : null}
                    </div>
                    <p className="truncate text-sm text-secondary">{task.notes}</p>
                  </div>
                </td>
                <td className="border-b border-white/8 px-4 py-4 align-top">
                  <div className="space-y-1 text-sm">
                    <p className="font-medium text-primary">{context}</p>
                    <p className="text-secondary">{task.source} - {task.priority}</p>
                  </div>
                </td>
                <td className="border-b border-white/8 px-4 py-4 align-top">
                  <div className="space-y-1 text-sm">
                    <p className="font-medium text-primary">{task.owner}</p>
                    <p className="tabular-nums text-secondary">{task.dueDate}</p>
                  </div>
                </td>
                <td className="border-b border-white/8 px-4 py-4 align-top">
                  <div className="flex flex-col items-start gap-2">
                    <Badge tone={statusToneMap[task.status]}>{task.status}</Badge>
                    {task.status === "Waiting" || task.status === "Review" ? (
                      <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">Active Pressure</span>
                    ) : null}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
