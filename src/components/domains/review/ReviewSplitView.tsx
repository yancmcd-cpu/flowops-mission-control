import { Button } from "@/components/shared/Button";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { PanelHeader } from "@/components/shared/PanelHeader";
import type { ReviewItem } from "@/lib/types";

type ReviewSplitViewProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: ReviewItem[];
};

export function ReviewSplitView({ eyebrow, title, description, items }: ReviewSplitViewProps) {
  const selected = items[0];

  if (!selected) {
    return (
      <GlassPanel className="overflow-hidden">
        <PanelHeader eyebrow={eyebrow} title={title} description={description} />
        <div className="px-5 py-10 sm:px-6">
          <div className="rounded-3xl bg-white/[0.03] px-6 py-8 text-center">
            <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Empty Queue</p>
            <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-primary">No review items</h3>
            <p className="mt-3 text-sm text-secondary">This section is no longer part of the main Mission Control workflow and currently has no queued records.</p>
          </div>
        </div>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel className="overflow-hidden">
      <PanelHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="grid gap-px bg-white/8 lg:grid-cols-[340px_minmax(0,1fr)]">
        <div className="bg-[linear-gradient(180deg,rgba(10,14,24,0.96),rgba(7,10,16,0.96))] p-4 sm:p-5">
          <p className="px-2 text-[11px] uppercase tracking-[0.22em] text-secondary">Pending Items</p>
          <div className="mt-4 space-y-1.5">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`rounded-2xl px-4 py-4 transition ${index === 0 ? "bg-[linear-gradient(135deg,rgba(122,132,255,0.18),rgba(65,214,255,0.08))] ring-1 ring-[#7a84ff]/20 shadow-[0_14px_34px_rgba(90,108,255,0.18)]" : "bg-white/[0.02] ring-1 ring-white/6 hover:bg-white/[0.04]"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-primary">{item.title}</p>
                    <p className="mt-1 text-sm text-secondary">{item.reviewer}</p>
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">{item.status}</span>
                </div>
                <p className="mt-3 text-sm text-secondary">{item.lastDisposition}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[linear-gradient(180deg,rgba(12,17,28,0.98),rgba(9,12,18,0.98))] p-5 sm:p-6">
          <div className="flex flex-col gap-4 border-b border-white/8 pb-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Review Workspace</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-primary">{selected.title}</h3>
              <p className="mt-2 text-sm text-secondary">Reviewer {selected.reviewer}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" disabled title="Mock action in Phase 6">
                Approve
              </Button>
              <Button variant="secondary" disabled title="Mock action in Phase 6">
                Request Review
              </Button>
            </div>
          </div>

          <div className="grid gap-6 pt-6 xl:grid-cols-[minmax(0,1.05fr)_300px]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Classification Summary</p>
              <div className="mt-4 space-y-3">
                {selected.summary.map((line) => (
                  <div key={line} className="border-b border-white/8 pb-3 text-sm leading-6 text-primary">
                    {line}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl bg-[linear-gradient(135deg,rgba(122,132,255,0.10),rgba(255,255,255,0.02))] p-4 ring-1 ring-[#7a84ff]/14">
                <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Status</p>
                <p className="mt-2 text-sm font-semibold text-primary">{selected.status}</p>
                <p className="mt-2 text-sm text-secondary">{selected.lastDisposition}</p>
              </div>
              <div className="rounded-2xl bg-[linear-gradient(135deg,rgba(255,191,95,0.10),rgba(255,255,255,0.02))] p-4 ring-1 ring-amber-400/14">
                <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Blockers</p>
                <div className="mt-3 space-y-2">
                  {selected.blockers.length > 0 ? (
                    selected.blockers.map((blocker) => (
                      <p key={blocker} className="text-sm leading-6 text-primary">
                        {blocker}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm leading-6 text-secondary">No active blockers.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
