import React from 'react';
import { Container } from '../layout/Container';
import testimonialsData from '../../data/testimonials.json';
import { Quote } from 'lucide-react';

export const ProofStrip: React.FC = () => {
  return (
    <div className="py-16 border-b border-slate-800 bg-[#05070a]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsData.testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col justify-between card-glow"
            >
              <div>
                <Quote className="h-5 w-5 text-emerald-400 mb-3 opacity-60" />
                <p className="text-sm text-slate-300 mb-4 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">{t.author}</div>
                  <div className="text-[11px] text-slate-500">{t.role}</div>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {t.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
