import React from 'react';

export interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'contrast';
  borderTop?: boolean;
  borderBottom?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  id,
  children,
  className = '',
  variant = 'default',
  borderTop = false,
  borderBottom = false
}) => {
  const variantStyles = {
    default: 'bg-transparent',
    elevated: 'bg-slate-900/30 backdrop-blur-sm',
    contrast: 'bg-[#05070a]'
  };

  return (
    <section
      id={id}
      className={`py-16 sm:py-24 relative ${variantStyles[variant]} ${
        borderTop ? 'border-t border-slate-800' : ''
      } ${borderBottom ? 'border-b border-slate-800' : ''} ${className}`}
    >
      {children}
    </section>
  );
};
