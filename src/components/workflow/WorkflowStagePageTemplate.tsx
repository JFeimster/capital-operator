/**
 * Capital Operator — Workflow Stage Page Template Component (C2)
 * src/components/workflow/WorkflowStagePageTemplate.tsx
 */

import React from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, UserCheck, Wrench } from 'lucide-react';
import type { WorkflowStageEntityDef } from '../../data/workflowStageEntities';
import { PUBLIC_TOOLS, type PublicToolId } from '../../config/publicTools';
import { WORKFLOW_STAGE_ENTITIES } from '../../data/workflowStageEntities';
import { SEO } from '../SEO';
import { SchemaScript } from '../SchemaScript';
import { trackEvent } from '../../lib/analytics';
import { ANALYTICS_EVENTS } from '../../config/analyticsEvents';

interface WorkflowStagePageTemplateProps {
  stage: WorkflowStageEntityDef;
}

export const WorkflowStagePageTemplate: React.FC<WorkflowStagePageTemplateProps> = ({ stage }) => {
  React.useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.WORKFLOW_STAGE_VIEWED, { stageNumber: stage.number, name: stage.name });
  }, [stage.number, stage.name]);

  const previousStage = stage.previousStageSlug ? WORKFLOW_STAGE_ENTITIES[stage.previousStageSlug] : null;
  const nextStage = stage.nextStageSlug ? WORKFLOW_STAGE_ENTITIES[stage.nextStageSlug] : null;

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://capital-operator.vercel.app${stage.route}`
    },
    headline: `Stage ${stage.number}: ${stage.name} — Capital Operator Workflow`,
    description: stage.stagePurpose,
    author: {
      '@type': 'Organization',
      name: 'Capital Operator'
    }
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
        name: 'Workflow Stages',
        item: 'https://capital-operator.vercel.app/#workflow'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Stage ${stage.number}: ${stage.name}`,
        item: `https://capital-operator.vercel.app${stage.route}`
      }
    ]
  };

  return (
    <>
      <SEO
        title={`Stage ${stage.number}: ${stage.name} — Capital Operator Workflow`}
        description={stage.stagePurpose}
        canonical={`https://capital-operator.vercel.app${stage.route}`}
        keywords={[`stage ${stage.number}`, stage.name.toLowerCase(), stage.internalLabel.toLowerCase(), 'capital workflow stage']}
      />
      <SchemaScript schema={pageSchema} />
      <SchemaScript schema={breadcrumbSchema} />

      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <nav className="flex items-center text-xs font-mono text-slate-400 space-x-2">
            <a href="/" className="hover:text-emerald-400 transition-colors">HOME</a>
            <span>/</span>
            <span className="text-slate-500">WORKFLOW</span>
            <span>/</span>
            <span className="text-emerald-400 font-semibold uppercase">STAGE 0{stage.number}: {stage.name}</span>
          </nav>
        </div>

        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-mono mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CANONICAL WORKFLOW STAGE 0{stage.number} ({stage.internalLabel})</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white max-w-4xl leading-tight">
            {stage.name}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-3xl font-light">
            {stage.job}
          </p>
        </header>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 shadow-xl">
            <h2 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">STAGE PURPOSE</h2>
            <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
              {stage.stagePurpose}
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <main className="lg:col-span-8 space-y-12">
            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">What Enters This Stage?</h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                {stage.whatEntersStage}
              </p>
            </section>

            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                What Should Happen in Stage 0{stage.number}
              </h2>
              <div className="space-y-4">
                {stage.whatShouldHappen.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 font-mono text-xs font-bold shrink-0">
                      0{idx + 1}
                    </span>
                    <p className="text-slate-300 text-sm md:text-base">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <UserCheck className="w-6 h-6 text-emerald-400" />
                Responsibility Breakdown
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-mono text-slate-400 block uppercase mb-2">SYSTEM HANDLES</span>
                  <p className="text-slate-300 text-sm">{stage.systemResponsibilities}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-mono text-emerald-400 block uppercase mb-2">AI HANDLES</span>
                  <p className="text-slate-300 text-sm">{stage.aiResponsibilities}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-mono text-amber-400 block uppercase mb-2">HUMAN JUDGMENT MATTERS</span>
                  <p className="text-slate-300 text-sm">{stage.humanResponsibilities}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-mono text-sky-400 block uppercase mb-2">CAPITAL PARTNER HANDLES</span>
                  <p className="text-slate-300 text-sm">{stage.partnerResponsibilities}</p>
                </div>
              </div>
            </section>

            <section className="bg-slate-900/60 border border-red-900/30 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                Common Failure Modes
              </h2>
              <ul className="space-y-3">
                {stage.commonFailureModes.map((fail, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-red-200/80 text-sm md:text-base">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                    <span>{fail}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-emerald-400" />
                Ecosystem Systems Present
              </h2>
              <div className="flex flex-wrap gap-2">
                {stage.relevantEcosystemSystems.map((sys, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs">
                    {sys}
                  </span>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {previousStage ? (
                <a
                  href={previousStage.route}
                  className="flex items-center gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-colors text-left"
                >
                  <ArrowLeft className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-xs font-mono text-slate-500 block uppercase">PREVIOUS STAGE 0{previousStage.number}</span>
                    <span className="text-sm font-bold text-white">{previousStage.name}</span>
                  </div>
                </a>
              ) : <div />}

              {nextStage ? (
                <a
                  href={nextStage.route}
                  className="flex items-center justify-end gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-colors text-right"
                >
                  <div>
                    <span className="text-xs font-mono text-slate-500 block uppercase">NEXT STAGE 0{nextStage.number}</span>
                    <span className="text-sm font-bold text-white">{nextStage.name}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-emerald-400 shrink-0" />
                </a>
              ) : <div />}
            </div>
          </main>

          <aside className="lg:col-span-4 space-y-8">
            {stage.recommendedToolSlugs && stage.recommendedToolSlugs.length > 0 && (
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">RECOMMENDED C1 TOOLS</h3>
                <div className="space-y-3">
                  {stage.recommendedToolSlugs.map(tSlug => {
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
          </aside>
        </div>
      </div>
    </>
  );
};
