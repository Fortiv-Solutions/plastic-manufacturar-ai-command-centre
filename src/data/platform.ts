import {
  LayoutDashboard,
  Crown,
  Bot,
  Sparkles,
  Building2,
  Zap,
  Workflow,
  BrainCircuit,
  FileSearch,
  CheckSquare,
  ListTodo,
  FolderKanban,
  BookOpen,
  FileBarChart,
  LineChart,
  ShieldAlert,
  ScrollText,
  BadgeCheck,
  Users,
  Truck,
  Boxes,
  Factory,
  Plug,
  Lock,
  Settings2,
  SlidersHorizontal,
  Compass,
  Cpu,
  Layers,
  Database,
  FileCode,
  Calendar,
  Bell,
  Activity,
  ShieldCheck,
  Scale,
  Search,
  FileText,
  BarChart3,
  UserCheck,
  History,
  ClipboardList,
  TrendingUp,
  Sliders,
  type LucideIcon,
} from "lucide-react";

export type WorkspaceItem = {
  label: string;
  to: string;
  slug?: string;
  icon: LucideIcon;
  badge?: string;
};

export type Workspace = {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  badge?: string;
  items: WorkspaceItem[];
};

export const WORKSPACES: Workspace[] = [
  {
    id: "executive",
    name: "Executive",
    icon: Crown,
    description: "Dashboard & Executive Cockpit",
    items: [
      { label: "Dashboard", to: "/", icon: LayoutDashboard },
      { label: "Executive Cockpit", to: "/cockpit", icon: Crown },
    ],
  },
  {
    id: "ai-workspace",
    name: "AI Workspace",
    icon: Sparkles,
    description: "AI Agents, Copilots, Automations & Workflow Studio",
    items: [
      { label: "AI Agents", to: "/agents", icon: Bot },
      { label: "AI Copilots", to: "/copilots", icon: Sparkles },
      { label: "Automation Center", to: "/automation", icon: Zap },
      { label: "Workflow Studio", to: "/workflow-studio", icon: Workflow },
    ],
  },
  {
    id: "knowledge",
    name: "Knowledge",
    icon: BrainCircuit,
    description: "Company Brain, Document Intelligence & Knowledge Center",
    items: [
      { label: "Company Brain", to: "/company-brain", icon: BrainCircuit },
      { label: "Document Intelligence", to: "/documents", icon: FileSearch },
      { label: "Knowledge Center", to: "/m/knowledge-center", slug: "knowledge-center", icon: BookOpen },
    ],
  },
  {
    id: "operations",
    name: "Operations",
    icon: Building2,
    description: "Departments, Plants & Quality",
    items: [
      { label: "Departments", to: "/departments", icon: Building2 },
      { label: "Plants", to: "/m/plants", slug: "plants", icon: Factory },
      { label: "Quality", to: "/m/quality", slug: "quality", icon: BadgeCheck },
    ],
  },
  {
    id: "business",
    name: "Business",
    icon: TrendingUp,
    description: "Customers, Vendors & Products",
    items: [
      { label: "Customers", to: "/m/customers", slug: "customers", icon: Users },
      { label: "Vendors", to: "/m/vendors", slug: "vendors", icon: Truck },
      { label: "Products", to: "/m/products", slug: "products", icon: Boxes },
    ],
  },
  {
    id: "work-management",
    name: "Work Management",
    icon: ListTodo,
    description: "Approvals, Tasks & Projects",
    items: [
      { label: "Approvals", to: "/approvals", icon: CheckSquare },
      { label: "Tasks", to: "/m/tasks", slug: "tasks", icon: ListTodo },
      { label: "Projects", to: "/m/projects", slug: "projects", icon: FolderKanban },
    ],
  },
  {
    id: "insights",
    name: "Insights",
    icon: FileBarChart,
    description: "Reports & Analytics",
    items: [
      { label: "Reports", to: "/m/reports", slug: "reports", icon: FileBarChart },
      { label: "Analytics", to: "/analytics", icon: LineChart },
    ],
  },
  {
    id: "governance",
    name: "Governance",
    icon: ShieldCheck,
    description: "Compliance & Risk Center",
    items: [
      { label: "Compliance", to: "/m/compliance", slug: "compliance", icon: ScrollText },
      { label: "Risk Center", to: "/m/risk-center", slug: "risk-center", icon: ShieldAlert },
    ],
  },
  {
    id: "platform",
    name: "Platform",
    icon: Settings2,
    description: "Integrations, Security, Administration & Settings",
    items: [
      { label: "Integrations", to: "/m/integrations", slug: "integrations", icon: Plug },
      { label: "Security", to: "/m/security", slug: "security", icon: Lock },
      { label: "Administration", to: "/m/administration", slug: "administration", icon: Settings2 },
      { label: "Settings", to: "/m/settings", slug: "settings", icon: SlidersHorizontal },
    ],
  },
];

