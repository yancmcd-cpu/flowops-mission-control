import { GlassPanel } from "@/components/shared/GlassPanel";
import { PanelHeader } from "@/components/shared/PanelHeader";
import { opportunities } from "@/lib/mock-data";

const stages = ["Initial Contact", "Discovery", "Proposal Sent", "Negotiation"];
const stageSurfaceMap: Record<string, string> = {
  "Initial Contact": "bg-[linear-gradient(180deg,rgba(122,132,255,0.10),rgba(255,255,255,0.02))] ring-[#7a84ff]/12",
  Discovery: "bg-[linear-gradient(180deg,rgba(162,115,255,0.10),rgba(255,255,255,0.02))] ring-[#a273ff]/12",
  "Proposal Sent": "bg-[linear-gradient(180deg,rgba(65,214,255,0.10),rgba(255,255,255,0.02))] ring-cyan/12",
  Negotiation: "bg-[linear-gradient(180deg,rgba(255,191,95,0.10),rgba(255,255,255,0.02))] ring-amber-400/12",
};

export function OpportunityPipeline() {
  return (
    <GlassPanel className="overflow-hidden">
      <PanelHeader
        eyebrow="Opportunity Pipeline"
        title="Opportunities"
        description="Slim stage-led monitoring rows for cleaner pipeline awareness."
      />
      <div className="grid gap-px bg-white/8 xl:grid-cols-4">
        {stages.map((stage) => {
          const items = opportunities.filter((item) => item.pipelineStage === stage);
          return (
            <div key={stage} className="bg-[linear-gradient(180deg,rgba(10,14,22,0.96),rgba(7,10,16,0.96))] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-primary">{stage}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-tertiary">Pipeline Stage</p>
                </div>
                <span className="rounded-full bg-white/[0.05] px-3 py-1 text-sm text-secondary ring-1 ring-white/8">{items.length}</span>
              </div>
              <div className="mt-4 space-y-3">
                {items.map((item) => (
                  <div key={item.opportunityId} className={`rounded-[24px] px-4 py-4 ring-1 ${stageSurfaceMap[stage]}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-primary">{item.opportunityName}</p>
                        <p className="mt-1 text-sm text-secondary">{item.linkedClient}</p>
                      </div>
                      <span className="text-xs uppercase tracking-[0.18em] text-secondary">{item.classificationStatus}</span>
                    </div>
                    <div className="mt-4 grid gap-2 text-sm">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-secondary">Value</span>
                        <span className="text-primary">{item.pipelineValue}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-secondary">Owner</span>
                        <span className="text-primary">{item.owner}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-secondary">Next Step</span>
                        <span className="text-primary">{item.nextOpportunityAction}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-secondary">Linked Tasks</span>
                        <span className="text-primary">{item.linkedTasks}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}
