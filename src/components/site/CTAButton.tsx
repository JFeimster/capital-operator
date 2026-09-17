import React from 'react';
import { ArrowRight, ExternalLink as ExternalIcon } from 'lucide-react';
import { trackCtaAction } from '../../lib/ctaTracking';

export interface CTAButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isExternal?: boolean;
  className?: string;
  icon?: React.ReactNode;
  showArrow?: boolean;
  onClick?: () => void;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  href,
  variant = 'primary',
  size = 'md',
  isExternal = false,
  className = '',
  icon,
  showArrow = true,
  onClick
}) => {
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base font-semibold'
  };

  const variantStyles = {
    primary:
      'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold border border-emerald-400 shadow-lg shadow-emerald-950/50 hover:shadow-emerald-900/40',
    secondary:
      'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600',
    outline:
      'bg-transparent hover:bg-slate-800/60 text-emerald-400 hover:text-emerald-300 border border-emerald-500/40 hover:border-emerald-500/80',
    ghost:
      'bg-transparent hover:bg-slate-800/40 text-slate-300 hover:text-white border-transparent'
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackCtaAction(String(children), href, variant === 'primary' ? 'primary' : 'secondary');
    if (onClick) onClick();
  };

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 cursor-pointer ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {icon}
      <span>{children}</span>
      {isExternal ? (
        <ExternalIcon className="h-4 w-4 shrink-0 opacity-70" />
      ) : showArrow ? (
        <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
      ) : null}
    </a>
  );
};
