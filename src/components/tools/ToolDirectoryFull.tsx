/**
 * Capital Operator — Full Interactive Tools & Infrastructure Directory
 * src/components/tools/ToolDirectoryFull.tsx
 */

import React, { useState, useMemo } from 'react';
import { TOOLS_REGISTRY } from '../../config/tools';
import { ToolItem } from '../../types';
import {
  Search,
  SlidersHorizontal,
  ExternalLink,
  Sparkles,
  Bot,
  UserCheck,
  Tag,
  Layers,
  Zap,
  DollarSign,
  Check,
  ArrowRight
} from 'lucide-react';
import { WORKFLOW_STAGES } from '../../config/workflowStages';

export const ToolDirectoryFull: React.FC = () => {
  const allTools = useMemo(() => Object.values(TOOLS_REGISTRY), []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<number | 'all'>('all');
  const [selectedPricing, setSelectedPricing] = useState<string>('all');
  const [selectedStackPreset, setSelectedStackPreset] = useState<string | null>(null);
  const [activeModalTool, setActiveModalTool] = useState<ToolItem | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(allTools.map((t) => t.category)));
    return ['all', ...cats];
  }, [allTools]);

  const STACK_PRESETS = [
    {
      id: 'solo_advisor',
      name: 'Lean Fractional CFO Stack',
      cost: '~$50 / mo',
      description: 'Zero bloat. Minimal friction for consultants adding capital as an advisory line.',
      toolIds: ['tally', 'notion_ops', 'am_i_fundable', 'claude_ai', 'make']
    },
    {
      id: 'automated_broker',
      name: 'High-Velocity Broker Desk',
      cost: '~$450 / mo',
      description: 'OCR parsing, CRM automation, and multi-lender syndication for 30+ deals/mo.',
      toolIds: ['tally', 'hubspot', 'heron_data', 'fundstack_ai', 'funding_data_room', 'make']
    },
    {
      id: 'embedded_platform',
      name: 'Fintech Embedded Capital Rails',
      cost: '~$950 / mo',
      description: 'API-driven underwriting and institutional syndicate buy-box routing.',
      toolIds: ['funding_applicant_os', 'validis', 'ocrolus', 'lender_fit_copilot', 'n8n']
    }
  ];

  const filteredTools = useMemo(() => {
    return allTools.filter((tool) => {
      if (selectedStackPreset) {
        const preset = STACK_PRESETS.find((p) => p.id === selectedStackPreset);
        if (preset && !preset.toolIds.includes(tool.id)) return false;
      }
      if (selectedCategory !== 'all' && tool.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      if (selectedStage !== 'all' && tool.workflowStage !== selectedStage) {
        return false;
      }
      if (selectedPricing !== 'all' && tool.pricingTier !== selectedPricing) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = tool.name.toLowerCase().includes(q);
        const matchesDesc = tool.description.toLowerCase().includes(q);
        const matchesBestFor = tool.bestFor.toLowerCase().includes(q);
        const matchesTags = tool.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesBestFor && !matchesTags) return false;
      }
      return true;
    });
  }, [allTools, searchQuery, selectedCategory, selectedStage, selectedPricing, selectedStackPreset]);

  return (
    <div className="space-y-10">
      {/* Recommended Architecture Stack Presets */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-400" />
              <span>Recommended Tool Stacks by Operating Model</span>
            </h3>
            <p className="text-xs text-slate-400">Select an operating archetype to highlight its optimal infrastructure stack.</p>
          </div>
          {selectedStackPreset && (
            <button
              onClick={() => setSelectedStackPreset(null)}
              className="text-xs text-emerald-400 hover:underline font-mono cursor-pointer"
            >
              Reset Stack Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STACK_PRESETS.map((preset) => {
            const isSelected = selectedStackPreset === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => setSelectedStackPreset(isSelected ? null : preset.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-950/30 shadow-lg shadow-emerald-500/10'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-white">{preset.name}</span>
                  <span className="font-mono text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {preset.cost}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-3">{preset.description}</p>
                <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                  <Layers className="h-3 w-3 text-cyan-400" />
                  <span>{preset.toolIds.length} Integrated Tools</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter Controls & Search */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools, OCR, CRM, staging, tags..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Stage Selector */}
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              aria-label="Filter by Workflow Stage"
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-emerald-500 font-mono"
            >
              <option value="all">All 8 Workflow Stages</option>
              {WORKFLOW_STAGES.map((st) => (
                <option key={st.number} value={st.number}>
                  Stage {st.number}: {st.name}
                </option>
              ))}
            </select>

            {/* Pricing Tier */}
            <select
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value)}
              aria-label="Filter by Pricing Tier"
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-emerald-500 font-mono"
            >
              <option value="all">All Pricing Tiers</option>
              <option value="Free / Low">Free / Low</option>
              <option value="Mid ($50-$250)">Mid ($50-$250)</option>
              <option value="Pro ($250-$750)">Pro ($250-$750)</option>
              <option value="Enterprise ($750+)">Enterprise ($750+)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-mono capitalize transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-slate-900/80 transition-all card-glow group"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase font-semibold">
                    Stage {tool.workflowStage}
                  </span>
                  <span className="font-mono text-[11px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 capitalize">
                    {tool.category}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-slate-400 font-medium">{tool.pricingTier}</span>
              </div>

              {/* Title & Moonshine Badge */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {tool.name}
                </h4>
                {tool.moonshineAsset && (
                  <span className="font-mono text-[9px] text-cyan-300 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20 font-bold shrink-0">
                    MOONSHINE ASSET
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">{tool.description}</p>

              {/* Best For */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-300 mb-4 space-y-1.5">
                <div>
                  <span className="text-emerald-400 font-semibold font-mono text-[10px] uppercase block">Best For</span>
                  <span>{tool.bestFor}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {tool.tags.map((t) => (
                  <span key={t} className="font-mono text-[10px] text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <button
                onClick={() => setActiveModalTool(tool)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Inspect Roles & Specs
              </button>
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                <span>Visit Tool</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/30">
          <p className="text-sm text-slate-400">No tools matched your active filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedStage('all');
              setSelectedPricing('all');
              setSelectedStackPreset(null);
            }}
            className="mt-3 text-xs text-emerald-400 font-mono underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Tool Details Modal */}
      {activeModalTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="font-mono text-xs text-emerald-400">STAGE {activeModalTool.workflowStage} SPECIFICATION</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{activeModalTool.name}</h3>
              </div>
              <button
                onClick={() => setActiveModalTool(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div>
                <span className="font-mono text-slate-400 font-semibold block mb-1">CORE CAPABILITY</span>
                <p className="p-3 rounded-xl bg-slate-950 border border-slate-800">{activeModalTool.capability}</p>
              </div>

              {activeModalTool.aiRole && (
                <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-cyan-200">
                  <div className="flex items-center gap-1.5 font-mono font-bold text-cyan-400 mb-1">
                    <Bot className="h-3.5 w-3.5" />
                    <span>AI AGENT RESPONSIBILITY</span>
                  </div>
                  <p>{activeModalTool.aiRole}</p>
                </div>
              )}

              {activeModalTool.humanRole && (
                <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-amber-200">
                  <div className="flex items-center gap-1.5 font-mono font-bold text-amber-400 mb-1">
                    <UserCheck className="h-3.5 w-3.5" />
                    <span>HUMAN JUDGMENT CHECKPOINT</span>
                  </div>
                  <p>{activeModalTool.humanRole}</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setActiveModalTool(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
              <a
                href={activeModalTool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
              >
                <span>Launch Tool Spec</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
