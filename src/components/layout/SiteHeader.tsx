import React, { useState } from 'react';
import { Menu, ChevronDown, ArrowRight } from 'lucide-react';
import { MAIN_NAV, AUDIENCE_NAV, HEADER_ACTIONS } from '../../config/navigation';
import { MobileNav } from './MobileNav';
import { useStickyHeader } from '../../hooks/useStickyHeader';

export interface SiteHeaderProps {
  currentRoute?: string;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ currentRoute = '' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audienceDropdownOpen, setAudienceDropdownOpen] = useState(false);
  const isScrolled = useStickyHeader(20);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 no-print ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-xl'
          : 'bg-transparent border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center space-x-2.5 group">
          <div className="h-7 w-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400/60 transition-colors">
            <span className="font-mono font-black text-xs">CO</span>
          </div>
          <div className="flex flex-col">
            <div className="font-mono text-sm font-bold text-white tracking-wider flex items-center gap-1">
              <span>CAPITAL</span>
              <span className="text-emerald-400">OPERATOR</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono tracking-tight -mt-1 hidden sm:block">
              MOONSHINE CAPITAL
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-1">
          {/* Main Links */}
          {MAIN_NAV.map((item, idx) => {
            const isActive = currentRoute === item.href;
            return (
              <a
                key={idx}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <span>{item.title}</span>
                {item.badge && (
                  <span className="font-mono text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    {item.badge}
                  </span>
                )}
              </a>
            );
          })}

          {/* Audiences Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAudienceDropdownOpen(true)}
            onMouseLeave={() => setAudienceDropdownOpen(false)}
          >
            <button
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/40 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Playbooks</span>
              <ChevronDown className="h-3 w-3 text-slate-500" />
            </button>

            {audienceDropdownOpen && (
              <div className="absolute top-full left-0 w-64 pt-2 z-50">
                <div className="rounded-xl border border-slate-800 bg-slate-900/95 backdrop-blur-xl p-2 shadow-2xl space-y-1">
                  {AUDIENCE_NAV.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={() => setAudienceDropdownOpen(false)}
                      className="block p-2.5 rounded-lg hover:bg-slate-800/80 transition-colors group"
                    >
                      <div className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {item.title}
                      </div>
                      {item.description && (
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {item.description}
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          <a
            href={HEADER_ACTIONS.secondaryCTA.href}
            className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            {HEADER_ACTIONS.secondaryCTA.title}
          </a>
          <a
            href={HEADER_ACTIONS.primaryCTA.href}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-xl transition-all shadow-md shadow-emerald-950/40"
          >
            <span>{HEADER_ACTIONS.primaryCTA.title}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
            className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};
