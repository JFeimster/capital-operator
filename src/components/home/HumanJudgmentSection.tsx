import React from 'react';
import { Section } from '../layout/Section';
import { Container } from '../layout/Container';
import { SectionHeading } from '../site/SectionHeading';
import { CheckCircle2, ShieldAlert, Sparkles, UserCheck } from 'lucide-react';

export const HumanJudgmentSection: React.FC = () => {
  const checkpoints = [
    {
      title: 'Credit Story Nuance',
      desc: 'Algorithms flag raw DSCR; operators contextualize one-time litigation or supply chain anomalies into clear lender narratives.',
      icon: <Sparkles className="h-5 w-5 text-amber-400" />
    },
    {
      title: 'Lender Relationship Equity',
      desc: 'Automated portals handle documents; experienced principals maintain the personal trust that gets exceptions approved.',
      icon: <UserCheck className="h-5 w-5 text-emerald-400" />
    },
    {
      title: 'Term Sheet Strategic Advisory',
      desc: 'Software compares APR and factor rates; advisors steer clients toward sustainable capital structures that preserve equity.',
      icon: <ShieldAlert className="h-5 w-5 text-cyan-400" />
    }
  ];

  return (
    <Section id="human-judgment" variant="contrast" borderBottom>
      <Container>
        <SectionHeading
          badge="HUMAN-IN-THE-LOOP"
          title="Automate the Mechanical. Elevate the Judgment."
          subtitle="Capital Operator does not replace capital advisors—it strips away 80% of clerical overhead so judgment drives deal volume."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {checkpoints.map((cp, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 card-glow flex flex-col justify-between"
            >
              <div>
                <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 w-fit mb-4">
                  {cp.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{cp.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{cp.desc}</p>
              </div>
              <div className="pt-4 mt-6 border-t border-slate-800 text-xs text-slate-500 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Executive Checkpoint</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
