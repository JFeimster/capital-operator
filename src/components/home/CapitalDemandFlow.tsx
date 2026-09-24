import React from 'react';
import { Section } from '../layout/Section';
import { Container } from '../layout/Container';
import { SectionHeading } from '../site/SectionHeading';
import { ArrowRight, Search, FileCheck2, Waypoints, Workflow } from 'lucide-react';
import { toAppHref } from '../../lib/routeLocation';

export const CapitalDemandFlow: React.FC = () => {
  const steps = [
    { step: '01', title: 'Describe the Need', desc: 'Normalize amount, purpose, business context, and funding objective.', icon: <Search className="h-5 w-5 text-emerald-400" /> },
    { step: '02', title: 'Find the Capital Path', desc: 'Rank funding outcomes, products, and provenance-gated provider candidates.', icon: <Waypoints className="h-5 w-5 text-cyan-400" /> },
    { step: '03', title: 'Prepare the File', desc: 'Expose qualification gaps, document requirements, and capital-case work.', icon: <FileCheck2 className="h-5 w-5 text-amber-400" /> },
    { step: '04', title: 'Move the Deal', desc: 'Prepare the human-controlled handoff and continue through the operating workflow.', icon: <Workflow className="h-5 w-5 text-violet-400" /> }
  ];

  return (
    <Section id="capital-flow" borderBottom>
      <Container>
        <SectionHeading
          badge="ACTION WORKFLOW"
          title="From Capital Need to Next Action"
          subtitle="The visible operating path across discovery, preparation, human review, and execution."
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {steps.map(item => (
            <div key={item.step} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 card-glow relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">{item.icon}</div>
                <span className="font-mono text-[10px] text-slate-500 font-bold">STEP {item.step}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a href={toAppHref('/get-funded')} className="inline-flex items-center gap-2 text-sm font-bold text-emerald-300 hover:text-emerald-200">
            Start with a funding need <ArrowRight className="h-4 w-4"/>
          </a>
        </div>
      </Container>
    </Section>
  );
};
