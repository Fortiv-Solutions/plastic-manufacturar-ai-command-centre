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
  Plus,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { WORKSPACES, type Workspace } from "@/data/platform";
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

function TopBar({ onOpenAskAi }: { onOpenAskAi: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-[#E5E7EB] bg-white px-4 md:px-6 shadow-xs">
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
          <Sparkles className="h-3.5 w-3.5" /> Ask Company AI
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

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [openAskAi, setOpenAskAi] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Workspace accordion state — open active workspace by default
  const activeWorkspaceId =
    WORKSPACES.find((w) => w.items.some((i) => (i.to === "/" ? pathname === "/" : pathname.startsWith(i.to))))?.id ||
    "executive";

  const [expandedWorkspaces, setExpandedWorkspaces] = useState<Record<string, boolean>>({
    [activeWorkspaceId]: true,
  });

  function toggleWorkspace(id: string) {
    setExpandedWorkspaces((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="flex min-h-screen w-full bg-[#F6F8FB] font-sans">
      <AskAiModal open={openAskAi} onClose={() => setOpenAskAi(false)} />

      <aside
        className={cn(
          "sticky top-0 z-40 hidden h-screen shrink-0 flex-col border-r border-[#1D4A7E] bg-[#163B65] text-white transition-all duration-300 lg:flex shadow-md",
          collapsed ? "w-[76px]" : "w-[270px]"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center gap-3 border-b border-[#1D4A7E] px-4 bg-[#163B65]">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#00A99D] text-white shadow-xs">
            <Hexagon className="h-5 w-5 fill-white/20" />
          </div>
          {!collapsed && (
            <div className="min-w-0 leading-tight">
              <p className="truncate font-bold text-white text-sm">AI Command Center</p>
              <p className="truncate text-[10px] font-semibold text-[#00A99D]">Polymer Operating System</p>
            </div>
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
            aria-label="Toggle sidebar"
            className="ml-auto grid h-7 w-7 place-items-center rounded-md border border-[#1D4A7E] text-slate-300 transition hover:bg-[#1D4A7E] hover:text-white"
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>

        {/* Quick Filter inside Sidebar when expanded */}
        {!collapsed && (
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
        )}

        {/* Workspace Navigation */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-3">
          {WORKSPACES.filter(
            (w) =>
              !filterQuery ||
              w.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
              w.items.some((i) => i.label.toLowerCase().includes(filterQuery.toLowerCase()))
          ).map((ws) => {
            const isExpanded = expandedWorkspaces[ws.id] || !!filterQuery;
            const hasActiveChild = ws.items.some((i) =>
              i.to === "/" ? pathname === "/" : pathname.startsWith(i.to)
            );

            return (
              <div key={ws.id} className="rounded-lg overflow-hidden border border-[#1D4A7E]/60 bg-[#194270]/40">
                <button
                  onClick={() => toggleWorkspace(ws.id)}
                  title={ws.name}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-3 py-2.5 text-xs font-bold transition text-left",
                    hasActiveChild ? "bg-[#00A99D] text-white" : "text-slate-200 hover:bg-[#1D4A7E] hover:text-white"
                  )}
                >
                  <ws.icon className={cn("h-4 w-4 shrink-0", hasActiveChild ? "text-white" : "text-[#00A99D]")} />
                  {!collapsed && (
                    <>
                      <span className="truncate flex-1 text-xs font-bold tracking-tight">{ws.name}</span>
                      <ChevronDown
                        className={cn("h-3.5 w-3.5 text-slate-400 transition-transform duration-200", isExpanded && "rotate-180")}
                      />
                    </>
                  )}
                </button>

                {(!collapsed && isExpanded) && (
                  <div className="space-y-0.5 border-t border-[#1D4A7E]/40 bg-[#123154] p-1.5">
                    {ws.items
                      .filter((i) => !filterQuery || i.label.toLowerCase().includes(filterQuery.toLowerCase()))
                      .map((item) => {
                        const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                        return (
                          <Link
                            key={item.label}
                            to={item.to}
                            title={item.label}
                            className={cn(
                              "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs transition font-medium",
                              active
                                ? "bg-[#00A99D] text-white font-bold shadow-xs"
                                : "text-slate-300 hover:bg-[#1D4A7E] hover:text-white"
                            )}
                          >
                            <span className="truncate text-[11px] flex-1">{item.label}</span>
                            {item.badge && (
                              <span
                                className={cn(
                                  "rounded-full px-1.5 py-0.2 text-[9px] font-bold",
                                  active ? "bg-white/20 text-white" : "bg-[#1D4A7E] text-slate-300"
                                )}
                              >
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Blueprint Progress Footer Widget */}
        {!collapsed && (
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
        )}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar onOpenAskAi={() => setOpenAskAi(true)} />
        <main className="min-w-0 flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}


