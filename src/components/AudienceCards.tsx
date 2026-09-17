/**
 * Capital Operator — Audience Situations
 * src/components/AudienceCards.tsx
 */

import React from 'react';
import { ArrowRight, PlusCircle, UserCheck, Users, Share2, Briefcase, Boxes } from 'lucide-react';

interface AudienceCardsProps {
  onSelectSituation: (situation: string) => void;
}

const AUDIENCE_SITUATIONS = [
  {
    id: 'situation_1',
    title: 'I want to add capital as a new revenue line',
    description: 'You already have customers, clients, members, or users asking about financing and want to add a capital capability without building a lending department from scratch.',
    icon: PlusCircle,
    color: 'emerald',
    q1Match: 'I want to add capital as a new revenue line'
  },
  {
    id: 'situation_2',
    title: 'I personally manage deals from lead to funding',
    description: 'Too much of the operation still depends on your memory, inbox, spreadsheets, and personal lender relationships.',
    icon: UserCheck,
    color: 'cyan',
    q1Match: 'I personally manage deals from lead to funding'
  },
  {
    id: 'situation_3',
    title: 'My team handles an active funding pipeline',
    description: 'You need repeatable intake, qualification, routing, document, submission, and follow-up systems that do not depend on one operator.',
    icon: Users,
    color: 'blue',
    q1Match: 'My team handles an active funding pipeline'
  },
  {
    id: 'situation_4',
    title: 'I refer capital opportunities elsewhere today',
    description: 'You generate demand but lose visibility, revenue, and relationship ownership once the opportunity leaves your ecosystem.',
    icon: Share2,
    color: 'amber',
    q1Match: 'I refer capital opportunities elsewhere today'
  },
  {
    id: 'situation_5',
    title: 'Clients ask me about funding, but it is not a core service',
    description: 'Your advisory, accounting, agency, consulting, professional-service, or community business already sees capital demand and needs a clean way to handle it.',
    icon: Briefcase,
    color: 'purple',
    q1Match: 'Clients ask me about funding, but it isn\'t a core service'
  },
  {
    id: 'situation_6',
    title: 'My users need capital inside my platform or ecosystem',
    description: 'You want to add capital as a feature, workflow, or partner capability without forcing users to leave your product experience.',
    icon: Boxes,
    color: 'teal',
    q1Match: 'My users need capital inside my platform or ecosystem'
  }
];

export const AudienceCards: React.FC<AudienceCardsProps> = ({ onSelectSituation }) => {
  return (
    <section className="py-16 lg:py-24 bg-[#07090d] border-b border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase font-mono-code">
            OPERATING SCENARIOS
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Who Is Capital Operator For?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            We don't organize around stale titles like "loan broker" or "funding agency." Select the situation that matches your current business reality.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AUDIENCE_SITUATIONS.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onSelectSituation(item.q1Match)}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-slate-900/40 p-6 sm:p-7 card-glow hover:border-emerald-500/50 hover:bg-slate-900/80 transition-all cursor-pointer"
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/80 text-emerald-400 mb-5 group-hover:scale-110 group-hover:border-emerald-500/40 transition-transform">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-emerald-400 font-mono-code">
                  <span>MAP MY OPERATION</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
