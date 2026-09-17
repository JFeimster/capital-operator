import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check, Copy, ExternalLink, RotateCcw, Share2 } from 'lucide-react';
import type { PublicToolDefinition } from '../../config/publicTools';
import { PUBLIC_TOOLS } from '../../config/publicTools';
import { calculatePublicTool, type PublicToolInput } from '../../lib/publicTools';
import { SEOHead } from '../site/SEOHead';
import { trackEvent } from '../../lib/analytics';
import { ANALYTICS_EVENTS } from '../../config/analyticsEvents';
import { getAttribution } from '../../lib/attribution';
import { TALLY_ROUTES } from '../../config/tally';
import { OPERATOR_TOOLS_PORTAL } from '../../config/ctas';
import { setHashRoute } from '../../lib/urlState';

const formatInput = (value: unknown) => Array.isArray(value) ? value.join(', ') : String(value ?? '');
const multiValue = (input: PublicToolInput, key: string): string[] => {
  const value = input[key];
  return Array.isArray(value) ? value : [];
};

function handoffUrl(tool: PublicToolDefinition, resultVariant: string) {
  const destination = tool.primaryCta === 'partner' ? TALLY_ROUTES.partner.url : tool.primaryCta === 'tools' ? OPERATOR_TOOLS_PORTAL.url : TALLY_ROUTES.funding.url;
  const url = new URL(destination);
  const attribution = getAttribution();
  url.searchParams.set('source_tool', tool.id);
  url.searchParams.set('result_variant', resultVariant);
  if (attribution.utm_source) url.searchParams.set('utm_source', attribution.utm_source);
  if (attribution.utm_medium) url.searchParams.set('utm_medium', attribution.utm_medium);
  if (attribution.utm_campaign) url.searchParams.set('utm_campaign', attribution.utm_campaign);
  if (attribution.partner_id) url.searchParams.set('partner_id', attribution.partner_id);
  return url.toString();
}