export type NavItem = {
  label: string;
  to: string;
  slug?: string;
  icon: LucideIcon;
  group: string;
};

export const NAV_ITEMS: NavItem[] = WORKSPACES.flatMap((w) =>
  w.items.map((i) => ({
    label: i.label,
    to: i.to,
    slug: i.slug,
    icon: i.icon,
    group: w.name,
  }))
);

export const NAV_GROUPS = WORKSPACES.map((w) => w.name);


/* ------------------------------------------------------------------ */
/* Departments — 44 assessed business functions                        */
/* ------------------------------------------------------------------ */

export type Department = {
  id: string;
  name: string;
  cluster: string;
  head: string;
  agents: number;
  automations: number;
  adoption: number;
  hoursSaved: number;
  annualSavings: number;
  maturity: "Piloting" | "Scaling" | "Optimised" | "Assessment";
};

const DEPT_SEED: [string, string, string][] = [
  ["Executive & Board Office", "Corporate", "R. Malhotra"],
  ["Strategy & Transformation", "Corporate", "A. Desai"],
  ["Sales & Commercial", "Commercial", "S. Iyer"],
  ["Export & International Business", "Commercial", "K. Fernandes"],
  ["Key Account Management", "Commercial", "M. Rao"],
  ["Marketing & Brand", "Commercial", "P. Nanda"],
  ["Business Development", "Commercial", "V. Shetty"],
  ["Customer Support", "Commercial", "N. Kulkarni"],
  ["Estimation & Costing", "Commercial", "T. Bhat"],
  ["Contracts & Tendering", "Commercial", "J. Menon"],
  ["Procurement & Sourcing", "Supply Chain", "D. Kapoor"],
  ["Resin & Polymer Buying", "Supply Chain", "H. Joshi"],
  ["Vendor Development", "Supply Chain", "L. Pillai"],
  ["Production Planning", "Operations", "G. Sharma"],
  ["Material Planning (MRP)", "Operations", "B. Chandra"],
  ["Warehouse & Stores", "Supply Chain", "R. Naik"],
  ["Logistics & Dispatch", "Supply Chain", "S. Ahuja"],
  ["Injection Moulding Ops", "Operations", "A. Verma"],
  ["Extrusion & Pipes Ops", "Operations", "C. Dutta"],
  ["Blow Moulding & PET", "Operations", "F. Qureshi"],
  ["Thermoforming & Packaging", "Operations", "M. Ghosh"],
  ["Masterbatch & Compounding", "Operations", "Y. Prasad"],
  ["Recycling & Circularity", "Operations", "I. Saxena"],
  ["Tool Room Documentation", "Engineering", "U. Bansal"],
  ["Engineering Documentation", "Engineering", "O. Krishnan"],
  ["Maintenance Documentation", "Engineering", "E. Thomas"],
  ["Quality Assurance", "Quality", "N. Reddy"],
  ["Quality Control & Lab", "Quality", "S. Bose"],
  ["Customer Complaints & CAPA", "Quality", "R. Jain"],
  ["PPAP & APQP", "Quality", "D. Mistry"],
  ["Regulatory Affairs", "Compliance", "A. Kaul"],
  ["Food Contact & Medical Compliance", "Compliance", "P. Sinha"],
  ["EHS & Sustainability", "Compliance", "T. Roy"],
  ["ISO & Management Systems", "Compliance", "K. Sahu"],
  ["Finance & Accounts", "Finance", "V. Agarwal"],
  ["Accounts Payable", "Finance", "M. Kaur"],
  ["Accounts Receivable", "Finance", "S. Patel"],
  ["Costing & Profitability", "Finance", "H. Nair"],
  ["Internal Audit & Controls", "Finance", "L. Dias"],
  ["Human Resources", "People", "R. Chopra"],
  ["Training & Capability", "People", "Z. Ali"],
  ["Legal & Compliance Desk", "Corporate", "G. Bhattacharya"],
  ["Information Technology", "Platform", "A. Sundaram"],
  ["R&D and New Product Development", "Engineering", "N. Varma"],
];

