import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import {
  Bot,
  Sparkles,
  Zap,
  Building2,
  Clock,
  Users2,
  TrendingUp,
  FileCheck2,
  ShieldCheck,
  Gauge,
  Leaf,
  Search,
  Plus,
  AlertTriangle,
  CheckSquare,
  FileText,
  Upload,
  Workflow,
  ChevronRight,
  X,
  Activity,
} from "lucide-react";
import { KpiCard, Panel, StatusPill, PageFooter } from "@/components/ui-kit";
import {
  activityFeed,
  automationTrend,
  approvals,
  inr,
} from "@/data/platform";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Command Center — Polymer Manufacturing Operating System" },
      {
        name: "description",
        content:
          "Enterprise AI operating system for plastic & polymer manufacturers: 63 AI agents, 306 automations, Company Brain and document intelligence in one command center.",
      },
      { property: "og:title", content: "AI Command Center for Polymer Manufacturing" },
      {
        property: "og:description",
        content:
          "Executive cockpit, AI agents, automation catalogue and document intelligence for plastics manufacturing enterprises.",
      },
    ],
  }),
  component: Dashboard,
});

const RECENT_QUERIES = [
  "Delayed Orders",
  "Production Report",
  "Resin Pricing",
  "Generate Monthly Report",
];

const CRITICAL_ACTIONS = [
  {
    title: "Pending Purchase Approval: HDPE Resin Q4 Contract",
    category: "Approvals",
    urgency: "High",
    dept: "Procurement",
    time: "12m ago",
    impact: "₹1.4 Cr contract lock",
    to: "/approvals",
  },
  {
    title: "Cavity 3 Short-Shot Incident — Mould M-318",
    category: "Critical Incidents",
    urgency: "Critical",
    dept: "Quality Assurance",
    time: "24m ago",
    impact: "Plant 3 line 4 paused",
    to: "/departments/quality-assurance",
  },
  {
    title: "Workflow Blocked: Export Document Pack Generation",
    category: "Blocked Workflows",
    urgency: "Medium",
    dept: "Logistics & Customs",
    time: "45m ago",
    impact: "Customs clearance pending",
    to: "/workflow-studio",
  },
  {
    title: "BRCGS Food-Contact Audit Action Overdue (6 Days)",
    category: "Compliance Issues",
    urgency: "Critical",
    dept: "Regulatory Compliance",
    time: "1h ago",
    impact: "Audit rating risk",
    to: "/m/compliance",
  },
  {
    title: "Chiller Temperature Anomaly in Plant 2 Extrusion Line",
    category: "Production Alerts",
    urgency: "High",
    dept: "Plant Maintenance",
    time: "1h 15m ago",
    impact: "Melt temp variation",
    to: "/departments/plant-maintenance",
  },
];

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllKpis, setShowAllKpis] = useState(false);
  const [showFabMenu, setShowFabMenu] = useState(false);
  const [decidedApprovals, setDecidedApprovals] = useState<Record<string, string>>({});

  return (
    <div className="space-y-6">
      {/* Primary Large AI Search Header */}
      <div className="enterprise-card p-4 md:p-6 bg-white border border-[#E5E7EB]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-[#6B7280]" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ask Company AI... Search documents, plants, products, workflows, approvals..."
            className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-[#F6F8FB] pl-12 pr-4 text-sm text-[#1F2937] outline-none transition placeholder:text-[#6B7280] focus:border-[#00A99D] focus:bg-white focus:ring-2 focus:ring-[#00A99D]/20 font-medium"
          />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[#6B7280]">Recent Queries:</span>
          {RECENT_QUERIES.map((q) => (
            <button
              key={q}
              onClick={() => setSearchQuery(q)}
              className="rounded-full border border-[#E5E7EB] bg-[#F6F8FB] px-3 py-1 text-xs font-semibold text-[#4B7EA8] hover:border-[#00A99D] hover:text-[#00A99D] transition"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Section 1: Executive Summary Hero */}
      <div className="enterprise-card p-6 bg-white border border-[#E5E7EB] relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#163B65]/10 px-3 py-0.5 text-xs font-bold text-[#163B65] uppercase tracking-wider mb-2">
              <Sparkles className="h-3.5 w-3.5 text-[#00A99D]" /> Enterprise AI Operating System
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#163B65]">Good Morning Raj</h1>
            <p className="text-sm text-[#6B7280] mt-1 font-medium">
              Group Command Center · Real-time executive status across 8 plants and 44 business functions
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <HeroIndicator label="Operating Plants" value="8 Plants" tone="neutral" />
            <HeroIndicator label="AI Fleet Health" value="96%" tone="success" />
            <HeroIndicator label="Critical Issues" value="3 Open" tone="critical" />
            <HeroIndicator label="YTD Value Saved" value="₹4.2 Cr" tone="success" />
            <HeroIndicator label="Awaiting Review" value="2 Approvals" tone="warning" />
          </div>
        </div>
      </div>

      {/* Section 2: Primary KPI Cards (6 Cards Only) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[#163B65]">Primary Key Performance Indicators</h2>
          <button
            onClick={() => setShowAllKpis(!showAllKpis)}
            className="text-xs font-bold text-[#00A99D] hover:underline inline-flex items-center gap-1"
          >
            {showAllKpis ? "Show Less KPIs" : "View All 14 KPIs"} <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          <KpiCard label="Production Health" value="98.2%" delta="8 Plants Active" icon={Building2} tone="success" />
          <KpiCard label="AI Adoption Rate" value="78.4%" delta="+11.2 pts QoQ" icon={Users2} tone="success" />
          <KpiCard label="Automation Health" value="96.8%" delta="190 Live / 306 Total" icon={Zap} tone="accent" />
          <KpiCard label="Critical Alerts" value="3 Open" delta="2 Quality · 1 Maintenance" icon={AlertTriangle} tone="warning" />
          <KpiCard label="Monthly Savings" value="₹3.4 Cr" delta="+18% vs target" icon={TrendingUp} tone="success" />
          <KpiCard label="Pending Approvals" value="2 Items" delta="Avg cycle: 4.2 hrs" icon={CheckSquare} tone="primary" />
        </div>

        {/* Extended KPIs Drawer / Expanded Section */}
        {showAllKpis && (
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8 animate-rise">
            <KpiCard label="AI Agents" value="63" delta="+7 this quarter" icon={Bot} />
            <KpiCard label="Active Copilots" value="44" delta="1 per function" icon={Sparkles} tone="accent" />
            <KpiCard label="Hours Saved / mo" value="18,420" delta="Effort released" icon={Clock} tone="success" />
            <KpiCard label="FTE Equivalent" value="112" delta="Redeployed" icon={Users2} />
            <KpiCard label="Documents / mo" value="1.24 M" delta="98.7% STP" icon={FileText} />
            <KpiCard label="Compliance Score" value="94 / 100" delta="IATF & BRCGS" icon={ShieldCheck} tone="success" />
            <KpiCard label="Sustainability" value="81 / 100" delta="Recyclate 32%" icon={Leaf} tone="success" />
            <KpiCard label="Risk Exposure" value="₹6.4 Cr" delta="Modelled 90d" icon={ShieldCheck} tone="warning" />
          </div>
        )}
      </div>

      {/* Grid: Critical Actions (Section 3) & AI Activity Feed (Section 4) */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Section 3: Critical Actions Panel */}
        <Panel title="Critical Action Center" subtitle="Items requiring immediate executive attention or approval">
          <div className="space-y-2.5">
            {CRITICAL_ACTIONS.map((item) => (
              <Link
                key={item.title}
                to={item.to}
                className="block rounded-lg border border-[#E5E7EB] bg-[#F6F8FB] p-3 hover:border-[#00A99D] hover:bg-white transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        item.urgency === "Critical"
                          ? "bg-[#E74C3C]"
                          : item.urgency === "High"
                          ? "bg-[#F5A623]"
                          : "bg-[#4B7EA8]"
                      }`}
                    />
                    <p className="text-xs font-bold text-[#1F2937]">{item.title}</p>
                  </div>
                  <span className="text-[10px] font-bold text-[#6B7280]">{item.time}</span>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#6B7280] font-medium">
                  <span>{item.dept} · {item.category}</span>
                  <span className="font-semibold text-[#163B65]">{item.impact}</span>
                </div>
              </Link>
            ))}
          </div>
        </Panel>

        {/* Section 4: AI Activity Feed */}
        <Panel title="AI Agent Activity Feed" subtitle="Real-time execution timeline across all 63 agents">
          <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
            {activityFeed.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-lg border border-[#E5E7EB] bg-white p-3 shadow-2xs">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#163B65]/10 text-[#163B65]">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-[#1F2937] truncate">{item.agent}</p>
                    <span className="text-[10px] text-[#6B7280] font-medium">{item.time}</span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-0.5 font-medium">{item.action}</p>
                  <div className="mt-1.5 flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-[#4B7EA8]">{item.dept}</span>
                    <StatusPill status={item.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Section 5: Single Primary Business Overview Visualization */}
      <Panel title="Automation Growth & Annualized Savings Trajectory" subtitle="Single core group metric: Monthly hours automated vs annual value realized">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={automationTrend}>
            <defs>
              <linearGradient id="primaryArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#163B65" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#163B65" stopOpacity={0.01} />
              </linearGradient>
              <linearGradient id="tealArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00A99D" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#00A99D" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis dataKey="month" stroke="#6B7280" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#6B7280" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Area type="monotone" dataKey="live" name="Live Automations" stroke="#163B65" fill="url(#primaryArea)" strokeWidth={2.5} />
            <Area type="monotone" dataKey="hoursSaved" name="Monthly Hours Saved" stroke="#00A99D" fill="url(#tealArea)" strokeWidth={2.5} />
          </AreaChart>
        </ResponsiveContainer>
      </Panel>

      {/* Section 6: Pending Approvals Table */}
      <Panel
        title="Pending Executive Approvals"
        subtitle="Pre-analysed requests awaiting sign-off"
        actions={
          <Link to="/approvals" className="text-xs font-bold text-[#00A99D] hover:underline">
            View All Approvals →
          </Link>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase font-bold text-[#6B7280] bg-[#F6F8FB]">
              <tr>
                <th className="p-3">Request Title</th>
                <th className="p-3">Department</th>
                <th className="p-3">Financial Value</th>
                <th className="p-3">Risk Assessment</th>
                <th className="p-3">SLA Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {approvals.slice(0, 4).map((a) => {
                const isDecided = decidedApprovals[a.id];
                return (
                  <tr key={a.id} className="hover:bg-[#F6F8FB] transition-colors">
                    <td className="p-3 font-semibold text-[#1F2937]">
                      <p>{a.title}</p>
                      <p className="font-mono text-[10px] text-[#6B7280] font-normal">{a.id}</p>
                    </td>
                    <td className="p-3 text-[#6B7280] font-medium">{a.dept}</td>
                    <td className="p-3 font-bold text-[#163B65]">{a.amount ? inr(a.amount) : "—"}</td>
                    <td className="p-3">
                      <StatusPill status={a.risk} />
                    </td>
                    <td className="p-3 text-[#6B7280] font-medium">{a.sla}</td>
                    <td className="p-3 text-right">
                      {isDecided ? (
                        <StatusPill status={isDecided === "approved" ? "Live" : "Critical"} />
                      ) : (
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => setDecidedApprovals((d) => ({ ...d, [a.id]: "rejected" }))}
                            className="btn-secondary-outline text-xs px-2.5 py-1"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => setDecidedApprovals((d) => ({ ...d, [a.id]: "approved" }))}
                            className="btn-primary-teal text-xs px-2.5 py-1"
                          >
                            Approve
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* Section 7: Floating Action Button & Hub */}
      <div className="fixed bottom-6 right-6 z-40">
        {showFabMenu && (
          <div className="mb-3 space-y-2 rounded-xl border border-[#E5E7EB] bg-white p-3 shadow-xl animate-rise min-w-[200px]">
            <Link
              to="/copilots"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#1F2937] hover:bg-[#F6F8FB] hover:text-[#00A99D]"
            >
              <Sparkles className="h-4 w-4 text-[#00A99D]" /> Ask Company AI
            </Link>
            <Link
              to="/workflow-studio"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#1F2937] hover:bg-[#F6F8FB] hover:text-[#00A99D]"
            >
              <Workflow className="h-4 w-4 text-[#163B65]" /> Create Workflow
            </Link>
            <Link
              to="/m/reports"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#1F2937] hover:bg-[#F6F8FB] hover:text-[#00A99D]"
            >
              <FileText className="h-4 w-4 text-[#4B7EA8]" /> Generate Report
            </Link>
            <Link
              to="/documents"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#1F2937] hover:bg-[#F6F8FB] hover:text-[#00A99D]"
            >
              <Upload className="h-4 w-4 text-[#34C759]" /> Upload Document
            </Link>
            <Link
              to="/approvals"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#1F2937] hover:bg-[#F6F8FB] hover:text-[#00A99D]"
            >
              <CheckSquare className="h-4 w-4 text-[#F5A623]" /> New Approval
            </Link>
          </div>
        )}

        <button
          onClick={() => setShowFabMenu(!showFabMenu)}
          className="grid h-14 w-14 place-items-center rounded-full bg-[#00A99D] text-white shadow-lg transition hover:scale-105"
          aria-label="Quick Action Hub"
        >
          {showFabMenu ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </button>
      </div>

      <PageFooter />
    </div>
  );
}

function HeroIndicator({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "success" | "critical" | "warning";
}) {
  const toneClasses = {
    neutral: "bg-[#163B65]/5 border-[#163B65]/20 text-[#163B65]",
    success: "bg-[#34C759]/10 border-[#34C759]/30 text-[#34C759]",
    critical: "bg-[#E74C3C]/10 border-[#E74C3C]/30 text-[#E74C3C]",
    warning: "bg-[#F5A623]/10 border-[#F5A623]/30 text-[#F5A623]",
  };

  return (
    <div className={`rounded-xl border px-3.5 py-2 text-left ${toneClasses[tone]}`}>
      <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">{label}</p>
      <p className="text-sm font-bold mt-0.5">{value}</p>
    </div>
  );
}


