import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Sparkles, Target, AlertTriangle, FileText, CalendarCheck } from "lucide-react";
import { KpiCard, PageHeader, Panel, StatusPill, RightPanel, PageFooter } from "@/components/ui-kit";
import { Line, LineChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { MONTHS } from "@/data/platform";

export const Route = createFileRoute("/cockpit")({
  head: () => ({
    meta: [
      { title: "Executive Cockpit — Board & C-Suite Intelligence" },
      {
        name: "description",
        content: "Board, MD, CEO, CFO and COO dashboards with AI recommendations, decision intelligence and action tracking.",
      },
      { property: "og:title", content: "Executive Cockpit" },
      { property: "og:description", content: "Decision intelligence for the board and C-suite of a polymer manufacturing group." },
    ],
  }),
  component: Cockpit,
});

const BOARDS = ["Board", "MD", "CEO", "CFO", "COO", "Commercial", "Factory", "Corporate"];

const revenue = MONTHS.map((m, i) => ({
  month: m,
  revenue: 78 + i * 3.4 + (i % 3) * 2,
  ebitda: 11 + i * 0.6 + (i % 4) * 0.4,
}));

const chartTheme = {
  grid: "#E2E8F0",
  text: "#64748B",
};

function Cockpit() {
  const [board, setBoard] = useState("Board");
  const [q, setQ] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Executive Command Center"
        title={`${board} Cockpit`}
        description="One unified decision surface for the leadership team — grounded answers, AI recommendations, board packs, action tracking, and meeting intelligence."
        breadcrumbs={[{ label: "Executive Command Center", to: "/" }, { label: "Executive Cockpit" }]}
        filters={
          <div className="flex flex-wrap gap-1.5">
            {BOARDS.map((b) => (
              <button
                key={b}
                onClick={() => setBoard(b)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  board === b
                    ? "bg-[#163B65] text-white shadow-xs"
                    : "bg-[#F6F8FB] text-[#6B7280] hover:bg-slate-200 border border-[#E5E7EB]"
                }`}
              >
                {b} Dashboard
              </button>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <KpiCard label="Revenue (YTD)" value="₹1,284 Cr" delta="+14.2% YoY" tone="success" />
        <KpiCard label="EBITDA Margin" value="16.4%" delta="+120 bps" tone="success" />
        <KpiCard label="Working Capital Days" value="68" delta="-9 days" tone="success" />
        <KpiCard label="Order Book" value="₹412 Cr" delta="4.1 months cover" />
        <KpiCard label="Open Risk Alerts" value="14" delta="3 critical" tone="warning" icon={AlertTriangle} />
      </div>

      <div className="space-y-6">
        <Panel title="Executive Q&A" subtitle="Ask across ERP, finance, quality, commercial and compliance data">
          <div className="flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                setAnswer(
                  `Across 8 plants, ${q || "that metric"} is trending favourably. Gross margin improved 140 bps QoQ, driven by a 3.1% fall in HDPE landed cost and 22% faster quotation turnaround. Two risks: PET preform capacity is at 94% in Plant 3, and one BRCGS corrective action is 6 days overdue. Sources: SAP CO-PA, Resin Intelligence, Quality Center (14 documents cited).`,
                )
              }
              placeholder="e.g. Why did contribution margin fall in the packaging vertical last month?"
              className="h-10 flex-1 rounded-lg border border-[#E5E7EB] bg-white px-3 text-xs outline-none focus:border-[#00A99D] focus:ring-2 focus:ring-[#00A99D]/20 font-medium"
            />
            <button
              onClick={() => setAnswer("Compiling a grounded executive answer with citations…")}
              className="btn-primary-teal inline-flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" /> Ask
            </button>
          </div>
          {answer && (
            <div className="mt-3 rounded-xl border border-[#00A99D]/30 bg-[#00A99D]/5 p-3.5 text-xs font-medium leading-relaxed text-[#1F2937] animate-rise">
              {answer}
            </div>
          )}
        </Panel>

        <Panel title="Revenue & EBITDA Trajectory" subtitle="₹ Cr, consolidated group">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={revenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#6B7280" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#163B65" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="ebitda" name="EBITDA" stroke="#00A99D" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        <div className="grid gap-6 md:grid-cols-3">
          <Panel title="Board Reports" subtitle="Auto-assembled by Board Report Generator">
            {["Q3 FY26 Board Pack", "Monthly MIS — August", "Capex Review — Plant 4", "Sustainability & EPR Update"].map((r) => (
              <div key={r} className="mb-2 flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#F6F8FB] p-2.5 text-xs font-semibold text-[#1F2937]">
                <FileText className="h-3.5 w-3.5 text-[#163B65]" /> {r}
              </div>
            ))}
          </Panel>

          <Panel title="Action Tracking" subtitle="Owner-committed decisions">
            {([
              ["Sign HDPE Q4 contract", "H. Joshi", "On track"],
              ["Close CC-1188 CAPA", "R. Jain", "At risk"],
              ["Medical line ISO audit prep", "P. Sinha", "On track"],
              ["Vietnam vendor qualification", "L. Pillai", "Delayed"],
            ] as [string, string, string][]).map(([a, o, s]) => (
              <div key={a} className="mb-2 flex items-center justify-between rounded-lg border border-[#E5E7EB] bg-[#F6F8FB] p-2.5 text-xs">
                <span className="font-semibold text-[#1F2937] truncate">
                  <Target className="mr-1.5 inline h-3.5 w-3.5 text-[#00A99D]" />
                  {a} <span className="text-[#6B7280] font-normal">· {o}</span>
                </span>
                <StatusPill status={s === "On track" ? "Live" : s === "At risk" ? "High" : "Critical"} />
              </div>
            ))}
          </Panel>

          <Panel title="Meeting Intelligence" subtitle="Summarised by Meeting Assistant">
            {["Exec review — 12 decisions, 9 actions", "Customer QBR (Nova Beverages)", "Plant 3 capacity huddle", "Compliance readiness sync"].map((m) => (
              <div key={m} className="mb-2 flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#F6F8FB] p-2.5 text-xs font-semibold text-[#1F2937]">
                <CalendarCheck className="h-3.5 w-3.5 text-[#163B65]" /> {m}
              </div>
            ))}
          </Panel>
        </div>

        <Panel title="Send to Leadership" subtitle="Distribute this cockpit view as a narrated brief">
          <button className="btn-primary-teal inline-flex items-center gap-2">
            <Send className="h-4 w-4" /> Generate & Send Executive Brief
          </button>
        </Panel>
      </div>

      <PageFooter />
    </div>
  );
}

