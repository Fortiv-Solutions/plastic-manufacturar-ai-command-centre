import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileSearch, Upload, ScanLine, CheckCircle2, Route as RouteIcon } from "lucide-react";
import { KpiCard, PageHeader, Panel, StatusPill, RightPanel, PageFooter } from "@/components/ui-kit";
import { documents } from "@/data/platform";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Document Intelligence — Extract, Validate, Route" },
      {
        name: "description",
        content: "Process RFQs, invoices, PPAP packages, SDS, TDS, declarations and export documents with AI extraction, validation, comparison and routing.",
      },
      { property: "og:title", content: "Document Intelligence" },
      { property: "og:description", content: "Straight-through processing for every manufacturing document type." },
    ],
  }),
  component: DocumentIntelligence,
});

const TYPES = [
  "PDF", "Word", "Excel", "Images", "Email", "Scanned", "RFQ", "Quotation", "Purchase Order",
  "Invoice", "Certificate", "Technical Data Sheet", "Safety Data Sheet", "Material Specification",
  "PPAP Package", "Declaration of Conformity", "Migration Statement", "REACH", "RoHS", "SVHC",
  "IMDS", "CAPA", "NCR", "Contract", "Export Document", "Import Document", "Inspection Report",
  "Tool History File", "Engineering Document",
];

const PIPELINE = [
  ["Ingest", "Email, SharePoint, scanner, API"],
  ["Classify", "29 document classes, 99.1% accuracy"],
  ["Extract", "Field-level OCR + LLM extraction with confidence"],
  ["Validate", "Cross-check against ERP master data and standards"],
  ["Compare", "Revision diff vs previous version / customer drawing"],
  ["Generate", "Auto-draft response, declaration or summary"],
  ["Approve", "Route through the approval matrix"],
  ["Store", "Indexed to Company Brain with retention policy"],
];

function DocumentIntelligence() {
  const [selected, setSelected] = useState(documents[0]!);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Knowledge Hub"
        title="Document Intelligence Engine"
        description="Every inbound and outbound manufacturing document is classified, extracted, validated, compared, routed and archived — with confidence scores and human escalation."
        breadcrumbs={[{ label: "Knowledge Hub", to: "/company-brain" }, { label: "Document Intelligence" }]}
        actions={
          <button className="btn-primary-teal inline-flex items-center gap-2">
            <Upload className="h-4 w-4" /> Upload Document Batch
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="Processed (30d)" value="128,412" delta="+18% MoM" icon={FileSearch} />
        <KpiCard label="Straight-Through STP" value="98.7%" delta="No human touch" icon={CheckCircle2} tone="success" />
        <KpiCard label="Avg Extraction Time" value="6.4 s" delta="vs 22 min manual" icon={ScanLine} tone="accent" />
        <KpiCard label="Human Escalated" value="1,684" delta="Confidence < 0.82" icon={RouteIcon} tone="warning" />
      </div>

      <div className="space-y-6">
        <Panel title="8-Step Document Processing Pipeline" subtitle="Automated workflow execution from raw ingestion to Company Brain indexing">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
            {PIPELINE.map(([step, desc], i) => (
              <div key={step} className="rounded-lg border border-[#E5E7EB] bg-[#F6F8FB] p-2.5">
                <p className="font-mono text-[10px] font-bold text-[#163B65]">STEP {i + 1}</p>
                <p className="text-xs font-bold text-[#1F2937] mt-0.5">{step}</p>
                <p className="mt-1 text-[10px] text-[#6B7280] font-medium leading-tight">{desc}</p>
              </div>
            ))}
          </div>
        </Panel>

        <div className="grid gap-6 lg:grid-cols-3">
          <Panel className="lg:col-span-2" title="Active Processing Queue" subtitle="Live document workload with confidence scoring">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[11px] uppercase tracking-wider text-[#6B7280] bg-[#F6F8FB]">
                  <tr>
                    <th className="p-3 font-bold">Document</th>
                    <th className="p-3 font-bold">Class</th>
                    <th className="p-3 font-bold">Function</th>
                    <th className="p-3 font-bold">Confidence</th>
                    <th className="p-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {documents.map((d) => (
                    <tr
                      key={d.id}
                      onClick={() => setSelected(d)}
                      className={`cursor-pointer transition-colors ${
                        selected.id === d.id ? "bg-[#00A99D]/10 font-semibold" : "hover:bg-[#F6F8FB]"
                      }`}
                    >
                      <td className="p-3">
                        <p className="font-bold text-[#1F2937]">{d.name}</p>
                        <p className="font-mono text-[10px] text-[#6B7280] font-medium">{d.id} · {d.pages}p</p>
                      </td>
                      <td className="p-3 text-[#1F2937] font-medium">{d.type}</td>
                      <td className="p-3 text-[#6B7280] font-medium">{d.dept}</td>
                      <td className="p-3 font-bold text-[#34C759]">{d.confidence}%</td>
                      <td className="p-3"><StatusPill status={d.status === "Extracted" ? "In Build" : d.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel title="Extracted Schema Fields" subtitle={selected.name}>
            <div className="space-y-2 text-xs">
              {[
                ["Document class", selected.type],
                ["Owning function", selected.dept],
                ["Pages", String(selected.pages)],
                ["Confidence", `${selected.confidence}%`],
                ["Customer / vendor", "Nova Beverages Pvt Ltd"],
                ["Polymer grade", "PET IV 0.80 bottle grade"],
                ["Quantity", "1,200,000 preforms"],
                ["Delivery", "Phased, Oct–Dec 2026"],
                ["Regulatory scope", "EU 10/2011 · FDA 21 CFR 177.1630"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 rounded-lg border border-[#E5E7EB] bg-[#F6F8FB] px-2.5 py-1.5">
                  <span className="text-[#6B7280] font-medium">{k}</span>
                  <span className="text-right font-bold text-[#1F2937]">{v}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <Panel title="Supported Document Classes" subtitle="29 specialized document types trained with custom parser models">
          <div className="flex flex-wrap gap-1.5">
            {TYPES.map((t) => (
              <span key={t} className="rounded-md border border-[#E5E7EB] bg-[#F6F8FB] px-2.5 py-1 text-xs font-medium text-[#1F2937]">
                {t}
              </span>
            ))}
          </div>
        </Panel>
      </div>

      <PageFooter />
    </div>
  );
}