const MATURITY: Department["maturity"][] = ["Optimised", "Scaling", "Piloting", "Assessment"];

export const DEPARTMENTS: Department[] = DEPT_SEED.map(([name, cluster, head], i) => ({
  id: slugify(name),
  name,
  cluster,
  head,
  agents: 2 + ((i * 3) % 7),
  automations: 4 + ((i * 5) % 11),
  adoption: 46 + ((i * 7) % 52),
  hoursSaved: 120 + ((i * 137) % 900),
  annualSavings: 1_800_000 + ((i * 971_000) % 22_000_000),
  maturity: MATURITY[i % 4]!,
}));

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/* ------------------------------------------------------------------ */
/* AI Agents                                                           */
/* ------------------------------------------------------------------ */

export type Agent = {
  id: string;
  name: string;
  department: string;
  owner: string;
  status: "Running" | "Idle" | "Paused" | "Draft";
  health: number;
  runs: number;
  accuracy: number;
  tokens: number;
  cost: number;
  latency: number;
  model: string;
  systems: string[];
};

const AGENT_NAMES = [
  "Executive AI Assistant",
  "Board Report Generator",
  "MIS Generator",
  "AI Sales Copilot",
  "Quotation Generator",
  "RFQ Analyzer",
  "Tender Analyzer",
  "Proposal Generator",
  "CRM Automation",
  "Marketing Assistant",
  "Translation Agent",
  "Content Generator",
  "Business Development Assistant",
  "Technical Support Agent",
  "Customer Service Agent",
  "Complaint Resolution Agent",
  "Warranty Assistant",
  "Procurement Copilot",
  "Purchase Order Agent",
  "Vendor Intelligence Agent",
  "Vendor Evaluation Agent",
  "Inventory Planner",
  "Demand Forecast Agent",
  "Warehouse Agent",
  "Logistics Agent",
  "Dispatch Agent",
  "Production Planning Assistant",
  "Material Requirement Agent",
  "Finance Assistant",
  "Accounts Payable Agent",
  "Accounts Receivable Agent",
  "Costing Engine",
  "Invoice Processing Agent",
  "Expense Audit Agent",
  "Internal Audit Agent",
  "Quality Copilot",
  "CAPA Agent",
  "NCR Agent",
  "PPAP Generator",
  "Compliance Assistant",
  "Regulatory Agent",
  "EHS Assistant",
  "ISO Documentation Agent",
  "HR Assistant",
  "Recruitment Agent",
  "Payroll Assistant",
  "Training Assistant",
  "Legal Assistant",
  "Contract Review Agent",
  "Engineering Documentation Agent",
  "Maintenance Documentation Agent",
  "Laboratory Documentation Agent",
  "R&D Assistant",
  "Masterbatch Assistant",
  "Tool History Agent",
  "Knowledge Agent",
  "Document Intelligence Agent",
  "Approval Agent",
  "Workflow Agent",
  "Meeting Assistant",
  "Email Assistant",
  "Company Brain Agent",
  "Administration Assistant",
];

const MODELS = ["GPT-5.5", "Claude Sonnet 4.6", "Gemini 3.6 Flash", "Azure OpenAI o5"];
const STATUSES: Agent["status"][] = ["Running", "Running", "Idle", "Paused", "Draft"];
const SYSTEMS = ["SAP S/4HANA", "Salesforce", "SharePoint", "Microsoft 365", "PostgreSQL", "Qdrant", "Teams", "Power BI"];

