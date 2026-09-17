import React, { useState } from 'react';
import { TOOLS_REGISTRY } from '../../config/tools';
import { ToolCategoryRail } from './ToolCategoryRail';
import { ExternalLink as ExternalIcon, Check } from 'lucide-react';
import { Badge } from '../site/Badge';

export const ToolDirectoryPreview: React.FC = () => {
  const allTools = Object.values(TOOLS_REGISTRY);
  const categories = ['All', 'intake', 'underwriting', 'crm', 'routing', 'closing', 'reporting'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTools =
    activeCategory === 'All'
      ? allTools.slice(0, 8)
      : allTools.filter((t) => t.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="space-y-6">
      <ToolCategoryRail
        categories={categories}
        selectedCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-slate-900/80 transition-all card-glow"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">
                  {tool.category}
                </span>
                <span className="font-mono text-xs text-slate-500">{tool.pricingTier}</span>
              </div>

              <h3 className="text-base font-bold text-white mb-2">{tool.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{tool.description}</p>

              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 mb-4">
                <span className="font-mono text-slate-300 font-semibold block mb-0.5">
                  Best For:
                </span>
                {tool.bestFor}
              </div>
            </div>

            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-semibold text-emerald-400 hover:text-emerald-300 group cursor-pointer"
            >
              <span>View Tool Specification</span>
              <ExternalIcon className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
