import React from 'react';
import { CAPABILITIES } from '../../config/capabilities';
import { ECOSYSTEM_CATALOG } from '../../config/ecosystem';

export const CapabilityMatrix: React.FC = () => (
  <div className="overflow-x-auto rounded-xl border border-slate-800">
    <table className="w-full min-w-[860px] text-left text-sm">
      <thead className="bg-slate-900 text-xs font-mono text-slate-400">
        <tr><th className="p-3">Capability</th><th className="p-3">Owner</th><th className="p-3">Status</th><th className="p-3">Ecosystem rail</th><th className="p-3">Fallback / checkpoint</th></tr>
      </thead>
      <tbody className="divide-y divide-slate-800 bg-slate-950/60">
        {CAPABILITIES.map(cap=>{
          const products=cap.ecosystemProductIds.map(id=>ECOSYSTEM_CATALOG.find(p=>p.id===id)?.name).filter(Boolean);
          return <tr key={cap.id}>
            <td className="p-3"><div className="font-bold text-white">{cap.name}</div><div className="mt-1 text-xs text-slate-500">{cap.description}</div></td>
            <td className="p-3 font-mono text-xs text-cyan-300">{cap.responsibility}</td>
            <td className="p-3 font-mono text-xs text-emerald-400">{cap.status}</td>
            <td className="p-3 text-slate-300">{products.join(', ')||'Canonical fallback'}</td>
            <td className="p-3 text-xs text-slate-400">{cap.humanCheckpoint||cap.fallback}</td>
          </tr>;
        })}
      </tbody>
    </table>
  </div>
);
