"use client";

import type { MissionControlData, SystemTaskDecision } from "@/lib/types";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type MissionControlDataContextValue = {
  data: MissionControlData;
  applySystemTaskDecision: (taskId: string, decision: SystemTaskDecision) => Promise<void>;
};

const MissionControlDataContext = createContext<MissionControlDataContextValue | null>(null);

export function MissionControlDataProvider({
  initialData,
  children,
}: {
  initialData: MissionControlData;
  children: ReactNode;
}) {
  const [data, setData] = useState(initialData);

  const value = useMemo<MissionControlDataContextValue>(
    () => ({
      data,
      async applySystemTaskDecision(taskId, decision) {
        const response = await fetch(`/api/tasks/${taskId}/decision`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ decision }),
        });

        const payload = (await response.json()) as { task?: MissionControlData["tasks"][number] | null };
        if (!payload.task) {
          setData((current) => ({
            ...current,
            tasks: current.tasks.map((task) =>
              task.id !== taskId
                ? task
                : {
                    ...task,
                    systemDecisionState:
                      decision === "Proceed" ? "Accepted" : decision === "Defer" ? "Deferred" : "Reassigned",
                    owner: decision === "Reassign" ? "Yan" : task.owner,
                    ownerType: decision === "Reassign" ? "Human" : task.ownerType,
                    status: decision === "Proceed" ? "In Progress" : decision === "Reassign" ? "Open" : task.status,
                  },
            ),
          }));
          return;
        }

        setData((current) => ({
          ...current,
          tasks: current.tasks.map((task) => (task.id === taskId ? payload.task! : task)),
        }));
      },
    }),
    [data],
  );

  return <MissionControlDataContext.Provider value={value}>{children}</MissionControlDataContext.Provider>;
}

export function useMissionControlData() {
  const context = useContext(MissionControlDataContext);
  if (!context) {
    throw new Error("useMissionControlData must be used within MissionControlDataProvider");
  }
  return context;
}
