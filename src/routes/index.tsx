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
  Bar,
  BarChart,
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
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Factory,
  Cpu,
  FileSearch,
  Scale,
  Award,
  Truck,
  Boxes,
  Lock,
} from "lucide-react";
import { KpiCard, Panel, StatusPill, PageFooter, RoadmapSection } from "@/components/ui-kit";
import {
  activityFeed,
  automationTrend,
  approvals,
  inr,
} from "@/data/platform";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Command Center — Plastic Manufacturing AI Operating System" },
      {
        name: "description",
        content:
          "Enterprise AI operating system for plastic & polymer manufacturers: 63 AI agents, 306 automations, Company Brain and document intelligence in one command center.",
      },
      { property: "og:title", content: "AI Command Center for Plastic Manufacturing" },
      {
        property: "og:description",
        content:
          "Executive cockpit, AI agents, automation catalogue and document intelligence for plastics manufacturing enterprises.",
      },
    ],
  }),
  component: Dashboard,
});

const KPI_9_CORE = [
  {
    label: "Order Fulfillment Visibility",
    value: "99.1%",
    delta: "On-Time · +4.2% QoQ",
    icon: Building2,
    tone: "success" as const,
  },
  {
    label: "Procurement Cycle Reduction",
    value: "-58%",
    delta: "Cycle Time · 48h to 20h",
    icon: Clock,
    tone: "success" as const,
  },
  {
    label: "Vendor Compliance Score",
    value: "99.4%",
    delta: "RoHS / REACH Passed",
    icon: ShieldCheck,
    tone: "success" as const,
  },
  {
    label: "Inventory Intelligence",
    value: "₹12.4 Cr",
    delta: "Polymer Stock Optimised",
    icon: Boxes,
    tone: "primary" as const,
  },
  {
    label: "Quality Doc Turnaround",
    value: "1.4 Hrs",
    delta: "vs 48h manual benchmark",
    icon: FileCheck2,
    tone: "success" as const,
  },
  {
    label: "Customer Complaint Time",
    value: "3.2 Hours",
    delta: "-74% turnaround reduction",
    icon: CheckCircle2,
    tone: "success" as const,
  },
  {
    label: "Finance Automation Coverage",
    value: "86.2%",
    delta: "Automated · 14.8k inv/mo",
    icon: Zap,
    tone: "accent" as const,
  },
  {
    label: "Enterprise AI Adoption",
    value: "81.5%",
    delta: "Adoption across 44 depts",
    icon: Users2,
    tone: "accent" as const,
  },
  {
    label: "Estimated Annual Value",
    value: "₹42.8 Cr",
    delta: "yr EBITDA Value Realised",
    icon: TrendingUp,
    tone: "success" as const,
  },
];

