import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs font-mono text-slate-400 ${className}`}>
      <a href="#home" className="hover:text-emerald-400 flex items-center gap-1">
        <Home className="h-3.5 w-3.5" />
        <span>Hub</span>
      </a>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="h-3 w-3 mx-2 text-slate-600" />
          {item.href ? (
            <a href={item.href} className="hover:text-emerald-400">
              {item.label}
            </a>
          ) : (
            <span className="text-emerald-400 font-semibold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
