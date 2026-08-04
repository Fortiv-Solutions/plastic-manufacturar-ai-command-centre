import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Bot, Search, Plus, Activity, Filter } from "lucide-react";
import { PageHeader, Panel, StatusPill, Meter, RightPanel, PageFooter } from "@/components/ui-kit";
import { AGENTS } from "@/data/platform";

export const Route = createFileRoute("/agents/")({
  head: () => ({
    meta: [
      { title: "AI Agents Center — 63 Autonomous Agents" },
      {
        name: "description",
        content:
          "Enterprise catalogue of 63 production AI agents with health, execution history, permissions, cost and connected systems.",
      },
      { property: "og:title", content: "AI Agents Center" },
      { property: "og:description", content: "Govern every enterprise AI agent from one catalogue." },
    ],
  }),
  component: AgentsPage,
});

function AgentsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(
    () =>
      AGENTS.filter(
        (a) =>
          (status === "All" || a.status === status) &&
          (a.name.toLowerCase().includes(q.toLowerCase()) ||
            a.department.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, status],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="AI Workspace"
        title="63 Production AI Agents"
        description="Every agent is versioned, permissioned, and monitored — with prompt registry, memory, knowledge bindings, connected systems, cost and execution logs."
        breadcrumbs={[{ label: "AI Workspace", to: "/agents" }, { label: "AI Agents" }]}
        actions={
          <button className="btn-primary-teal inline-flex items-center gap-2">
            <Plus className="h-4 w-4" /> Provision New Agent
          </button>
        }
        filters={
          <div className="flex flex-wrap items-center gap-1.5">
            {["All", "Running", "Idle", "Paused", "Draft"].map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  status === s
                    ? "bg-[#163B65] text-white shadow-xs"
                    : "bg-[#F6F8FB] text-[#6B7280] hover:bg-slate-200 border border-[#E5E7EB]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        }
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-[#6B7280]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search 63 agents by name or department function…"
              className="h-9 w-full rounded-lg border border-[#E5E7EB] bg-white pl-9 pr-3 text-xs outline-none focus:border-[#00A99D] focus:ring-2 focus:ring-[#00A99D]/20 shadow-xs font-medium"
            />
          </div>
          <span className="text-xs font-semibold text-[#6B7280]">
            Showing {filtered.length} of 63 agents
          </span>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((a) => (
            <Link
              key={a.id}
              to="/agents/$agentId"
              params={{ agentId: a.id }}
              className="panel group p-4 transition-all duration-200 hover:shadow-md hover:border-[#00A99D]"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#163B65]/20 bg-[#163B65]/10">
                    <Bot className="h-4 w-4 text-[#163B65]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold text-[#1F2937] group-hover:text-[#00A99D] transition-colors">
                      {a.name}
                    </h3>
                    <p className="truncate text-[11px] text-[#6B7280] font-medium">{a.department}</p>
                  </div>
                </div>
                <StatusPill status={a.status} />
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                <Stat label="Runs" value={a.runs.toLocaleString()} />
                <Stat label="Accuracy" value={`${a.accuracy}%`} />
                <Stat label="Cost / mo" value={`$${a.cost}`} />
              </div>

              <div className="mt-3">
                <div className="mb-1 flex justify-between text-[10px] font-semibold text-[#6B7280]">
                  <span>Health Index</span>
                  <span className="font-bold text-[#00A99D]">{a.health}%</span>
                </div>
                <Meter value={a.health} />
              </div>

              <div className="mt-3 flex items-center justify-between text-[10px] text-[#6B7280] border-t border-[#E5E7EB] pt-2 font-medium">
                <span className="font-mono text-[#163B65] font-semibold">{a.model}</span>
                <span className="inline-flex items-center gap-1">
                  <Activity className="h-3 w-3 text-[#6B7280]" /> {a.latency.toFixed(1)}s p95
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <Panel>
            <p className="text-sm text-[#6B7280] text-center py-6">No agents match your filter criteria.</p>
          </Panel>
        )}
      </div>

      <PageFooter />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-slate-50 p-2">
      <p className="text-[9px] uppercase font-semibold text-slate-400">{label}</p>
      <p className="text-xs font-bold text-slate-800 mt-0.5">{value}</p>
    </div>
  );
}

