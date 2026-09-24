import React from 'react';
import { ArrowRight, Calculator, FileSearch, Gauge, Network, Search, Sparkles, Wrench } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { SEOHead } from '../components/site/SEOHead';
import { SEO_CONFIG } from '../config/seo';
import { Breadcrumbs } from '../components/site/Breadcrumbs';
import { ToolDirectoryFull } from '../components/tools/ToolDirectoryFull';
import { toAppHref } from '../lib/routeLocation';

const utilityActions=[
  {label:'Funding Discovery',desc:'Match a live capital need to paths, products, providers, documents, and next actions.',href:'/get-funded',icon:Search,tone:'emerald'},
  {label:'Capital Stack Builder',desc:'Model capital layers and structure.',href:'/capital-stack-builder',icon:Network,tone:'violet'},
  {label:'Capital Ops Calculator',desc:'Run deterministic capital math and operating calculations.',href:'/capital-ops-calculator',icon:Calculator,tone:'cyan'},
  {label:'Readiness Audit',desc:'Identify operational and preparation gaps.',href:'/capital-readiness-audit',icon:Gauge,tone:'amber'}
];

export const Tools: React.FC = () => {
  return (
    <>
      <SEOHead seo={SEO_CONFIG.tools} />
      <div className="relative overflow-hidden border-b border-slate-800 bg-[#07090d]">
        <div className="absolute inset-0 bg-grid-pattern opacity-60"/>
        <div className="absolute top-0 right-[-8%] h-[380px] w-[380px] rounded-full bg-violet-500/10 blur-3xl"/>
        <Container>
          <div className="relative py-12 sm:py-16">
            <Breadcrumbs items={[{ label: 'Tools' }]} className="mb-6" />
            <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-8 items-end">
              <div className="max-w-4xl">
                <div className="font-mono text-[11px] tracking-[.22em] text-violet-400">OPERATOR TOOLBOX // 138 CANONICAL RESOURCES</div>
                <h1 className="mt-3 text-4xl sm:text-6xl font-black text-white tracking-[-0.04em] leading-[1.03]">
                  Use the tool. Move the capital request.
                </h1>
                <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
                  Calculators, readiness tools, workflow utilities, document resources, and capital infrastructure organized around the job you are trying to complete.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
                <div className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-violet-400"/><div className="font-mono text-[10px] tracking-[.18em] text-slate-500">FAST PATH</div></div>
                <div className="mt-3 text-lg font-bold text-white">Start with a funding request.</div>
                <p className="mt-2 text-xs text-slate-500">Capital Operator will recommend the live tools and calculators that fit the request and next action.</p>
                <a href={toAppHref('/get-funded')} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-emerald-300 hover:text-emerald-200">Get contextual recommendations <ArrowRight className="h-4 w-4"/></a>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-3 mb-10">
            {utilityActions.map(({label,desc,href,icon:Icon,tone})=>(
              <a key={href} href={toAppHref(href)} className="group rounded-2xl border border-slate-800 bg-slate-900/45 p-5 hover:border-violet-500/35 hover:-translate-y-0.5 transition-all">
                <div className="flex items-start justify-between">
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5"><Icon className={'h-5 w-5 '+(tone==='emerald'?'text-emerald-400':tone==='violet'?'text-violet-400':tone==='cyan'?'text-cyan-400':'text-amber-400')}/></div>
                  <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-violet-300"/>
                </div>
                <div className="mt-4 font-bold text-white">{label}</div>
                <div className="mt-1 text-xs leading-relaxed text-slate-500">{desc}</div>
              </a>
            ))}
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-5 sm:p-7 shadow-2xl shadow-black/20">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <div className="font-mono text-[10px] tracking-[.2em] text-cyan-400">RESOURCE DIRECTORY</div>
                <h2 className="mt-1 text-2xl font-black text-white">Browse the operator toolbox</h2>
              </div>
              <Wrench className="h-7 w-7 text-cyan-400"/>
            </div>
            <ToolDirectoryFull />
          </div>
        </Container>
      </Section>
    </>
  );
};
