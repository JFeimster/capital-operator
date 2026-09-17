import React from 'react';
import { WORKFLOW_STAGES } from '../../config/workflowStages';
import { CAPABILITIES } from '../../config/capabilities';

export const EcosystemMap: React.FC = () => (
  <div className="space-y-3">
    {WORKFLOW_STAGES.map(stage => {
      const capabilities=CAPABILITIES.filter(cap=>cap.workflowStages.includes(stage.number));
      return (
        <div key={stage.number} className="grid gap-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4 lg:grid-cols-[180px_1fr]">
          <div>
            <div className="font-mono text-xs text-emerald-400">STAGE {stage.number}</div>
            <div className="mt-1 font-black text-white">{stage.name}</div>
            <div className="mt-1 text-xs text-slate-500">{stage.internalLabel}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {capabilities.map(cap=>(
              <span key={cap.id} className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-300">
                <strong className="text-white">{cap.name}</strong>
                <span className="ml-2 font-mono text-slate-500">{cap.status}</span>
              </span>
            ))}
          </div>
        </div>
      );
    })}
  </div>
);
