import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BrainCircuit, Search, FileText, Network, GitBranch, ShieldCheck } from "lucide-react";
import { KpiCard, PageHeader, Panel, RightPanel, PageFooter } from "@/components/ui-kit";

export const Route = createFileRoute("/company-brain")({
  head: () => ({
    meta: [
      { title: "Company Brain — Enterprise Knowledge Platform" },
      {
        name: "description",
        content: "Semantic search, RAG, vector database and knowledge graph across ERP, CRM, SharePoint, specifications, PPAP, CAPA and tool history.",
      },
      { property: "og:title", content: "Company Brain" },
      { property: "og:description", content: "The grounded enterprise memory of a polymer manufacturing group." },
    ],
  }),
  component: CompanyBrain,
});

const SOURCES = [
  "ERP", "CRM", "SharePoint", "SQL", "Emails", "Excel", "PDF", "Word", "PowerPoint",
  "Contracts", "Specifications", "Technical Data Sheets", "Safety Data Sheets",
  "Material Specifications", "Customer Drawings", "PPAP", "CAPA", "NCR",
  "Tool History", "Maintenance Records", "Audit Reports", "ISO Documents",
  "Training Records", "Meeting Notes",
];

const SCOPES = [
  "Enterprise search", "Policy search", "Drawing search", "Specification search",
  "Resin search", "Customer search", "Tool search", "Supplier search", "Part search",
];

const RESULTS = [
  {
    title: "PP Copolymer H110MA — approved grade for automotive interior trim",
    source: "Material Specification · MS-2214 · rev D",
    snippet: "MFI 11 g/10min, notched Izod 6.4 kJ/m², approved by customer engineering on 14-Feb-2025 for parts 44-9021 and 44-9033. Alternate grade: Repol H110MA-EQ.",
    score: 0.94,
  },
  {
    title: "Tool history — Mould M-318 (4 cavity, PET preform)",
    source: "Tool History File · TH-0318",
    snippet: "Last refurbishment 08-Mar-2026 at 2.4M shots. Cavity 3 gate bushing replaced twice; correlated with short-shot NCRs in Q1.",
    score: 0.91,
  },
  {
    title: "EU 10/2011 migration testing protocol for food-contact rigid packaging",
    source: "ISO Document · QMS-FC-07",
    snippet: "Overall migration limit 10 mg/dm². Simulant B, 10 days at 40°C. Retain certificates for 5 years and attach to declaration of compliance.",
    score: 0.89,
  },
];

function CompanyBrain() {
  const [q, setQ] = useState("approved PP grade for automotive interior trim");
  const [scope, setScope] = useState("Enterprise search");

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Knowledge Hub"
        title="Company Brain"
        description="One grounded memory for the enterprise — semantic search over 18M vectors, a knowledge graph of parts, tools, resins, customers and suppliers, with citation-backed answers and version control."
        breadcrumbs={[{ label: "Knowledge Hub", to: "/company-brain" }, { label: "Company Brain" }]}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="Indexed Documents" value="1.42 M" delta="+38K this month" icon={FileText} />
        <KpiCard label="Vector Store" value="18.2 M" delta="Qdrant · 3 collections" icon={BrainCircuit} tone="accent" />
        <KpiCard label="Knowledge Graph" value="486 K" delta="Parts · tools · resins" icon={Network} />
        <KpiCard label="Answer Groundedness" value="98.1%" delta="Citations verified" icon={ShieldCheck} tone="success" />
      </div>

      <div className="space-y-6">
        <Panel title="Semantic Search & Retrieval" subtitle="Retrieval-augmented, permission-filtered, citation-backed RAG">
          <div className="flex flex-wrap gap-2">
            <div className="relative min-w-[260px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[#6B7280]" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white pl-9 pr-3 text-xs outline-none focus:border-[#00A99D] focus:ring-2 focus:ring-[#00A99D]/20 shadow-xs font-medium"
              />
            </div>
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="h-10 rounded-lg border border-[#E5E7EB] bg-white px-3 text-xs font-bold text-[#163B65] outline-none focus:border-[#00A99D] shadow-xs"
            >
              {SCOPES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="mt-4 rounded-xl border border-[#00A99D]/30 bg-[#00A99D]/5 p-3.5 text-xs leading-relaxed text-[#1F2937] animate-rise">
            <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-[#163B65]">Grounded Executive Answer</p>
            PP Copolymer H110MA (MS-2214 rev D) is the approved grade for automotive interior trim, customer-approved on 14-Feb-2025 for parts 44-9021 / 44-9033. A qualified alternate (Repol H110MA-EQ) exists with a 3.2% landed-cost advantage this quarter.
            <span className="ml-1 text-[#6B7280] font-medium">Sources: MS-2214, PPAP-449021, RESIN-IDX-Q3.</span>
          </div>

          <div className="mt-4 space-y-2.5">
            {RESULTS.map((r) => (
              <div key={r.title} className="rounded-lg border border-[#E5E7EB] bg-[#F6F8FB] p-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-bold text-[#1F2937]">{r.title}</p>
                  <span className="shrink-0 rounded-full border border-[#34C759]/30 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-[#34C759]">
                    Score {r.score.toFixed(2)}
                  </span>
                </div>
                <p className="mt-1 font-mono text-[11px] font-bold text-[#163B65]">{r.source}</p>
                <p className="mt-1 text-xs text-[#6B7280] font-medium">{r.snippet}</p>
              </div>
            ))}
          </div>
        </Panel>

        <div className="grid gap-6 md:grid-cols-2">
          <Panel title="Ingested Knowledge Sources" subtitle="Continuously synchronized and re-indexed">
            <div className="flex flex-wrap gap-1.5">
              {SOURCES.map((s) => (
                <span key={s} className="rounded-md border border-[#E5E7EB] bg-[#F6F8FB] px-2.5 py-1 text-xs font-medium text-[#1F2937]">
                  {s}
                </span>
              ))}
            </div>
          </Panel>

          <Panel title="Trust & Governance Framework" subtitle="Guarantees zero hallucination in production">
            <ul className="space-y-2 text-xs">
              {[
                ["Version Control", "Every chunk traced to exact document revision ID"],
                ["SME Sign-Off", "Human verification before promotion to core index"],
                ["Mandatory Citations", "Answers refuse to generate without source backing"],
                ["Session Memory", "90-day rolling, strict RBAC permission partition"],
                ["Data Governance", "Separated by plant, division and classification level"],
              ].map(([t, d]) => (
                <li key={t} className="rounded-lg border border-[#E5E7EB] bg-[#F6F8FB] p-2.5">
                  <span className="inline-flex items-center gap-1.5 font-bold text-[#163B65]">
                    <GitBranch className="h-3.5 w-3.5 text-[#00A99D]" /> {t}
                  </span>
                  <p className="mt-0.5 text-[#6B7280] font-medium">{d}</p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>

      <PageFooter />
    </div>
  );
}

