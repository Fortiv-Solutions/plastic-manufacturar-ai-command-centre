import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BookOpen,
  Boxes,
  Factory,
  FileBarChart,
  FolderKanban,
  ListTodo,
  Lock,
  Plug,
  ScrollText,
  Settings2,
  ShieldAlert,
  SlidersHorizontal,
  Truck,
  Users,
} from "lucide-react";

export type ModuleKpi = { label: string; value: string; delta?: string; tone?: "primary" | "success" | "warning" | "accent" };
export type ModuleRow = { primary: string; secondary: string; meta: string; value: string; status: string };

export type ModuleConfig = {
  slug: string;
  group: string;
  title: string;
  description: string;
  icon: LucideIcon;
  kpis: ModuleKpi[];
  columns: [string, string, string, string];
  rows: ModuleRow[];
  capabilities: string[];
  aiInsight: string;
};

export const MODULES: ModuleConfig[] = [
  {
    slug: "knowledge-center",
    group: "Knowledge",
    title: "Knowledge Center",
    description:
      "Curated SOPs, work instructions, process parameter libraries, troubleshooting guides and tribal knowledge captured from retiring experts — all embedded into the Company Brain.",
    icon: BookOpen,
    kpis: [
      { label: "Knowledge articles", value: "8,412", delta: "+214 this quarter" },
      { label: "SME validated", value: "91%", tone: "success" },
      { label: "Avg age", value: "94 days", tone: "warning" },
      { label: "Monthly reads", value: "62,180", tone: "accent" },
    ],
    columns: ["Article", "Owner", "Domain", "Coverage"],
    rows: [
      { primary: "Injection moulding parameter library — PP thin-wall", secondary: "K. Ramesh", meta: "Process Engineering", value: "142 grades", status: "Validated" },
      { primary: "Short-shot troubleshooting decision tree", secondary: "S. Nayak", meta: "Quality Control & Lab", value: "38 causes", status: "Validated" },
      { primary: "PET preform IV drop — dryer diagnostics SOP", secondary: "M. Iyer", meta: "Production Planning", value: "12 steps", status: "Live" },
      { primary: "Mould changeover SMED standard (sub-18 min)", secondary: "A. Dutta", meta: "Tool Room Documentation", value: "9 stages", status: "Live" },
      { primary: "Regrind blending policy by application class", secondary: "P. Kulkarni", meta: "Plastic Recycling", value: "22 rules", status: "In Review" },
      { primary: "Food-contact declaration authoring guide", secondary: "N. Farooq", meta: "Regulatory Affairs", value: "EU + FDA", status: "Validated" },
    ],
    capabilities: [
      "Tribal knowledge capture interviews",
      "Auto-summarised SOPs from process data",
      "Expiry and review reminders",
      "SME validation workflow",
      "Multi-lingual translation (EN/HI/GU/TA)",
      "Embedded into every copilot answer",
    ],
    aiInsight:
      "34 articles referencing superseded resin grades were detected this week. The Knowledge Agent has drafted replacements and routed them to the owning SMEs.",
  },
  {
    slug: "tasks",
    group: "Operations",
    title: "Tasks",
    description:
      "AI-generated, AI-prioritised task inbox spanning follow-ups, exceptions, escalations and human-in-the-loop steps from every agent and workflow.",
    icon: ListTodo,
    kpis: [
      { label: "Open tasks", value: "1,284" },
      { label: "AI-generated", value: "78%", tone: "accent" },
      { label: "Overdue", value: "62", tone: "warning" },
      { label: "Avg closure", value: "6.8 h", tone: "success" },
    ],
    columns: ["Task", "Assignee", "Source", "Due"],
    rows: [
      { primary: "Clarify tolerance callout on Drawing Rev D before quoting", secondary: "T. Bhat", meta: "RFQ Analyzer", value: "Today 4pm", status: "High" },
      { primary: "Confirm HDPE lot traceability for complaint CC-1188", secondary: "R. Jain", meta: "CAPA Agent", value: "Tomorrow", status: "Medium" },
      { primary: "Counter-sign migration statement for Nova Beverages", secondary: "N. Farooq", meta: "Compliance Assistant", value: "2 days", status: "Medium" },
      { primary: "Resolve 6.4% price variance on invoice INV-77321", secondary: "S. Patel", meta: "AP Agent", value: "Today", status: "High" },
      { primary: "Approve tool refurbishment scope for M-318", secondary: "U. Bansal", meta: "Maintenance Agent", value: "4 days", status: "Low" },
      { primary: "Upload updated IMDS entry for part 44-9033", secondary: "L. Pillai", meta: "Regulatory Agent", value: "5 days", status: "Low" },
    ],
    capabilities: [
      "Priority scoring by revenue and risk",
      "Auto-drafted responses attached",
      "SLA breach prediction",
      "Delegation and workload balancing",
      "Teams and email two-way sync",
      "Closure evidence capture",
    ],
    aiInsight:
      "Task load in Estimation & Costing is forecast to exceed capacity by 22% next week; the scheduler proposes shifting 40 RFQs to the auto-quote lane.",
  },
  {
    slug: "projects",
    group: "Operations",
    title: "Projects",
    description:
      "New product introductions, tool builds, plant expansions and AI deployment waves tracked with predicted slippage and dependency intelligence.",
    icon: FolderKanban,
    kpis: [
      { label: "Active projects", value: "38" },
      { label: "On schedule", value: "71%", tone: "success" },
      { label: "At risk", value: "8", tone: "warning" },
      { label: "Capex committed", value: "₹214 Cr", tone: "accent" },
    ],
    columns: ["Project", "Lead", "Type", "Progress"],
    rows: [
      { primary: "NPD — 2L HDPE lubricant bottle (Gulf export)", secondary: "M. Iyer", meta: "New Product", value: "72%", status: "Live" },
      { primary: "Tool build — 8-cavity closure mould", secondary: "U. Bansal", meta: "Tooling", value: "48%", status: "In Build" },
      { primary: "AI Wave 2 rollout — Finance cluster", secondary: "D. Menon", meta: "AI Deployment", value: "35%", status: "Scaling" },
      { primary: "Plant 4 extrusion line commissioning", secondary: "A. Dutta", meta: "Capex", value: "88%", status: "Live" },
      { primary: "PCR content certification programme", secondary: "P. Kulkarni", meta: "Sustainability", value: "26%", status: "Piloting" },
      { primary: "IATF 16949 recertification readiness", secondary: "S. Nayak", meta: "Compliance", value: "61%", status: "In Build" },
    ],
    capabilities: [
      "APQP phase gate automation",
      "Slippage prediction from historical builds",
      "Cross-project resource contention alerts",
      "Auto-generated status packs",
      "Supplier milestone tracking",
      "Capex vs benefit realisation",
    ],
    aiInsight:
      "The 8-cavity closure mould is predicted 11 days late based on the tool-maker's historical texture-stage variance. Mitigation: parallelise T1 sampling.",
  },
  {
    slug: "reports",
    group: "Insight",
    title: "Reports",
    description:
      "Narrative reports written by AI from live enterprise data — board packs, MIS, plant reviews, customer scorecards and regulatory submissions.",
    icon: FileBarChart,
    kpis: [
      { label: "Report templates", value: "146" },
      { label: "Auto-published / mo", value: "1,020", tone: "success" },
      { label: "Manual hours saved", value: "4,180", tone: "accent" },
      { label: "Distribution lists", value: "212" },
    ],
    columns: ["Report", "Owner", "Cadence", "Last run"],
    rows: [
      { primary: "Group board pack — performance & AI value", secondary: "CEO Office", meta: "Monthly", value: "2 days ago", status: "Live" },
      { primary: "Plant OEE and scrap narrative", secondary: "Operations", meta: "Weekly", value: "Yesterday", status: "Live" },
      { primary: "Resin exposure and hedging position", secondary: "Procurement", meta: "Weekly", value: "Today", status: "Live" },
      { primary: "Customer quality scorecard (top 25)", secondary: "Quality", meta: "Monthly", value: "6 days ago", status: "Live" },
      { primary: "Working capital and DSO commentary", secondary: "Finance", meta: "Monthly", value: "3 days ago", status: "Live" },
      { primary: "ESG and PCR content disclosure", secondary: "Sustainability", meta: "Quarterly", value: "22 days ago", status: "Draft" },
    ],
    capabilities: [
      "Natural-language report authoring",
      "Variance explanation with root cause",
      "Chart and table auto-composition",
      "Scheduled distribution to Teams/email",
      "Drill-through to source records",
      "Version-controlled archive",
    ],
    aiInsight:
      "Gross margin commentary flagged an unexplained 90 bps drop in Rigid Packaging; the report agent traced it to regrind substitution below target ratio.",
  },
  {
    slug: "risk-center",
    group: "Insight",
    title: "Risk Center",
    description:
      "Enterprise risk register with AI-detected emerging risks across supply, price, credit, compliance, quality, cyber and concentration exposure.",
    icon: ShieldAlert,
    kpis: [
      { label: "Open risks", value: "184" },
      { label: "Critical", value: "9", tone: "warning" },
      { label: "Mitigated (QTD)", value: "63", tone: "success" },
      { label: "Modelled exposure", value: "₹6.4 Cr", tone: "accent" },
    ],
    columns: ["Risk", "Owner", "Category", "Exposure"],
    rows: [
      { primary: "Single-source masterbatch dependency (Vietnam)", secondary: "L. Pillai", meta: "Supply", value: "₹2.1 Cr", status: "Critical" },
      { primary: "PP price spike beyond hedged band", secondary: "H. Joshi", meta: "Commodity", value: "₹1.4 Cr", status: "High" },
      { primary: "Customer credit deterioration — top-10 account", secondary: "S. Patel", meta: "Credit", value: "₹96 L", status: "High" },
      { primary: "EU single-use plastics scope extension", secondary: "N. Farooq", meta: "Regulatory", value: "Unquantified", status: "Medium" },
      { primary: "Ageing tool base — cavities beyond 3M shots", secondary: "U. Bansal", meta: "Operational", value: "₹78 L", status: "Medium" },
      { primary: "Shadow-AI usage outside governed platform", secondary: "D. Menon", meta: "Cyber", value: "Qualitative", status: "Medium" },
    ],
    capabilities: [
      "Emerging risk detection from news and filings",
      "Monte-Carlo exposure modelling",
      "Mitigation plan drafting",
      "Concentration and dependency mapping",
      "Board-level risk narrative",
      "Early-warning threshold alerts",
    ],
    aiInsight:
      "Supply-side concentration is the dominant driver of modelled exposure. Qualifying a second masterbatch source reduces exposure by an estimated 61%.",
  },
  {
    slug: "compliance",
    group: "Governance",
    title: "Compliance",
    description:
      "Regulatory obligations for plastics — REACH, RoHS, SVHC, IMDS, EU 10/2011, FDA food contact, EPR, plastic waste rules and export documentation.",
    icon: ScrollText,
    kpis: [
      { label: "Obligations tracked", value: "412" },
      { label: "Compliant", value: "97.4%", tone: "success" },
      { label: "Due in 30 days", value: "26", tone: "warning" },
      { label: "Declarations issued", value: "3,840", tone: "accent" },
    ],
    columns: ["Obligation", "Owner", "Regime", "Next due"],
    rows: [
      { primary: "SVHC candidate list screening (updated Jan-2026)", secondary: "N. Farooq", meta: "REACH", value: "14 days", status: "In Build" },
      { primary: "EPR plastic waste annual return", secondary: "P. Kulkarni", meta: "India EPR", value: "38 days", status: "Approved" },
      { primary: "Food-contact migration testing renewals", secondary: "S. Nayak", meta: "EU 10/2011", value: "21 days", status: "In Build" },
      { primary: "IMDS submissions for 2026 model-year parts", secondary: "L. Pillai", meta: "Automotive", value: "9 days", status: "High" },
      { primary: "RoHS exemption review for flame-retardant grade", secondary: "N. Farooq", meta: "RoHS", value: "56 days", status: "Draft" },
      { primary: "Export documentation — certificate of origin pack", secondary: "T. Bhat", meta: "Trade", value: "Rolling", status: "Live" },
    ],
    capabilities: [
      "Regulation change monitoring",
      "Automatic declaration generation",
      "Substance screening against BOM",
      "Audit evidence assembly",
      "Customer questionnaire auto-response",
      "Retention and legal-hold policy",
    ],
    aiInsight:
      "The January SVHC update introduces two substances present in one flame-retardant grade. Impacted parts: 14. Substitute grades identified for 12.",
  },
  {
    slug: "quality",
    group: "Governance",
    title: "Quality",
    description:
      "Quality management across incoming, in-process and final inspection, NCRs, CAPA, customer complaints, PPAP, APQP, MSA and audit readiness.",
    icon: BadgeCheck,
    kpis: [
      { label: "First pass yield", value: "96.8%", tone: "success" },
      { label: "Open NCRs", value: "74", tone: "warning" },
      { label: "CAPA on time", value: "88%" },
      { label: "Customer PPM", value: "212", tone: "accent" },
    ],
    columns: ["Record", "Owner", "Type", "Age"],
    rows: [
      { primary: "CAPA-0442 — short shot, cavity 4, mould M-318", secondary: "S. Nayak", meta: "CAPA", value: "6 days", status: "In Build" },
      { primary: "CC-1188 — stress cracking in field, HDPE closure", secondary: "R. Jain", meta: "Complaint", value: "11 days", status: "High" },
      { primary: "NCR-0921 — dimensional drift on housing Rev D", secondary: "K. Ramesh", meta: "NCR", value: "3 days", status: "Medium" },
      { primary: "PPAP Level 3 — part 44-9021 submission", secondary: "M. Iyer", meta: "PPAP", value: "2 days", status: "In Review" },
      { primary: "MSA Gage R&R — CMM fixture 12", secondary: "A. Dutta", meta: "MSA", value: "8 days", status: "Approved" },
      { primary: "IATF surveillance audit finding closure", secondary: "S. Nayak", meta: "Audit", value: "19 days", status: "In Build" },
    ],
    capabilities: [
      "AI root-cause hypothesis ranking",
      "8D and CAPA auto-drafting",
      "Defect pattern clustering across plants",
      "PPAP package assembly",
      "Audit non-conformance prediction",
      "Complaint sentiment and escalation risk",
    ],
    aiInsight:
      "Short-shot NCRs cluster on cavity 3 and 4 of M-318 after 2.1M shots — consistent with gate-bushing wear. Preventive replacement recommended at 1.9M.",
  },
  {
    slug: "customers",
    group: "Business",
    title: "Customers",
    description:
      "360° customer view across OEMs, brand owners, converters and distributors — with quote-to-cash health, quality performance and churn prediction.",
    icon: Users,
    kpis: [
      { label: "Active customers", value: "1,842" },
      { label: "Revenue at risk", value: "₹18.6 Cr", tone: "warning" },
      { label: "Win rate", value: "38.4%", delta: "+6.1 pts with AI quoting", tone: "success" },
      { label: "NPS", value: "46", tone: "accent" },
    ],
    columns: ["Customer", "Owner", "Segment", "Annual value"],
    rows: [
      { primary: "Nova Beverages Pvt Ltd", secondary: "T. Bhat", meta: "PET Bottles", value: "₹94 Cr", status: "Live" },
      { primary: "Renault Nissan Technology", secondary: "M. Iyer", meta: "Automotive Plastics", value: "₹78 Cr", status: "Live" },
      { primary: "Sunrise Medical Devices", secondary: "R. Jain", meta: "Medical Plastics", value: "₹41 Cr", status: "Scaling" },
      { primary: "Bharat Pipes & Fittings", secondary: "H. Joshi", meta: "PVC Pipes", value: "₹36 Cr", status: "Live" },
      { primary: "Everclean Home Care", secondary: "L. Pillai", meta: "Consumer Plastics", value: "₹29 Cr", status: "Paused" },
      { primary: "Gulf Lubricants FZE", secondary: "T. Bhat", meta: "Export Manufacturing", value: "₹24 Cr", status: "Scaling" },
    ],
    capabilities: [
      "Churn and share-of-wallet prediction",
      "RFQ-to-quote turnaround tracking",
      "Complaint and PPM scorecards",
      "Price-erosion detection",
      "Auto-drafted QBR packs",
      "Contract obligation extraction",
    ],
    aiInsight:
      "Everclean Home Care shows a 3-month decline in order frequency plus two open complaints — churn probability 41%. Recommended: executive escalation call.",
  },
  {
    slug: "vendors",
    group: "Business",
    title: "Vendors",
    description:
      "Resin producers, masterbatch and additive suppliers, tool makers, converters and logistics partners with performance, risk and price intelligence.",
    icon: Truck,
    kpis: [
      { label: "Active vendors", value: "946" },
      { label: "On-time-in-full", value: "93.1%", tone: "success" },
      { label: "Single-source spend", value: "18%", tone: "warning" },
      { label: "Negotiated savings", value: "₹22.4 Cr", tone: "accent" },
    ],
    columns: ["Vendor", "Owner", "Category", "Annual spend"],
    rows: [
      { primary: "Reliance Polymers", secondary: "H. Joshi", meta: "PP / HDPE resin", value: "₹214 Cr", status: "Live" },
      { primary: "IOCL Petrochemicals", secondary: "H. Joshi", meta: "PP resin", value: "₹142 Cr", status: "Live" },
      { primary: "Clariant Masterbatch", secondary: "L. Pillai", meta: "Masterbatch", value: "₹38 Cr", status: "Live" },
      { primary: "Hanoi Colour Compounds", secondary: "L. Pillai", meta: "Masterbatch", value: "₹9 Cr", status: "Piloting" },
      { primary: "Precision Tooling Works", secondary: "U. Bansal", meta: "Mould tooling", value: "₹26 Cr", status: "Live" },
      { primary: "TransIndia Logistics", secondary: "A. Dutta", meta: "Logistics", value: "₹18 Cr", status: "Paused" },
    ],
    capabilities: [
      "Should-cost modelling from resin indices",
      "Vendor risk and financial health scoring",
      "Auto-negotiation briefing packs",
      "Quality and OTIF scorecards",
      "Dual-source qualification tracking",
      "Contract renewal early warning",
    ],
    aiInsight:
      "Landed cost from Hanoi Colour Compounds is 7.8% below incumbent at equal spec. Qualifying volume of 120 MT would save ₹1.9 Cr annually.",
  },
  {
    slug: "products",
    group: "Business",
    title: "Products",
    description:
      "Part and SKU master across moulded components, preforms, closures, pipes, films and compounds — with margin, tooling and specification lineage.",
    icon: Boxes,
    kpis: [
      { label: "Active SKUs", value: "12,486" },
      { label: "Below target margin", value: "1,142", tone: "warning" },
      { label: "New launches (YTD)", value: "218", tone: "success" },
      { label: "Avg gross margin", value: "24.6%", tone: "accent" },
    ],
    columns: ["Product", "Owner", "Process", "Margin"],
    rows: [
      { primary: "PET preform 24.8 g — 1L still water", secondary: "M. Iyer", meta: "Injection Moulding", value: "21.4%", status: "Live" },
      { primary: "HDPE closure 29/25 tamper-evident", secondary: "R. Jain", meta: "Injection Moulding", value: "27.8%", status: "Live" },
      { primary: "PVC pressure pipe 110 mm SDR 11", secondary: "H. Joshi", meta: "Extrusion", value: "18.2%", status: "Paused" },
      { primary: "Automotive interior trim panel 44-9021", secondary: "K. Ramesh", meta: "Injection Moulding", value: "29.1%", status: "Live" },
      { primary: "Medical device housing (ABS, ISO 13485)", secondary: "S. Nayak", meta: "Injection Moulding", value: "34.6%", status: "Scaling" },
      { primary: "PCR-30 black masterbatch compound", secondary: "P. Kulkarni", meta: "Compounding", value: "22.9%", status: "Piloting" },
    ],
    capabilities: [
      "Margin erosion detection by SKU",
      "Specification and revision lineage",
      "Tooling-to-part mapping",
      "Regrind and PCR content tracking",
      "Cost roll-up from resin indices",
      "Portfolio rationalisation candidates",
    ],
    aiInsight:
      "1,142 SKUs sit below target margin; 61% share a common cause — resin index pass-through lag of 42 days versus a contractual 30-day clause.",
  },
  {
    slug: "plants",
    group: "Business",
    title: "Plants",
    description:
      "Multi-plant view of capacity, utilisation, scrap, changeover performance and AI adoption across the manufacturing network.",
    icon: Factory,
    kpis: [
      { label: "Plants", value: "11" },
      { label: "Network utilisation", value: "82.4%", tone: "success" },
      { label: "Scrap rate", value: "3.1%", tone: "warning" },
      { label: "Machines", value: "486", tone: "accent" },
    ],
    columns: ["Plant", "Head", "Focus", "Utilisation"],
    rows: [
      { primary: "Plant 1 — Vadodara", secondary: "A. Dutta", meta: "PET preforms & closures", value: "91%", status: "Live" },
      { primary: "Plant 2 — Pune", secondary: "K. Ramesh", meta: "Automotive plastics", value: "86%", status: "Live" },
      { primary: "Plant 3 — Chennai", secondary: "M. Iyer", meta: "Medical & precision", value: "78%", status: "Scaling" },
      { primary: "Plant 4 — Hosur", secondary: "S. Nayak", meta: "Extrusion & pipes", value: "72%", status: "In Build" },
      { primary: "Plant 5 — Silvassa", secondary: "P. Kulkarni", meta: "Compounding & recycling", value: "80%", status: "Live" },
      { primary: "Plant 6 — Sharjah (export)", secondary: "T. Bhat", meta: "Blow moulding", value: "84%", status: "Live" },
    ],
    capabilities: [
      "Cross-plant load balancing proposals",
      "Changeover and SMED analytics",
      "Scrap and regrind reconciliation",
      "Capacity vs order-book simulation",
      "Plant-level AI adoption index",
      "Best-practice transfer detection",
    ],
    aiInsight:
      "Shifting 9% of Plant 1's closure volume to Plant 4 relieves a Q4 capacity breach and reduces overtime by an estimated ₹64 L.",
  },
  {
    slug: "integrations",
    group: "Platform",
    title: "Integrations",
    description:
      "Connections to ERP, CRM, MES, PLM, QMS, productivity, BI, databases, vector stores and cloud — the data plane behind every agent.",
    icon: Plug,
    kpis: [
      { label: "Connected systems", value: "14", tone: "success" },
      { label: "Available", value: "4" },
      { label: "Sync health", value: "99.94%", tone: "accent" },
      { label: "Records synced / day", value: "42 M" },
    ],
    columns: ["System", "Category", "Mode", "Records"],
    rows: [],
    capabilities: [
      "Bi-directional ERP sync",
      "Change data capture",
      "Field-level mapping and transforms",
      "Secrets vault and key rotation",
      "Retry, backoff and dead-letter queues",
      "Per-connector audit logging",
    ],
    aiInsight:
      "SAP S/4HANA delta sync latency rose to 92 seconds at peak. Recommendation: partition the material master extractor by plant.",
  },
  {
    slug: "security",
    group: "Platform",
    title: "Security",
    description:
      "Zero-trust access, data residency, PII redaction, prompt-injection defence, model guardrails and complete AI audit trails.",
    icon: Lock,
    kpis: [
      { label: "Guardrail blocks (30d)", value: "1,284", tone: "warning" },
      { label: "PII redactions", value: "48,210", tone: "success" },
      { label: "MFA coverage", value: "100%", tone: "accent" },
      { label: "Open findings", value: "3" },
    ],
    columns: ["Control", "Owner", "Domain", "Status"],
    rows: [
      { primary: "Prompt-injection detection on all inbound documents", secondary: "D. Menon", meta: "AI Safety", value: "Active", status: "Live" },
      { primary: "PII and commercial-secret redaction before model calls", secondary: "D. Menon", meta: "Data Protection", value: "Active", status: "Live" },
      { primary: "Role-based access to department knowledge partitions", secondary: "IT Security", meta: "Access", value: "Enforced", status: "Live" },
      { primary: "Data residency — India and EU regions pinned", secondary: "IT Security", meta: "Residency", value: "Enforced", status: "Live" },
      { primary: "Model output grounding and refusal policy", secondary: "AI CoE", meta: "AI Safety", value: "v14", status: "Live" },
      { primary: "Quarterly red-team of agent tool permissions", secondary: "AI CoE", meta: "Assurance", value: "Q3 pending", status: "In Build" },
    ],
    capabilities: [
      "Immutable AI audit log",
      "Tool-permission least privilege",
      "Jailbreak and injection defence",
      "Secrets rotation and vaulting",
      "Anomalous usage detection",
      "Human override on every autonomous action",
    ],
    aiInsight:
      "Guardrail blocks are concentrated in inbound customer email attachments — 82% are benign template artefacts. Tuning the classifier cuts noise by half.",
  },
  {
    slug: "administration",
    group: "Platform",
    title: "Administration",
    description:
      "Tenancy, users, roles, departments, model routing policy, cost controls and the AI Center of Excellence operating model.",
    icon: Settings2,
    kpis: [
      { label: "Users", value: "6,420" },
      { label: "Roles", value: "38" },
      { label: "Monthly AI spend", value: "$34,180", tone: "warning" },
      { label: "Budget utilisation", value: "68%", tone: "success" },
    ],
    columns: ["Setting", "Owner", "Scope", "Value"],
    rows: [
      { primary: "Model routing policy — cost-optimised with quality floor", secondary: "AI CoE", meta: "Global", value: "v9", status: "Live" },
      { primary: "Per-department token budgets", secondary: "Finance", meta: "44 functions", value: "Enforced", status: "Live" },
      { primary: "Autonomy ceiling for financial agents", secondary: "CFO Office", meta: "Finance cluster", value: "₹5 L", status: "Live" },
      { primary: "Retention policy for conversation memory", secondary: "Legal", meta: "Global", value: "90 days", status: "Live" },
      { primary: "New agent approval workflow", secondary: "AI CoE", meta: "Governance", value: "3-stage", status: "Live" },
      { primary: "Sandbox tenancy for prompt experimentation", secondary: "AI CoE", meta: "Non-production", value: "Enabled", status: "In Build" },
    ],
    capabilities: [
      "SSO and SCIM provisioning",
      "Granular role and permission design",
      "Per-agent cost attribution",
      "Change management and release notes",
      "Prompt version registry",
      "Usage quotas and alerts",
    ],
    aiInsight:
      "Routing 41% of low-complexity extraction traffic to a smaller model preserves quality above the floor and reduces monthly spend by an estimated $9,200.",
  },
  {
    slug: "settings",
    group: "Platform",
    title: "Settings",
    description:
      "Personal workspace preferences — interface density, language, notification routing, copilot behaviour and default department context.",
    icon: SlidersHorizontal,
    kpis: [
      { label: "Profile completeness", value: "92%", tone: "success" },
      { label: "Connected channels", value: "4" },
      { label: "Saved views", value: "18", tone: "accent" },
      { label: "Copilot memory", value: "90 days" },
    ],
    columns: ["Preference", "Scope", "Category", "Value"],
    rows: [
      { primary: "Default department context", secondary: "Personal", meta: "Copilot", value: "Sales & Commercial", status: "Live" },
      { primary: "Answer style", secondary: "Personal", meta: "Copilot", value: "Concise + citations", status: "Live" },
      { primary: "Notification routing", secondary: "Personal", meta: "Channels", value: "Teams + email", status: "Live" },
      { primary: "Interface language", secondary: "Personal", meta: "Localisation", value: "English (IN)", status: "Live" },
      { primary: "Approval digest", secondary: "Personal", meta: "Workflow", value: "Twice daily", status: "Live" },
      { primary: "Data export permission", secondary: "Role-derived", meta: "Security", value: "Restricted", status: "Paused" },
    ],
    capabilities: [
      "Per-user copilot tuning",
      "Saved filters and dashboards",
      "Notification quiet hours",
      "Language and locale",
      "Keyboard-first navigation",
      "Accessibility preferences",
    ],
    aiInsight:
      "You approve 78% of quotation requests without edits. Enabling auto-approval below ₹5 L would remove roughly 40 interactions a week.",
  },
];

