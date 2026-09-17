import React from 'react';

export interface AnimatedConnectorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const AnimatedConnector: React.FC<AnimatedConnectorProps> = ({
  orientation = 'horizontal',
  className = ''
}) => {
  if (orientation === 'vertical') {
    return (
      <div className={`flex flex-col items-center justify-center my-2 ${className}`}>
        <div className="w-0.5 h-8 bg-gradient-to-b from-emerald-500/50 via-cyan-500/50 to-emerald-500/20" />
        <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center mx-2 ${className}`}>
      <div className="h-0.5 w-8 bg-gradient-to-r from-emerald-500/50 via-cyan-500/50 to-emerald-500/20" />
      <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
    </div>
  );
};
