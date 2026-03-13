import { Badge } from "@/components/shared/Badge";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { PanelHeader } from "@/components/shared/PanelHeader";
import { workflows } from "@/lib/mock-data";

export function WorkflowProgressView() {
  return (
    <div className="space-y-6">
      {workflows.map((workflow) => (
        <GlassPanel key={workflow.id} className="overflow-hidden">
          <PanelHeader
            eyebrow="Workflow State"
            title={workflow.activeWorkflow}
            description={`${workflow.linkedProject} - Current step: ${workflow.currentStep}`}
          />
          <div className="grid gap-px bg-white/8 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
            <div className="bg-[linear-gradient(180deg,rgba(12,17,28,0.98),rgba(8,11,16,0.98))] p-5 sm:p-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Operational Summary</p>
              <div className="mt-4 grid gap-3">
                <div className={`rounded-[22px] px-4 py-4 ring-1 ${workflow.workflowStatus === "Blocked" ? "bg-[linear-gradient(135deg,rgba(255,107,122,0.14),rgba(255,255,255,0.02))] ring-rose-400/18" : "bg-[linear-gradient(135deg,rgba(65,214,255,0.14),rgba(255,255,255,0.02))] ring-cyan/16"}`}>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-secondary">Status</p>
                  <p className={`mt-2 text-2xl font-semibold tracking-[-0.04em] ${workflow.workflowStatus === "Blocked" ? "text-rose-200" : "text-primary"}`}>{workflow.workflowStatus}</p>
                </div>
                <div className="rounded-[22px] bg-[linear-gradient(180deg,rgba(122,132,255,0.10),rgba(255,255,255,0.02))] px-4 py-4 ring-1 ring-[#7a84ff]/14">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-secondary">Current Step</p>
                  <p className="mt-2 text-lg font-semibold text-primary">{workflow.currentStep}</p>
                </div>
                <div className="rounded-[22px] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-4 ring-1 ring-white/8">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-secondary">Next Candidate</p>
                  <p className="mt-2 text-lg font-semibold text-primary">{workflow.nextWorkflowCandidate}</p>
                </div>
              </div>

              <div className="mt-6 rounded-[24px] bg-[linear-gradient(135deg,rgba(255,191,95,0.12),rgba(255,255,255,0.02))] p-4 ring-1 ring-amber-400/20">
                <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Blockers</p>
                <div className="mt-3 space-y-2">
                  {workflow.blockingIssues.map((issue) => (
                    <div key={issue} className="rounded-2xl bg-black/10 px-3 py-3 text-sm text-primary ring-1 ring-white/6">
                      {issue}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[linear-gradient(180deg,rgba(10,14,22,0.98),rgba(7,10,16,0.98))] p-5 sm:p-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Stage Progression</p>
              <div className="mt-5 space-y-0">
                {workflow.nodes.map((node, index) => (
                  <div key={node.id} className="grid grid-cols-[28px_minmax(0,1fr)] gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={`mt-1 block h-3.5 w-3.5 rounded-full ${
                          node.status === "Blocked"
                            ? "bg-rose-400 shadow-[0_0_18px_rgba(251,113,133,0.55)]"
                            : node.status === "Active"
                              ? "bg-cyan shadow-[0_0_18px_rgba(34,211,238,0.55)]"
                              : node.status === "Complete"
                                ? "bg-blue shadow-[0_0_18px_rgba(96,165,250,0.45)]"
                                : "bg-white/25"
                        }`}
                      />
                      {index !== workflow.nodes.length - 1 ? <span className="mt-2 h-full w-px bg-gradient-to-b from-white/20 to-white/5" /> : null}
                    </div>
                    <div
                      className={`mb-5 rounded-[24px] px-4 py-4 ring-1 ${
                        node.status === "Blocked"
                          ? "bg-[linear-gradient(135deg,rgba(255,107,122,0.12),rgba(255,255,255,0.02))] ring-rose-400/16"
                          : node.status === "Active"
                            ? "bg-[linear-gradient(135deg,rgba(65,214,255,0.12),rgba(122,132,255,0.06),rgba(255,255,255,0.02))] ring-cyan/16"
                            : node.status === "Complete"
                              ? "bg-[linear-gradient(135deg,rgba(67,209,141,0.10),rgba(255,255,255,0.02))] ring-emerald-400/14"
                              : "bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] ring-white/8"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-primary">{node.name}</p>
                          <p className="mt-1 text-sm text-secondary">{node.type}</p>
                        </div>
                        <Badge tone={node.status === "Blocked" ? "danger" : node.status === "Active" ? "cyan" : node.status === "Complete" ? "blue" : "muted"}>
                          {node.status}
                        </Badge>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-secondary">{node.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassPanel>
      ))}
    </div>
  );
}
