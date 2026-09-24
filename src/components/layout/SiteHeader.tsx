import React, { useState } from 'react';
import { Menu, ChevronDown, ArrowRight } from 'lucide-react';
import { MAIN_NAV, MORE_NAV, AUDIENCE_NAV, HEADER_ACTIONS } from '../../config/navigation';
import { MobileNav } from './MobileNav';
import { useStickyHeader } from '../../hooks/useStickyHeader';
import { toAppHref } from '../../lib/routeLocation';

export interface SiteHeaderProps {
  currentRoute?: string;
}

const normalizeRoute = (route: string) => route.replace(/^#/, '').replace(/\/$/, '') || '/';

export const SiteHeader: React.FC<SiteHeaderProps> = ({ currentRoute = '' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const isScrolled = useStickyHeader(20);
  const activeRoute = normalizeRoute(currentRoute);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 no-print ${
        isScrolled
          ? 'bg-slate-950/92 backdrop-blur-xl border-b border-slate-800 shadow-xl'
          : 'bg-[#07090d]/88 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-5">
        <a href={toAppHref('/')} className="flex items-center space-x-2.5 group shrink-0">
          <div className="h-7 w-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400/60 transition-colors">
            <span className="font-mono font-black text-xs">CO</span>
          </div>
          <div className="flex flex-col">
            <div className="font-mono text-sm font-bold text-white tracking-wider flex items-center gap-1">
              <span>CAPITAL</span><span className="text-emerald-400">OPERATOR</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono tracking-tight -mt-1 hidden xl:block">MOONSHINE CAPITAL</span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {MAIN_NAV.map(item => {
            const itemRoute = normalizeRoute(item.href);
            const isActive = activeRoute === itemRoute || (itemRoute !== '/' && activeRoute.startsWith(itemRoute + '/'));
            return (
              <a
                key={item.href}
                href={toAppHref(item.href)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  isActive ? 'text-emerald-300 bg-emerald-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/55'
                }`}
              >
                <span>{item.title}</span>
                {item.badge && (
                  <span className="font-mono text-[8px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    {item.badge}
                  </span>
                )}
              </a>
            );
          })}

          <div
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/55 transition-colors flex items-center gap-1.5 cursor-pointer">
              More <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
            </button>
            {moreOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[540px] pt-2 z-50">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/98 backdrop-blur-xl p-3 shadow-2xl grid grid-cols-2 gap-2">
                  <div>
                    <div className="px-2 py-1.5 text-[10px] font-mono tracking-[.18em] text-cyan-400">PLATFORM</div>
                    {MORE_NAV.map(item => (
                      <a key={item.href} href={toAppHref(item.href)} onClick={() => setMoreOpen(false)}
                        className="block p-2.5 rounded-xl hover:bg-slate-900 transition-colors group">
                        <div className="text-xs font-semibold text-white group-hover:text-emerald-300">{item.title}</div>
                        {item.description && <div className="text-[10px] leading-relaxed text-slate-500 mt-0.5">{item.description}</div>}
                      </a>
                    ))}
                  </div>
                  <div>
                    <div className="px-2 py-1.5 text-[10px] font-mono tracking-[.18em] text-violet-400">PLAYBOOKS</div>
                    {AUDIENCE_NAV.map(item => (
                      <a key={item.href} href={toAppHref(item.href)} onClick={() => setMoreOpen(false)}
                        className="block p-2.5 rounded-xl hover:bg-slate-900 transition-colors group">
                        <div className="text-xs font-semibold text-white group-hover:text-violet-300">{item.title}</div>
                        {item.description && <div className="text-[10px] leading-relaxed text-slate-500 mt-0.5">{item.description}</div>}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <a href={toAppHref(HEADER_ACTIONS.secondaryCTA.href)}
            className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/60 transition-colors">
            {HEADER_ACTIONS.secondaryCTA.title}
          </a>
          <a href={toAppHref(HEADER_ACTIONS.primaryCTA.href)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-950/30">
            <span>{HEADER_ACTIONS.primaryCTA.title}</span><ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="lg:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen(true)} aria-label="Open Navigation Menu"
            className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};
