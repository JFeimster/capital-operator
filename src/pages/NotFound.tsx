/**
 * Capital Operator — 404 Not Found View
 * src/pages/NotFound.tsx
 */

import React from 'react';
import { ArrowLeft, Terminal, AlertOctagon } from 'lucide-react';

interface NotFoundProps {
  onBack?: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#07090d] text-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-slate-900/60 p-8 rounded-2xl border border-slate-800">
        <div className="inline-flex p-3 rounded-xl bg-red-950/60 border border-red-800/60 text-red-400">
          <AlertOctagon className="w-8 h-8" />
        </div>
        
        <div>
          <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">
            404 // OPERATIONAL ROUTE UNRECOGNIZED
          </div>
          <h1 className="text-2xl font-bold text-slate-50">
            Pipeline Route Not Found
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            The diagnostic blueprint or pathway you requested does not exist or has been relocated within the command center.
          </p>
        </div>

        <button
          onClick={onBack ? onBack : () => (window.location.href = '/')}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-950/50"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Command Center
        </button>
      </div>
    </div>
  );
};
