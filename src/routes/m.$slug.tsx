import { createFileRoute, notFound } from "@tanstack/react-router";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { KpiCard, PageHeader, Panel, StatusPill, PageFooter } from "@/components/ui-kit";
import { MODULE_MAP } from "@/data/modules";
import { integrations } from "@/data/platform";

export const Route = createFileRoute("/m/$slug")({
  loader: ({ params }) => {
    if (!MODULE_MAP[params.slug]) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const mod = loaderData ? MODULE_MAP[loaderData.slug] : undefined;
    if (!mod) {
      return { meta: [{ title: "Module unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { title, description } = mod;
    const t = `${title} — AI Command Center`;
    return {
      meta: [
        { title: t },
        { name: "description", content: description.slice(0, 155) },
        { property: "og:title", content: t },
        { property: "og:description", content: description.slice(0, 155) },
      ],
    };
  },
  component: ModulePage,
});

function ModulePage() {
  const { slug } = Route.useLoaderData();
  const mod = MODULE_MAP[slug]!;
  const Icon = mod.icon;

  const rows =
    mod.slug === "integrations"
      ? integrations.map((i) => ({
          primary: i.name,
          secondary: i.category,
          meta: i.status === "Connected" ? "Bi-directional" : "Not configured",
          value: i.records,
          status: i.status,
        }))
      : mod.rows;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={mod.group}
        title={mod.title}
        description={mod.description}
        breadcrumbs={[{ label: mod.group }, { label: mod.title }]}
        actions={
          <span className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#F6F8FB] px-3.5 py-2 text-xs font-bold text-[#163B65]">
            <Icon className="h-4 w-4 text-[#00A99D]" /> {mod.group} Module
          </span>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {mod.kpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} {...(k.delta ? { delta: k.delta } : {})} {...(k.tone ? { tone: k.tone } : {})} />
        ))}
      </div>

      <Panel className="border-[#00A99D]/30 bg-[#00A99D]/5">
        <div className="flex items-start gap-3">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#00A99D] text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#163B65]">Contextual AI Insight</p>
            <p className="mt-1 text-xs leading-relaxed text-[#1F2937] font-medium">{mod.aiInsight}</p>
          </div>
        </div>
      </Panel>

      <Panel title={`${mod.title} Master Records`} subtitle="Synchronized live from enterprise core databases">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase tracking-wider text-[#6B7280] bg-[#F6F8FB]">
              <tr>
                {mod.columns.map((c) => (
                  <th key={c} className="p-3 font-bold">{c}</th>
                ))}
                <th className="p-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {rows.map((r) => (
                <tr key={r.primary} className="hover:bg-[#F6F8FB] transition-colors">
                  <td className="p-3 font-bold text-[#163B65]">{r.primary}</td>
                  <td className="p-3 text-[#6B7280] font-medium">{r.secondary}</td>
                  <td className="p-3 text-[#6B7280] font-medium">{r.meta}</td>
                  <td className="p-3 font-semibold text-[#1F2937]">{r.value}</td>
                  <td className="p-3"><StatusPill status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <PageFooter />
    </div>
  );
}


