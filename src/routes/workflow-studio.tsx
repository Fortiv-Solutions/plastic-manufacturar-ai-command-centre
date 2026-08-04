import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bot,
  UserCheck,
  Database,
  Mail,
  FileText,
  Webhook,
  Clock,
  GitBranch,
  RefreshCcw,
  Bell,
  Search,
  Play,
  Save,
} from "lucide-react";
import { PageHeader, Panel, StatusPill, RightPanel, PageFooter } from "@/components/ui-kit";

export const Route = createFileRoute("/workflow-studio")({
  head: () => ({
    meta: [
      { title: "Workflow Studio — Visual Automation Builder" },
      {
        name: "description",
        content: "Drag-and-drop enterprise workflow builder with AI, human approval, ERP, document AI, RAG, API, schedule and logging nodes.",
      },
      { property: "og:title", content: "Workflow Studio" },
      { property: "og:description", content: "Build enterprise automations visually with AI and human-in-the-loop nodes." },
    ],
  }),
  component: WorkflowStudio,
});

const PALETTE = [
  { label: "AI / LLM Node", icon: Bot },
  { label: "Human Approval", icon: UserCheck },
  { label: "ERP (SAP / Oracle)", icon: Database },
  { label: "Email / Outlook", icon: Mail },
  { label: "Document AI", icon: FileText },
  { label: "RAG Retrieval", icon: Search },
  { label: "API / Webhook", icon: Webhook },
  { label: "Schedule Trigger", icon: Clock },
  { label: "Condition Branch", icon: GitBranch },
  { label: "Loop / Retry", icon: RefreshCcw },
  { label: "Teams / Bell Alert", icon: Bell },
  { label: "Audit Log Node", icon: Database },
];

const CANVAS_NODES = [
  { id: 1, label: "Trigger · New RFQ email", icon: Mail, x: 4, y: 6, tone: "primary" },
  { id: 2, label: "Document AI · Extract RFQ fields", icon: FileText, x: 30, y: 6, tone: "accent" },
  { id: 3, label: "RAG · Match part & resin history", icon: Search, x: 56, y: 6, tone: "accent" },
  { id: 4, label: "AI · Build cost estimate", icon: Bot, x: 17, y: 44, tone: "primary" },
  { id: 5, label: "Condition · Value > ₹25 L?", icon: GitBranch, x: 43, y: 44, tone: "warning" },
  { id: 6, label: "Human approval · Commercial head", icon: UserCheck, x: 69, y: 44, tone: "warning" },
  { id: 7, label: "ERP · Create quotation in SAP", icon: Database, x: 30, y: 78, tone: "success" },
  { id: 8, label: "Notify · Teams + email + audit log", icon: Bell, x: 60, y: 78, tone: "success" },
];

const toneRing: Record<string, string> = {
  primary: "border-primary/40 bg-primary/10 text-primary font-bold",
  accent: "border-teal-500/40 bg-teal-50 text-teal-800 font-bold",
  warning: "border-amber-500/40 bg-amber-50 text-amber-900 font-bold",
  success: "border-emerald-500/40 bg-emerald-50 text-emerald-900 font-bold",
};

function WorkflowStudio() {
  const [selected, setSelected] = useState(CANVAS_NODES[4]!);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Automation Studio"
        title="Visual Workflow Builder"
        description="Compose enterprise automations visually — AI, retrieval, document intelligence, ERP writes, conditions, retries and human approvals with full audit logging."
        breadcrumbs={[{ label: "Automation Studio", to: "/automation" }, { label: "Workflow Studio" }]}
        actions={
          <>
            <button className="btn-secondary-outline inline-flex items-center gap-2">
              <Save className="h-4 w-4" /> Save Version
            </button>
            <button className="btn-primary-teal inline-flex items-center gap-2">
              <Play className="h-4 w-4" /> Run Test Execution
            </button>
          </>
        }
      />

      <div className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
          <Panel title="Node Palette" subtitle="Drag to canvas">
            <div className="space-y-1.5">
              {PALETTE.map((p) => (
                <div
                  key={p.label}
                  draggable
                  className="flex cursor-grab items-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#F6F8FB] p-2 text-xs font-semibold text-[#1F2937] transition hover:border-[#00A99D] hover:text-[#00A99D] hover:bg-white"
                >
                  <p.icon className="h-3.5 w-3.5 text-[#163B65]" /> {p.label}
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="RFQ → Quotation Workflow (v7)" subtitle="Status: Live · 1,284 runs · 98.2% success rate">
            <div className="relative h-[480px] w-full overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#F6F8FB] p-2">
              <svg className="absolute inset-0 h-full w-full" aria-hidden>
                {[
                  [12, 12, 38, 12],
                  [38, 12, 64, 12],
                  [64, 14, 25, 48],
                  [25, 50, 51, 50],
                  [51, 50, 77, 50],
                  [51, 54, 38, 84],
                  [38, 84, 68, 84],
                ].map(([x1, y1, x2, y2], i) => (
                  <line
                    key={i}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke="#163B65"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    opacity="0.5"
                  />
                ))}
              </svg>
              {CANVAS_NODES.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setSelected(n)}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                  className={`absolute w-[200px] rounded-xl border p-3 text-left text-xs shadow-xs transition-all ${
                    toneRing[n.tone]
                  } ${selected.id === n.id ? "ring-2 ring-[#00A99D] border-[#00A99D] shadow-md" : "hover:shadow-md"}`}
                >
                  <n.icon className="mb-1.5 h-4 w-4" />
                  <p className="font-bold text-[#1F2937]">{n.label}</p>
                  <p className="mt-1 font-mono text-[10px] text-[#6B7280] font-medium">node-{n.id}</p>
                </button>
              ))}
            </div>
          </Panel>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Panel title="Node Configuration" subtitle={selected.label}>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <Field label="Node Type" value={selected.label.split(" · ")[0] ?? ""} />
              <Field label="Timeout Limit" value="120 s" />
              <Field label="Retry Policy" value="3 (exponential backoff)" />
              <Field label="Failure Handling" value="Escalate to owner" />
              <Field label="Compliance Audit" value="Immutable log · 7 yr" />
              <Field label="Execution Scope" value="Tenant-scoped sandbox" />
            </div>
          </Panel>

          <Panel title="Recent Execution Runs" subtitle="Real-time execution log trace">
            <div className="space-y-2">
              {[
                ["#4821", "Success", "6.2s"],
                ["#4820", "Success", "5.9s"],
                ["#4819", "Awaiting approval", "—"],
                ["#4818", "Success", "7.1s"],
                ["#4817", "Retried (1)", "12.4s"],
              ].map(([id, st, dur]) => (
                <div key={id} className="flex items-center justify-between rounded-lg border border-[#E5E7EB] bg-[#F6F8FB] p-2.5 text-xs">
                  <span className="font-mono font-bold text-[#163B65]">{id}</span>
                  <StatusPill status={st === "Success" ? "Live" : st === "Retried (1)" ? "Medium" : "Paused"} />
                  <span className="text-[#6B7280] font-medium">{dur}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <PageFooter />
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-[10px] uppercase font-bold text-slate-400">{label}</p>
      <div className="rounded-lg border border-border bg-slate-50 px-2.5 py-1.5 font-semibold text-slate-800 text-xs">{value}</div>
    </div>
  );
}

