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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { activityFeed, approvals } from "@/data/platform";

export function Breadcrumbs({ items }: { items?: { label: string; to?: string }[] }) {
  if (!items || items.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
      <Link to="/" className="hover:text-primary transition-colors">
        Command Center
      </Link>
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-1.5">
          <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
          {item.to ? (
            <Link to={item.to} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground">{item.label}</span>
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
    <div className="animate-rise mb-6 rounded-xl border border-border bg-card p-5 shadow-sm">
      <Breadcrumbs items={breadcrumbs ?? (eyebrow ? [{ label: eyebrow }] : undefined)} />
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 max-w-3xl">
          <div className="flex items-center gap-2">
            {eyebrow && (
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                <Sparkles className="h-3 w-3" /> {eyebrow}
              </span>
            )}
          </div>
          <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3.5 py-2 text-xs font-semibold text-primary transition hover:bg-primary/20">
            <Sparkles className="h-4 w-4" /> AI Assistant
          </button>
          {actions}
        </div>
      </div>
      {filters && (
        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border/60 pt-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
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
    <section className={cn("panel animate-rise p-4 md:p-5", className)}>
      {(title || actions) && (
        <div className="mb-4 flex items-start justify-between gap-3 border-b border-border/50 pb-3">
          <div>
            {title && <h3 className="font-display text-sm font-bold text-foreground">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
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
    primary: "text-primary bg-primary/10 border-primary/20",
    success: "text-success bg-success/10 border-success/20",
    warning: "text-warning bg-warning/10 border-warning/20",
    accent: "text-accent bg-accent/10 border-accent/20",
  } as const;
  
  const textToneMap = {
    primary: "text-primary",
    success: "text-success",
    warning: "text-warning",
    accent: "text-accent",
  } as const;

  return (
    <div className="panel animate-rise group relative overflow-hidden p-4 transition-all duration-200 hover:shadow-md hover:border-primary/40">
      <div className="flex items-start justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        {Icon && (
          <div className={cn("grid h-8 w-8 place-items-center rounded-lg border p-1.5 transition-transform group-hover:scale-105", toneMap[tone])}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <p className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground">{value}</p>
      {delta && <p className={cn("mt-1 text-xs font-medium", textToneMap[tone])}>{delta}</p>}
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Running: "bg-success/15 text-success border-success/30",
    Live: "bg-success/15 text-success border-success/30",
    Connected: "bg-success/15 text-success border-success/30",
    Validated: "bg-success/15 text-success border-success/30",
    Optimised: "bg-success/15 text-success border-success/30",
    "In Build": "bg-primary/15 text-primary border-primary/30",
    Scaling: "bg-primary/15 text-primary border-primary/30",
    Approved: "bg-primary/15 text-primary border-primary/30",
    Idle: "bg-slate-100 text-slate-700 border-slate-300",
    Backlog: "bg-slate-100 text-slate-700 border-slate-300",
    Available: "bg-slate-100 text-slate-700 border-slate-300",
    Draft: "bg-slate-100 text-slate-700 border-slate-300",
    Paused: "bg-warning/15 text-amber-800 border-warning/40",
    Piloting: "bg-warning/15 text-amber-800 border-warning/40",
    Assessment: "bg-accent/15 text-accent border-accent/30",
    Critical: "bg-destructive/15 text-destructive border-destructive/30",
    High: "bg-warning/15 text-amber-800 border-warning/40",
    Medium: "bg-primary/12 text-primary border-primary/25",
    Low: "bg-slate-100 text-slate-700 border-slate-300",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide",
        map[status] ?? "bg-slate-100 text-slate-700 border-slate-300",
      )}
    >
      {status}
    </span>
  );
}

export function Meter({ value, tone = "primary" }: { value: number; tone?: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
      <div
        className={cn(
          "h-full rounded-full transition-all duration-500",
          tone === "primary" ? "bg-[image:var(--gradient-brand)]" : "bg-success",
        )}
        style={{ width: `${Math.min(100, value)}%` }}
      />
    </div>
  );
}

export function RightPanel({ className }: { className?: string }) {
  return (
    <aside className={cn("space-y-4", className)}>
      <Panel title="AI Context Recommendations" subtitle="Contextual insights for active workflow">
        <div className="space-y-2.5">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> High priority recommendation
            </div>
            <p className="mt-1 text-slate-700 leading-relaxed">
              Auto-approve 14 low-risk RFQs for PET preforms to reduce backlog by 35%.
            </p>
            <button className="mt-2 text-[11px] font-semibold text-primary underline hover:text-primary/80">
              Apply automation →
            </button>
          </div>

          <div className="rounded-lg border border-accent/20 bg-accent/5 p-3 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-accent">
              <Zap className="h-3.5 w-3.5" /> Resin Cost Optimization
            </div>
            <p className="mt-1 text-slate-700 leading-relaxed">
              HDPE spot pricing is down 3.1%. Recommend advancing Sep contract lock.
            </p>
          </div>
        </div>
      </Panel>

      <Panel title="Live Activity Feed" subtitle="Real-time agent execution stream">
        <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
          {activityFeed.slice(0, 5).map((a, i) => (
            <div key={i} className="flex items-start gap-2.5 rounded-lg border border-border bg-slate-50/70 p-2.5 text-xs">
              <span
                className={cn(
                  "mt-1 h-2 w-2 shrink-0 rounded-full",
                  a.tone === "success" ? "bg-success" : a.tone === "warning" ? "bg-warning" : "bg-primary",
                )}
              />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900">{a.agent}</p>
                <p className="text-slate-600 leading-snug">{a.text}</p>
                <span className="mt-1 block font-mono text-[10px] text-slate-400">{a.time}</span>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Pending Approvals" subtitle="Routed by Approval Agent">
        <div className="space-y-2">
          {approvals.slice(0, 3).map((ap) => (
            <div key={ap.id} className="flex items-center justify-between rounded-lg border border-border bg-slate-50 p-2.5 text-xs">
              <div className="min-w-0 pr-2">
                <p className="font-semibold text-slate-800 truncate">{ap.title}</p>
                <p className="text-[10px] text-slate-500">{ap.dept} · {ap.sla}</p>
              </div>
              <StatusPill status={ap.risk} />
            </div>
          ))}
          <Link to="/approvals" className="mt-2 block text-center text-xs font-semibold text-primary hover:underline">
            View all approvals →
          </Link>
        </div>
      </Panel>
    </aside>
  );
}

export function PageFooter() {
  return (
    <footer className="mt-8 border-t border-[#E5E7EB] pt-4 pb-2 flex items-center text-[11px] text-[#6B7280]">
      <span>© 2026 Polymer Manufacturing Enterprise AI Operating System</span>
    </footer>
  );
}

