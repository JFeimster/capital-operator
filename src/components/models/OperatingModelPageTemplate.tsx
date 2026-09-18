/**
 * Capital Operator — Operating Model Page Template Component (C2)
 * src/components/models/OperatingModelPageTemplate.tsx
 */

import React from 'react';
import { Layers, Check, AlertCircle, Cpu, User, Wrench, ChevronRight } from 'lucide-react';
import type { OperatingModelEntityDef } from '../../data/operatingModelEntities';
import { PUBLIC_TOOLS, type PublicToolId } from '../../config/publicTools';
import { WORKFLOW_STAGE_ENTITIES } from '../../data/workflowStageEntities';
import { SEO } from '../SEO';
import { SchemaScript } from '../SchemaScript';
import { trackEvent } from '../../lib/analytics';
import { ANALYTICS_EVENTS } from '../../config/analyticsEvents';

interface OperatingModelPageTemplateProps {
  model: OperatingModelEntityDef;
}

export const OperatingModelPageTemplate: React.FC<OperatingModelPageTemplateProps> = ({ model }) => {
  React.useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.OPERATING_MODEL_VIEWED, { slug: model.slug, name: model.name });
  }, [model.slug, model.name]);

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: model.name,
    description: model.definition,
    url: `https://capital-operator.vercel.app${model.route}`
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://capital-operator.vercel.app/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Operating Models',
        item: 'https://capital-operator.vercel.app/#models'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: model.name,
        item: `https://capital-operator.vercel.app${model.route}`
      }
    ]
  };

  return (
    <>
      <SEO
        title={`${model.name} Operating Model — Capital Operator`}
        description={model.definition}
        canonical={`https://capital-operator.vercel.app${model.route}`}
        keywords={[model.name.toLowerCase(), 'capital operating model', 'lending capacity', 'debt desk workflow']}
      />
      <SchemaScript schema={pageSchema} />
      <SchemaScript schema={breadcrumbSchema} />

      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <nav className="flex items-center text-xs font-mono text-slate-400 space-x-2">
            <a href="/" className="hover:text-emerald-400 transition-colors">HOME</a>
            <span>/</span>
            <span className="text-slate-500">MODELS</span>
            <span>/</span>
            <span className="text-emerald-400 font-semibold uppercase">{model.name}</span>
          </nav>
        </div>

        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-emerald-400 text-xs font-mono mb-6">
            <Layers className="w-3.5 h-3.5" />
            <span>OPERATING MODEL ENTITY SPECIFICATION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white max-w-4xl leading-tight">
            {model.name} Model
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-3xl font-light">
            {model.tagline}
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-mono text-slate-400 block uppercase mb-1">TYPICAL TECH STACK COST</span>
              <span className="text-lg font-bold text-emerald-400">{model.typicalTechStackCost}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-mono text-slate-400 block uppercase mb-1">CAPACITY PER OPERATOR</span>
              <span className="text-lg font-bold text-emerald-400">{model.capacityPerOperator}</span>
            </div>
          </div>
        </header>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 shadow-xl">
            <h2 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">MODEL DEFINITION</h2>
            <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
              {model.definition}
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <main className="lg:col-span-8 space-y-12">
            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-6">Who Operates This Way?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {model.whoOperatesThisWay.map((who, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-slate-300 text-sm font-medium">
                    {who}
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-slate-900/60 border border-emerald-900/30 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-400" />
                  Strengths
                </h2>
                <ul className="space-y-3">
                  {model.strengths.map((str, idx) => (
                    <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-slate-900/60 border border-amber-900/30 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                  Limitations & Bottlenecks
                </h2>
                <ul className="space-y-3">
                  {model.limitations.map((lim, idx) => (
                    <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-6">AI vs Human Balance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase mb-2">
                    <Cpu className="w-4 h-4" />
                    <span>AI ROLE</span>
                  </div>
                  <p className="text-slate-300 text-sm">{model.aiRole}</p>
                </div>
                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase mb-2">
                    <User className="w-4 h-4" />
                    <span>HUMAN ROLE</span>
                  </div>
                  <p className="text-slate-300 text-sm">{model.humanRole}</p>
                </div>
              </div>
            </section>

            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-emerald-400" />
                Systems & Manual Work Needed
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs font-mono text-slate-400 uppercase mb-3">SYSTEMS PRESENT</h3>
                  <ul className="space-y-2">
                    {model.systemsPresent.map((sys, idx) => (
                      <li key={idx} className="text-sm text-slate-300 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
                        {sys}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-mono text-slate-400 uppercase mb-3">MANUAL WORK REQUIRED</h3>
                  <ul className="space-y-2">
                    {model.manualWorkRequired.map((man, idx) => (
                      <li key={idx} className="text-sm text-slate-300 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
                        {man}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </main>

          <aside className="lg:col-span-4 space-y-8">
            {model.nextEvolutionSlug && (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 shadow-lg">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">RECOMMENDED EVOLUTION</div>
                <p className="text-slate-300 text-sm mb-6">
                  Advance from <span className="font-bold text-white">{model.name}</span> to the next operational maturity tier.
                </p>
                <a
                  href={`/models/${model.nextEvolutionSlug}`}
                  onClick={() => trackEvent(ANALYTICS_EVENTS.OPERATING_MODEL_EVOLUTION_CLICKED, { from: model.slug, to: model.nextEvolutionSlug })}
                  className="inline-flex items-center justify-center w-full px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-colors gap-2"
                >
                  <span>Explore Next Model</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            )}

            {model.recommendedToolSlugs && model.recommendedToolSlugs.length > 0 && (
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">RECOMMENDED C1 TOOLS</h3>
                <div className="space-y-3">
                  {model.recommendedToolSlugs.map(tSlug => {
                    const tool = PUBLIC_TOOLS[tSlug as PublicToolId];
                    if (!tool) return null;
                    return (
                      <a
                        key={tSlug}
                        href={tool.route}
                        className="block p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-colors"
                      >
                        <div className="text-sm font-semibold text-white">{tool.title}</div>
                        <div className="text-xs text-slate-400 line-clamp-1">{tool.description}</div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {model.relevantStageSlugs && model.relevantStageSlugs.length > 0 && (
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">RELEVANT WORKFLOW STAGES</h3>
                <div className="space-y-3">
                  {model.relevantStageSlugs.map(sSlug => {
                    const stage = WORKFLOW_STAGE_ENTITIES[sSlug];
                    if (!stage) return null;
                    return (
                      <a
                        key={sSlug}
                        href={stage.route}
                        className="block p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-colors"
                      >
                        <div className="text-xs font-mono text-emerald-400 mb-1">STAGE 0{stage.number}</div>
                        <div className="text-sm font-semibold text-white">{stage.name}</div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
};
