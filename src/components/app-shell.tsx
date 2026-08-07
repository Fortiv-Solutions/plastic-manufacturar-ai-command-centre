import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Search,
  Sparkles,
  Bell,
  CheckSquare,
  Workflow,
  Plug,
  ChevronLeft,
  ChevronDown,
  Hexagon,
  X,
  Send,
  Activity,
  LayoutDashboard,
  Bot,
  Building2,
  BrainCircuit,
  Crown,
  Lock,
  Zap,
  Menu,
  Factory,
} from "lucide-react";
import { WORKSPACES } from "@/data/platform";
import { cn } from "@/lib/utils";

const TOP_NAV_TABS = [
  { label: "Overview", to: "/", icon: LayoutDashboard },
  { label: "AI Agents", to: "/agents", icon: Bot },
  { label: "Departments", to: "/departments", icon: Building2 },
  { label: "Company Brain", to: "/company-brain", icon: BrainCircuit },
  { label: "Workflows", to: "/workflow-studio", icon: Workflow },
  { label: "ROI", to: "/cockpit", icon: Crown },
  { label: "Security", to: "/m/security", icon: Lock },
  { label: "Roadmap", to: "/automation", icon: Zap },
];

function AskAiModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "I am Company AI, grounded in your 44 department SOPs, ERP master data, resins database, and 1.24M documents. Ask me anything about production, quality, resin pricing, RFQs, or approvals.",
    },
  ]);
  const [input, setInput] = useState("");

  if (!open) return null;

  function send(text: string) {
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user", text },
      {
        role: "ai",
        text: `Analysis complete for "${text}": Checked live SAP S/4HANA records, 14 active plant sensors, and Company Brain vector index. Grounded response prepared with zero hallucinations.`,
      },
    ]);
    setInput("");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-2xl rounded-[28px] border border-[#E2E8F0] bg-white shadow-2xl overflow-hidden animate-rise">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-[#F8FAFC] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#2563EB] text-white shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#0F172A] text-sm">Ask Company AI</h3>
              <p className="text-[11px] text-[#64748B] font-medium">Polymer Intelligence Engine · Grounded RAG</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full border border-[#E2E8F0] text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A] transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 max-h-[380px] overflow-y-auto space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "p-4 rounded-[20px] text-xs max-w-[85%] leading-relaxed font-medium",
                m.role === "ai"
                  ? "bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E3A8A]"
                  : "bg-[#F1F5F9] border border-[#E2E8F0] text-[#0F172A] ml-auto"
              )}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC] flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Ask about resin prices, RFQs, CAPA, PPAP, or plant OEE…"
            className="h-10 flex-1 rounded-full border border-[#E2E8F0] bg-white px-4 text-xs outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 font-medium"
          />
          <button
            onClick={() => send(input)}
            className="btn-primary-cobalt inline-flex items-center gap-1.5"
          >
            <Send className="h-3.5 w-3.5" /> Send
          </button>
        </div>
      </div>
    </div>
  );
}

function TopIcon({
  to,
  icon: Icon,
  count,
  label,
}: {
  to: string;
  icon: typeof Bell;
  count: number;
  label: string;
}) {
  return (
    <Link
      to={to}
      title={label}
      aria-label={label}
      className="relative grid h-9 w-9 place-items-center rounded-full border border-[#E2E8F0] bg-white text-[#475569] transition hover:border-[#2563EB] hover:text-[#2563EB]"
    >
      <Icon className="h-4 w-4" />
      <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#2563EB] px-1 text-[9px] font-extrabold text-white shadow-xs">
        {count}
      </span>
    </Link>
  );
}

export function WorkspaceSubmoduleNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const activeWorkspace = WORKSPACES.find((w) =>
    w.items.some((i) => (i.to === "/" ? pathname === "/" : pathname.startsWith(i.to)))
  );

  if (!activeWorkspace) return null;

  return (
    <div className="mb-6 rounded-[24px] border border-[#E2E8F0] bg-white p-4 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] pb-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#2563EB] text-white shadow-xs">
            <activeWorkspace.icon className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
              {activeWorkspace.name} Control Hub
            </h2>
            <p className="text-[11px] font-medium text-[#64748B]">{activeWorkspace.description}</p>
          </div>
        </div>
        <span className="rounded-full bg-[#EFF6FF] border border-[#BFDBFE] px-3 py-0.5 text-[10px] font-extrabold text-[#2563EB]">
          {activeWorkspace.items.length} Submodules
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {activeWorkspace.items.map((item) => {
          const isActive = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.to}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold transition-all duration-150",
                isActive
                  ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/25"
                  : "bg-[#F8FAFC] text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A] border border-[#E2E8F0]"
              )}
            >
              <Icon className={cn("h-3.5 w-3.5", isActive ? "text-white" : "text-[#64748B]")} />
              <span>{item.label}</span>
              {item.badge && (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.2 text-[9px]",
                    isActive ? "bg-white/20 text-white" : "bg-[#E2E8F0] text-[#0F172A]"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [openAskAi, setOpenAskAi] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] font-sans text-[#0F172A] pt-3.5">
      <AskAiModal open={openAskAi} onClose={() => setOpenAskAi(false)} />

      {/* ── Mobile Menu Backdrop & Drawer ── */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 w-[300px] bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-rise"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain rounded-lg" />
                  <div>
                    <p className="font-extrabold text-[#0F172A] text-sm">PLASTIC AI OS</p>
                    <p className="text-[10px] font-bold text-[#2563EB]">Fortiv Solutions</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-full border border-[#E2E8F0] text-[#64748B]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748B] px-2 mb-2">
                  Navigation
                </p>
                {TOP_NAV_TABS.map((tab) => {
                  const isActive = tab.to === "/" ? pathname === "/" : pathname.startsWith(tab.to);
                  return (
                    <Link
                      key={tab.label}
                      to={tab.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-full px-4 py-2.5 text-xs font-extrabold transition-all",
                        isActive
                          ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/25"
                          : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                      )}
                    >
                      <tab.icon className={cn("h-4 w-4", isActive ? "text-white" : "text-[#64748B]")} />
                      <span>{tab.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Bottom Utilities */}
            <div className="border-t border-[#E2E8F0] pt-4 mt-6 space-y-3">
              <div className="flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2 text-xs font-bold text-[#0F172A]">
                <span>🏭 Plant: Anand</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setOpenAskAi(true);
                }}
                className="w-full btn-primary-cobalt flex items-center justify-center gap-2"
              >
                <Sparkles className="h-4 w-4" /> Ask AI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Floating Top Navigation Header ── */}
      <header className="sticky top-3.5 z-40 mx-auto w-full max-w-[1800px] px-4 lg:px-6 mb-6">
        
        {/* Mobile Header (< lg): 2 Floating Pill Cards */}
        <div className="flex items-center justify-between gap-2 lg:hidden w-full">
          {/* Card 1: Left Brand Pill (Logo + Hamburger Menu) */}
          <div className="h-14 rounded-full bg-white border border-[#E2E8F0] shadow-md px-3 flex items-center gap-2 shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Plastic AI OS Logo" className="h-8 w-8 object-contain shrink-0 rounded-lg" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-[#E2E8F0] text-[#0F172A] bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>

          {/* Card 2: Right Utilities Pill */}
          <div className="h-14 rounded-full bg-white border border-[#E2E8F0] shadow-md px-3 flex items-center gap-1.5 shrink-0 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setOpenAskAi(true)}
              className="h-9 rounded-full bg-[#2563EB] text-white px-3.5 text-xs font-extrabold flex items-center gap-1 shadow-md shadow-[#2563EB]/20 shrink-0"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask AI</span>
            </button>

            <Link
              to="/cockpit"
              className="h-9 rounded-full bg-white border border-[#E2E8F0] text-[#0F172A] px-3 text-xs font-extrabold flex items-center gap-1 shrink-0"
            >
              <Crown className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>ROI</span>
            </Link>

            <TopIcon to="/m/notifications" icon={Bell} count={9} label="Notifications" />

            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#1E3A8A] text-xs font-extrabold text-white shadow-xs">
              RM
            </div>
          </div>
        </div>

        {/* Desktop Header (>= lg): 3 Cards on 1 Row */}
        <div className="hidden lg:flex items-center justify-between gap-3 w-full">
          
          {/* Card 1: Left Brand Card */}
          <Link
            to="/"
            className="h-14 rounded-[28px] bg-white border border-[#E2E8F0] shadow-md px-4 flex items-center gap-3 shrink-0 hover:border-[#2563EB]/40 transition-all"
          >
            <img src="/logo.png" alt="Plastic AI OS Logo" className="h-9 w-9 object-contain shrink-0 rounded-lg" />
            <div className="min-w-0 leading-tight">
              <p className="truncate font-extrabold text-[#0F172A] text-sm tracking-tight">PLASTIC AI OS</p>
              <p className="truncate text-[10px] font-extrabold text-[#2563EB]">Fortiv Solutions · Enterprise AI Platform</p>
            </div>
          </Link>

          {/* Card 2: Center Navigation Pill */}
          <div className="h-14 rounded-full bg-white border border-[#E2E8F0] shadow-md px-3 flex items-center justify-start gap-1.5 flex-1 min-w-0 overflow-x-auto scrollbar-none">
            {TOP_NAV_TABS.map((tab) => {
              const isActive = tab.to === "/" ? pathname === "/" : pathname.startsWith(tab.to);
              return (
                <Link
                  key={tab.label}
                  to={tab.to}
                  className={cn(
                    "h-9 rounded-full px-3.5 text-xs font-extrabold flex items-center gap-1.5 shrink-0 transition-all duration-150",
                    isActive
                      ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/25"
                      : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                  )}
                >
                  <tab.icon className={cn("h-3.5 w-3.5", isActive ? "text-white" : "text-[#64748B]")} />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Card 3: Right Utilities Card */}
          <div className="h-14 rounded-full bg-white border border-[#E2E8F0] shadow-md px-3 flex items-center gap-2 shrink-0">
            <button
              onClick={() => setOpenAskAi(true)}
              className="h-9 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-[#2563EB]/20 hover:-translate-y-0.5 transition-all"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask AI</span>
            </button>

            <Link
              to="/cockpit"
              className="h-9 rounded-full bg-white border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] px-3.5 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Crown className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>ROI</span>
            </Link>

            {/* Plant Selector */}
            <div className="hidden xl:flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 h-9 text-xs font-bold text-[#0F172A]">
              <span>🏭 Plant: Anand</span>
              <ChevronDown className="h-3 w-3 text-[#64748B]" />
            </div>

            <TopIcon to="/m/notifications" icon={Bell} count={9} label="Notifications" />

            <div className="flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] p-1 pr-3">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-[#1E3A8A] text-xs font-bold text-white shadow-xs">
                RM
              </div>
              <span className="text-xs font-bold text-[#0F172A]">Raj M.</span>
            </div>
          </div>

        </div>
      </header>

      {/* ── Main Content Container ── */}
      <main className="mx-auto w-full max-w-[1800px] px-4 lg:px-6 pb-12">
        <WorkspaceSubmoduleNav />
        {children}
      </main>
    </div>
  );
}
