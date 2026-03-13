import { GlassPanel } from "@/components/shared/GlassPanel";
import { PanelHeader } from "@/components/shared/PanelHeader";
import { activityFeed } from "@/lib/mock-data";

const activityToneMap: Record<string, string> = {
  "Controlled Write-Back": "text-cyan",
  "Workflow Activity": "text-[#7a84ff]",
  "Review Activity": "text-amber-300",
  "Memory Activity": "text-emerald-300",
  "Reminder Activity": "text-rose-300",
};

export function ActivityTimeline() {
  return (
    <GlassPanel className="overflow-hidden">
      <PanelHeader
        eyebrow="System Activity"
        title="Activity"
        description="Chronological reflective summaries presented as a readable operational ledger."
      />
      <div className="bg-[linear-gradient(180deg,rgba(8,11,16,0.98),rgba(6,8,12,0.98))] px-5 py-4 font-mono text-[13px] sm:px-6">
        {activityFeed.map((item, index) => (
          <div
            key={item.id}
            className={`grid gap-4 py-4 md:grid-cols-[90px_180px_minmax(0,1fr)_130px] ${index !== activityFeed.length - 1 ? "border-b border-white/8" : ""}`}
          >
            <span className="text-secondary">{item.activityTime}</span>
            <span className={`flex items-center gap-2 ${activityToneMap[item.activityType] ?? "text-cyan"}`}>
              <span className="h-2 w-2 rounded-full bg-current shadow-[0_0_12px_currentColor]" />
              {item.activityType}
            </span>
            <span className="text-primary">{item.summary}</span>
            <span className="text-right text-secondary">{item.operatorOrSystemSource}</span>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}
