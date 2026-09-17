/**
 * Capital Operator — Hero Component
 * src/components/Hero.tsx
 */

import React from 'react';
import { ArrowRight, Cpu, Layers, ShieldCheck, Zap, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onStartAssessment: () => void;
  onExploreStack: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAssessment, onExploreStack }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/60">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-semibold tracking-wider text-emerald-400 font-mono-code mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>CAPITAL OPERATOR // MOONSHINE CAPITAL</span>
        </motion.div>

        {/* Primary Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.08]"
        >
          Turn Capital Demand Into an{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            Operating System.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
        >
          Your clients, customers, users, or prospects already need capital. Map the technology, workflows, capital partners, automation, and human judgment required to turn that demand into a repeatable revenue-producing capability.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onStartAssessment}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 rounded-xl bg-emerald-500 px-8 py-4 text-base font-bold text-slate-950 shadow-xl shadow-emerald-500/25 hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
          >
            <span>BUILD MY CAPITAL SYSTEM</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onExploreStack}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-6 py-4 text-base font-semibold text-slate-300 hover:border-slate-600 hover:text-white hover:bg-slate-800/60 transition-all cursor-pointer"
          >
            <span>SEE HOW THE STACK WORKS</span>
            <ArrowDown className="h-4 w-4 text-slate-400" />
          </button>
        </motion.div>

        {/* Supporting Line */}
        <p className="mt-4 text-xs sm:text-sm font-medium text-slate-500 font-mono-code">
          Stop collecting disconnected tools. Build the system.
        </p>

        {/* Proof Strip */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60">
            <div className="text-[11px] font-mono-code uppercase tracking-wider text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-emerald-400" />
              QUALIFY FASTER
            </div>
            <p className="mt-1 text-xs text-slate-400">Filter unviable files before operator review</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60">
            <div className="text-[11px] font-mono-code uppercase tracking-wider text-cyan-400 font-semibold flex items-center justify-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-cyan-400" />
              ROUTE SMARTER
            </div>
            <p className="mt-1 text-xs text-slate-400">Match credit boxes with governed rules</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60">
            <div className="text-[11px] font-mono-code uppercase tracking-wider text-amber-400 font-semibold flex items-center justify-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-amber-400" />
              MOVE MORE DEALS
            </div>
            <p className="mt-1 text-xs text-slate-400">Automate document collection & follow-ups</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60">
            <div className="text-[11px] font-mono-code uppercase tracking-wider text-blue-400 font-semibold flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              KEEP RELATIONSHIP
            </div>
            <p className="mt-1 text-xs text-slate-400">Retain client trust, data & renewal upside</p>
          </div>
        </div>

      </div>
    </section>
  );
};
