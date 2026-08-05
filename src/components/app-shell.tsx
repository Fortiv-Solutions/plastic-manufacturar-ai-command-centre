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
  Hexagon,
  X,
  Send,
  Activity,
  Menu,
} from "lucide-react";
import { WORKSPACES } from "@/data/platform";
import { cn } from "@/lib/utils";

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
      <div className="w-full max-w-2xl rounded-xl border border-[#E5E7EB] bg-white shadow-xl overflow-hidden animate-rise">
        <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-[#F6F8FB] px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#00A99D] text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-[#163B65] text-sm">Ask Company AI</h3>
              <p className="text-[11px] text-[#6B7280]">Polymer Intelligence Engine · Grounded RAG</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-7 w-7 place-items-center rounded-md border border-[#E5E7EB] text-[#6B7280] hover:bg-slate-200 hover:text-[#1F2937]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 max-h-[380px] overflow-y-auto space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "p-3.5 rounded-xl text-xs max-w-[85%] leading-relaxed",
                m.role === "ai"
                  ? "bg-[#00A99D]/10 border border-[#00A99D]/20 text-[#163B65] font-medium"
                  : "bg-slate-100 border border-slate-200 text-[#1F2937] ml-auto font-medium"
              )}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-[#E5E7EB] bg-[#F6F8FB] flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Ask about resin prices, RFQs, CAPA, PPAP, or plant OEE…"
            className="h-10 flex-1 rounded-lg border border-[#E5E7EB] bg-white px-3 text-xs outline-none focus:border-[#00A99D] focus:ring-2 focus:ring-[#00A99D]/20"
          />
          <button
            onClick={() => send(input)}
            className="btn-primary-teal inline-flex items-center gap-1.5"
          >
            <Send className="h-3.5 w-3.5" /> Send
          </button>
        </div>
      </div>
    </div>
  );
}

function SidebarContent({
  filterQuery,
  setFilterQuery,
  pathname,
  onNavClick,
}: {
  filterQuery: string;
  setFilterQuery: (v: string) => void;
  pathname: string;
  onNavClick?: () => void;
}) {
  return (
    <>
      {/* Quick Filter */}
      <div className="px-3 pt-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter workspaces…"
            className="h-8 w-full rounded-md border border-[#1D4A7E] bg-[#1D4A7E]/50 pl-8 pr-2.5 text-[11px] text-white outline-none placeholder:text-slate-400 focus:border-[#00A99D]"
          />
        </div>
      </div>

      {/* Main Workspace Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-3">
        <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#00A99D]">
          Workspaces
        </div>
        {WORKSPACES.filter(
          (w) =>
            !filterQuery ||
            w.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
            w.items.some((i) => i.label.toLowerCase().includes(filterQuery.toLowerCase()))
        ).map((ws) => {
          const hasActiveChild = ws.items.some((i) =>
            i.to === "/" ? pathname === "/" : pathname.startsWith(i.to)
          );
          const mainRoute = ws.items[0]?.to || "/";

          return (
            <Link
              key={ws.id}
              to={mainRoute}
              title={ws.name}
              onClick={onNavClick}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group border",
                hasActiveChild
                  ? "bg-[#00A99D] text-white border-[#00A99D] font-bold shadow-sm"
                  : "border-[#1D4A7E]/50 bg-[#123154]/40 text-slate-200 hover:bg-[#1D4A7E] hover:text-white hover:border-[#1D4A7E]"
              )}
            >
              <div
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors",
                  hasActiveChild
                    ? "bg-white/20 text-white"
                    : "bg-[#1D4A7E]/60 text-[#00A99D] group-hover:bg-[#1D4A7E] group-hover:text-white"
                )}
              >
                <ws.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate text-xs font-bold">{ws.name}</p>
                <p
                  className={cn(
                    "truncate text-[10px] font-medium mt-0.5",
                    hasActiveChild ? "text-white/80" : "text-slate-400 group-hover:text-slate-200"
                  )}
                >
                  {ws.description}
                </p>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Blueprint Progress Footer Widget */}
      <div className="m-3 rounded-xl border border-[#1D4A7E] bg-[#123154] p-3">
        <div className="flex items-center gap-2 text-xs font-bold text-white">
          <Activity className="h-3.5 w-3.5 text-[#00A99D]" /> Blueprint Progress
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#1D4A7E]">
          <div className="h-full w-[62%] rounded-full bg-[#00A99D]" />
        </div>
        <p className="mt-2 text-[10px] font-semibold text-slate-300">
          190 / 306 automations live · Wave 3
        </p>
      </div>
    </>
  );
}

