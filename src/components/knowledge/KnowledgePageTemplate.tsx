/**
 * Capital Operator — Knowledge Page Template Component (C2)
 * src/components/knowledge/KnowledgePageTemplate.tsx
 */

import React from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, Cpu, UserCheck, HelpCircle } from 'lucide-react';
import type { KnowledgePageDef } from '../../data/knowledgePages';
import { PUBLIC_TOOLS, type PublicToolId } from '../../config/publicTools';
import { OPERATING_MODEL_ENTITIES } from '../../data/operatingModelEntities';
import { WORKFLOW_STAGE_ENTITIES } from '../../data/workflowStageEntities';
import { SEO } from '../SEO';
import { SchemaScript } from '../SchemaScript';
import { trackEvent } from '../../lib/analytics';
import { ANALYTICS_EVENTS } from '../../config/analyticsEvents';

interface KnowledgePageTemplateProps {
  page: KnowledgePageDef;
}

export const KnowledgePageTemplate: React.FC<KnowledgePageTemplateProps> = ({ page }) => {
  React.useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.KNOWLEDGE_PAGE_VIEWED, { slug: page.slug, title: page.shortTitle });
  }, [page.slug, page.shortTitle]);

  const primaryTool = page.nextSteps.primaryToolSlug
    ? PUBLIC_TOOLS[page.nextSteps.primaryToolSlug as PublicToolId]
    : null;

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://capital-operator.vercel.app${page.route}`
    },
    headline: page.headline,
    description: page.metaDescription,
    author: {
      '@type': 'Organization',
      name: 'Capital Operator'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Moonshine Capital',
      url: 'https://capital-operator.vercel.app'
    }
  };

  const faqSchema = page.faqs && page.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null;

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
        name: 'Learn',
        item: 'https://capital-operator.vercel.app/#learn'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: page.shortTitle,
        item: `https://capital-operator.vercel.app${page.route}`
      }
    ]
  };

  return (
    <>
      <SEO
        title={page.title}
        description={page.metaDescription}
        canonical={`https://capital-operator.vercel.app${page.route}`}
        keywords={page.keywords}
      />
      <SchemaScript schema={pageSchema} />
      <SchemaScript schema={breadcrumbSchema} />
      {faqSchema && <SchemaScript schema={faqSchema} />}

      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <nav className="flex items-center text-xs font-mono text-slate-400 space-x-2">
            <a href="/" className="hover:text-emerald-400 transition-colors">HOME</a>
            <span>/</span>
            <span className="text-slate-500">LEARN</span>
            <span>/</span>
            <span className="text-emerald-400 font-semibold uppercase">{page.shortTitle}</span>
          </nav>
        </div>

        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-mono mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CANONICAL KNOWLEDGE ARCHITECTURE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white max-w-4xl leading-tight">
            {page.headline}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-3xl font-light">
            {page.subheadline}
          </p>
        </header>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 shadow-xl">
            <h2 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">WHAT IS IT? — CANONICAL DEFINITION</h2>
            <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
              {page.definition}
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <main className="lg:col-span-8 space-y-12">
            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                Why It Matters
              </h2>
              <ul className="space-y-4">
                {page.whyItMatters.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm md:text-base">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Cpu className="w-6 h-6 text-emerald-400" />
                How It Works
              </h2>
              <div className="space-y-4">
                {page.howItWorks.map((step, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 font-mono text-xs font-bold shrink-0">
                      0{idx + 1}
                    </span>
                    <p className="text-slate-300 text-sm md:text-base">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            {page.responsibilityMatrix && page.responsibilityMatrix.length > 0 && (
              <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                  <UserCheck className="w-6 h-6 text-emerald-400" />
                  Who / What Handles Each Part?
                </h2>
                <p className="text-xs font-mono text-slate-400 mb-6">RESPONSIBILITY DIVISION MATRIX</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs md:text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono">
                        <th className="py-3 px-3">AREA</th>
                        <th className="py-3 px-3">SYSTEM</th>
                        <th className="py-3 px-3">AI</th>
                        <th className="py-3 px-3">HUMAN</th>
                        <th className="py-3 px-3">PARTNER</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {page.responsibilityMatrix.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/30">
                          <td className="py-3 px-3 font-semibold text-white">{row.area}</td>
                          <td className="py-3 px-3 text-slate-300">{row.systemHandles}</td>
                          <td className="py-3 px-3 text-emerald-300">{row.aiHandles}</td>
                          <td className="py-3 px-3 text-amber-300">{row.humanHandles}</td>
                          <td className="py-3 px-3 text-sky-300">{row.partnerHandles}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            <section className="bg-slate-900/60 border border-red-900/30 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                What Breaks Without It?
              </h2>
              <ul className="space-y-3">
                {page.whatBreaksWithoutIt.map((breakItem, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-red-200/80 text-sm md:text-base">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                    <span>{breakItem}</span>
                  </li>
                ))}
              </ul>
            </section>

            {page.faqs && page.faqs.length > 0 && (
              <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-emerald-400" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {page.faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                      <h3 className="text-base font-semibold text-white mb-2">{faq.question}</h3>
                      <p className="text-slate-300 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>

          <aside className="lg:col-span-4 space-y-8">
            {primaryTool && (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 shadow-lg">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">RECOMMENDED OPERATOR TOOL</div>
                <h3 className="text-xl font-bold text-white mb-2">{primaryTool.title}</h3>
                <p className="text-slate-300 text-xs md:text-sm mb-6 leading-relaxed">
                  {primaryTool.description}
                </p>
                <a
                  href={primaryTool.route}
                  onClick={() => trackEvent(ANALYTICS_EVENTS.KNOWLEDGE_RELATED_TOOL_CLICKED, { tool: primaryTool.id, fromPage: page.slug })}
                  className="inline-flex items-center justify-center w-full px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-colors gap-2"
                >
                  <span>Launch Tool</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}

            {page.relatedModelSlugs && page.relatedModelSlugs.length > 0 && (
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">RELATED OPERATING MODELS</h3>
                <div className="space-y-3">
                  {page.relatedModelSlugs.map(mSlug => {
                    const model = OPERATING_MODEL_ENTITIES[mSlug];
                    if (!model) return null;
                    return (
                      <a
                        key={mSlug}
                        href={model.route}
                        onClick={() => trackEvent(ANALYTICS_EVENTS.KNOWLEDGE_RELATED_ENTITY_CLICKED, { entityType: 'model', slug: mSlug, fromPage: page.slug })}
                        className="block p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-colors"
                      >
                        <div className="text-sm font-semibold text-white">{model.name}</div>
                        <div className="text-xs text-slate-400 truncate">{model.tagline}</div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {page.relatedStageSlugs && page.relatedStageSlugs.length > 0 && (
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">RELATED WORKFLOW STAGES</h3>
                <div className="space-y-3">
                  {page.relatedStageSlugs.map(sSlug => {
                    const stage = WORKFLOW_STAGE_ENTITIES[sSlug];
                    if (!stage) return null;
                    return (
                      <a
                        key={sSlug}
                        href={stage.route}
                        onClick={() => trackEvent(ANALYTICS_EVENTS.KNOWLEDGE_RELATED_ENTITY_CLICKED, { entityType: 'stage', slug: sSlug, fromPage: page.slug })}
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

            {page.relatedKnowledgeSlugs && page.relatedKnowledgeSlugs.length > 0 && (
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">EXPLORE KNOWLEDGE ARCHITECTURE</h3>
                <div className="space-y-2">
                  {page.relatedKnowledgeSlugs.map(kSlug => {
                    return (
                      <a
                        key={kSlug}
                        href={`/learn/${kSlug}`}
                        onClick={() => trackEvent(ANALYTICS_EVENTS.KNOWLEDGE_RELATED_ENTITY_CLICKED, { entityType: 'knowledge', slug: kSlug, fromPage: page.slug })}
                        className="flex items-center justify-between p-2.5 rounded-lg text-sm text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50 transition-colors"
                      >
                        <span className="capitalize">{kSlug.replace(/-/g, ' ')}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
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