export const AGENTS: Agent[] = AGENT_NAMES.map((name, i) => ({
  id: slugify(name),
  name,
  department: DEPARTMENTS[(i * 5) % DEPARTMENTS.length]!.name,
  owner: DEPARTMENTS[(i * 5) % DEPARTMENTS.length]!.head,
  status: STATUSES[i % STATUSES.length]!,
  health: 82 + ((i * 13) % 18),
  runs: 240 + ((i * 733) % 18_000),
  accuracy: 89 + ((i * 7) % 11),
  tokens: 1_200_000 + ((i * 431_000) % 40_000_000),
  cost: 240 + ((i * 91) % 4300),
  latency: 0.8 + ((i * 17) % 42) / 10,
  model: MODELS[i % MODELS.length]!,
  systems: [SYSTEMS[i % 8]!, SYSTEMS[(i + 3) % 8]!, SYSTEMS[(i + 5) % 8]!],
}));

/* ------------------------------------------------------------------ */
/* 306 Automation opportunities                                        */
/* ------------------------------------------------------------------ */

export type Automation = {
  id: string;
  code: string;
  name: string;
  department: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  complexity: "Low" | "Medium" | "High";
  status: "Live" | "In Build" | "Approved" | "Backlog" | "Assessment";
  wave: 1 | 2 | 3 | 4;
  roi: number;
  hoursPerMonth: number;
  annualSavings: number;
  progress: number;
  owner: string;
  timeline: string;
};

const ACTIONS = [
  "Auto-extraction of",
  "AI drafting of",
  "Automated validation of",
  "Intelligent routing of",
  "AI summarisation of",
  "Auto-generation of",
  "Anomaly detection in",
  "Auto-classification of",
  "Zero-touch approval for",
  "AI reconciliation of",
];
const OBJECTS = [
  "customer RFQ packages",
  "resin price quotations",
  "PPAP submission packs",
  "CAPA investigations",
  "NCR dispositions",
  "supplier invoices",
  "export documentation",
  "material safety data sheets",
  "tool history cards",
  "ISO audit evidence",
  "production plan changes",
  "MIS board packs",
  "purchase requisitions",
  "customer drawings",
  "migration statements",
  "REACH / RoHS declarations",
  "quality inspection reports",
  "payroll queries",
  "maintenance logbooks",
  "contract clauses",
  "masterbatch formulations",
  "recycled content declarations",
];

const PRIORITIES: Automation["priority"][] = ["Critical", "High", "High", "Medium", "Medium", "Low"];
const COMPLEXITY: Automation["complexity"][] = ["Low", "Medium", "High"];
const AUTO_STATUS: Automation["status"][] = ["Live", "In Build", "Approved", "Backlog", "Assessment"];
const TIMELINES = ["Month 1-3", "Month 4-6", "Month 7-9", "Month 10-12"];

export const AUTOMATIONS: Automation[] = Array.from({ length: 306 }, (_, i) => {
  const dept = DEPARTMENTS[i % DEPARTMENTS.length]!;
  const wave = ((i % 4) + 1) as Automation["wave"];
  const status = AUTO_STATUS[i % AUTO_STATUS.length]!;
  return {
    id: `aut-${String(i + 1).padStart(3, "0")}`,
    code: `POL-${String(i + 1).padStart(3, "0")}`,
    name: `${ACTIONS[i % ACTIONS.length]!} ${OBJECTS[(i * 3) % OBJECTS.length]!}`,
    department: dept.name,
    priority: PRIORITIES[i % PRIORITIES.length]!,
    complexity: COMPLEXITY[i % 3]!,
    status,
    wave,
    roi: 120 + ((i * 37) % 640),
    hoursPerMonth: 20 + ((i * 29) % 380),
    annualSavings: 400_000 + ((i * 317_000) % 14_000_000),
    progress: status === "Live" ? 100 : status === "In Build" ? 30 + ((i * 7) % 60) : status === "Approved" ? 10 : 0,
    owner: dept.head,
    timeline: TIMELINES[wave - 1]!,
  };
});

