import React from 'react';
import { X } from 'lucide-react';
import { MAIN_NAV, MORE_NAV, AUDIENCE_NAV, HEADER_ACTIONS } from '../../config/navigation';
import { CTAButton } from '../site/CTAButton';
import { toAppHref } from '../../lib/routeLocation';

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden bg-slate-950/98 backdrop-blur-xl flex flex-col p-5 overflow-y-auto">
      <div className="flex items-center justify-between pb-5 border-b border-slate-800">
        <a href={toAppHref('/')} onClick={onClose} className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-base text-white tracking-wider font-mono">CAPITAL<span className="text-emerald-400">OPERATOR</span></span>
        </a>
        <button onClick={onClose} aria-label="Close Navigation"
          className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="py-5 space-y-6 flex-1">
        <div>
          <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-[.2em] mb-2">Act</div>
          <div className="grid gap-1">
            {MAIN_NAV.map(item => (
              <a key={item.href} href={toAppHref(item.href)} onClick={onClose}
                className="flex items-center justify-between py-3 px-3 rounded-xl text-slate-100 hover:bg-slate-900 text-sm font-semibold">
                <span>{item.title}</span>
                {item.badge && <span className="font-mono text-[9px] text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 rounded">{item.badge}</span>}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-[.2em] mb-2">Platform</div>
          <div className="grid sm:grid-cols-2 gap-1">
            {MORE_NAV.map(item => (
              <a key={item.href} href={toAppHref(item.href)} onClick={onClose}
                className="py-2.5 px-3 rounded-xl hover:bg-slate-900">
                <div className="text-sm font-medium text-slate-200">{item.title}</div>
                {item.description && <div className="text-[11px] text-slate-500 mt-0.5">{item.description}</div>}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[10px] font-mono text-violet-400 uppercase tracking-[.2em] mb-2">Playbooks</div>
          <div className="grid sm:grid-cols-2 gap-1">
            {AUDIENCE_NAV.map(item => (
              <a key={item.href} href={toAppHref(item.href)} onClick={onClose}
                className="py-2.5 px-3 rounded-xl hover:bg-slate-900">
                <div className="text-sm font-medium text-slate-200">{item.title}</div>
                {item.description && <div className="text-[11px] text-slate-500 mt-0.5">{item.description}</div>}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-5 border-t border-slate-800 space-y-3">
        <CTAButton href={toAppHref(HEADER_ACTIONS.primaryCTA.href)} onClick={onClose} size="lg" className="w-full justify-center">
          {HEADER_ACTIONS.primaryCTA.title}
        </CTAButton>
        <a href={toAppHref(HEADER_ACTIONS.secondaryCTA.href)} onClick={onClose}
          className="block w-full text-center py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800">
          {HEADER_ACTIONS.secondaryCTA.title}
        </a>
      </div>
    </div>
  );
};
