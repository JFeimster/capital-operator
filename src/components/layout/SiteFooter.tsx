import React from 'react';
import { FOOTER_SECTIONS, FOOTER_DISCLAIMER } from '../../config/footer';
import { SOCIAL_LINKS } from '../../config/socialLinks';
import { ExternalLink } from '../site/ExternalLink';
import { toAppHref } from '../../lib/routeLocation';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#05070a] text-slate-400 text-xs py-16 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
                CO
              </div>
              <span className="font-mono font-bold text-white tracking-wider text-sm">
                CAPITAL<span className="text-emerald-400">OPERATOR</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed text-xs">
              A high-conviction capital infrastructure diagnostic and blueprint engine for commercial advisors, loan brokers, fractional CFOs, and fintech platforms.
            </p>
            <div className="pt-2 flex items-center space-x-4">
              {SOCIAL_LINKS.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-emerald-400 transition-colors"
                  aria-label={link.label}
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {FOOTER_SECTIONS.slice(0, 3).map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <div className="font-mono text-white text-xs font-semibold uppercase tracking-wider">
                {sec.title}
              </div>
              <ul className="space-y-2">
                {sec.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    {link.isExternal ? (
                      <ExternalLink href={link.href} showIcon={false} className="text-slate-400 hover:text-white">
                        {link.label}
                      </ExternalLink>
                    ) : (
                      <a href={toAppHref(link.href)} className="hover:text-white transition-colors">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal Disclaimers & Compliance */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p className="max-w-3xl leading-relaxed">{FOOTER_DISCLAIMER}</p>
          <div className="shrink-0 font-mono">
            &copy; {new Date().getFullYear()} Moonshine Capital Partners.
          </div>
        </div>
      </div>
    </footer>
  );
};
