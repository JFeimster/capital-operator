import React from 'react';

export interface GridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
