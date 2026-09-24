import React from 'react';
import { ArrowRight, BadgeDollarSign, Building2, Calculator, Layers3, Route, Search } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { SEOHead } from '../components/site/SEOHead';
import { SEO_CONFIG } from '../config/seo';
import { Breadcrumbs } from '../components/site/Breadcrumbs';
import { CapitalArchitectureMap } from '../components/CapitalArchitectureMap';
import { toAppHref } from '../lib/routeLocation';

const actions=[
  {label:'Find Funding',desc:'Start with a live capital need and rank funding paths.',href:'/get-funded',icon:Search,tone:'emerald'},
  {label:'Open Funding OS',desc:'Move requests through readiness, routing, handoff, and deal work.',href:'/funding',icon:Route,tone:'cyan'},
  {label:'Build Capital Stack',desc:'Model layered capital structure for a deal.',href:'/capital-stack-builder',icon:Layers3,tone:'violet'},
  {label:'Calculate DSCR',desc:'Use the deterministic commercial DSCR calculator.',href:'/capital-ops-calculator',icon:Calculator,tone:'amber'}
];

export const CapitalStack: React.FC = () => {
  return (
    <>
      <SEOHead seo={SEO_CONFIG.capitalStack} />
      <div className="relative overflow-hidden border-b border-slate-800 bg-[#07090d]">
        <div className="absolute inset-0 bg-grid-pattern opacity-70"/>
        <div className="absolute -top-44 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-3xl"/>
        <Container>
          <div className="relative py-12 sm:py-16">
            <Breadcrumbs items={[{ label: 'Capital' }]} className="mb-6" />
            <div className="grid xl:grid-cols-[1.08fr_.92fr] gap-8 items-end">
              <div className="max-w-4xl">
                <div className="font-mono text-[11px] tracking-[.22em] text-cyan-400">CAPITAL INTELLIGENCE // STRUCTURE</div>
                <h1 className="mt-3 text-4xl sm:text-6xl font-black text-white tracking-[-0.04em] leading-[1.03]">
                  Capital paths, structures, and operator actions in one place.
                </h1>
                <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
                  Explore capital structure, launch funding discovery, calculate key metrics, and move a real request into the operating workflow.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/75 p-4"><div className="font-mono text-[10px] text-slate-500">PROVIDERS</div><div className="mt-2 text-3xl font-black text-white">33</div></div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/75 p-4"><div className="font-mono text-[10px] text-slate-500">PRODUCTS</div><div className="mt-2 text-3xl font-black text-white">59</div></div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/75 p-4"><div className="font-mono text-[10px] text-slate-500">FUNDING PATHS</div><div className="mt-2 text-3xl font-black text-white">20</div></div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/75 p-4"><div className="font-mono text-[10px] text-slate-500">RESOURCES</div><div className="mt-2 text-3xl font-black text-white">138</div></div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-3 mb-10">
            {actions.map(({label,desc,href,icon:Icon,tone})=>(
              <a key={href} href={toAppHref(href)} className="group rounded-2xl border border-slate-800 bg-slate-900/45 p-5 hover:-translate-y-0.5 hover:border-slate-700 transition-all">
                <div className="flex items-start justify-between">
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5"><Icon className={'h-5 w-5 '+(tone==='emerald'?'text-emerald-400':tone==='cyan'?'text-cyan-400':tone==='violet'?'text-violet-400':'text-amber-400')}/></div>
                  <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-white"/>
                </div>
                <h2 className="mt-4 font-bold text-white">{label}</h2>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{desc}</p>
              </a>
            ))}
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-5 sm:p-7 shadow-2xl shadow-black/20">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <div className="font-mono text-[10px] tracking-[.2em] text-violet-400">STRUCTURE MAP</div>
                <h2 className="mt-1 text-2xl font-black text-white">Commercial capital architecture</h2>
              </div>
              <BadgeDollarSign className="h-7 w-7 text-emerald-400"/>
            </div>
            <CapitalArchitectureMap />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a href={toAppHref('/get-funded')} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 hover:bg-emerald-300">Find Funding <ArrowRight className="h-4 w-4"/></a>
            <a href={toAppHref('/funding')} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-bold text-slate-200 hover:border-slate-600">Open Funding OS</a>
          </div>
        </Container>
      </Section>
    </>
  );
};
