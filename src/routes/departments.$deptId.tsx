import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Sparkles, Send } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { KpiCard, Meter, PageHeader, Panel, StatusPill, RightPanel, PageFooter } from "@/components/ui-kit";
import { AGENTS, AUTOMATIONS, DEPARTMENTS, MONTHS, inr } from "@/data/platform";

export const Route = createFileRoute("/departments/$deptId")({
  head: () => ({
    meta: [
      { title: "Department Workspace — AI Command Center" },
      { name: "description", content: "Dashboard, KPIs, workflows, approvals, documents, agents and copilot for a business function." },
      { property: "og:title", content: "Department Workspace" },
      { property: "og:description", content: "Every business function gets its own AI workspace." },
    ],
  }),
  loader: ({ params }) => {
    const dept = DEPARTMENTS.find((d) => d.id === params.deptId);
    if (!dept) throw notFound();
    return { dept };
  },
  component: DepartmentWorkspace,
});

const TABS = [
  "Dashboard",
  "KPIs",
  "Tasks",
  "Workflows",
  "Documents",
  "Approvals",
  "Reports",
  "Analytics",
  "AI Agents",
  "Copilot",
  "Knowledge",
  "Automation",
  "Settings",
] as const;

function DepartmentWorkspace() {
  const { dept } = Route.useLoaderData();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Dashboard");

  const agents = AGENTS.filter((a) => a.department === dept.name);
  const automations = AUTOMATIONS.filter((a) => a.department === dept.name);
  const trend = MONTHS.slice(0, 8).map((m, i) => ({
    month: m,
    hours: 60 + ((i * 53 + dept.name.length * 7) % 260),
  }));

  return (
    <>
      <PageHeader
        eyebrow={`${dept.cluster} Cluster Workspace`}
        title={dept.name}
        description={`Function head: ${dept.head} · ${agents.length} bound agents · ${automations.length} automation opportunities · Maturity: ${dept.maturity}`}
        breadcrumbs={[
          { label: "Operations Workspace", to: "/departments" },
          { label: "Departments", to: "/departments" },
          { label: dept.name },
        ]}
        actions={
          <button
            onClick={() => setTab("Copilot")}
            className="inline-flex items-center gap-2 rounded-lg bg-[image:var(--gradient-brand)] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:opacity-95"
          >
            <Sparkles className="h-4 w-4" /> Open {dept.name} Copilot
          </button>
        }
        filters={
          <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  tab === t
                    ? "bg-primary text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-border"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        }
      />

      <div className="space-y-6">
        {tab === "Copilot" ? (
          <CopilotPanel dept={dept.name} />
        ) : tab === "AI Agents" ? (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {agents.map((a) => (
              <Link
                key={a.id}
                to="/agents/$agentId"
                params={{ agentId: a.id }}
                className="panel p-4 hover:shadow-md hover:border-[#00A99D] transition-all"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-[#163B65]">{a.name}</p>
                  <StatusPill status={a.status} />
                </div>
                <p className="mt-1 text-[11px] text-[#6B7280] font-medium">
                  {a.model} · {a.runs.toLocaleString()} runs
                </p>
                <div className="mt-3">
                  <Meter value={a.health} />
                </div>
              </Link>
            ))}
            {agents.length === 0 && (
              <Panel className="col-span-full">
                <p className="text-sm text-[#6B7280] text-center py-4">
                  Agents for this function are in onboarding.
                </p>
              </Panel>
            )}
          </div>
        ) : tab === "Automation" ? (
          <Panel title="Automation Backlog" subtitle="Blueprint opportunities scoped to this function">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[11px] uppercase tracking-wider text-[#6B7280] bg-[#F6F8FB]">
                  <tr>
                    <th className="p-3 font-bold">Code</th>
                    <th className="p-3 font-bold">Opportunity</th>
                    <th className="p-3 font-bold">Priority</th>
                    <th className="p-3 font-bold">ROI</th>
                    <th className="p-3 font-bold">Annual Value</th>
                    <th className="p-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {automations.map((a) => (
                    <tr key={a.id} className="hover:bg-[#F6F8FB] transition-colors">
                      <td className="p-3 font-mono text-[11px] font-bold text-[#163B65]">{a.code}</td>
                      <td className="p-3 font-medium text-[#1F2937] capitalize">{a.name}</td>
                      <td className="p-3"><StatusPill status={a.priority} /></td>
                      <td className="p-3 font-bold text-[#34C759]">{a.roi}%</td>
                      <td className="p-3 font-medium text-[#1F2937]">{inr(a.annualSavings)}</td>
                      <td className="p-3"><StatusPill status={a.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <KpiCard label="AI Adoption" value={`${dept.adoption}%`} tone="success" />
              <KpiCard label="Hours Saved / Mo" value={dept.hoursSaved.toLocaleString()} tone="accent" />
              <KpiCard label="Annual Value" value={inr(dept.annualSavings)} tone="success" />
              <KpiCard label="Open Approvals" value={String(3 + (dept.name.length % 7))} tone="warning" />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Panel className="lg:col-span-2" title={`${tab} — Effort Released`} subtitle="Monthly office hours automated in this function">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={trend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                    <XAxis dataKey="month" stroke="#6B7280" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6B7280" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="hours" fill="#163B65" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Panel>

              <Panel title={`${tab} Work Queue`} subtitle="Work items handled with AI assistance">
                <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                  {[
                    "Draft prepared by copilot — awaiting review",
                    "Auto-classified and routed to owner",
                    "Validated against ISO clause library",
                    "Escalated: confidence below threshold",
                    "Completed straight-through, no human touch",
                    "Scheduled for weekly batch run",
                  ].map((t, i) => (
                    <div key={i} className="rounded-lg border border-[#E5E7EB] bg-[#F6F8FB] p-2.5 text-xs">
                      <p className="font-bold text-[#163B65]">{dept.name.split(" ")[0]} · {tab} #{1200 + i}</p>
                      <p className="text-[#6B7280] mt-0.5 font-medium">{t}</p>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </>
        )}
      </div>

      <PageFooter />
    </>
  );
}

function CopilotPanel({ dept }: { dept: string }) {
  const [messages, setMessages] = useState([
    { role: "ai", text: `I'm the ${dept} Copilot. I'm grounded in this function's SOPs, ERP records, documents and approval matrix. Ask me anything, or pick a suggested action.` },
  ]);
  const [input, setInput] = useState("");

  const suggestions = [
    "Summarise this week's exceptions",
    "Draft the monthly MIS section",
    "Which approvals are breaching SLA?",
    "Generate a corrective action plan",
  ];

  function send(text: string) {
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user", text },
      {
        role: "ai",
        text: `Working on "${text}". I retrieved 12 grounded sources from the ${dept} knowledge partition, cross-checked ERP master data, and drafted an answer with citations. Approval routing is prepared for the function head.`,
      },
    ]);
    setInput("");
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Panel className="md:col-span-2" title={`${dept} Copilot`} subtitle="Context-aware, grounded, with workflow and approval actions">
        <div className="max-h-[380px] space-y-3 overflow-y-auto pr-1">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-xl border p-3 text-xs leading-relaxed ${
                m.role === "ai"
                  ? "border-primary/20 bg-primary/5 text-slate-800"
                  : "ml-auto border-border bg-slate-100 text-slate-900 font-medium"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder={`Ask the ${dept} copilot…`}
            className="h-10 flex-1 rounded-lg border border-border bg-white px-3 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button
            onClick={() => send(input)}
            className="grid h-10 w-10 place-items-center rounded-lg bg-[image:var(--gradient-brand)] text-white shadow-xs"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </Panel>

      <div className="space-y-4">
        <Panel title="Suggested Actions">
          <div className="space-y-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="w-full rounded-lg border border-border bg-slate-50 p-2.5 text-left text-xs font-semibold text-slate-700 hover:border-primary hover:text-primary transition"
              >
                {s}
              </button>
            ))}
          </div>
        </Panel>
        <Panel title="Connected Knowledge">
          <ul className="space-y-1.5 text-xs text-slate-600">
            {["SOPs & work instructions", "ERP master data", "SharePoint document library", "Email & meeting notes", "ISO / IATF clause library", "Customer specifications"].map((k) => (
              <li key={k} className="rounded-md border border-border bg-slate-50 px-2.5 py-1.5 font-medium">{k}</li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

