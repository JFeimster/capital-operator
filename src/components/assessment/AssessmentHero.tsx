import React from 'react';
import { Badge } from '../site/Badge';
import { Terminal, Clock, ShieldCheck, FileSpreadsheet } from 'lucide-react';

export const AssessmentHero: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto text-center mb-10">
      <div className="inline-flex items-center justify-center mb-4">
        <Badge variant="emerald" icon={<Terminal className="h-3 w-3" />}>
          DIAGNOSTIC MATRIX
        </Badge>
      </div>
      <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
        Commercial Capital Infrastructure Audit
      </h1>
      <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed mb-6">
        Evaluate your capital desk across 12 operational vectors: intake screening, underwriting triage, document processing, and lender routing.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
        <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
          <Clock className="h-3.5 w-3.5 text-emerald-400" />
          <span>Estimated: 2.5 minutes</span>
        </span>
        <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
          <FileSpreadsheet className="h-3.5 w-3.5 text-cyan-400" />
          <span>12 Operational Questions</span>
        </span>
        <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Private & Client-Side</span>
        </span>
      </div>
    </div>
  );
};
