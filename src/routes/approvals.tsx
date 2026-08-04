import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckSquare, Check, X, Clock3, Bot } from "lucide-react";
import { KpiCard, PageHeader, Panel, StatusPill, RightPanel, PageFooter } from "@/components/ui-kit";
import { approvals, inr } from "@/data/platform";

export const Route = createFileRoute("/approvals")({
  head: () => ({
    meta: [
      { title: "Approvals — AI-Routed Decision Queue" },
      {
        name: "description",
        content: "AI-prepared approvals with SLA tracking, risk scoring, delegation of authority and full audit trail.",
      },
      { property: "og:title", content: "Approvals" },
      { property: "og:description", content: "Approve faster with AI-prepared context and risk scoring." },
    ],
  }),
  component: Approvals,
});

function Approvals() {
  const [decided, setDecided] = useState<Record<string, "approved" | "rejected">>({});

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Operations Workspace"
        title="Pending Approval Queue"
        description="Every request arrives pre-analysed: policy checks run, supporting documents attached, risk scored and a recommendation drafted by the Approval Agent."
        breadcrumbs={[{ label: "Operations Workspace", to: "/departments" }, { label: "Approvals" }]}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="Pending Items" value={String(approvals.length - Object.keys(decided).length)} icon={CheckSquare} tone="warning" />
        <KpiCard label="Avg Cycle Time" value="4.2 h" delta="vs 3.1 days manual" icon={Clock3} tone="success" />
        <KpiCard label="Auto-Cleared STP" value="61%" delta="Within policy thresholds" icon={Bot} />
        <KpiCard label="Value in Queue" value={inr(approvals.reduce((s, a) => s + a.amount, 0))} tone="accent" />
      </div>

      <div className="space-y-4">
        {approvals.map((a) => {
          const state = decided[a.id];
          return (
            <Panel key={a.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-[260px] flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#1F2937] text-sm">{a.title}</h3>
                    <StatusPill status={a.risk} />
                  </div>
                  <p className="mt-0.5 font-mono text-[11px] font-medium text-[#6B7280]">
                    {a.id} · {a.dept} · Raised by {a.requester}
                  </p>
                  <div className="mt-3 rounded-lg border border-[#00A99D]/30 bg-[#00A99D]/5 p-3 text-xs leading-relaxed text-[#1F2937]">
                    <span className="font-bold text-[#163B65]">AI Recommendation: </span>
                    {a.risk === "High"
                      ? "Approve with condition — hedge 40% of volume and lock a price-review clause at 60 days. Two policy exceptions detected."
                      : "Approve — within delegation of authority, three comparable benchmarks found, no policy exception."}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p className="font-display text-lg font-bold text-[#163B65]">{a.amount ? inr(a.amount) : "Non-financial"}</p>
                  <p className="text-xs font-semibold text-[#6B7280]">SLA: {a.sla}</p>
                  {state ? (
                    <StatusPill status={state === "approved" ? "Live" : "Critical"} />
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDecided((d) => ({ ...d, [a.id]: "rejected" }))}
                        className="btn-secondary-outline text-xs px-3 py-1.5 inline-flex items-center gap-1.5"
                      >
                        <X className="h-3.5 w-3.5" /> Reject
                      </button>
                      <button
                        onClick={() => setDecided((d) => ({ ...d, [a.id]: "approved" }))}
                        className="btn-primary-teal text-xs px-3.5 py-1.5 inline-flex items-center gap-1.5"
                      >
                        <Check className="h-3.5 w-3.5" /> Approve
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Panel>
          );
        })}
      </div>

      <PageFooter />
    </div>
  );
}