const DEPARTMENT_MODULES = [
  {
    title: "Sales & Commercial",
    head: "S. Iyer",
    agents: 8,
    value: "₹6.8 Cr EBITDA",
    desc: "RFQ parsing, resin price-indexed quotations & contract intelligence.",
    to: "/departments/sales-and-commercial",
    maturity: "Optimised",
  },
  {
    title: "Procurement & Sourcing",
    head: "D. Kapoor",
    agents: 12,
    value: "₹8.4 Cr EBITDA",
    desc: "Polymer resin spot buying, PO generation & supplier scorecard.",
    to: "/departments/procurement-and-sourcing",
    maturity: "Optimised",
  },
  {
    title: "Supply Chain & Logistics",
    head: "S. Ahuja",
    agents: 6,
    value: "₹4.2 Cr EBITDA",
    desc: "Container load planning, resin buffer stock & dispatch tracking.",
    to: "/departments/logistics-and-dispatch",
    maturity: "Scaling",
  },
  {
    title: "Production Planning",
    head: "G. Sharma",
    agents: 9,
    value: "₹5.1 Cr EBITDA",
    desc: "Mould availability, cycle time optimization & machine scheduling.",
    to: "/departments/production-planning",
    maturity: "Optimised",
  },
  {
    title: "Quality & Documentation",
    head: "N. Reddy",
    agents: 11,
    value: "₹3.9 Cr EBITDA",
    desc: "COA generation, PPAP Level 3 packs, CAPA & RoHS/REACH compliance.",
    to: "/departments/quality-assurance",
    maturity: "Optimised",
  },
  {
    title: "Customer Service",
    head: "N. Kulkarni",
    agents: 5,
    value: "₹2.1 Cr EBITDA",
    desc: "Order status automated updates & complaint root-cause drafting.",
    to: "/departments/customer-support",
    maturity: "Scaling",
  },
  {
    title: "Finance & Accounts",
    head: "V. Agarwal",
    agents: 10,
    value: "₹4.8 Cr EBITDA",
    desc: "3-way invoice matching, AP approval workflows & credit control.",
    to: "/departments/finance-and-accounts",
    maturity: "Optimised",
  },
  {
    title: "Human Resources",
    head: "R. Chopra",
    agents: 4,
    value: "₹1.2 Cr EBITDA",
    desc: "Plant shift worker onboarding, safety training & payroll queries.",
    to: "/departments/human-resources",
    maturity: "Piloting",
  },
  {
    title: "Maintenance Documentation",
    head: "E. Thomas",
    agents: 5,
    value: "₹2.6 Cr EBITDA",
    desc: "Mould maintenance logbooks, spare parts inventory & PM schedules.",
    to: "/departments/maintenance-documentation",
    maturity: "Scaling",
  },
  {
    title: "Projects & Engineering",
    head: "O. Krishnan",
    agents: 6,
    value: "₹2.4 Cr EBITDA",
    desc: "Tool design history, CAD drawing revisions & mold trial reports.",
    to: "/departments/engineering-documentation",
    maturity: "Scaling",
  },
  {
    title: "Legal & Compliance Desk",
    head: "G. Bhattacharya",
    agents: 3,
    value: "₹1.1 Cr EBITDA",
    desc: "OEM master service agreement reviews & regulatory updates.",
    to: "/departments/legal-and-compliance-desk",
    maturity: "Piloting",
  },
  {
    title: "Executive Office",
    head: "R. Malhotra",
    agents: 4,
    value: "Group Command",
    desc: "Board MIS packs, group EBITDA variance & strategic decision AI.",
    to: "/cockpit",
    maturity: "Optimised",
  },
];

const PLASTIC_AI_AGENTS = [
  {
    name: "AI Sales Copilot",
    dept: "Sales & Commercial",
    model: "Claude Sonnet 4.6",
    accuracy: "98.8%",
    runs: "14.2k",
    desc: "Parses complex RFQs for plastic components and calculates mold cost & resin indexing.",
    to: "/agents/ai-sales-copilot",
    status: "Running",
  },
  {
    name: "AI Lead Response Agent",
    dept: "Commercial",
    model: "GPT-5.5",
    accuracy: "97.5%",
    runs: "9.8k",
    desc: "Instantly responds to global plastic packaging buyer inquiries with technical data sheets.",
    to: "/agents/ai-sales-copilot",
    status: "Running",
  },
  {
    name: "Procurement Copilot",
    dept: "Resin & Polymer Buying",
    model: "Azure OpenAI o5",
    accuracy: "99.2%",
    runs: "18.4k",
    desc: "Monitors PP, HDPE, PET, PVC spot indices and executes automated resin PO locks.",
    to: "/agents/procurement-copilot",
    status: "Running",
  },
  {
    name: "Vendor Intelligence Agent",
    dept: "Supply Chain",
    model: "Claude Sonnet 4.6",
    accuracy: "98.1%",
    runs: "11.1k",
    desc: "Tracks supplier RoHS/REACH compliance certificates and audits masterbatch suppliers.",
    to: "/agents/vendor-intelligence-agent",
    status: "Running",
  },
  {
    name: "Quality Documentation Agent",
    dept: "Quality Assurance",
    model: "Gemini 3.6 Flash",
    accuracy: "99.6%",
    runs: "32.0k",
    desc: "Generates Certificate of Analysis (COA) for every outgoing polymer resin lot automatically.",
    to: "/agents/quality-copilot",
    status: "Running",
  },
  {
    name: "Complaint Analysis Agent",
    dept: "Customer Service",
    model: "GPT-5.5",
    accuracy: "96.9%",
    runs: "6.4k",
    desc: "Categorizes plastic defects (short shot, flash, warpage, sink marks) and drafts 8D CAPAs.",
    to: "/agents/complaint-resolution-agent",
    status: "Running",
  },
  {
    name: "Finance Copilot",
    dept: "Accounts Payable",
    model: "Claude Sonnet 4.6",
    accuracy: "99.4%",
    runs: "24.8k",
    desc: "Performs 3-way matching on resin invoices against SAP POs and gate entry receipts.",
    to: "/agents/finance-assistant",
    status: "Running",
  },
  {
    name: "Contract Intelligence Agent",
    dept: "Legal & Contracts",
    model: "Azure OpenAI o5",
    accuracy: "98.5%",
    runs: "4.9k",
    desc: "Extracts price adjustment clauses based on ICIS/Platts polymer price indices.",
    to: "/agents/contract-review-agent",
    status: "Running",
  },
  {
    name: "Executive Copilot",
    dept: "Executive Office",
    model: "GPT-5.5",
    accuracy: "99.1%",
    runs: "8.7k",
    desc: "Synthesizes multi-plant OEE, EBITDA margins, and resin price variances for MD review.",
    to: "/agents/executive-ai-assistant",
    status: "Running",
  },
  {
    name: "Company Brain Assistant",
    dept: "Knowledge Center",
    model: "Gemini 3.6 Flash",
    accuracy: "99.9%",
    runs: "41.5k",
    desc: "Vectors across 1.24M plastic manufacturing SOPs, tooling drawings, and test standards.",
    to: "/company-brain",
    status: "Running",
  },
];

