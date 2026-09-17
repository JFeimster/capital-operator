import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { EcosystemProduct } from '../../config/ecosystemProducts';

export interface EcosystemProductCardProps {
  product: EcosystemProduct;
  className?: string;
}

export const EcosystemProductCard: React.FC<EcosystemProductCardProps> = ({
  product,
  className = ''
}) => {
  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-slate-900/80 transition-all card-glow ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
            {product.badge}
          </span>
          <span className="font-mono text-xs text-slate-500">{product.category}</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
        <div className="text-xs font-mono text-slate-400 mb-3">{product.tagline}</div>
        <p className="text-sm text-slate-400 leading-relaxed mb-6">{product.description}</p>
      </div>

      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-800/80 text-xs font-semibold text-emerald-400 hover:text-emerald-300 group cursor-pointer"
      >
        <span>Open Product Suite</span>
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  );
};
