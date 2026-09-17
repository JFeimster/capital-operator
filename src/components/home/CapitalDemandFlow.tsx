import React from 'react';
import { Section } from '../layout/Section';
import { Container } from '../layout/Container';
import { SectionHeading } from '../site/SectionHeading';
import { ArrowRight, Inbox, Filter, FileText, CheckCircle2 } from 'lucide-react';

export const CapitalDemandFlow: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Inquiry Ingestion',
      desc: 'Raw demand filtered through rule-based dynamic forms.',
      icon: <Inbox className="h-5 w-5 text-emerald-400" />
    },
    {
      step: '02',
      title: 'Credit Screening',
      desc: 'Instant financial metric matching and DSCR verification.',
      icon: <Filter className="h-5 w-5 text-cyan-400" />
    },
    {
      step: '03',
      title: 'Document Assembly',
      desc: 'Automated OCR extraction and standardized credit memo packaging.',
      icon: <FileText className="h-5 w-5 text-amber-400" />
    },
    {
      step: '04',
      title: 'Precision Routing',
      desc: 'Targeted delivery to tier-1 institutional lender buy boxes.',
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-400" />
    }
  ];

  return (
    <Section id="capital-flow" borderBottom>
      <Container>
        <SectionHeading
          badge="DEMAND PIPELINE"
          title="From Raw Inquiries to Institutional Term Sheets"
          subtitle="How modern commercial deal desks eliminate document churn and secure fast lender commitments."
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col justify-between card-glow relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                    {item.icon}
                  </div>
                  <span className="font-mono text-xs text-slate-500 font-bold">
                    STEP {item.step}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