function TopBar({
  onOpenAskAi,
  onOpenMobileMenu,
}: {
  onOpenAskAi: () => void;
  onOpenMobileMenu: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-[#E5E7EB] bg-white px-4 md:px-6 shadow-xs">
      {/* Mobile hamburger */}
      <button
        onClick={onOpenMobileMenu}
        aria-label="Open navigation menu"
        className="grid h-9 w-9 place-items-center rounded-lg border border-[#E5E7EB] text-[#163B65] transition hover:bg-[#163B65] hover:text-white lg:hidden"
      >
        <Menu className="h-4 w-4" />
      </button>

      <div className="relative hidden max-w-xl flex-1 items-center md:flex">
        <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-[#6B7280]" />
        <input
          placeholder="Ask Company AI... Search documents, plants, products, workflows, approvals..."
          className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-[#F6F8FB] pl-10 pr-14 text-xs text-[#1F2937] outline-none transition placeholder:text-[#6B7280] focus:border-[#00A99D] focus:bg-white focus:ring-2 focus:ring-[#00A99D]/20"
        />
        <kbd className="absolute right-3 rounded border border-[#E5E7EB] bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#6B7280]">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2.5">
        <button
          onClick={onOpenAskAi}
          className="btn-primary-teal inline-flex items-center gap-2"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Ask Company AI</span>
          <span className="sm:hidden">AI</span>
        </button>

        <div className="hidden items-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#F6F8FB] px-3 py-1.5 text-xs text-[#6B7280] lg:flex font-semibold">
          <span className="h-2 w-2 rounded-full bg-[#34C759]" />
          AI Fleet Healthy · 63 agents
        </div>

        <TopIcon to="/m/running-workflows" icon={Workflow} count={31} label="Running workflows" />
        <TopIcon to="/approvals" icon={CheckSquare} count={6} label="Approvals" />
        <TopIcon to="/m/integrations" icon={Plug} count={14} label="Connected systems" />
        <TopIcon to="/m/notifications" icon={Bell} count={9} label="Notifications" />

        <div className="ml-1 flex items-center gap-2.5 rounded-lg border border-[#E5E7EB] bg-[#F6F8FB] p-1 pr-3">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-[#163B65] text-xs font-bold text-white">
            RM
          </div>
          <div className="hidden leading-tight sm:block text-left">
            <p className="text-xs font-bold text-[#163B65]">Raj Malhotra</p>
            <p className="text-[10px] font-medium text-[#6B7280]">Group MD</p>
          </div>
        </div>
      </div>
    </header>
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
      className="relative grid h-9 w-9 place-items-center rounded-lg border border-[#E5E7EB] bg-[#F6F8FB] text-[#6B7280] transition hover:border-[#00A99D] hover:bg-white hover:text-[#00A99D]"
    >
      <Icon className="h-4 w-4" />
      <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#00A99D] px-1 text-[9px] font-bold text-white shadow-xs">
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
    <div className="mb-6 rounded-xl border border-[#E5E7EB] bg-white p-3 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E7EB]/80 pb-2.5 mb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-[#163B65] text-white shadow-2xs">
            <activeWorkspace.icon className="h-4 w-4 text-[#00A99D]" />
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#163B65]">
              {activeWorkspace.name} Control Hub
            </h2>
            <p className="text-[11px] font-medium text-[#6B7280]">{activeWorkspace.description}</p>
          </div>
        </div>
        <span className="rounded-full bg-[#163B65]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#163B65]">
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
                "inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all duration-150",
                isActive
                  ? "bg-[#00A99D] text-white shadow-xs"
                  : "bg-[#F6F8FB] text-[#4B7EA8] hover:bg-[#163B65] hover:text-white border border-[#E5E7EB]"
              )}
            >
              <Icon className={cn("h-3.5 w-3.5", isActive ? "text-white" : "text-[#4B7EA8]")} />
              <span>{item.label}</span>
              {item.badge && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.2 text-[9px]",
                    isActive ? "bg-white/20 text-white" : "bg-[#E5E7EB] text-[#1F2937]"
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
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAskAi, setOpenAskAi] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen w-full bg-[#F6F8FB] font-sans">
      <AskAiModal open={openAskAi} onClose={() => setOpenAskAi(false)} />

      {/* ── Mobile Drawer Backdrop ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile Drawer ── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-[#1D4A7E] bg-[#163B65] text-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile Drawer Header */}
        <div className="flex h-16 items-center gap-3 border-b border-[#1D4A7E] px-4">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#00A99D] text-white shadow-xs">
            <Hexagon className="h-5 w-5 fill-white/20" />
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate font-bold text-white text-sm">AI Command Center</p>
            <p className="truncate text-[10px] font-semibold text-[#00A99D]">Polymer Operating System</p>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
            className="grid h-7 w-7 place-items-center rounded-md border border-[#1D4A7E] text-slate-300 transition hover:bg-[#1D4A7E] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <SidebarContent
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
          pathname={pathname}
          onNavClick={() => setMobileOpen(false)}
        />
      </aside>

      {/* ── Desktop Sidebar ── */}
      <aside
        className={cn(
          "sticky top-0 z-40 hidden h-screen shrink-0 flex-col border-r border-[#1D4A7E] bg-[#163B65] text-white transition-all duration-300 lg:flex shadow-md",
          collapsed ? "w-[76px]" : "w-[270px]"
        )}
      >
        {/* Desktop Sidebar Header */}
        <div className={cn("flex h-16 items-center border-b border-[#1D4A7E] bg-[#163B65]", collapsed ? "justify-center px-2" : "gap-3 px-4")}>
          {collapsed ? (
            <button
              onClick={() => setCollapsed(false)}
              title="Expand sidebar"
              aria-label="Expand sidebar"
              className="grid h-10 w-10 place-items-center rounded-xl bg-[#00A99D] text-white shadow-xs hover:scale-105 transition-transform"
            >
              <Hexagon className="h-5 w-5 fill-white/20" />
            </button>
          ) : (
            <>
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#00A99D] text-white shadow-xs">
                <Hexagon className="h-5 w-5 fill-white/20" />
              </div>
              <div className="min-w-0 leading-tight">
                <p className="truncate font-bold text-white text-sm">AI Command Center</p>
                <p className="truncate text-[10px] font-semibold text-[#00A99D]">Polymer Operating System</p>
              </div>
              <button
                onClick={() => setCollapsed(true)}
                aria-label="Collapse sidebar"
                className="ml-auto grid h-7 w-7 place-items-center rounded-md border border-[#1D4A7E] text-slate-300 transition hover:bg-[#1D4A7E] hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        {!collapsed ? (
          <SidebarContent
            filterQuery={filterQuery}
            setFilterQuery={setFilterQuery}
            pathname={pathname}
          />
        ) : (
          /* Collapsed icon-only nav */
          <nav className="flex-1 space-y-2 overflow-y-auto px-2 py-3">
            {WORKSPACES.map((ws) => {
              const hasActiveChild = ws.items.some((i) =>
                i.to === "/" ? pathname === "/" : pathname.startsWith(i.to)
              );
              const mainRoute = ws.items[0]?.to || "/";
              return (
                <Link
                  key={ws.id}
                  to={mainRoute}
                  title={ws.name}
                  className={cn(
                    "flex items-center justify-center p-2.5 rounded-xl transition-all duration-150 border",
                    hasActiveChild
                      ? "bg-[#00A99D] text-white border-[#00A99D] shadow-sm"
                      : "border-[#1D4A7E]/50 bg-[#123154]/40 text-slate-200 hover:bg-[#1D4A7E] hover:text-white hover:border-[#1D4A7E]"
                  )}
                >
                  <div
                    className={cn(
                      "grid h-8 w-8 place-items-center rounded-lg",
                      hasActiveChild
                        ? "bg-white/20 text-white"
                        : "bg-[#1D4A7E]/60 text-[#00A99D]"
                    )}
                  >
                    <ws.icon className="h-4 w-4" />
                  </div>
                </Link>
              );
            })}
          </nav>
        )}
      </aside>

      {/* ── Main content area ── */}
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          onOpenAskAi={() => setOpenAskAi(true)}
          onOpenMobileMenu={() => setMobileOpen(true)}
        />
        <main className="min-w-0 flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto">
          <WorkspaceSubmoduleNav />
          {children}
        </main>
      </div>
    </div>
  );
}
