import React from 'react';
import { Badge } from './Badge';

export interface SectionHeadingProps {
  badge?: string;
  tag?: string;
  badgeVariant?: 'emerald' | 'cyan' | 'amber' | 'slate' | 'rose';
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  tag,
  badgeVariant = 'emerald',
  title,
  subtitle,
  align = 'center',
  className = ''
}) => {
  const displayBadge = badge || tag;

  return (
    <div
      className={`max-w-3xl mb-12 ${
        align === 'center' ? 'mx-auto text-center' : 'text-left'
      } ${className}`}
    >
      {displayBadge && (
        <div className="mb-4">
          <Badge variant={badgeVariant}>{displayBadge}</Badge>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
