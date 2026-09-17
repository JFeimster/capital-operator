/**
 * Capital Operator — Footer Component
 * src/components/Footer.tsx
 */

import React from 'react';
import { Layers, ExternalLink, ShieldCheck } from 'lucide-react';
import { CTAS_CONFIG } from '../config/ctas';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#05070a] py-12 text-slate-400 no-print">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Layers className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold tracking-tight text-white font-mono-code">
                CAPITAL OPERATOR
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              An interactive capital infrastructure builder for advisors, operators, agencies, and platforms to turn financing demand into a repeatable, revenue-producing capability.
            </p>
            <div className="text-[11px] font-mono-code text-slate-500">
              A Moonshine Capital Operating Architecture.
            </div>
          </div>

          {/* Ecosystem Pathways */}
          <div>
            <div className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-300 mb-3">
              PARTNER ECOSYSTEM
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={CTAS_CONFIG.partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>Become a Funding Partner</span>
                  <ExternalLink className="h-3 w-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a
                  href={CTAS_CONFIG.toolsHub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>Explore Operator Tools</span>
                  <ExternalLink className="h-3 w-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a
                  href={CTAS_CONFIG.businessFunding.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>Personalized Funding Quote</span>
                  <ExternalLink className="h-3 w-3 text-slate-600" />
                </a>
              </li>
            </ul>
          </div>

          {/* Operating Doctrine */}
          <div>
            <div className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-300 mb-3">
              CORE PRINCIPLES
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400 font-mono-code">
              <li>• Automate movement before judgment.</li>
              <li>• Rules before autonomous agents.</li>
              <li>• One source of truth per domain.</li>
              <li>• Human checkpoints follow consequence.</li>
              <li>• Own the system, not the subscriptions.</li>
            </ul>
          </div>

        </div>

        {/* Bottom bar with compliance note */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono-code">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4 text-slate-400" />
            <span>© {new Date().getFullYear()} Moonshine Capital. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
            <a href="#methodology" className="hover:text-emerald-400 transition-colors">Methodology</a>
            <a href="#privacy" className="hover:text-emerald-400 transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-emerald-400 transition-colors">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
