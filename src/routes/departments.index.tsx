import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Search, Filter, Sparkles, ChevronRight } from "lucide-react";
import { KpiCard, Meter, PageHeader, Panel, StatusPill, RightPanel, PageFooter } from "@/components/ui-kit";
import { DEPARTMENTS, inr } from "@/data/platform";

export const Route = createFileRoute("/departments/")({
  head: () => ({
    meta: [
      { title: "Department Center — 44 Business Functions" },
      {
        name: "description",
        content:
          "Dedicated AI workspaces for all 44 assessed business functions: dashboards, KPIs, workflows, approvals, documents, agents and copilots.",
      },
      { property: "og:title", content: "Department Center" },
      { property: "og:description", content: "A dedicated AI workspace for every business function." },
    ],
  }),
  component: DepartmentsPage,
});

const CLUSTERS = [
  "All",
  "Corporate",
  "Commercial",
  "Supply Chain",
  "Operations",
  "Engineering",
  "Quality",
  "Compliance",
  "Finance",
  "People",
  "Platform",
];

function DepartmentsPage() {
  const [q, setQ] = useState("");
  const [clusterFilter, setClusterFilter] = useState("All");

  const list = DEPARTMENTS.filter((d) => {
    const matchesQ =
      d.name.toLowerCase().includes(q.toLowerCase()) || d.cluster.toLowerCase().includes(q.toLowerCase());
    const matchesCluster = clusterFilter === "All" || d.cluster === clusterFilter;
    return matchesQ && matchesCluster;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Operations Workspace"
        title="44 Department Control Hub"
        description="Each of the 44 assessed business functions operates its own workspace — complete with dedicated KPIs, AI Copilot, AI Agents, Tasks, Documents, Workflows, Approvals, Reports, Analytics, Knowledge, and Settings."
        breadcrumbs={[{ label: "Operations Workspace", to: "/departments" }, { label: "44 Departments" }]}
        filters={
          <div className="flex flex-wrap gap-1.5">
            {CLUSTERS.map((c) => (
              <button
                key={c}
                onClick={() => setClusterFilter(c)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  clusterFilter === c
                    ? "bg-[#163B65] text-white shadow-xs"
                    : "bg-[#F6F8FB] text-[#6B7280] hover:bg-slate-200 border border-[#E5E7EB]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="Functions Onboarded" value="44" delta="100% of blueprint" icon={Building2} />
        <KpiCard label="Average AI Adoption" value="72.4%" delta="+9.2 pts QoQ" tone="success" />
        <KpiCard label="Hours Saved / Month" value="18,420" tone="accent" />
        <KpiCard label="Value Delivered" value="₹41.6 Cr" tone="success" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-[#6B7280]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search departments by name, head, or cluster…"
              className="h-9 w-full rounded-lg border border-[#E5E7EB] bg-white pl-9 pr-3 text-xs outline-none focus:border-[#00A99D] focus:ring-2 focus:ring-[#00A99D]/20 shadow-xs font-medium"
            />
          </div>
          <span className="text-xs font-semibold text-[#6B7280]">
            Showing {list.length} of 44 department workspaces
          </span>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((d) => (
            <Link
              key={d.id}
              to="/departments/$deptId"
              params={{ deptId: d.id }}
              className="panel group p-4 transition-all duration-200 hover:shadow-md hover:border-[#00A99D]"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-block rounded bg-[#163B65]/10 px-2 py-0.5 text-[10px] font-bold text-[#163B65] mb-1">
                    {d.cluster}
                  </span>
                  <h3 className="text-sm font-bold text-[#1F2937] group-hover:text-[#00A99D] transition-colors">
                    {d.name}
                  </h3>
                  <p className="text-[11px] text-[#6B7280] mt-0.5 font-medium">Head: {d.head}</p>
                </div>
                <StatusPill status={d.maturity} />
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                <Cell label="Agents" value={String(d.agents)} />
                <Cell label="Automations" value={String(d.automations)} />
                <Cell label="Saved / yr" value={inr(d.annualSavings)} />
              </div>

              <div className="mt-3">
                <div className="mb-1 flex justify-between text-[10px] font-semibold text-[#6B7280]">
                  <span>AI Adoption</span>
                  <span className="font-bold text-[#00A99D]">{d.adoption}%</span>
                </div>
                <Meter value={d.adoption} />
              </div>
            </Link>
          ))}
        </div>

        {list.length === 0 && (
          <Panel>
            <p className="text-sm text-[#6B7280] text-center py-6">
              No business functions match that search or filter.
            </p>
          </Panel>
        )}
      </div>

      <PageFooter />
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-slate-50 p-2">
      <p className="text-[9px] uppercase font-semibold text-slate-400">{label}</p>
      <p className="text-xs font-bold text-slate-800 mt-0.5">{value}</p>
    </div>
  );
}

