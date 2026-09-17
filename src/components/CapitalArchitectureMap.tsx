/**
 * Capital Operator — Capital Architecture Map
 * src/components/CapitalArchitectureMap.tsx
 */

import React, { useState } from 'react';
import { Layers, Cpu, ShieldCheck, Landmark, CheckCircle, ChevronRight, Info } from 'lucide-react';

export type ArchitectureLayer = 'all' | 'system' | 'ai' | 'human' | 'partner';

interface ArchitectureNode {
  id: string;
  stepNumber: number;
  label: string;
  sublabel: string;
  layer: 'system' | 'ai' | 'human' | 'partner';
  capability: string;
  tools: string;
  whatItDoes: string;
}

const NODES: ArchitectureNode[] = [
  {
    id: 'demand',
    stepNumber: 1,
    label: '1. Demand',
    sublabel: 'Acquisition & Signals',
    layer: 'system',
    capability: 'Inbound capture & attribution',
    tools: 'Apollo · Clay · Partner Intake OS',
    whatItDoes: 'Captures inquiries, verifies contact integrity, tags attribution source, and triggers speed-to-lead.'
  },
  {
    id: 'intake',
    stepNumber: 2,
    label: '2. Intake',
    sublabel: 'Structured Data Capture',
    layer: 'system',
    capability: 'Conditional borrower questionnaire',
    tools: 'Tally · Jotform AI · Retell AI',
    whatItDoes: 'Gathers profile, revenue, time in business, and use of funds without forcing 40 static fields.'
  },
  {
    id: 'qualification',
    stepNumber: 3,
    label: '3. Qualification',
    sublabel: 'Deterministic Screening',
    layer: 'system',
    capability: 'Readiness rules & gating logic',
    tools: 'Am I Fundable · FundReady Copilot',
    whatItDoes: 'Applies explicit credit thresholds to separate viable deals from unviable inquiries automatically.'
  },
  {
    id: 'bi',
    stepNumber: 4,
    label: '4. Business Intelligence',
    sublabel: 'Account Context',
    layer: 'ai',
    capability: 'Automated entity & market research',
    tools: 'Perplexity · Clay · Claude 3.7',
    whatItDoes: 'Synthesizes secretary of state records, web reputation, and industry signals into an operator briefing.'
  },
  {
    id: 'documents',
    stepNumber: 5,
    label: '5. Documents',
    sublabel: 'Extraction & Verification',
    layer: 'system',
    capability: 'Data room & bank statement OCR',
    tools: 'Funding Data Room · Heron Data · Ocrolus',
    whatItDoes: 'Collects files securely, parses deposit volume, detects debt stacking, and highlights exceptions.'
  },
  {
    id: 'routing',
    stepNumber: 6,
    label: '6. Capital Routing',
    sublabel: 'Shortlist Evaluation',
    layer: 'ai',
    capability: 'Lender-fit matrix & guideline match',
    tools: 'FundStack AI · Lender Fit Copilot',
    whatItDoes: 'Evaluates deal parameters against credit boxes and generates a rationale-backed shortlist.'
  },
  {
    id: 'submission',
    stepNumber: 7,
    label: '7. Submission',
    sublabel: 'Package Bundling',
    layer: 'system',
    capability: 'Checklist validation & transmission',
    tools: 'n8n · HubSpot · Make',
    whatItDoes: 'Assembles lender-specific package, normalizes filenames, and creates audit trail in CRM.'
  },
  {
    id: 'followup',
    stepNumber: 8,
    label: '8. Follow-Up',
    sublabel: 'Momentum Engine',
    layer: 'system',
    capability: 'Event cadences & call capture',
    tools: 'HubSpot · Fireflies.ai · Gong',
    whatItDoes: 'Triggers stage reminders, logs call commitments, and escalates stalled files to the operator.'
  },
  {
    id: 'judgment',
    stepNumber: 9,
    label: '9. Human Judgment',
    sublabel: 'Consequence & Trust',
    layer: 'human',
    capability: 'Deal structuring & negotiation',
    tools: 'Operator · Advisor · Deal Desk',
    whatItDoes: 'Evaluates offer tradeoffs, negotiates covenants with underwriters, and builds high-trust client relationships.'
  },
  {
    id: 'funding',
    stepNumber: 10,
    label: '10. Funding',
    sublabel: 'Capital Fulfillment',
    layer: 'partner',
    capability: 'Balance sheet & compliance rails',
    tools: 'Institutional Lenders · Capital Partners',
    whatItDoes: 'Executes loan agreements, disburses capital, manages servicing, and holds credit risk.'
  },
  {
    id: 'retention',
    stepNumber: 11,
    label: '11. Renewal / Referral',
    sublabel: 'Relationship Equity',
    layer: 'system',
    capability: 'Lifecycle countdowns & referral loops',
    tools: 'Partner Intake OS · ResourceGrid',
    whatItDoes: 'Tracks paydown percentage, triggers 6-month renewal reviews, and prompts satisfied clients for referrals.'
  }
];

