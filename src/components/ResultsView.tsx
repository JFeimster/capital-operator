/**
 * Capital Operator — Diagnostic Results View
 * src/components/ResultsView.tsx
 */

import React, { useState } from 'react';
import { 
  Printer, 
  Copy, 
  RotateCcw, 
  Check, 
  ArrowRight, 
  ExternalLink, 
  AlertTriangle, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Clock, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Building2,
  Share2
} from 'lucide-react';
import { BlueprintResult, StagePriority } from '../types';
import { SEGMENTS_CONFIG } from '../config/segments';
import { CTAS_CONFIG } from '../config/ctas';
import { ECOSYSTEM_CATALOG } from '../config/ecosystem';
import { TALLY_ROUTES } from '../config/tally';
import { CapitalArchitectureMap } from './CapitalArchitectureMap';
import { LeadCapture } from './LeadCaptureModal';
import { trackEvent } from '../lib/analytics';

interface ResultsViewProps {
  blueprint: BlueprintResult;
  onRestart: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ blueprint, onRestart }) => {
  const [copied, setCopied] = useState(false);
  const [expandedStage, setExpandedStage] = useState<number | null>(2); // Default expand Qualify
  const [leadCaptured, setLeadCaptured] = useState(false);

  const segmentConfig = SEGMENTS_CONFIG[blueprint.segment];

  // Plain-text formatted copy of the blueprint
  const handleCopySummary = () => {
    const topLeaks = blueprint.automationLeaks.map((l, i) => `${i + 1}. ${l.currentWork}`).join('\n');
    const firstMoves = blueprint.roadmap.first7Days.map(f => `${f.step}. ${f.title}: ${f.description}`).join('\n');

    const summaryText = `CAPITAL OPERATOR BLUEPRINT // MOONSHINE CAPITAL
Generated: ${new Date().toLocaleDateString()}

CURRENT MODEL:
${blueprint.operatingModel}
Next Unlock: ${blueprint.nextUnlock}

TOP FINDING:
${blueprint.topFindingHeadline}

EXECUTIVE SUMMARY:
${blueprint.executiveSummary}

HIGHEST-LEVERAGE MOVE:
${blueprint.highestLeverageMove.headline}
${blueprint.highestLeverageMove.action}

TOP AUTOMATION LEAKS:
${topLeaks}

FIRST 7 DAYS ACTIONS:
${firstMoves}

WHERE JUDGMENT MATTERS:
Final product recommendation, deal structuring, borrower communication, and exception handling.

PARTNER INFRASTRUCTURE:
${CTAS_CONFIG.partner.url}
`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    trackEvent('blueprint_copied');
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    trackEvent('blueprint_printed');
    window.print();
  };

  const getPriorityBadge = (p: StagePriority) => {
    switch (p) {
      case 'FIX NOW':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'BUILD NEXT':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'WORKING WELL':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'LATER':
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Top Action & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 no-print">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-semibold text-emerald-400 font-mono-code">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>OPERATING SPECIFICATION GENERATED</span>
          </span>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleCopySummary}
            className="inline-flex items-center space-x-1.5 rounded-xl border border-slate-700 bg-slate-800/60 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:border-slate-600 hover:bg-slate-700/60 transition-all cursor-pointer"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-slate-400" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Blueprint'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-1.5 rounded-xl border border-slate-700 bg-slate-800/60 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:border-slate-600 hover:bg-slate-700/60 transition-all cursor-pointer"
          >
            <Printer className="h-4 w-4 text-slate-400" />
            <span>Print / PDF</span>
          </button>

          <button
            onClick={onRestart}
            className="inline-flex items-center space-x-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Restart</span>
          </button>
        </div>
      </div>

      {/* 1. Operating Model Banner */}
      <div className="mt-8 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-950 via-[#0d131a] to-slate-950 p-6 sm:p-8 card-glow">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono-code text-slate-400 uppercase font-semibold">
              <span>DIAGNOSTIC CLASSIFICATION</span>
            </div>
            <div className="mt-2 flex flex-wrap items-baseline gap-3">
              <span className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Current Model: <span className="text-emerald-400">{blueprint.operatingModel}</span>
              </span>
            </div>
            <div className="mt-2 text-sm sm:text-base text-slate-300 flex items-center gap-2">
              <span className="text-slate-500 font-mono-code font-semibold">NEXT UNLOCK:</span>
              <span className="text-cyan-400 font-semibold">{blueprint.nextUnlock}</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 shrink-0 text-center lg:text-right">
            <div className="text-xs font-mono-code text-slate-400 font-medium">RECOMMENDED FIXES</div>
            <div className="text-3xl font-extrabold text-white mt-0.5">
              {blueprint.recommendedCapabilitiesCount} <span className="text-xs text-slate-500 font-normal">of 8 Stages</span>
            </div>
            <div className="text-[11px] text-emerald-400 font-mono-code mt-1">{blueprint.totalTimeEstimated}</div>
          </div>
        </div>
      </div>

      {/* 2. Top Finding & Executive Summary */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Finding Headline & Summary */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 card-glow flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase font-mono-code">
              PRIMARY DIAGNOSTIC FINDING
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {blueprint.topFindingHeadline}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              {blueprint.executiveSummary}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono-code">
            <span>AUDIENCE: {segmentConfig.title}</span>
            <span className="text-emerald-400">STATUS: AUDITED</span>
          </div>
        </div>

        {/* 3. Highest-Leverage Move */}
        <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/20 to-slate-950 p-6 sm:p-8 card-glow flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400 font-mono-code mb-3 border border-emerald-500/30">
              <Zap className="h-3.5 w-3.5" />
              <span>HIGHEST-LEVERAGE MOVE</span>
            </div>

            <h3 className="text-xl font-extrabold text-white tracking-tight leading-tight">
              {blueprint.highestLeverageMove.headline}
            </h3>

            <p className="mt-3 text-sm font-semibold text-emerald-300">
              {blueprint.highestLeverageMove.subheadline}
            </p>

            <p className="mt-2.5 text-xs text-slate-400 leading-relaxed">
              {blueprint.highestLeverageMove.action}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80">
            <span className="text-xs text-slate-500 font-mono-code">
              Execute within First 7 Days
            </span>
          </div>
        </div>

      </div>

      {/* 4. Segment-Specific Hero Callout */}
      <div className="mt-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-cyan-950/20 to-slate-950 p-6 sm:p-8 card-glow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase font-mono-code">
              RECOMMENDED PATHWAY: {segmentConfig.primaryPathway}
            </span>
            <h3 className="mt-1 text-xl sm:text-2xl font-bold text-white tracking-tight">
              {segmentConfig.heroCtaHeadline}
            </h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              {segmentConfig.heroCtaBody}
            </p>
            {segmentConfig.supportingLine && (
              <p className="mt-2 text-xs text-cyan-400 font-mono-code font-semibold">
                {segmentConfig.supportingLine}
              </p>
            )}
          </div>

          <a
            href={CTAS_CONFIG.partner.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('partner_cta_clicked', { source: 'segment_hero' })}
            className="inline-flex items-center justify-center space-x-2 rounded-xl bg-cyan-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-400/20 hover:bg-cyan-300 transition-all cursor-pointer shrink-0"
          >
            <span>{segmentConfig.ctaText}</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* 5. Core 8-Stage Operating Model Cards */}
      <div className="mt-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase font-mono-code">
              CORE OPERATING BLUEPRINT
            </span>
            <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              The 8-Stage Capital Operating System
            </h3>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Every stage defines what needs to happen, current friction points, the required system capability, recommended tools, what systems handle, and where human judgment remains mandatory.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono-code text-slate-400">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span>FIX NOW</span>
            <span className="h-2 w-2 rounded-full bg-amber-400 ml-2" />
            <span>BUILD NEXT</span>
          </div>
        </div>

        <div className="space-y-4">
          {blueprint.stages.map((stage) => {
            const isExpanded = expandedStage === stage.stageNumber;

            return (
              <div
                key={stage.stageNumber}
                className={`rounded-2xl border transition-all ${
                  stage.priority === 'FIX NOW'
                    ? 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                    : 'border-slate-800/80 bg-slate-950/60'
                }`}
              >
                {/* Stage Header Summary Row */}
                <div
                  onClick={() => setExpandedStage(isExpanded ? null : stage.stageNumber)}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 cursor-pointer gap-4"
                >
                  <div className="flex items-start sm:items-center space-x-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-sm font-bold text-white font-mono-code">
                      0{stage.stageNumber}
                    </span>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base sm:text-lg font-bold text-white">
                          {stage.stageName}
                        </h4>
                        <span className="text-xs font-mono-code text-slate-500 font-semibold uppercase">
                          [{stage.internalLabel}]
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-1">
                        {stage.job}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 self-end sm:self-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-mono-code font-bold border ${getPriorityBadge(stage.priority)}`}>
                      {stage.priority}
                    </span>

                    <button className="text-slate-400 hover:text-white transition-colors p-1">
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Detailed Specifications */}
                {isExpanded && (
                  <div className="border-t border-slate-800/80 p-5 sm:p-6 bg-slate-950/80 rounded-b-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Left Column: Job, Friction, Capability */}
                      <div className="space-y-4 text-xs sm:text-sm">
                        <div>
                          <span className="text-slate-500 font-mono-code font-semibold uppercase block mb-1">
                            THE OPERATING JOB
                          </span>
                          <p className="text-slate-200 leading-relaxed font-medium">
                            {stage.job}
                          </p>
                        </div>

                        <div>
                          <span className="text-red-400 font-mono-code font-semibold uppercase block mb-1 flex items-center gap-1.5">
                            <AlertTriangle className="h-3.5 w-3.5" />
                            CURRENT FRICTION
                          </span>
                          <p className="text-slate-300 leading-relaxed">
                            {stage.currentFriction}
                          </p>
                        </div>

                        <div>
                          <span className="text-emerald-400 font-mono-code font-semibold uppercase block mb-1">
                            CAPABILITY YOU NEED
                          </span>
                          <p className="text-white font-semibold leading-relaxed">
                            {stage.capabilityNeeded}
                          </p>
                        </div>

                        {/* Tools that can do it */}
                        <div className="pt-2">
                          <span className="text-slate-500 font-mono-code font-semibold uppercase block mb-2">
                            TOOLS THAT CAN DO IT
                          </span>
                          <div className="space-y-2">
                            {/* Primary Tool */}
                            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-bold text-white">{stage.primaryTool.name}</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono-code">
                                  RECOMMENDED
                                </span>
                                {stage.primaryTool.moonshineAsset && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono-code">
                                    MOONSHINE ASSET
                                  </span>
                                )}
                              </div>
                              <a
                                href={stage.primaryTool.affiliateUrl || stage.primaryTool.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackEvent('tool_clicked', { toolId: stage.primaryTool.id })}
                                className="text-xs text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1 font-mono-code"
                              >
                                <span>Inspect</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>

                            {/* Alternatives */}
                            {stage.alternativeTools.map(alt => (
                              <div key={alt.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-900 text-xs">
                                <div className="flex items-center space-x-2 text-slate-400">
                                  <span>{alt.name}</span>
                                  {alt.moonshineAsset && (
                                    <span className="text-[9px] px-1 rounded bg-cyan-500/10 text-cyan-400 font-mono-code">
                                      ECOSYSTEM
                                    </span>
                                  )}
                                </div>
                                <a
                                  href={alt.websiteUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[11px] text-slate-500 hover:text-slate-300 font-mono-code"
                                >
                                  Alternative
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Column: System vs Human Division */}
                      <div className="space-y-4 text-xs sm:text-sm">
                        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                          <span className="text-emerald-400 font-mono-code font-bold uppercase block mb-1.5 flex items-center gap-1.5">
                            <Cpu className="h-4 w-4" />
                            WHAT THE SYSTEM SHOULD HANDLE
                          </span>
                          <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                            {stage.systemHandles}
                          </p>
                        </div>

                        <div className="rounded-xl border border-amber-500/30 bg-amber-950/10 p-4">
                          <span className="text-amber-400 font-mono-code font-bold uppercase block mb-1.5 flex items-center gap-1.5">
                            <ShieldCheck className="h-4 w-4" />
                            WHERE JUDGMENT MATTERS
                          </span>
                          <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                            {stage.judgmentMatters}
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60 text-[11px] text-slate-500 font-mono-code">
                          Rule: If this step can materially affect borrower terms or lender confidence, human review is mandatory before transmission.
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Capital Architecture Map Component */}
      <CapitalArchitectureMap />

      {/* 7. Automation Leak Section: Where Humans Do Machine Work */}
      <div className="mt-14 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 card-glow">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-semibold tracking-widest text-red-400 uppercase font-mono-code">
            OPERATIONAL EFFICIENCY AUDIT
          </span>
          <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Where You're Still Paying Humans to Do Machine Work
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Repetitive activities currently performed manually based on your assessment responses that can be safely transitioned to deterministic rules or AI assistance.
          </p>
        </div>

        <div className="space-y-4">
          {blueprint.automationLeaks.map((leak, idx) => (
            <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-[11px] font-mono-code text-red-400 uppercase font-semibold block mb-1">
                  CURRENT MANUAL WORK
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  {leak.currentWork}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-mono-code text-emerald-400 uppercase font-semibold block mb-1">
                  WHAT THE SYSTEM COULD HANDLE
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {leak.systemHandles}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-mono-code text-cyan-400 uppercase font-semibold block mb-1">
                  LIKELY BUSINESS IMPACT
                </span>
                <p className="text-xs sm:text-sm text-slate-200 font-semibold leading-relaxed">
                  {leak.businessImpact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Capital Relationship Section (If Referrer or Partner) */}
      {blueprint.hasRelationshipLeak && blueprint.relationshipLeakDetails && (
        <div className="mt-14 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-950/20 to-slate-950 p-6 sm:p-8 card-glow">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase font-mono-code">
              RELATIONSHIP EQUITY LEAKAGE
            </span>
            <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {blueprint.relationshipLeakDetails.headline}
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              When you generate capital demand but refer opportunities out without infrastructure, your business experiences five silent structural leaks:
            </p>

            <ul className="mt-6 space-y-3">
              {blueprint.relationshipLeakDetails.points.map((pt, i) => (
                <li key={i} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-300">
                  <span className="h-5 w-5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono-code font-bold">
                    {i + 1}
                  </span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-amber-500/30 text-xs sm:text-sm text-amber-200 font-medium leading-relaxed">
              <strong>The Fix:</strong> {blueprint.relationshipLeakDetails.recommendation}
            </div>
          </div>
        </div>
      )}

      {/* 9. Implementation Roadmap */}
      <div className="mt-14">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase font-mono-code">
            ACTION PLAN
          </span>
          <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Implementation Roadmap
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Do not attempt a massive digital overhaul. Execute these prioritized moves sequentially to build operating capacity before adding complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* First 7 Days */}
          <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/60 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-bold text-emerald-400 font-mono-code uppercase">
                  PHASE 1
                </span>
                <span className="text-xs font-mono-code text-slate-400">DAYS 1–7</span>
              </div>
              <h4 className="text-lg font-bold text-white mt-3 mb-4">First 7 Days</h4>

              <div className="space-y-4">
                {blueprint.roadmap.first7Days.map((item) => (
                  <div key={item.step} className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-emerald-400 font-mono-code">Step 0{item.step}</span>
                      {item.stageLabel && (
                        <span className="text-[10px] font-mono-code text-slate-500 uppercase">{item.stageLabel}</span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-white">{item.title}</div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 font-mono-code">
              Exit Criteria: Single system of record with structured qualification live.
            </div>
          </div>

          {/* Next 30 Days */}
          <div className="rounded-2xl border border-cyan-500/40 bg-slate-900/60 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-bold text-cyan-400 font-mono-code uppercase">
                  PHASE 2
                </span>
                <span className="text-xs font-mono-code text-slate-400">DAYS 8–30</span>
              </div>
              <h4 className="text-lg font-bold text-white mt-3 mb-4">Next 30 Days</h4>

              <div className="space-y-4">
                {blueprint.roadmap.next30Days.map((item) => (
                  <div key={item.step} className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-cyan-400 font-mono-code">Step 0{item.step}</span>
                      {item.stageLabel && (
                        <span className="text-[10px] font-mono-code text-slate-500 uppercase">{item.stageLabel}</span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-white">{item.title}</div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 font-mono-code">
              Exit Criteria: Document collection automated and lender routing governed.
            </div>
          </div>

          {/* Later */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400 font-mono-code uppercase">
                  PHASE 3
                </span>
                <span className="text-xs font-mono-code text-slate-400">DAYS 31+</span>
              </div>
              <h4 className="text-lg font-bold text-white mt-3 mb-4">Later / Scale</h4>

              <div className="space-y-4">
                {blueprint.roadmap.later.map((item) => (
                  <div key={item.step} className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-400 font-mono-code">Step 0{item.step}</span>
                      {item.stageLabel && (
                        <span className="text-[10px] font-mono-code text-slate-500 uppercase">{item.stageLabel}</span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-white">{item.title}</div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 font-mono-code">
              Exit Criteria: Multi-agent deal synthesis and automated renewal loops live.
            </div>
          </div>

        </div>
      </div>

      {/* 9.5 Connected Ecosystem Capability Recommendations */}
      <div className="mt-14 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 card-glow">
        <div className="max-w-3xl mb-6">
          <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase font-mono-code">
            CONNECTED CAPITAL ECOSYSTEM // MOONSHINE & DISTILLED
          </span>
          <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Production Operating Infrastructure
          </h3>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            Rather than assembling disconnected SaaS tools from scratch, activate these turnkey platforms built specifically for commercial debt originators, fractional CFOs, and deal desks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ECOSYSTEM_CATALOG.map((prod) => (
            <div key={prod.id} className="rounded-xl border border-slate-800/80 bg-slate-950/80 p-5 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-semibold uppercase">
                    {prod.stageLabel}
                  </span>
                  <span className="text-[10px] font-mono-code text-slate-500 uppercase">
                    {prod.category}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white tracking-tight">{prod.name}</h4>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{prod.description}</p>
                <div className="mt-3 text-[11px] text-emerald-400 font-mono-code">
                  ⚡ {prod.capabilityHighlight}
                </div>
                <div className="mt-2 text-[11px] text-slate-400">
                  <strong className="text-slate-300">Recommended For:</strong> {prod.recommendedFor}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80">
                <a
                  href={prod.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('ecosystem_product_clicked', { product: prod.id })}
                  className="w-full inline-flex items-center justify-center space-x-2 rounded-lg bg-slate-900 border border-slate-700 px-4 py-2.5 text-xs font-bold text-slate-200 hover:text-white hover:border-cyan-500/50 hover:bg-slate-800 transition-all cursor-pointer"
                >
                  <span>{prod.ctaText}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-cyan-400" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 10. Lead Capture Section */}
      {!leadCaptured && (
        <LeadCapture
          operatingModel={blueprint.operatingModel}
          onSuccess={() => setLeadCaptured(true)}
          onSkip={() => setLeadCaptured(true)}
        />
      )}

      {/* 11. Primary Partner & Operator Conversion Block */}
      <div className="mt-14 rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-slate-950 via-[#0a1412] to-slate-950 p-8 sm:p-10 card-glow text-center lg:text-left">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase font-mono-code">
              PARTNER INFRASTRUCTURE // MOONSHINE CAPITAL
            </span>
            <h3 className="mt-2 text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {CTAS_CONFIG.partner.headline}
            </h3>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              {CTAS_CONFIG.partner.body}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href={TALLY_ROUTES.partner.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('partner_cta_clicked', { source: 'primary_partner_block' })}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-emerald-500 px-7 py-4 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/25 hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{TALLY_ROUTES.partner.defaultCtaText}</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href={TALLY_ROUTES.submitDeal.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('deal_cta_clicked', { source: 'submit_deal_button' })}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-4 text-sm font-semibold text-slate-300 hover:text-white hover:border-slate-600 transition-all cursor-pointer"
            >
              <span>{TALLY_ROUTES.submitDeal.defaultCtaText}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* 12. Direct Business Funding Block (For business owners needing capital) */}
      <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/40 p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono-code text-slate-500 uppercase font-semibold">
            LOOKING FOR CAPITAL INSTEAD?
          </span>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            {CTAS_CONFIG.businessFunding.body}
          </p>
        </div>

        <a
          href={TALLY_ROUTES.funding.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('funding_cta_clicked', { source: 'direct_funding_block' })}
          className="inline-flex items-center justify-center space-x-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-2.5 text-xs font-semibold text-slate-200 hover:text-white hover:border-slate-600 transition-all cursor-pointer shrink-0"
        >
          <span>{TALLY_ROUTES.funding.defaultCtaText}</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* 13. Disclosures */}
      <div className="mt-8 pt-6 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono-code space-y-1.5 leading-relaxed">
        <p>{CTAS_CONFIG.disclosures.affiliate}</p>
        <p>{CTAS_CONFIG.disclosures.compliance}</p>
      </div>

    </div>
  );
};