const DOMAIN_OPPORTUNITIES = [
  {
    title: "Customer Specification Parsing",
    subtitle: "Resin Grade, MFI, Wall Thickness & Tensile Strength",
    desc: "Extracts technical tolerances from customer CAD drawings and technical specifications with 99.2% precision.",
    benefit: "Zero manual data entry in ERP",
    icon: FileSearch,
  },
  {
    title: "Quotation Drafting for Plastic Products",
    subtitle: "Injection Molding, Blow Molding & Extrusion",
    desc: "Auto-calculates shot weight, runner loss, machine tonnage rate, and polymer price indexing in seconds.",
    benefit: "Quotation time: 10 mins vs 48 hrs",
    icon: Zap,
  },
  {
    title: "Vendor Certificate Expiry Monitoring",
    subtitle: "RoHS, REACH & FDA Food Contact Declarations",
    desc: "Autonomous agent tracks vendor compliance certificates and flags non-conformities before resin dispatch.",
    benefit: "100% Audit Compliance",
    icon: ShieldCheck,
  },
  {
    title: "Quality Complaint Trend Analysis",
    subtitle: "Flash, Short Shot, Warpage & Sink Marks",
    desc: "Analyses customer returned samples, classifies defect signatures, and auto-populates 8D CAPA reports.",
    benefit: "74% Faster Resolution",
    icon: AlertTriangle,
  },
  {
    title: "COA / Test Report Generation",
    subtitle: "Automated Lot Inspection Certificate",
    desc: "Reads spectrometer & melt flow indexer lab outputs to assemble signed Certificate of Analysis (COA) packs.",
    benefit: "Instant Dispatch Approval",
    icon: Award,
  },
  {
    title: "Production Planning Correspondence",
    subtitle: "Tooling Availability & Resin Lot Schedules",
    desc: "Coordinates multi-cavity mold changes, color masterbatch purge cycles, and resin silo assignments.",
    benefit: "+14.8% Plant OEE",
    icon: Factory,
  },
  {
    title: "Export Documentation Support",
    subtitle: "Bill of Lading, COO & Customs Pack",
    desc: "Auto-assembles HS code classifications, GSP certificates, and shipping bill declarations for export orders.",
    benefit: "Zero Port Customs Delay",
    icon: Truck,
  },
  {
    title: "Contract Obligation Tracking",
    subtitle: "OEM & Industrial Packaging Contracts",
    desc: "Monitors annual volume commitments, price escalation clauses, and tooling amortization schedules.",
    benefit: "100% Revenue Retention",
    icon: Scale,
  },
];

