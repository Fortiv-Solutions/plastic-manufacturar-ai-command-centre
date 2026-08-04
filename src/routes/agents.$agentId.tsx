import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Bot, Play, Pause, History, KeyRound, Database, Cpu } from "lucide-react";
import { Meter, PageHeader, Panel, StatusPill, RightPanel, PageFooter } from "@/components/ui-kit";
import { AGENTS } from "@/data/platform";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/agents/$agentId")({
  head: () => ({
    meta: [
      { title: "Agent Detail — AI Command Center" },
      { name: "description", content: "Prompt, knowledge, memory, permissions, logs and cost for an enterprise AI agent." },
      { property: "og:title", content: "AI Agent Detail" },
      { property: "og:description", content: "Full observability for a production enterprise AI agent." },
    ],
  }),
  loader: ({ params }) => {
    const agent = AGENTS.find((a) => a.id === params.agentId);
    if (!agent) throw notFound();
    return { agent };
  },
  component: AgentDetail,
});

const runHistory = Array.from({ length: 14 }, (_, i) => ({
  day: `D-${14 - i}`,
  runs: 40 + ((i * 37) % 160),
  errors: (i * 3) % 7,
}));

function AgentDetail() {
  const { agent } = Route.useLoaderData();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={`${agent.department} Agent`}
        title={agent.name}
        description={`Owned by ${agent.owner} · Model ${agent.model} · ${agent.runs.toLocaleString()} lifetime executions`}
        breadcrumbs={[
          { label: "AI Workspace", to: "/agents" },
          { label: "AI Agents", to: "/agents" },
          { label: agent.name },
        ]}
        actions={
          <>
            <button className="btn-secondary-outline inline-flex items-center gap-2">
              <Pause className="h-4 w-4" /> Pause Agent
            </button>
            <button className="btn-primary-teal inline-flex items-center gap-2">
              <Play className="h-4 w-4" /> Run Execution Now
            </button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Panel title="Agent Status">
          <div className="flex items-center gap-2">
            <StatusPill status={agent.status} />
            <span className="text-xs font-semibold text-[#6B7280]">p95 {agent.latency.toFixed(1)}s</span>
          </div>
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-[10px] font-semibold text-[#6B7280]">
              <span>Health Score</span>
              <span className="font-bold text-[#00A99D]">{agent.health}%</span>
            </div>
            <Meter value={agent.health} />
          </div>
        </Panel>

        <Panel title="Accuracy Rate">
          <p className="font-display text-2xl font-bold text-[#163B65]">{agent.accuracy}%</p>
          <p className="text-xs text-[#6B7280] mt-1 font-medium">Human-verified sample (30d)</p>
        </Panel>

        <Panel title="Token Volume">
          <p className="font-display text-2xl font-bold text-[#163B65]">{(agent.tokens / 1_000_000).toFixed(1)}M</p>
          <p className="text-xs text-[#6B7280] mt-1 font-medium">Rolling 30-day window</p>
        </Panel>

        <Panel title="Monthly Cost">
          <p className="font-display text-2xl font-bold text-[#163B65]">${agent.cost}</p>
          <p className="text-xs text-[#6B7280] mt-1 font-medium">Inference compute spend</p>
        </Panel>
      </div>

      <div className="space-y-6">
        <Panel title="Execution History" subtitle="Runs and failures across the last 14 days">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={runHistory}>
              <defs>
                <linearGradient id="runs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#163B65" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#163B65" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="day" stroke="#6B7280" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#6B7280" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="runs" name="Runs" stroke="#163B65" fill="url(#runs)" strokeWidth={2.5} />
              <Area type="monotone" dataKey="errors" name="Errors" stroke="#E74C3C" fill="transparent" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <div className="grid gap-6 md:grid-cols-2">
          <Panel title="System Prompt" subtitle="Versioned in prompt registry (v14, approved)">
            <pre className="max-h-60 overflow-auto whitespace-pre-wrap rounded-lg border border-[#E5E7EB] bg-[#F6F8FB] p-3 font-mono text-[11px] leading-relaxed text-[#1F2937]">
{`You are the ${agent.name} for a multi-plant plastic & polymer manufacturing group.
Domain: ${agent.department}.

Rules:
1. Ground every answer in retrieved Company Brain sources; cite document IDs.
2. Never invent resin grades, MFI values, certificate numbers or customer specs.
3. Apply the group approval matrix before any commitment of cost or delivery.
4. Flag regulatory scope (EU 10/2011, REACH, RoHS, IMDS, FDA 21 CFR) where relevant.
5. If confidence < 0.82, escalate to the human owner (${agent.owner}) with a summary.`}
            </pre>
          </Panel>

          <Panel title="Connected Systems" subtitle="Read/write scopes granted to this agent">
            <div className="space-y-2">
              {agent.systems.map((s: string) => (
                <div key={s} className="flex items-center justify-between rounded-lg border border-[#E5E7EB] bg-[#F6F8FB] p-2.5 text-xs font-bold text-[#1F2937]">
                  <span className="inline-flex items-center gap-2">
                    <Database className="h-3.5 w-3.5 text-[#163B65]" /> {s}
                  </span>
                  <StatusPill status="Connected" />
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-1 text-xs text-[#6B7280] font-medium">
              <p className="inline-flex items-center gap-2 font-bold text-[#163B65]">
                <KeyRound className="h-3.5 w-3.5 text-[#00A99D]" /> Permissions Scope
              </p>
              <p>Role-scoped via RBAC · Reads department knowledge partition only · Writes require human approval &gt; ₹5 L.</p>
            </div>
          </Panel>
        </div>

        <Panel title="Recent Audit Logs" subtitle="Immutable execution trace for ISO & SOC2 compliance">
          <div className="space-y-2">
            {[
              ["10:42:07", "Retrieved 8 chunks from Company Brain partition `commercial`"],
              ["10:42:09", "Tool call: erp.sap.read_material_master(grade=PP-H110MA)"],
              ["10:42:11", "Guardrail passed: no PII, no unsupported claim"],
              ["10:42:12", "Draft generated (1,284 tokens) · confidence 0.94"],
              ["10:42:13", "Routed to approver " + agent.owner],
            ].map(([t, msg]) => (
              <div key={t} className="flex gap-3 rounded-lg border border-[#E5E7EB] bg-[#F6F8FB] p-2.5 font-mono text-[11px]">
                <span className="text-[#163B65] font-bold">{t}</span>
                <span className="text-[#1F2937]">{msg}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#6B7280] font-medium">
            <span className="inline-flex items-center gap-1.5"><History className="h-3.5 w-3.5 text-[#00A99D]" /> Audit Retention: 7 years</span>
            <span className="inline-flex items-center gap-1.5"><Cpu className="h-3.5 w-3.5 text-[#00A99D]" /> Model: {agent.model}</span>
            <span className="inline-flex items-center gap-1.5"><Bot className="h-3.5 w-3.5 text-[#00A99D]" /> Memory: 90-day rolling</span>
          </div>
        </Panel>
      </div>

      <PageFooter />
    </div>
  );
}

