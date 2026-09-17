import React from 'react';

export interface ToolCategoryRailProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  className?: string;
}

export const ToolCategoryRail: React.FC<ToolCategoryRailProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  className = ''
}) => {
  return (
    <div className={`flex items-center space-x-2 overflow-x-auto pb-2 ${className}`}>
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer border ${
              isSelected
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-md shadow-emerald-950/40'
                : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};
