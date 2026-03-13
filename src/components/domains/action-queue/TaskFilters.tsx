import { Button } from "@/components/shared/Button";

type TaskFiltersProps = {
  owner: string;
  onOwnerChange: (value: string) => void;
  source: string;
  onSourceChange: (value: string) => void;
  entity: string;
  onEntityChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  view: "list" | "board";
  onViewChange: (value: "list" | "board") => void;
};

const baseSelect =
  "rounded-2xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-3 text-sm text-primary outline-none transition hover:border-white/12 focus:border-[#7a84ff] focus:ring-2 focus:ring-[#7a84ff]/16";

export function TaskFilters(props: TaskFiltersProps) {
  const {
    owner,
    onOwnerChange,
    source,
    onSourceChange,
    entity,
    onEntityChange,
    status,
    onStatusChange,
    view,
    onViewChange,
  } = props;

  return (
    <div className="flex flex-col gap-4 border-b border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-5 py-5 sm:px-6">
      <div className="grid gap-3 lg:grid-cols-4">
        <select className={baseSelect} value={owner} onChange={(event) => onOwnerChange(event.target.value)}>
          <option value="All">Owner: All</option>
          <option value="Yan">Yan</option>
          <option value="System">System</option>
          <option value="Client">Client</option>
        </select>
        <select className={baseSelect} value={source} onChange={(event) => onSourceChange(event.target.value)}>
          <option value="All">Source: All</option>
          <option value="system">System</option>
          <option value="manual">Manual</option>
        </select>
        <select className={baseSelect} value={entity} onChange={(event) => onEntityChange(event.target.value)}>
          <option value="All">Entity: All</option>
          <option value="Linked">Linked</option>
          <option value="Standalone">Standalone</option>
        </select>
        <select className={baseSelect} value={status} onChange={(event) => onStatusChange(event.target.value)}>
          <option value="All">Status: All</option>
          <option value="Inbox">Inbox</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Waiting">Waiting</option>
          <option value="Review">Review</option>
          <option value="Completed">Completed</option>
          <option value="Archived">Archived</option>
        </select>
      </div>
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex rounded-2xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-1">
          <button
            className={`rounded-xl px-4 py-2.5 text-sm transition ${view === "list" ? "bg-[linear-gradient(135deg,#7a84ff,#5a6cff)] text-white shadow-[0_8px_24px_rgba(90,108,255,0.24)]" : "text-secondary hover:text-primary"}`}
            onClick={() => onViewChange("list")}
          >
            List View
          </button>
          <button
            className={`rounded-xl px-4 py-2.5 text-sm transition ${view === "board" ? "bg-[linear-gradient(135deg,#7a84ff,#5a6cff)] text-white shadow-[0_8px_24px_rgba(90,108,255,0.24)]" : "text-secondary hover:text-primary"}`}
            onClick={() => onViewChange("board")}
          >
            Board View
          </button>
        </div>
        <Button variant="primary" disabled title="Mock interaction only in Phase 6">
          Add Task
        </Button>
      </div>
    </div>
  );
}
