import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { PageHeader, Panel, Meter, RightPanel, PageFooter } from "@/components/ui-kit";
import { DEPARTMENTS } from "@/data/platform";

export const Route = createFileRoute("/copilots")({
  head: () => ({
    meta: [
      { title: "AI Copilot Center — 44 Department Copilots" },
      {
        name: "description",
        content: "Department copilots with conversation, suggested actions, connected knowledge, workflow automation, approvals and document generation.",
      },
      { property: "og:title", content: "AI Copilot Center" },
      { property: "og:description", content: "A grounded AI copilot for every department in the manufacturing group." },
    ],
  }),
  component: Copilots,
});

const CAPABILITIES = [
  "Conversation & RAG",
  "Suggested Actions",
  "Connected Knowledge",
  "Workflow Automation",
  "Zero-Touch Approvals",
  "Document Generation",
  "Task Automation",
  "Contextual Recommendations",
  "Real-Time Analytics",
  "Execution History",
  "Multi-Language Memory",
];

function Copilots() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="AI Workspace"
        title="44 Department Copilot Fleet"
        description="Every business function operates a grounded copilot built on the same enterprise capability contract — context awareness, ERP integration, approval routing, and document generation."
        breadcrumbs={[{ label: "AI Workspace", to: "/copilots" }, { label: "AI Copilots" }]}
      />

      <Panel title="Enterprise Capability Contract" subtitle="Guaranteed capability baseline across all 44 copilots">
        <div className="flex flex-wrap gap-2">
          {CAPABILITIES.map((c) => (
            <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-[#163B65]/20 bg-[#163B65]/10 px-3 py-1 text-xs font-semibold text-[#163B65]">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#00A99D]" /> {c}
            </span>
          ))}
        </div>
      </Panel>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {DEPARTMENTS.map((d) => (
          <Link
            key={d.id}
            to="/departments/$deptId"
            params={{ deptId: d.id }}
            className="panel group p-4 transition-all duration-200 hover:shadow-md hover:border-[#00A99D]"
          >
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#00A99D]/20 bg-[#00A99D]/10">
                <Sparkles className="h-4 w-4 text-[#00A99D]" />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold text-[#1F2937] group-hover:text-[#00A99D] transition-colors">
                  {d.name} Copilot
                </h3>
                <p className="text-[11px] text-[#6B7280] font-medium">{d.cluster} · {d.head}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-[#6B7280] font-medium">
              {(d.adoption * 37).toLocaleString()} conversations · {d.agents} bound agents
            </p>
            <div className="mt-2">
              <div className="mb-1 flex justify-between text-[10px] font-semibold text-[#6B7280]">
                <span>Utilization Score</span>
                <span className="font-bold text-[#00A99D]">{d.adoption}%</span>
              </div>
              <Meter value={d.adoption} tone="accent" />
            </div>
          </Link>
        ))}
      </div>

      <PageFooter />
    </div>
  );
}