export const CapitalArchitectureMap: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<ArchitectureLayer>('all');
  const [activeNodeId, setActiveNodeId] = useState<string>('judgment');

  const filteredNodes = NODES.filter(node => {
    if (selectedLayer === 'all') return true;
    return node.layer === selectedLayer;
  });

  const activeNode = NODES.find(n => n.id === activeNodeId) || NODES[0];

  const getLayerBadge = (layer: ArchitectureNode['layer']) => {
    switch (layer) {
      case 'system':
        return {
          label: 'SYSTEM LAYER',
          desc: 'Repetition & State',
          badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
        };
      case 'ai':
        return {
          label: 'AI LAYER',
          desc: 'Synthesis & Extraction',
          badgeClass: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
        };
      case 'human':
        return {
          label: 'HUMAN JUDGMENT',
          desc: 'Consequence & Advisory',
          badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
        };
      case 'partner':
        return {
          label: 'CAPITAL PARTNER',
          desc: 'Balance Sheet & Fulfillment',
          badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/30'
        };
    }
  };

  return (
    <section className="py-12 bg-[#090d13] rounded-2xl border border-slate-800 p-6 sm:p-8 card-glow my-10">
      
      {/* Title & Philosophy */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase font-mono-code">
            INFRASTRUCTURE TOPOLOGY
          </span>
          <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Capital Architecture Map
          </h3>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            A visual operational pipeline showing what is delegated to automation, synthesized by AI, governed by humans, and fulfilled by capital partners.
          </p>
        </div>

        {/* Legend / Layer Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedLayer('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-semibold border transition-all cursor-pointer ${
              selectedLayer === 'all'
                ? 'bg-slate-700 text-white border-slate-500'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            All Layers (11)
          </button>
          <button
            onClick={() => setSelectedLayer('system')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-semibold border transition-all cursor-pointer ${
              selectedLayer === 'system'
                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-emerald-300'
            }`}
          >
            System Layer
          </button>
          <button
            onClick={() => setSelectedLayer('ai')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-semibold border transition-all cursor-pointer ${
              selectedLayer === 'ai'
                ? 'bg-cyan-950/80 text-cyan-400 border-cyan-500'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-cyan-300'
            }`}
          >
            AI Layer
          </button>
          <button
            onClick={() => setSelectedLayer('human')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-semibold border transition-all cursor-pointer ${
              selectedLayer === 'human'
                ? 'bg-amber-950/80 text-amber-400 border-amber-500'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-amber-300'
            }`}
          >
            Human Judgment
          </button>
          <button
            onClick={() => setSelectedLayer('partner')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-semibold border transition-all cursor-pointer ${
              selectedLayer === 'partner'
                ? 'bg-blue-950/80 text-blue-400 border-blue-500'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-blue-300'
            }`}
          >
            Capital Rails
          </button>
        </div>
      </div>

      {/* Interactive Horizontal Pipeline Visualizer */}
      <div className="mt-8 overflow-x-auto pb-4">
        <div className="flex items-stretch min-w-[900px] space-x-2">
          {NODES.map((node, i) => {
            const isMatchFilter = selectedLayer === 'all' || node.layer === selectedLayer;
            const isActive = node.id === activeNodeId;
            const layerBadge = getLayerBadge(node.layer);

            return (
              <React.Fragment key={node.id}>
                <div
                  onClick={() => setActiveNodeId(node.id)}
                  className={`flex-1 min-w-[130px] rounded-xl border p-3.5 flex flex-col justify-between transition-all cursor-pointer ${
                    isActive
                      ? 'border-emerald-400 bg-slate-800/90 shadow-lg shadow-emerald-500/10 scale-[1.03]'
                      : isMatchFilter
                      ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-800/40'
                      : 'border-slate-900 bg-slate-950/40 opacity-40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono-code text-slate-400 font-medium">
                        0{node.stepNumber}
                      </span>
                      <span className={`h-2 w-2 rounded-full ${
                        node.layer === 'system' ? 'bg-emerald-400' :
                        node.layer === 'ai' ? 'bg-cyan-400' :
                        node.layer === 'human' ? 'bg-amber-400' : 'bg-blue-400'
                      }`} />
                    </div>

                    <h4 className="text-xs font-bold text-white leading-snug">
                      {node.label.replace(/^\d+\.\s*/, '')}
                    </h4>
                    <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                      {node.sublabel}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/80">
                    <span className={`inline-block text-[9px] px-1.5 py-0.5 rounded border font-mono-code font-semibold ${layerBadge.badgeClass}`}>
                      {node.layer.toUpperCase()}
                    </span>
                  </div>
                </div>

                {i < NODES.length - 1 && (
                  <div className="flex items-center text-slate-700 shrink-0">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Detailed Node Inspector Panel */}
      {activeNode && (
        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/80 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-white font-mono-code">
                {activeNode.stepNumber}
              </span>
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  {activeNode.label}
                  <span className="text-xs font-normal text-slate-400">— {activeNode.sublabel}</span>
                </h4>
              </div>
            </div>

            <div>
              <span className={`inline-flex items-center space-x-1.5 text-xs px-3 py-1 rounded-full border font-mono-code font-bold ${
                getLayerBadge(activeNode.layer).badgeClass
              }`}>
                <span>{getLayerBadge(activeNode.layer).label}</span>
                <span>•</span>
                <span className="font-normal">{getLayerBadge(activeNode.layer).desc}</span>
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-slate-500 font-mono-code uppercase font-semibold">CAPABILITY YOU NEED</span>
              <p className="mt-1 text-slate-200 font-medium">{activeNode.capability}</p>
            </div>
            <div>
              <span className="text-slate-500 font-mono-code uppercase font-semibold">RECOMMENDED TOOLS</span>
              <p className="mt-1 text-emerald-400 font-mono-code font-medium">{activeNode.tools}</p>
            </div>
            <div>
              <span className="text-slate-500 font-mono-code uppercase font-semibold">OPERATIONAL EXECUTION</span>
              <p className="mt-1 text-slate-300 leading-relaxed">{activeNode.whatItDoes}</p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