export function Dashboard() {
  const [showAllKpis, setShowAllKpis] = useState(false);
  const [showAllDepts, setShowAllDepts] = useState(false);
  const [showAllAgents, setShowAllAgents] = useState(false);
  const [showAllOpps, setShowAllOpps] = useState(false);
  const [showFabMenu, setShowFabMenu] = useState(false);
  const [decidedApprovals, setDecidedApprovals] = useState<Record<string, string>>({});

  return (
    <div className="space-y-8">

      {/* ── Section 1: Royal Sapphire & Deep Slate Executive Hero Banner ── */}
      <div className="rounded-[28px] bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#1E40AF] p-8 lg:p-10 text-white relative overflow-hidden shadow-xl border border-white/10">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-3xl">
            {/* Industry Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1 text-xs font-extrabold text-[#60A5FA] uppercase tracking-wider mb-4">
              <Sparkles className="h-3.5 w-3.5 text-[#60A5FA]" /> Fortiv Solutions · Plastic Manufacturing AI Command Center
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Digitally Transform Your Plastic Manufacturing Enterprise with <span className="text-[#60A5FA]">Autonomous AI</span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-4 text-sm lg:text-base text-slate-300 font-medium leading-relaxed">
              Deploy 231 proven AI automation opportunities across 43 plastic manufacturing business functions in 90 days. Software-only intelligence grounded on your plant data with zero hardware.
            </p>

            {/* Zero Hardware Highlight Badge */}
            <div className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-[#059669]/20 border border-[#059669]/40 px-4 py-1.5 text-xs font-bold text-emerald-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Software-Only · Zero Hardware (No IoT, Sensors, Cameras, or PLC/SCADA changes required)</span>
            </div>

            {/* Primary & Secondary Call to Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button className="rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-7 py-3.5 text-xs font-extrabold shadow-lg shadow-[#2563EB]/40 hover:-translate-y-0.5 transition-all inline-flex items-center gap-2">
                <span>Book AI Readiness Assessment</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <Link
                to="/cockpit"
                className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 px-7 py-3.5 text-xs font-extrabold backdrop-blur-md hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
              >
                <span>Schedule Executive Demo</span>
              </Link>
            </div>
          </div>

          {/* Quick Hero Stat Badge Pillar */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 shrink-0">
            <div className="rounded-[20px] bg-white/10 backdrop-blur-md border border-white/15 p-4 text-left">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#60A5FA]">Total EBITDA Savings</p>
              <p className="text-2xl font-extrabold text-white mt-1">₹42.8 Cr / yr</p>
              <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">Verified ROI across 8 plants</p>
            </div>
            <div className="rounded-[20px] bg-white/10 backdrop-blur-md border border-white/15 p-4 text-left">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#60A5FA]">Active Automations</p>
              <p className="text-2xl font-extrabold text-white mt-1">190 / 306 Live</p>
              <p className="text-[11px] text-slate-300 font-semibold mt-0.5">Across 44 Functions</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 2: Executive KPI Dashboard (9 Core Metrics) ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">Executive KPI Dashboard</h2>
            <p className="text-xs text-[#64748B] font-medium mt-0.5">Real-time performance across order fulfillment, resin procurement, compliance & EBITDA value</p>
          </div>
          <button
            onClick={() => setShowAllKpis(!showAllKpis)}
            className="text-xs font-extrabold text-[#2563EB] hover:underline inline-flex items-center gap-1 shrink-0"
          >
            {showAllKpis ? "Collapse Extended View" : "View All 14 KPIs"} <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {KPI_9_CORE.map((kpi, idx) => (
            <KpiCard
              key={idx}
              label={kpi.label}
              value={kpi.value}
              delta={kpi.delta}
              icon={kpi.icon}
              tone={kpi.tone}
            />
          ))}
        </div>

        {/* Extended KPIs Drawer */}
        {showAllKpis && (
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 animate-rise">
            <KpiCard label="AI Agents Active" value="63 Agents" delta="+7 this quarter" icon={Bot} />
            <KpiCard label="Copilot Deployments" value="44 Copilots" delta="1 per department" icon={Sparkles} tone="accent" />
            <KpiCard label="Hours Saved / mo" value="18,420 hrs" delta="Effort released" icon={Clock} tone="success" />
            <KpiCard label="Document Processing" value="1.24 M docs" delta="98.7% STP speed" icon={FileText} />
            <KpiCard label="Compliance Index" value="94 / 100" delta="IATF & BRCGS passed" icon={ShieldCheck} tone="success" />
          </div>
        )}
      </div>

      {/* ── Section 3: 12 Department AI Modules ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">12 Department AI Modules</h2>
            <p className="text-xs text-[#64748B] font-medium mt-0.5">Specialized autonomous intelligence modules deployed across all plastic manufacturing business units</p>
          </div>
          <button
            onClick={() => setShowAllDepts(!showAllDepts)}
            className="text-xs font-extrabold text-[#2563EB] hover:underline inline-flex items-center gap-1 shrink-0"
          >
            {showAllDepts ? "Show Less" : "View All 12 Modules"} <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {(showAllDepts ? DEPARTMENT_MODULES : DEPARTMENT_MODULES.slice(0, 5)).map((m) => (
            <Link
              key={m.title}
              to={m.to}
              className="group rounded-[28px] border border-[#E2E8F0] bg-white p-6 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-extrabold text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE] px-3 py-1 rounded-full">
                    {m.value}
                  </span>
                  <StatusPill status={m.maturity} />
                </div>
                <h3 className="text-base font-extrabold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                  {m.title}
                </h3>
                <p className="mt-1.5 text-xs text-[#64748B] font-medium leading-relaxed line-clamp-2">
                  {m.desc}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-bold text-[#475569]">
                <span>Head: {m.head}</span>
                <span className="text-[#2563EB] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Section 4: 10 Plastic Industry Production AI Agents ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">10 Plastic Industry Production AI Agents</h2>
            <p className="text-xs text-[#64748B] font-medium mt-0.5">Enterprise AI agents trained on polymer science, injection/extrusion molding, and ISO quality standards</p>
          </div>
          <button
            onClick={() => setShowAllAgents(!showAllAgents)}
            className="text-xs font-extrabold text-[#2563EB] hover:underline inline-flex items-center gap-1 shrink-0"
          >
            {showAllAgents ? "Show Less" : "View All 10 Agents"} <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {(showAllAgents ? PLASTIC_AI_AGENTS : PLASTIC_AI_AGENTS.slice(0, 5)).map((agent) => (
            <Link
              key={agent.name}
              to={agent.to}
              className="group rounded-[28px] border border-[#E2E8F0] bg-white p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
                    <Bot className="h-4 w-4" />
                  </div>
                  <StatusPill status={agent.status} />
                </div>
                <h3 className="text-sm font-extrabold text-[#0F172A] group-hover:text-[#2563EB] transition-colors mt-2">
                  {agent.name}
                </h3>
                <p className="text-[11px] font-bold text-[#2563EB] mt-0.5">{agent.dept}</p>
                <p className="mt-2 text-xs text-[#64748B] font-medium leading-snug line-clamp-3">
                  {agent.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E2E8F0] space-y-1.5 text-[11px]">
                <div className="flex justify-between font-semibold text-[#475569]">
                  <span>Model:</span>
                  <span className="font-bold text-[#0F172A]">{agent.model}</span>
                </div>
                <div className="flex justify-between font-semibold text-[#475569]">
                  <span>Accuracy:</span>
                  <span className="font-bold text-[#059669]">{agent.accuracy}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Section 5: Plastic Manufacturing Specific AI Opportunities ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">Plastic Manufacturing Specific AI Opportunities</h2>
            <p className="text-xs text-[#64748B] font-medium mt-0.5">High-impact domain automations designed exclusively for plastic processing and packaging operations</p>
          </div>
          <button
            onClick={() => setShowAllOpps(!showAllOpps)}
            className="text-xs font-extrabold text-[#2563EB] hover:underline inline-flex items-center gap-1 shrink-0"
          >
            {showAllOpps ? "Show Less" : "View All 8 Opportunities"} <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {(showAllOpps ? DOMAIN_OPPORTUNITIES : DOMAIN_OPPORTUNITIES.slice(0, 5)).map((opp) => (
            <div
              key={opp.title}
              className="rounded-[28px] border border-[#E2E8F0] bg-white p-6 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#EFF6FF] text-[#2563EB] mb-4">
                  <opp.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-extrabold text-[#0F172A]">
                  {opp.title}
                </h3>
                <p className="text-xs font-bold text-[#2563EB] mt-0.5">{opp.subtitle}</p>
                <p className="mt-2.5 text-xs text-[#64748B] font-medium leading-relaxed">
                  {opp.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E2E8F0]">
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#059669] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#A7F3D0]">
                  <CheckCircle2 className="h-3.5 w-3.5" /> {opp.benefit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 6: Minimal Executive Charts & Critical Action Center ── */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Automation Growth Chart */}
        <Panel title="Automation Growth & Annualized EBITDA Realization" subtitle="Monthly automated execution hours vs annualized EBITDA value realized">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={automationTrend}>
              <defs>
                <linearGradient id="cobaltArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity={0.01} />
                </linearGradient>
                <linearGradient id="emeraldArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#059669" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 12, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="live" name="Live Automations" stroke="#2563EB" fill="url(#cobaltArea)" strokeWidth={3} />
              <Area type="monotone" dataKey="hoursSaved" name="Monthly Hours Saved" stroke="#059669" fill="url(#emeraldArea)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        {/* AI Execution Activity Feed */}
        <Panel title="AI Agent Execution Stream" subtitle="Live automated actions across 63 active agents">
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {activityFeed.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-[20px] border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 shadow-2xs">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
                  <Bot className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-extrabold text-[#0F172A] truncate">{item.agent}</p>
                    <span className="text-[10px] text-[#64748B] font-semibold">{item.time}</span>
                  </div>
                  <p className="text-xs text-[#475569] mt-0.5 font-medium">{item.text}</p>
                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    <StatusPill status={item.tone === "success" ? "Live" : item.tone === "warning" ? "Critical" : "In Build"} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* ── Section 7: Pending Executive Approvals ── */}
      <Panel
        title="Pending Executive Approvals"
        subtitle="Pre-analysed requests awaiting executive sign-off"
        actions={
          <Link to="/approvals" className="text-xs font-extrabold text-[#2563EB] hover:underline">
            View All Approvals →
          </Link>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase font-extrabold text-[#64748B] bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                <th className="p-3.5">Request Title</th>
                <th className="p-3.5">Department</th>
                <th className="p-3.5">Financial Value</th>
                <th className="p-3.5">Risk Assessment</th>
                <th className="p-3.5">SLA Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {approvals.slice(0, 4).map((a) => {
                const isDecided = decidedApprovals[a.id];
                return (
                  <tr key={a.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="p-3.5 font-bold text-[#0F172A]">
                      <p>{a.title}</p>
                      <p className="font-mono text-[10px] text-[#64748B] font-normal">{a.id}</p>
                    </td>
                    <td className="p-3.5 text-[#64748B] font-medium">{a.dept}</td>
                    <td className="p-3.5 font-extrabold text-[#2563EB]">{a.amount ? inr(a.amount) : "—"}</td>
                    <td className="p-3.5">
                      <StatusPill status={a.risk} />
                    </td>
                    <td className="p-3.5 text-[#64748B] font-medium">{a.sla}</td>
                    <td className="p-3.5 text-right">
                      {isDecided ? (
                        <StatusPill status={isDecided === "approved" ? "Live" : "Critical"} />
                      ) : (
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => setDecidedApprovals((d) => ({ ...d, [a.id]: "rejected" }))}
                            className="btn-secondary-outline text-xs px-3 py-1"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => setDecidedApprovals((d) => ({ ...d, [a.id]: "approved" }))}
                            className="btn-primary-cobalt text-xs px-3 py-1"
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

      {/* ── Section 8: 5-Phase Implementation Roadmap & Security Assurance ── */}
      <RoadmapSection />

      {/* ── Section 9: Floating Action Button & Hub ── */}
      <div className="fixed bottom-6 right-6 z-40">
        {showFabMenu && (
          <div className="mb-3 space-y-2 rounded-[24px] border border-[#E2E8F0] bg-white p-3 shadow-2xl animate-rise min-w-[220px]">
            <Link
              to="/copilots"
              className="flex items-center gap-2.5 rounded-full px-4 py-2.5 text-xs font-bold text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB]"
            >
              <Sparkles className="h-4 w-4 text-[#2563EB]" /> Ask Company AI
            </Link>
            <Link
              to="/workflow-studio"
              className="flex items-center gap-2.5 rounded-full px-4 py-2.5 text-xs font-bold text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB]"
            >
              <Workflow className="h-4 w-4 text-[#2563EB]" /> Create Workflow
            </Link>
            <Link
              to="/m/reports"
              className="flex items-center gap-2.5 rounded-full px-4 py-2.5 text-xs font-bold text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB]"
            >
              <FileText className="h-4 w-4 text-[#2563EB]" /> Generate Report
            </Link>
            <Link
              to="/documents"
              className="flex items-center gap-2.5 rounded-full px-4 py-2.5 text-xs font-bold text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB]"
            >
              <Upload className="h-4 w-4 text-[#059669]" /> Upload Document
            </Link>
            <Link
              to="/approvals"
              className="flex items-center gap-2.5 rounded-full px-4 py-2.5 text-xs font-bold text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB]"
            >
              <CheckSquare className="h-4 w-4 text-[#D97706]" /> New Approval
            </Link>
          </div>
        )}

        <button
          onClick={() => setShowFabMenu(!showFabMenu)}
          className="grid h-14 w-14 place-items-center rounded-full bg-[#2563EB] text-white shadow-xl shadow-[#2563EB]/40 transition hover:scale-105"
          aria-label="Quick Action Hub"
        >
          {showFabMenu ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </button>
      </div>

      <PageFooter />
    </div>
  );
}
