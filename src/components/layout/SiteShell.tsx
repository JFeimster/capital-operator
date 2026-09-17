import React from 'react';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { ScrollProgress } from '../site/ScrollProgress';
import { BackToTop } from '../site/BackToTop';

export interface SiteShellProps {
  children: React.ReactNode;
  currentRoute?: string;
}

export const SiteShell: React.FC<SiteShellProps> = ({ children, currentRoute = '' }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#07090d] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      <a href="#main-content" className="skip-to-content no-print">
        Skip to main content
      </a>
      <ScrollProgress />
      <SiteHeader currentRoute={currentRoute} />
      <main id="main-content" className="flex-1 pt-18">
        {children}
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
};
