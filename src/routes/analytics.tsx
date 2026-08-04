import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { KpiCard, PageHeader, Panel, RightPanel, PageFooter } from "@/components/ui-kit";
import { aiUsageSplit, automationTrend, DEPARTMENTS, MONTHS } from "@/data/platform";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — AI, Business & Operational Intelligence" },
      {
        name: "description",
        content: "AI, business, operational, executive, financial, departmental, risk and predictive analytics for polymer manufacturing.",
      },
      { property: "og:title", content: "Analytics" },
      { property: "og:description", content: "Cross-enterprise analytics for a polymer manufacturing group." },
    ],
  }),
  component: Analytics,
});

const tt = {
  contentStyle: {
    background: "#FFFFFF",
    border: "1px solid #D9E2EC",
    borderRadius: 10,
    fontSize: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
} as const;

const forecast = MONTHS.map((m, i) => ({
  month: m,
  actual: i < 8 ? 88 + i * 4 + (i % 3) * 3 : null,
  predicted: 88 + i * 4.4,
}));

const radar = ["Commercial", "Finance", "Quality", "Supply Chain", "Operations", "Compliance"].map((k, i) => ({
  area: k,
  score: 62 + ((i * 13) % 33),
}));

const COLORS = ["#1E5AA8", "#0F8B8D", "#2E8B57", "#F4A300", "#D64545", "#64748B"];

function Analytics() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Business Intelligence"
        title="Enterprise Analytics & Intelligence"
        description="A single analytical fabric spanning AI performance, business outcomes, plant operations, finance, risk and predictive forecasting."
        breadcrumbs={[{ label: "Business Intelligence", to: "/analytics" }, { label: "Analytics" }]}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="AI Requests / Day" value="284K" delta="+22% MoM" />
        <KpiCard label="Cost per Request" value="$0.0041" delta="-31% after routing" tone="success" />
        <KpiCard label="Forecast Accuracy" value="93.2%" delta="Demand, 8-wk horizon" tone="accent" />
        <KpiCard label="Risk Exposure" value="₹6.4 Cr" delta="Modelled, 90-day" tone="warning" />
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <Panel className="lg:col-span-2" title="Predictive Demand vs Actual Intake" subtitle="Indexed order intake, 12-month horizon">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={forecast}>
                <defs>
                  <linearGradient id="pf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00A99D" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#00A99D" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="predicted" name="Predicted" stroke="#00A99D" fill="url(#pf)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="actual" name="Actual" stroke="#163B65" fill="transparent" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="AI Maturity Radar" subtitle="Composite adoption & outcome score">
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radar}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="area" tick={{ fill: "#6B7280", fontSize: 11 }} />
                <Radar dataKey="score" stroke="#163B65" fill="#163B65" fillOpacity={0.25} />
                <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </Panel>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Panel className="lg:col-span-2" title="Annual Savings Released by Function" subtitle="Top 12 business functions (₹ Lakhs)">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={DEPARTMENTS.slice(0, 12).map((d) => ({ name: d.name.split(" ")[0], value: Math.round(d.annualSavings / 100000) }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="value" fill="#163B65" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="AI Consumption Mix" subtitle="Compute spend by workload type">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={aiUsageSplit} dataKey="value" nameKey="name" outerRadius={90}>
                  {aiUsageSplit.map((_, i) => (
                    <Cell key={i} fill={["#163B65", "#00A99D", "#4B7EA8", "#F5A623", "#E74C3C", "#6B7280"][i % 6]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </Panel>
        </div>

        <Panel title="Group AI Adoption Curve" subtitle="Percentage of total eligible business users active weekly">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={automationTrend}>
              <defs>
                <linearGradient id="ad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#163B65" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#163B65" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#6B7280" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="adoption" name="Adoption %" stroke="#163B65" fill="url(#ad)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <PageFooter />
    </div>
  );
}

