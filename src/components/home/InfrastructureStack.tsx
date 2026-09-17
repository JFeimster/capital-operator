import React from 'react';
import { Section } from '../layout/Section';
import { Container } from '../layout/Container';
import { SectionHeading } from '../site/SectionHeading';
import { CommandPanel } from '../site/CommandPanel';
import { Server, Database, Lock, Cpu, Globe, Key } from 'lucide-react';

export const InfrastructureStack: React.FC = () => {
  const stackLayers = [
    {
      title: 'Borrower Intake & Verification',
      badge: 'LAYER 01',
      icon: <Globe className="h-5 w-5 text-emerald-400" />,
      items: ['Dynamic Tally/Typeform logic', 'Plaid / bank API aggregation', 'SSN / EIN identity verification']
    },
    {
      title: 'Financial Spreading & OCR Engine',
      badge: 'LAYER 02',
      icon: <Cpu className="h-5 w-5 text-cyan-400" />,
      items: ['Automated OCR statement parsing', 'Normalized EBITDA & DSCR math', 'Flagged overdrafts & NSF events']
    },
    {
      title: 'Lender Buy-Box Router',
      badge: 'LAYER 03',
      icon: <Database className="h-5 w-5 text-amber-400" />,
      items: ['Rule-based lender credit matrix', 'Parallel secure deal rooms', 'Automated broker fee agreement tracking']
    },
    {
      title: 'Security & Client-Side Sandbox',
      badge: 'LAYER 04',
      icon: <Lock className="h-5 w-5 text-emerald-400" />,
      items: ['Zero server-side financial storage', 'Client-side encrypted calculations', 'SOC-2 / GLBA compliant transmission']
    }
  ];

  return (
    <Section id="infrastructure-stack" variant="elevated" borderBottom>
      <Container>
        <SectionHeading
          badge="TECHNICAL FOUNDATION"
          title="The Capital Technology Stack"
          subtitle="Modular, compliant tooling that turns manual deal desks into high-speed financial syndicates."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stackLayers.map((layer, idx) => (
            <CommandPanel key={idx} title={layer.title} badge={layer.badge}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                  {layer.icon}
                </div>
                <div className="text-xs text-slate-400">Production Ready Component</div>
              </div>
              <ul className="space-y-2">
                {layer.items.map((item, iIdx) => (
                  <li key={iIdx} className="text-xs text-slate-300 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CommandPanel>
          ))}
        </div>
      </Container>
    </Section>
  );
};
