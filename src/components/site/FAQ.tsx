import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '../../config/faq';

export interface FAQProps {
  items: FAQItem[];
  className?: string;
}

export const FAQ: React.FC<FAQProps> = ({ items, className = '' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={`space-y-3 max-w-3xl mx-auto ${className}`}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden card-glow"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-white hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`h-4 w-4 text-slate-400 shrink-0 ml-4 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-emerald-400' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-sm text-slate-400 leading-relaxed border-t border-slate-800/60">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
