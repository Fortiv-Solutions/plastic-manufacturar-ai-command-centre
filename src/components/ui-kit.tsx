import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  ChevronRight,
  Filter,
  Bot,
  AlertTriangle,
  CheckSquare,
  Clock,
  ExternalLink,
  Search,
  Zap,
  ShieldCheck,
  Lock,
  Database,
  CheckCircle2,
  ScrollText,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { activityFeed, approvals } from "@/data/platform";

export function Breadcrumbs({ items }: { items?: { label: string; to?: string }[] }) {
  if (!items || items.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-1.5 text-xs text-[#64748B]">
      <Link to="/" className="hover:text-[#2563EB] transition-colors font-medium">
        Command Center
      </Link>
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-1.5">
          <ChevronRight className="h-3 w-3 text-[#94A3B8]" />
          {item.to ? (
            <Link to={item.to} className="hover:text-[#2563EB] transition-colors font-medium">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-[#0F172A]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  breadcrumbs,
  filters,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  breadcrumbs?: { label: string; to?: string }[];
  filters?: ReactNode;
}) {
  return (
    <div className="animate-rise mb-6 rounded-[28px] border border-[#E2E8F0] bg-white p-6 shadow-xs">
      <Breadcrumbs items={breadcrumbs ?? (eyebrow ? [{ label: eyebrow }] : undefined)} />
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 max-w-3xl">
          <div className="flex items-center gap-2">
            {eyebrow && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2563EB]/20 bg-[#EFF6FF] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#2563EB]">
                <Sparkles className="h-3.5 w-3.5 text-[#2563EB]" /> {eyebrow}
              </span>
            )}
          </div>
          <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-[#0F172A] md:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-xs md:text-sm leading-relaxed text-[#64748B] font-medium">
              {description}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button className="btn-primary-cobalt inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4" /> AI Assistant
          </button>
          {actions}
        </div>
      </div>
      {filters && (
        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[#E2E8F0] pt-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#64748B]">
            <Filter className="h-3.5 w-3.5" /> Filters:
          </div>
          {filters}
        </div>
      )}
    </div>
  );
}

export function Panel({
  title,
  subtitle,
  actions,
  children,
  className,
}: {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("panel animate-rise rounded-[28px] border border-[#E2E8F0] bg-white p-6 shadow-xs", className)}>
      {(title || actions) && (
        <div className="mb-5 flex items-start justify-between gap-3 border-b border-[#E2E8F0] pb-4">
          <div>
            {title && <h3 className="font-display text-base font-extrabold text-[#0F172A]">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-xs font-medium text-[#64748B]">{subtitle}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function KpiCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "primary",
}: {
  label: string;
  value: string;
  delta?: string;
  icon?: LucideIcon;
  tone?: "primary" | "success" | "warning" | "accent";
}) {
  const toneMap = {
    primary: "text-[#2563EB] bg-[#EFF6FF] border-[#DBEAFE]",
    success: "text-[#059669] bg-[#ECFDF5] border-[#A7F3D0]",
    warning: "text-[#D97706] bg-[#FEF3C7] border-[#FDE68A]",
    accent: "text-[#2563EB] bg-[#EFF6FF] border-[#DBEAFE]",
  } as const;
  
  const textToneMap = {
    primary: "text-[#2563EB]",
    success: "text-[#059669]",
    warning: "text-[#D97706]",
    accent: "text-[#2563EB]",
  } as const;

  return (
    <div className="animate-rise group relative overflow-hidden rounded-[28px] border border-[#E2E8F0] bg-white p-6 shadow-xs transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#64748B]">{label}</p>
        {Icon && (
          <div className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-2xl border p-2 transition-transform group-hover:scale-105", toneMap[tone])}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <p className="mt-3 font-display text-2xl lg:text-3xl font-extrabold tracking-tight text-[#0F172A]">{value}</p>
      {delta && <p className={cn("mt-1.5 text-xs font-bold", textToneMap[tone])}>{delta}</p>}
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Running: "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]",
    Live: "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]",
    Complete: "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]",
    Connected: "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]",
    Validated: "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]",
    Optimised: "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]",
    "In Build": "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]",
    "In Progress": "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]",
    Scaling: "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]",
    Approved: "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]",
    Idle: "bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]",
    Backlog: "bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]",
    Planned: "bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]",
    Available: "bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]",
    Draft: "bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]",
    Paused: "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]",
    Piloting: "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]",
    Assessment: "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]",
    Critical: "bg-[#FEF2F2] text-[#DC2626] border-[#FCA5A5]",
    High: "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]",
    Medium: "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]",
    Low: "bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-0.5 text-[11px] font-extrabold tracking-wide",
        map[status] ?? "bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]",
      )}
    >
      {status}
    </span>
  );
}

export function Meter({ value, tone = "primary" }: { value: number; tone?: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
      <div
        className={cn(
          "h-full rounded-full transition-all duration-500",
          tone === "primary" ? "bg-[#2563EB]" : "bg-[#059669]",
        )}
        style={{ width: `${Math.min(100, value)}%` }}
      />
    </div>
  );
}

export function RightPanel({ className }: { className?: string }) {
  return (
    <aside className={cn("space-y-6", className)}>
      <Panel title="AI Context Recommendations" subtitle="Contextual insights for active workflow">
        <div className="space-y-3">
          <div className="rounded-[20px] border border-[#2563EB]/20 bg-[#EFF6FF] p-4 text-xs">
            <div className="flex items-center gap-1.5 font-extrabold text-[#2563EB]">
              <Sparkles className="h-4 w-4" /> High priority recommendation
            </div>
            <p className="mt-1.5 text-[#334155] font-medium leading-relaxed">
              Auto-approve 14 low-risk RFQs for PET preforms to reduce backlog by 35%.
            </p>
            <button className="mt-2.5 text-[11px] font-extrabold text-[#2563EB] hover:underline">
              Apply automation →
            </button>
          </div>

          <div className="rounded-[20px] border border-[#2563EB]/20 bg-[#EFF6FF] p-4 text-xs">
            <div className="flex items-center gap-1.5 font-extrabold text-[#2563EB]">
              <Zap className="h-4 w-4" /> Resin Cost Optimization
            </div>
            <p className="mt-1.5 text-[#334155] font-medium leading-relaxed">
              HDPE spot pricing is down 3.1%. Recommend advancing Sep contract lock.
            </p>
          </div>
        </div>
      </Panel>

      <Panel title="Live Activity Feed" subtitle="Real-time agent execution stream">
        <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
          {activityFeed.slice(0, 5).map((a, i) => (
            <div key={i} className="flex items-start gap-3 rounded-[20px] border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-xs">
              <span
                className={cn(
                  "mt-1 h-2 w-2 shrink-0 rounded-full",
                  a.tone === "success" ? "bg-[#059669]" : a.tone === "warning" ? "bg-[#D97706]" : "bg-[#2563EB]",
                )}
              />
              <div className="min-w-0 flex-1">
                <p className="font-extrabold text-[#0F172A]">{a.agent}</p>
                <p className="text-[#475569] font-medium leading-snug mt-0.5">{a.text}</p>
                <span className="mt-1 block font-mono text-[10px] text-[#94A3B8] font-semibold">{a.time}</span>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Pending Approvals" subtitle="Routed by Approval Agent">
        <div className="space-y-2.5">
          {approvals.slice(0, 3).map((ap) => (
            <div key={ap.id} className="flex items-center justify-between rounded-[20px] border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-xs">
              <div className="min-w-0 pr-2">
                <p className="font-bold text-[#0F172A] truncate">{ap.title}</p>
                <p className="text-[10px] font-medium text-[#64748B] mt-0.5">{ap.dept} · {ap.sla}</p>
              </div>
              <StatusPill status={ap.risk} />
            </div>
          ))}
          <Link to="/approvals" className="mt-3 block text-center text-xs font-extrabold text-[#2563EB] hover:underline">
            View all approvals →
          </Link>
        </div>
      </Panel>
    </aside>
  );
}

const ROADMAP_PHASES = [
  {
    phase: "PHASE 1",
    timeline: "30-DAY DISCOVERY",
    title: "Data & Systems Audit",
    desc: "Connect ERP, LIMS, SDS repositories, and SAP tables. Zero hardware requirements.",
    status: "Complete",
    step: "01",
  },
  {
    phase: "PHASE 2",
    timeline: "90-DAY PILOT",
    title: "Priority Department Rollout",
    desc: "Deploy AI Procurement Copilot & Quality Documentation Agents at pilot plastic plant.",
    status: "In Progress",
    step: "02",
  },
  {
    phase: "PHASE 3",
    timeline: "MONTH 4–8",
    title: "Multi-Plant Expansion",
    desc: "Scale Company Brain vector search & SDS retrieval across all 43 manufacturing functions.",
    status: "Planned",
    step: "03",
  },
  {
    phase: "PHASE 4",
    timeline: "MONTH 7–12",
    title: "Enterprise AI Adoption",
    desc: "Full automated order fulfillment, automated COA extraction, and executive MIS packs.",
    status: "Planned",
    step: "04",
  },
  {
    phase: "PHASE 5",
    timeline: "CONTINUOUS",
    title: "Continuous Value Optimization",
    desc: "Self-learning prompt tuning, autonomous compliance auditing, and supplier risk alerts.",
    status: "Planned",
    step: "05",
  },
];

export function RoadmapSection() {
  return (
    <div className="space-y-8 my-8 animate-rise">
      {/* ── 5-Phase Implementation Roadmap Cards ── */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">Enterprise Implementation Roadmap</h2>
            <p className="text-xs text-[#64748B] font-medium mt-0.5">5-phase deployment roadmap from 30-day discovery to multi-plant value optimization</p>
          </div>
          <span className="text-xs font-extrabold text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE] px-3.5 py-1 rounded-full">
            12-Month Plan
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {ROADMAP_PHASES.map((p) => (
            <div
              key={p.phase}
              className="rounded-[24px] border border-[#E2E8F0] bg-white p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-extrabold mb-3">
                  <span className="text-[#2563EB]">{p.phase}</span>
                  <span className="text-[#64748B] uppercase text-[10px] tracking-wider">{p.timeline}</span>
                </div>
                <h3 className="text-sm font-extrabold text-[#0F172A]">{p.title}</h3>
                <p className="mt-1.5 text-xs text-[#64748B] font-medium leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                <StatusPill status={p.status} />
                <span className="font-mono text-xs font-bold text-[#94A3B8]">{p.step}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Enterprise Security & Zero Hardware Assurance Banner ── */}
      <div className="rounded-[28px] bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#1E40AF] p-8 lg:p-10 text-white shadow-xl border border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1 text-[11px] font-extrabold text-[#60A5FA] uppercase tracking-wider mb-4">
              <ShieldCheck className="h-3.5 w-3.5 text-[#60A5FA]" /> Enterprise Security & Zero Hardware Assurance
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3 leading-tight">
              Software-Only AI. Built for Plastic Enterprise Compliance.
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
              Fortiv Plastic AI operates purely in the enterprise software layer. No physical sensors, PLCs, SCADA modifications, cameras, or hardware upgrades required. 100% human-in-the-loop governance for all critical operational approvals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            <div className="rounded-[20px] bg-white/10 backdrop-blur-md border border-white/15 p-4">
              <div className="flex items-center gap-2 font-extrabold text-white text-xs mb-1">
                <Lock className="h-4 w-4 text-[#60A5FA]" /> Role-Based Access (RBAC)
              </div>
              <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                Granular document & API permissions mapped to SAP/Active Directory.
              </p>
            </div>

            <div className="rounded-[20px] bg-white/10 backdrop-blur-md border border-white/15 p-4">
              <div className="flex items-center gap-2 font-extrabold text-white text-xs mb-1">
                <Database className="h-4 w-4 text-[#60A5FA]" /> ERP / CRM Integration
              </div>
              <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                Seamless real-time connectors for SAP S/4HANA, LIMS, and SharePoint.
              </p>
            </div>

            <div className="rounded-[20px] bg-white/10 backdrop-blur-md border border-white/15 p-4">
              <div className="flex items-center gap-2 font-extrabold text-white text-xs mb-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Human Approval Gates
              </div>
              <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                High-value purchase orders & COA releases mandate executive sign-off.
              </p>
            </div>

            <div className="rounded-[20px] bg-white/10 backdrop-blur-md border border-white/15 p-4">
              <div className="flex items-center gap-2 font-extrabold text-white text-xs mb-1">
                <ScrollText className="h-4 w-4 text-[#60A5FA]" /> Audit Log Trail
              </div>
              <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                Immutable log of every prompt, citation, extraction, and decision.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Ready for Enterprise AI Transformation Banner ── */}
      <div className="rounded-[28px] bg-white border border-[#E2E8F0] p-8 lg:p-10 text-center shadow-xs">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] px-4 py-1 text-xs font-extrabold text-[#2563EB] uppercase tracking-wider mb-4">
          <Sparkles className="h-3.5 w-3.5 text-[#2563EB]" /> Ready for Enterprise AI Transformation?
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mb-3">
          Book Your Plastic AI Readiness Assessment Today
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm font-medium max-w-2xl mx-auto mb-6 leading-relaxed">
          Join leading specialty polymer, packaging, and plastic component manufacturers in deploying zero-hardware AI operating capabilities across your plant clusters.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button className="rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-7 py-3 text-xs font-extrabold shadow-lg shadow-[#2563EB]/25 hover:-translate-y-0.5 transition-all inline-flex items-center gap-2">
            <span>Book AI Readiness Assessment</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
          <Link
            to="/cockpit"
            className="rounded-full bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] border border-[#E2E8F0] px-7 py-3 text-xs font-extrabold hover:-translate-y-0.5 transition-all"
          >
            Schedule Executive Demo
          </Link>
        </div>
      </div>
    </div>
  );
}

export function PageFooter() {
  return (
    <footer className="mt-10 border-t border-[#E2E8F0] pt-6 pb-4 flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-[#64748B]">
      <span>© 2026 Fortiv Solutions · Plastic Manufacturing Enterprise AI Operating System</span>
      <div className="flex items-center gap-4 text-xs">
        <span className="inline-flex items-center gap-1.5 font-bold text-[#059669]">
          <span className="h-2 w-2 rounded-full bg-[#059669]" /> Enterprise System Active
        </span>
        <span>SOC2 Type II Certified</span>
        <span>ISO 27001 & IATF 16949 Compliant</span>
      </div>
    </footer>
  );
}