const BASE_MODULE_MAP: Record<string, ModuleConfig> = Object.fromEntries(
  MODULES.map((m) => [m.slug, m]),
);

export function formatTitleFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const DYNAMIC_SLUGS_CONFIG: Record<string, { group: string; desc: string; icon: LucideIcon; kpis: ModuleKpi[]; cols: [string, string, string, string]; rows: ModuleRow[]; caps: string[]; insight: string }> = {};

export const MODULE_MAP: Record<string, ModuleConfig> = new Proxy(BASE_MODULE_MAP, {
  get(target, prop: string) {
    if (prop in target) return target[prop];
    if (DYNAMIC_SLUGS_CONFIG[prop]) {
      const cfg = DYNAMIC_SLUGS_CONFIG[prop];
      return {
        slug: prop,
        group: cfg.group,
        title: formatTitleFromSlug(prop),
        description: cfg.desc,
        icon: cfg.icon,
        kpis: cfg.kpis,
        columns: cfg.cols,
        rows: cfg.rows,
        capabilities: cfg.caps,
        aiInsight: cfg.insight,
      };
    }
    const formattedTitle = formatTitleFromSlug(prop);
    return {
      slug: prop,
      group: "Enterprise Workspace",
      title: formattedTitle,
      description: `Enterprise AI control workspace for ${formattedTitle} in plastic & polymer manufacturing. Integrated with Company Brain, ERP, and active agents.`,
      icon: BookOpen,
      kpis: [
        { label: `${formattedTitle} Active Records`, value: "1,420", delta: "+12% MoM" },
        { label: "AI Process Accuracy", value: "98.2%", tone: "success" },
        { label: "Cycle Time Reduction", value: "64%", tone: "accent" },
        { label: "Automated Workflows", value: "18 Live", tone: "primary" },
      ],
      columns: ["Record Name", "Owner / Agent", "Domain", "Status"],
      rows: [
        { primary: `${formattedTitle} System Configuration`, secondary: "System Admin", meta: "Core Module", value: "Active", status: "Live" },
        { primary: `${formattedTitle} Process Verification Standard`, secondary: "AI Agent", meta: "Automated Rule", value: "Validated", status: "Validated" },
        { primary: `${formattedTitle} Compliance Audit Trail`, secondary: "Governance Desk", meta: "ISO Enforced", value: "Compliant", status: "Optimised" },
        { primary: `${formattedTitle} Performance Index Q3`, secondary: "Analytics Engine", meta: "Realtime", value: "Normal", status: "Live" },
      ],
      capabilities: [
        `Automated ${formattedTitle} data extraction and validation`,
        `Real-time integration with SAP S/4HANA & MES`,
        `AI copilot context grounding and report authoring`,
        `SLA tracking and proactive anomaly detection`,
      ],
      aiInsight: `AI monitoring detected peak operational efficiency in ${formattedTitle}. Straight-through execution rate is currently at 96.4%.`,
    };
  },
});

