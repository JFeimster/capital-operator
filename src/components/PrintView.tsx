/**
 * Capital Operator — Dedicated Clean Print View
 * src/components/PrintView.tsx
 */

import React from 'react';
import { BlueprintResult } from '../types';
import { CTAS_CONFIG } from '../config/ctas';

interface PrintViewProps {
  blueprint: BlueprintResult;
}

export const PrintView: React.FC<PrintViewProps> = ({ blueprint }) => {
  const topPriorities = blueprint.stages
    .filter(s => s.priority === 'FIX NOW')
    .slice(0, 3);

  return (
    <div className="print-only hidden p-8 text-black bg-white">
      {/* Header */}
      <div className="border-b-2 border-black pb-4 mb-6 flex justify-between items-end">
        <div>
          <div className="text-xs font-mono font-bold tracking-widest uppercase text-gray-600">
            MOONSHINE CAPITAL // OPERATING BLUEPRINT
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-black mt-1">
            CAPITAL OPERATOR SPECIFICATION
          </h1>
          <div className="text-xs text-gray-600 mt-1">
            Generated: {new Date().toLocaleDateString()} | System Architecture v2.4
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs font-mono text-gray-600 uppercase">CURRENT MODEL</div>
          <div className="text-xl font-bold text-black">{blueprint.operatingModel}</div>
          <div className="text-xs text-emerald-800 font-semibold mt-0.5">Next Unlock: {blueprint.nextUnlock}</div>
        </div>
      </div>

      {/* Top Finding & Highest Leverage Move */}
      <div className="border border-gray-300 p-4 rounded-lg mb-6 bg-gray-50">
        <div className="text-xs font-mono font-bold text-gray-700 uppercase">PRIMARY DIAGNOSTIC FINDING</div>
        <h2 className="text-lg font-bold text-black mt-1">{blueprint.topFindingHeadline}</h2>
        <p className="text-xs text-gray-700 mt-2 leading-relaxed">{blueprint.executiveSummary}</p>

        <div className="mt-4 pt-3 border-t border-gray-200">
          <span className="text-xs font-bold text-gray-800 uppercase">HIGHEST-LEVERAGE MOVE:</span>
          <span className="text-xs font-bold text-black ml-1.5">{blueprint.highestLeverageMove.headline}</span>
          <p className="text-xs text-gray-700 mt-0.5">{blueprint.highestLeverageMove.action}</p>
        </div>
      </div>

      {/* Top 3 Priorities */}
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">
          TOP 3 PRIORITY FIXES
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {topPriorities.map((item, idx) => (
            <div key={item.stageNumber} className="border border-gray-300 p-3 rounded">
              <div className="text-xs font-mono font-bold text-red-700">0{idx + 1}. {item.internalLabel}</div>
              <div className="text-xs font-bold text-black mt-1">{item.stageName}</div>
              <div className="text-[10px] text-gray-700 mt-1">{item.capabilityNeeded}</div>
              <div className="text-[9px] text-gray-500 font-mono mt-2">Tool: {item.primaryTool.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 8-Stage Operating Architecture Table */}
      <div className="mb-6 print-break-inside-avoid">
        <h3 className="text-sm font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">
          8-STAGE OPERATING ARCHITECTURE & HUMAN JUDGMENT CHECKPOINTS
        </h3>
        <table className="w-full text-[10px] border border-gray-300 border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300 font-mono text-left">
              <th className="p-1.5 border-r border-gray-300">#</th>
              <th className="p-1.5 border-r border-gray-300">STAGE</th>
              <th className="p-1.5 border-r border-gray-300">CAPABILITY</th>
              <th className="p-1.5 border-r border-gray-300">SYSTEM REPETITION</th>
              <th className="p-1.5 border-r border-gray-300">WHERE JUDGMENT MATTERS</th>
              <th className="p-1.5">PRIORITY</th>
            </tr>
          </thead>
          <tbody>
            {blueprint.stages.map((stage) => (
              <tr key={stage.stageNumber} className="border-b border-gray-200">
                <td className="p-1.5 border-r border-gray-200 font-mono font-bold">{stage.stageNumber}</td>
                <td className="p-1.5 border-r border-gray-200 font-bold">{stage.stageName}</td>
                <td className="p-1.5 border-r border-gray-200">{stage.capabilityNeeded}</td>
                <td className="p-1.5 border-r border-gray-200 text-gray-700">{stage.systemHandles}</td>
                <td className="p-1.5 border-r border-gray-200 text-gray-800 font-medium">{stage.judgmentMatters}</td>
                <td className="p-1.5 font-bold">{stage.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Roadmap Sequence */}
      <div className="grid grid-cols-2 gap-4 mb-6 print-break-inside-avoid">
        <div className="border border-gray-300 p-3 rounded">
          <h4 className="text-xs font-bold uppercase text-black border-b border-gray-200 pb-1 mb-2">
            FIRST 7 DAYS ACTIONS
          </h4>
          <ul className="text-[10px] space-y-1.5 text-gray-800">
            {blueprint.roadmap.first7Days.map((item) => (
              <li key={item.step}>
                <strong>{item.step}. {item.title}:</strong> {item.description}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-gray-300 p-3 rounded">
          <h4 className="text-xs font-bold uppercase text-black border-b border-gray-200 pb-1 mb-2">
            NEXT 30 DAYS SEQUENCE
          </h4>
          <ul className="text-[10px] space-y-1.5 text-gray-800">
            {blueprint.roadmap.next30Days.map((item) => (
              <li key={item.step}>
                <strong>{item.step}. {item.title}:</strong> {item.description}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Primary CTA / Footer */}
      <div className="border-t-2 border-black pt-3 flex justify-between items-center text-[10px] text-gray-600">
        <div>
          <strong>Moonshine Capital Partner Infrastructure:</strong> {CTAS_CONFIG.partner.url}
        </div>
        <div>
          Turn Capital Demand Into an Operating System
        </div>
      </div>
    </div>
  );
};
