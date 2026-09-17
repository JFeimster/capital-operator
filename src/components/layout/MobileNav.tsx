import React from 'react';
import { X, ArrowRight, Layers, Cpu, Building2, Network } from 'lucide-react';
import { MAIN_NAV, AUDIENCE_NAV, HEADER_ACTIONS } from '../../config/navigation';
import { CTAButton } from '../site/CTAButton';

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden bg-slate-950/95 backdrop-blur-xl flex flex-col p-6 overflow-y-auto">
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-base text-white tracking-wider font-mono">
            CAPITAL<span className="text-emerald-400">OPERATOR</span>
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close Navigation"
          className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="py-6 space-y-6 flex-1">
        <div>
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">
            Core Navigation
          </div>
          <div className="space-y-1">
            {MAIN_NAV.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between py-3 px-3 rounded-xl text-slate-200 hover:text-white hover:bg-slate-900 text-sm font-medium transition-colors"
              >
                <span>{item.title}</span>
                {item.badge && (
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">
            Audience Paths
          </div>
          <div className="space-y-1">
            {AUDIENCE_NAV.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={onClose}
                className="flex flex-col py-2.5 px-3 rounded-xl text-slate-200 hover:text-white hover:bg-slate-900 transition-colors"
              >
                <span className="text-sm font-medium">{item.title}</span>
                {item.description && (
                  <span className="text-xs text-slate-500 mt-0.5">{item.description}</span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-800 space-y-3">
        <CTAButton
          href={HEADER_ACTIONS.primaryCTA.href}
          onClick={onClose}
          size="lg"
          className="w-full justify-center"
        >
          {HEADER_ACTIONS.primaryCTA.title}
        </CTAButton>
        <a
          href={HEADER_ACTIONS.secondaryCTA.href}
          onClick={onClose}
          className="block w-full text-center py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800/60 transition-colors"
        >
          {HEADER_ACTIONS.secondaryCTA.title}
        </a>
      </div>
    </div>
  );
};