export const PublicToolPage: React.FC<{ tool: PublicToolDefinition }> = ({ tool }) => {
  const [input, setInput] = useState<PublicToolInput>({});
  const [started, setStarted] = useState(false);
  const [copied, setCopied] = useState(false);
  const toolResult = useMemo(() => calculatePublicTool(tool.id, input), [tool.id, input]);

  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.PUBLIC_TOOL_VIEWED, { toolId: tool.id, route: tool.route });
  }, [tool]);

  const update = (id: string, value: PublicToolInput[string]) => {
    if (!started) { setStarted(true); trackEvent(ANALYTICS_EVENTS.PUBLIC_TOOL_STARTED, { toolId: tool.id, route: tool.route }); }
    setInput(previous => ({ ...previous, [id]: value }));
  };
  const generate = () => {
    trackEvent(ANALYTICS_EVENTS.PUBLIC_TOOL_COMPLETED, { toolId: tool.id, route: tool.route, resultVariant: toolResult.resultVariant, capabilityIds: toolResult.capabilityIds });
    trackEvent(ANALYTICS_EVENTS.PUBLIC_TOOL_RESULT_GENERATED, { toolId: tool.id, route: tool.route, resultVariant: toolResult.resultVariant });
    toolResult.capabilityIds.forEach(capabilityId => trackEvent(ANALYTICS_EVENTS.CAPABILITY_MATCHED, { toolId: tool.id, capabilityId }));
    toolResult.ecosystem.forEach(route => { trackEvent(ANALYTICS_EVENTS.ECOSYSTEM_RECOMMENDATION_GENERATED, { toolId: tool.id, capabilityId: route.capabilityId, downstreamProductId: route.product?.id }); if (route.product) trackEvent(ANALYTICS_EVENTS.DOWNSTREAM_PRODUCT_RECOMMENDED, { toolId: tool.id, downstreamProductId: route.product.id }); });
    document.getElementById('tool-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const share = async () => {
    const text = `${tool.title}\n${toolResult.metrics.map(metric => `${metric.label}: ${metric.value}`).join('\n')}\n${toolResult.disclaimer}`;
    try { await navigator.clipboard.writeText(text); setCopied(true); trackEvent(ANALYTICS_EVENTS.PUBLIC_TOOL_SHARED, { toolId: tool.id, route: tool.route }); window.setTimeout(() => setCopied(false), 1600); } catch { setCopied(false); }
  };
  const ctaUrl = handoffUrl(tool, toolResult.resultVariant);
  const ctaLabel = tool.primaryCta === 'partner' ? 'EXPLORE PARTNER INTAKE' : tool.primaryCta === 'tools' ? 'OPEN OPERATOR TOOLS' : 'START STRUCTURED INTAKE';

  return <><SEOHead seo={tool.seo} />
    <main className="min-h-screen bg-[#07090d]">
      <section className="border-b border-slate-800 bg-grid-pattern">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="max-w-4xl">
            <p className="font-mono text-xs font-semibold tracking-[0.18em] text-emerald-400">{tool.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-6xl">{tool.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">{tool.description}</p>
            <p className="mt-6 border-l-2 border-amber-400/60 pl-3 text-xs leading-5 text-amber-100">Informational operational planning only. Capital partners and humans retain all consequential capital decisions.</p>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <form onSubmit={event => { event.preventDefault(); generate(); }} className="self-start border-t border-slate-700 pt-5 lg:sticky lg:top-24">
          <div className="mb-6 flex items-center justify-between"><div><p className="font-mono text-xs text-cyan-400">INPUTS // EDITABLE</p><h2 className="mt-1 text-xl font-bold text-white">Build the scenario</h2></div><button type="button" onClick={() => { setInput({}); setStarted(false); }} className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white"><RotateCcw className="h-3.5 w-3.5" /> Reset</button></div>
          <div className="space-y-5">
            {tool.fields.map(field => <label key={field.id} className="block border-b border-slate-800 pb-4"><span className="block text-sm font-semibold text-slate-100">{field.label}</span>{field.hint && <span className="mt-1 block text-xs text-slate-500">{field.hint}</span>}
              {field.type === 'number' && <input type="number" min={field.min} step={field.step} value={formatInput(input[field.id])} onChange={event => update(field.id, event.target.value)} className="mt-3 w-full border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none transition focus:border-emerald-400" />}
              {field.type === 'select' && <select value={formatInput(input[field.id])} onChange={event => update(field.id, event.target.value)} className="mt-3 w-full border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-400"><option value="">Select an option</option>{field.options?.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select>}
              {field.type === 'checkbox' && <button type="button" onClick={() => update(field.id, !input[field.id])} aria-pressed={Boolean(input[field.id])} className={`mt-3 flex w-full items-center gap-3 border px-3 py-2.5 text-left text-sm ${input[field.id] ? 'border-emerald-500 bg-emerald-500/10 text-emerald-100' : 'border-slate-700 bg-slate-950 text-slate-300'}`}><span className={`flex h-4 w-4 items-center justify-center border ${input[field.id] ? 'border-emerald-400 bg-emerald-400 text-slate-950' : 'border-slate-600'}`}>{input[field.id] && <Check className="h-3 w-3" />}</span> Yes</button>}
              {field.type === 'multi' && <div className="mt-3 grid gap-2 sm:grid-cols-2">{field.options?.map(option => { const existing = multiValue(input, field.id); const selected = existing.includes(option.value); return <button key={option.value} type="button" onClick={() => update(field.id, selected ? existing.filter(item => item !== option.value) : [...existing, option.value])} aria-pressed={selected} className={`border px-3 py-2 text-left text-xs ${selected ? 'border-cyan-400 bg-cyan-400/10 text-cyan-100' : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-600'}`}>{option.label}</button>; })}</div>}
            </label>)}
          </div>
          <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-emerald-400 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300">GENERATE OPERATOR VIEW <ArrowRight className="h-4 w-4" /></button>
        </form>
        <div id="tool-results" className="scroll-mt-24 space-y-8">
          <div className="border-t border-slate-700 pt-5"><div className="flex items-center justify-between"><div><p className="font-mono text-xs text-cyan-400">RESULT // {toolResult.resultVariant.toUpperCase()}</p><h2 className="mt-1 text-xl font-bold text-white">Immediate operating view</h2></div><button type="button" onClick={share} className="inline-flex items-center gap-1.5 border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:border-emerald-400 hover:text-white">{copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}{copied ? 'COPIED' : 'COPY RESULT'}</button></div>
            <div className="mt-5 grid gap-px bg-slate-800 sm:grid-cols-2">{toolResult.metrics.map(metric => <div key={metric.label} className="bg-[#0b0f14] p-4"><p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">{metric.label}</p><p className="mt-2 text-2xl font-black text-white">{metric.value}</p><p className="mt-1 text-xs leading-5 text-slate-400">{metric.detail}</p></div>)}</div>
          </div>
          <ResultList label="Why it matters" items={toolResult.insights} accent="emerald" />
          <ResultList label="Assumptions" items={toolResult.assumptions} accent="cyan" />
          <div className="border-t border-slate-800 pt-5"><p className="font-mono text-xs text-amber-400">RESPONSIBILITY MAP</p><div className="mt-3 space-y-2">{toolResult.responsibility.map(item => <div key={item.owner} className="grid gap-2 border-b border-slate-800 py-2 sm:grid-cols-[9rem_1fr]"><span className="font-mono text-xs text-slate-300">{item.owner}</span><span className="text-xs leading-5 text-slate-400">{item.detail}</span></div>)}</div></div>
          <div className="border-t border-slate-800 pt-5"><p className="font-mono text-xs text-cyan-400">ECOSYSTEM NEXT STEPS</p>{toolResult.ecosystem.length ? <div className="mt-3 space-y-3">{toolResult.ecosystem.map(route => <div key={route.capabilityId} className="border-l-2 border-cyan-400/60 pl-3"><p className="text-sm font-semibold text-white">{route.product?.name || route.capabilityId}</p><p className="mt-1 text-xs leading-5 text-slate-400">{route.reason}</p>{route.humanCheckpoint && <p className="mt-1 text-xs text-amber-200">Human checkpoint: {route.humanCheckpoint}</p>}</div>)}</div> : <p className="mt-3 text-sm text-slate-400">Complete the inputs to surface contextual workflow handoffs.</p>}</div>
          <div className="border border-amber-400/20 bg-amber-400/[0.04] p-4"><p className="font-mono text-[10px] text-amber-400">HUMAN REVIEW REQUIRED</p><p className="mt-2 text-xs leading-5 text-amber-100">{toolResult.disclaimer}</p></div>
          <a href={ctaUrl} target="_blank" rel="noreferrer" onClick={() => { trackEvent(ANALYTICS_EVENTS.PUBLIC_TOOL_CTA_CLICKED, { toolId: tool.id, route: tool.route, resultVariant: toolResult.resultVariant }); trackEvent(ANALYTICS_EVENTS.PUBLIC_TOOL_LEAD_HANDOFF_STARTED, { toolId: tool.id, route: tool.route }); trackEvent(ANALYTICS_EVENTS.ECOSYSTEM_HANDOFF_INITIATED, { toolId: tool.id }); }} className="inline-flex w-full items-center justify-center gap-2 bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-200">{ctaLabel} <ExternalLink className="h-4 w-4" /></a>
          <div className="border-t border-slate-800 pt-5"><p className="font-mono text-xs text-slate-500">RELATED TOOLS</p><div className="mt-3 flex flex-wrap gap-2">{tool.relatedToolIds.map(id => <button key={id} type="button" onClick={() => setHashRoute(PUBLIC_TOOLS[id].route)} className="border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:border-emerald-400 hover:text-white">{PUBLIC_TOOLS[id].title.replace('.', '')} <Share2 className="ml-1 inline h-3 w-3" /></button>)}</div></div>
        </div>
      </section>
    </main>
  </>;
};

const ResultList: React.FC<{ label: string; items: string[]; accent: 'emerald' | 'cyan' }> = ({ label, items, accent }) => <div className="border-t border-slate-800 pt-5"><p className={`font-mono text-xs ${accent === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'}`}>{label.toUpperCase()}</p><ul className="mt-3 space-y-2">{items.map(item => <li key={item} className="border-l border-slate-700 pl-3 text-sm leading-6 text-slate-300">{item}</li>)}</ul></div>;