/* ------------------------------------------------------------------ */
/* Charts + feeds                                                      */
/* ------------------------------------------------------------------ */

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const automationTrend = MONTHS.map((m, i) => ({
  month: m,
  live: 8 + i * 9 + (i % 3) * 4,
  hoursSaved: 900 + i * 780 + (i % 4) * 260,
  adoption: 22 + i * 5.4,
}));

export const resinPriceTrend = MONTHS.map((m, i) => ({
  month: m,
  PP: 92 + Math.round(Math.sin(i / 1.7) * 9) + i,
  HDPE: 104 + Math.round(Math.cos(i / 2.1) * 11),
  PET: 88 + Math.round(Math.sin(i / 2.6) * 7) + i / 2,
  PVC: 79 + Math.round(Math.cos(i / 1.4) * 6),
}));

export const departmentEfficiency = DEPARTMENTS.slice(0, 10).map((d) => ({
  name: d.name.split(" ")[0],
  before: 100,
  after: 100 - Math.round(d.adoption / 2),
}));

export const aiUsageSplit = [
  { name: "Document Intelligence", value: 32 },
  { name: "Copilot Conversations", value: 26 },
  { name: "Agent Workflows", value: 22 },
  { name: "Company Brain Search", value: 13 },
  { name: "Analytics & Reports", value: 7 },
];

export const activityFeed = [
  { agent: "Quotation Generator", text: "Generated quotation QTN-2891 for Nova Beverages (PET 1L preform)", time: "12s ago", tone: "success" },
  { agent: "RFQ Analyzer", text: "Parsed 14-page RFQ from Renault Nissan — 3 clarifications flagged", time: "48s ago", tone: "info" },
  { agent: "Compliance Assistant", text: "Migration statement validated against EU 10/2011 Annex I", time: "2m ago", tone: "success" },
  { agent: "Accounts Payable Agent", text: "Blocked invoice INV-77321 — price variance 6.4% vs PO", time: "4m ago", tone: "warning" },
  { agent: "CAPA Agent", text: "Root-cause draft ready for CAPA-0442 (short shot, Cav 4)", time: "7m ago", tone: "info" },
  { agent: "Resin Buying Copilot", text: "HDPE spot price down 3.1% — recommends advancing Sep buy", time: "11m ago", tone: "success" },
  { agent: "PPAP Generator", text: "PPAP Level 3 pack assembled for Part 44-9021 (18 documents)", time: "16m ago", tone: "info" },
  { agent: "Internal Audit Agent", text: "Detected 2 duplicate vendor payments in Q3 ledger", time: "22m ago", tone: "warning" },
];

export const approvals = [
  { id: "APR-4412", title: "Capex — 650T injection moulding tool set", dept: "Tool Room Documentation", amount: 8_400_000, sla: "4h left", risk: "Medium", requester: "U. Bansal" },
  { id: "APR-4413", title: "Resin contract — 900 MT HDPE Q4 lock-in", dept: "Resin & Polymer Buying", amount: 84_500_000, sla: "1h left", risk: "High", requester: "H. Joshi" },
  { id: "APR-4414", title: "Quotation approval — Medical device housing", dept: "Estimation & Costing", amount: 12_100_000, sla: "9h left", risk: "Low", requester: "T. Bhat" },
  { id: "APR-4415", title: "CAPA closure — Customer complaint CC-1188", dept: "Customer Complaints & CAPA", amount: 0, sla: "2d left", risk: "Medium", requester: "R. Jain" },
  { id: "APR-4416", title: "Vendor onboarding — Masterbatch supplier (Vietnam)", dept: "Vendor Development", amount: 0, sla: "3d left", risk: "Medium", requester: "L. Pillai" },
  { id: "APR-4417", title: "Credit note — Export shipment short-landing", dept: "Accounts Receivable", amount: 1_950_000, sla: "6h left", risk: "High", requester: "S. Patel" },
];

