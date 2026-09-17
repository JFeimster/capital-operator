import React from 'react';

export interface MarqueeRailProps {
  items: string[];
  className?: string;
}

export const MarqueeRail: React.FC<MarqueeRailProps> = ({
  items,
  className = ''
}) => {
  return (
    <div className={`w-full overflow-hidden border-y border-slate-800 bg-[#05070a] py-3 ${className}`}>
      <div className="animate-marquee whitespace-nowrap flex items-center space-x-8 text-xs font-mono text-slate-400">
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="flex items-center space-x-3 shrink-0">
            <span className="text-emerald-500 font-bold">///</span>
            <span className="text-slate-300 font-medium tracking-wide">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
