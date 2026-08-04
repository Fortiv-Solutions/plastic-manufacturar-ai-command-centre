import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Play, CheckCircle2 } from "lucide-react";
import { PageHeader, Panel, StatusPill, Meter, KpiCard, RightPanel, PageFooter } from "@/components/ui-kit";
import { AUTOMATIONS, DEPARTMENTS, inr } from "@/data/platform";

export const Route = createFileRoute("/automation")({
  head: () => ({
    meta: [
      { title: "Automation Center — 306 AI Opportunities" },
      {
        name: "description",
        content:
          "Full catalogue of 306 AI automation opportunities with ROI, hours saved, complexity, wave, owner and delivery status.",
      },
      { property: "og:title", content: "Automation Center — 306 AI opportunities" },
      { property: "og:description", content: "Prioritise, approve, execute and monitor every automation in the blueprint." },
    ],
  }),
  component: AutomationCenter,
});

function AutomationCenter() {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("All");
  const [priority, setPriority] = useState("All");
  const [wave, setWave] = useState("All");
  const [sort, setSort] = useState<"roi" | "savings" | "hours">("roi");

  const rows = useMemo(() => {
    return AUTOMATIONS.filter(
      (a) =>
        (dept === "All" || a.department === dept) &&
        (priority === "All" || a.priority === priority) &&
        (wave === "All" || String(a.wave) === wave) &&
        (a.name.toLowerCase().includes(q.toLowerCase()) || a.code.toLowerCase().includes(q.toLowerCase())),
    ).sort((x, y) =>
      sort === "roi" ? y.roi - x.roi : sort === "savings" ? y.annualSavings - x.annualSavings : y.hoursPerMonth - x.hoursPerMonth,
    );
  }, [q, dept, priority, wave, sort]);

  const totals = useMemo(
    () => ({
      hours: rows.reduce((s, r) => s + r.hoursPerMonth, 0),
      savings: rows.reduce((s, r) => s + r.annualSavings, 0),
      live: rows.filter((r) => r.status === "Live").length,
    }),
    [rows],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Automation Studio"
        title="306 AI Automation Catalogue"
        description="The complete blueprint catalogue of 306 AI automation opportunities across all 44 business functions — prioritised by ROI, sequenced across a 12-month, four-wave roadmap."
        breadcrumbs={[{ label: "Automation Studio", to: "/automation" }, { label: "306 Automation Blueprint" }]}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="Opportunities in View" value={String(rows.length)} delta="of 306 catalogued" icon={SlidersHorizontal} />
        <KpiCard label="Delivered Automations" value={String(totals.live)} delta="Live in production" icon={CheckCircle2} tone="success" />
        <KpiCard label="Hours Saved / Month" value={totals.hours.toLocaleString()} delta="Office effort released" tone="accent" />
        <KpiCard label="Annual Value Delivered" value={inr(totals.savings)} delta="Run-rate at full adoption" tone="success" />
      </div>

      <div className="space-y-6">
        <Panel title="Filter & Execute Opportunities" subtitle="Search by code, function, priority or delivery wave">
          <div className="mb-4 flex flex-wrap gap-2">
            <div className="relative min-w-[220px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-[#6B7280]" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search 306 automations…"
                className="h-9 w-full rounded-lg border border-[#E5E7EB] bg-white pl-9 pr-3 text-xs outline-none focus:border-[#00A99D] focus:ring-2 focus:ring-[#00A99D]/20 shadow-xs font-medium"
              />
            </div>
            <Select value={dept} onChange={setDept} options={["All", ...DEPARTMENTS.map((d) => d.name)]} />
            <Select value={priority} onChange={setPriority} options={["All", "Critical", "High", "Medium", "Low"]} />
            <Select value={wave} onChange={setWave} options={["All", "1", "2", "3", "4"]} label="Wave" />
            <Select
              value={sort}
              onChange={(v) => setSort(v as typeof sort)}
              options={["roi", "savings", "hours"]}
              label="Sort"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase tracking-wider text-[#6B7280] bg-[#F6F8FB]">
                <tr>
                  <th className="p-3 font-bold">Code</th>
                  <th className="p-3 font-bold">Automation</th>
                  <th className="p-3 font-bold">Function</th>
                  <th className="p-3 font-bold">Priority</th>
                  <th className="p-3 font-bold">Complexity</th>
                  <th className="p-3 font-bold">ROI</th>
                  <th className="p-3 font-bold">Hrs/mo</th>
                  <th className="p-3 font-bold">Annual Value</th>
                  <th className="p-3 font-bold">Wave</th>
                  <th className="p-3 font-bold">Status</th>
                  <th className="p-3 font-bold">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {rows.slice(0, 120).map((a) => (
                  <tr key={a.id} className="hover:bg-[#F6F8FB] transition-colors">
                    <td className="p-3 font-mono text-[11px] font-bold text-[#163B65]">{a.code}</td>
                    <td className="p-3">
                      <p className="font-bold text-[#1F2937] capitalize">{a.name}</p>
                      <p className="text-[10px] text-[#6B7280] font-medium">Owner: {a.owner} · {a.timeline}</p>
                    </td>
                    <td className="p-3 text-[#1F2937] font-medium">{a.department}</td>
                    <td className="p-3"><StatusPill status={a.priority} /></td>
                    <td className="p-3 text-[#6B7280] font-medium">{a.complexity}</td>
                    <td className="p-3 font-bold text-[#34C759]">{a.roi}%</td>
                    <td className="p-3 font-semibold text-[#1F2937]">{a.hoursPerMonth}</td>
                    <td className="p-3 font-medium text-[#1F2937]">{inr(a.annualSavings)}</td>
                    <td className="p-3 font-bold text-[#163B65]">W{a.wave}</td>
                    <td className="p-3"><StatusPill status={a.status} /></td>
                    <td className="w-32 p-3">
                      <Meter value={a.progress} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-[#6B7280] font-medium">
            Showing {Math.min(120, rows.length)} of {rows.length} matching automation opportunities.
          </p>
        </Panel>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((w) => {
            const items = AUTOMATIONS.filter((a) => a.wave === w);
            const live = items.filter((i) => i.status === "Live").length;
            return (
              <Panel key={w} title={`Wave ${w}`} subtitle={items[0]?.timeline ?? ""}>
                <p className="font-display text-2xl font-bold text-[#163B65]">{items.length}</p>
                <p className="text-xs text-[#6B7280] font-medium">Opportunities · {live} Live</p>
                <div className="mt-3">
                  <Meter value={(live / items.length) * 100} />
                </div>
                <button className="btn-secondary-outline mt-3 inline-flex items-center gap-2 text-xs">
                  <Play className="h-3 w-3 text-[#00A99D]" /> Launch Wave Plan
                </button>
              </Panel>
            );
          })}
        </div>
      </div>

      <PageFooter />
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  label?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 max-w-[220px] rounded-lg border border-border bg-white px-2.5 text-xs font-semibold text-slate-700 capitalize outline-none focus:border-primary shadow-xs"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {label ? `${label}: ${o}` : o}
        </option>
      ))}
    </select>
  );
}