export const documents = [
  { id: "DOC-99001", name: "RFQ_NovaBeverages_PET1L.pdf", type: "RFQ", pages: 14, confidence: 97, status: "Extracted", dept: "Sales & Commercial" },
  { id: "DOC-99002", name: "SDS_Masterbatch_BlueX44.pdf", type: "Safety Data Sheet", pages: 9, confidence: 99, status: "Validated", dept: "EHS & Sustainability" },
  { id: "DOC-99003", name: "PPAP_Part449021_Level3.zip", type: "PPAP Package", pages: 132, confidence: 94, status: "In Review", dept: "PPAP & APQP" },
  { id: "DOC-99004", name: "Invoice_ReliancePoly_88213.pdf", type: "Invoice", pages: 2, confidence: 99, status: "Posted", dept: "Accounts Payable" },
  { id: "DOC-99005", name: "TDS_HDPE_PE100_PipeGrade.pdf", type: "Technical Data Sheet", pages: 6, confidence: 98, status: "Indexed", dept: "R&D and New Product Development" },
  { id: "DOC-99006", name: "REACH_SVHC_Declaration_2026.docx", type: "Declaration", pages: 4, confidence: 96, status: "Validated", dept: "Regulatory Affairs" },
  { id: "DOC-99007", name: "Drawing_HousingRevD.pdf", type: "Customer Drawing", pages: 3, confidence: 92, status: "Compared", dept: "Engineering Documentation" },
  { id: "DOC-99008", name: "NCR_0921_ShortShot.xlsx", type: "NCR", pages: 1, confidence: 95, status: "Routed", dept: "Quality Control & Lab" },
];

export const integrations = [
  { name: "SAP S/4HANA", category: "ERP", status: "Connected", records: "4.2M" },
  { name: "Oracle Fusion", category: "ERP", status: "Connected", records: "880K" },
  { name: "Microsoft Dynamics", category: "ERP", status: "Available", records: "—" },
  { name: "Salesforce", category: "CRM", status: "Connected", records: "312K" },
  { name: "HubSpot", category: "CRM", status: "Available", records: "—" },
  { name: "Zoho", category: "CRM", status: "Available", records: "—" },
  { name: "Microsoft 365", category: "Productivity", status: "Connected", records: "9.1M" },
  { name: "SharePoint", category: "Content", status: "Connected", records: "1.8M" },
  { name: "Teams", category: "Collaboration", status: "Connected", records: "440K" },
  { name: "Slack", category: "Collaboration", status: "Available", records: "—" },
  { name: "Power BI", category: "BI", status: "Connected", records: "—" },
  { name: "Tableau", category: "BI", status: "Available", records: "—" },
  { name: "PostgreSQL", category: "Database", status: "Connected", records: "22M" },
  { name: "SQL Server", category: "Database", status: "Connected", records: "6.4M" },
  { name: "Supabase", category: "Database", status: "Connected", records: "1.1M" },
  { name: "Qdrant", category: "Vector DB", status: "Connected", records: "18M vectors" },
  { name: "AWS", category: "Cloud", status: "Connected", records: "—" },
  { name: "Azure", category: "Cloud", status: "Connected", records: "—" },
];

export const SEGMENTS = [
  "Injection Moulding",
  "Blow Moulding",
  "Extrusion",
  "Thermoforming",
  "Rotational Moulding",
  "PET Bottles",
  "Flexible Packaging",
  "Rigid Packaging",
  "PVC Pipes",
  "HDPE Pipes",
  "CPVC Pipes",
  "Plastic Components",
  "Automotive Plastics",
  "Medical Plastics",
  "Consumer Plastics",
  "Industrial Plastics",
  "Engineering Plastics",
  "Masterbatch",
  "Polymer Compounding",
  "Plastic Recycling",
  "Export Manufacturing",
  "Contract Manufacturing",
];

export const inr = (v: number) =>
  v >= 10_000_000
    ? `₹${(v / 10_000_000).toFixed(2)} Cr`
    : v >= 100_000
      ? `₹${(v / 100_000).toFixed(1)} L`
      : `₹${v.toLocaleString("en-IN")}`;
