/**
 * Capital Operator — Tally Embed Component
 * src/components/integrations/TallyEmbed.tsx
 */

import React, { useEffect, useState, useRef } from 'react';
import { ExternalLink, RefreshCw, CheckCircle2, ShieldCheck, Sparkles, Copy, Check } from 'lucide-react';
import { TALLY_ROUTES, getTallyRoute } from '../../config/tally';

export interface TallyEmbedProps {
  formId?: string; // Form ID e.g. "mOe658" or "mDEJB5" or full URL
  routeKey?: keyof typeof TALLY_ROUTES;
  title?: string;
  height?: number | string;
  hideTitle?: boolean;
  transparentBackground?: boolean;
  hiddenFields?: Record<string, string | number | boolean>;
  showDirectLink?: boolean;
  className?: string;
  onFormLoaded?: () => void;
}

export const TallyEmbed: React.FC<TallyEmbedProps> = ({
  formId,
  routeKey,
  title,
  height = 650,
  hideTitle = true,
  transparentBackground = true,
  hiddenFields = {},
  showDirectLink = true,
  className = '',
  onFormLoaded
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Determine active form ID and default label
  const resolvedRoute = routeKey ? getTallyRoute(routeKey) : null;
  const rawId = formId || (resolvedRoute ? resolvedRoute.id : 'mOe658');
  
  // Extract pure ID if a full URL was passed
  const cleanFormId = rawId.replace(/^https?:\/\/tally\.so\/(r|embed)\//, '').split('?')[0];
  const formTitle = title || (resolvedRoute ? resolvedRoute.label : 'Capital Intake Application');

  // Build iframe URL with parameters
  const buildEmbedUrl = (): string => {
    const params = new URLSearchParams();
    if (hideTitle) params.set('hideTitle', '1');
    if (transparentBackground) params.set('transparentBackground', '1');
    params.set('alignLeft', '1');
    params.set('dynamicHeight', '1');

    // Append hidden fields
    Object.entries(hiddenFields).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value));
      }
    });

    return `https://tally.so/embed/${cleanFormId}?${params.toString()}`;
  };

  const directUrl = `https://tally.so/r/${cleanFormId}`;
  const embedUrl = buildEmbedUrl();

  // Load Tally embed script dynamically
  useEffect(() => {
    const scriptSrc = 'https://tally.so/widgets/embed.js';
    let script = document.querySelector(`script[src="${scriptSrc}"]`) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      script.onload = () => {
        // Tally script loaded
        if (typeof (window as unknown as { Tally?: { loadEmbeds?: () => void } }).Tally?.loadEmbeds === 'function') {
          (window as unknown as { Tally: { loadEmbeds: () => void } }).Tally.loadEmbeds();
        }
      };
      document.body.appendChild(script);
    } else {
      if (typeof (window as unknown as { Tally?: { loadEmbeds?: () => void } }).Tally?.loadEmbeds === 'function') {
        (window as unknown as { Tally: { loadEmbeds: () => void } }).Tally.loadEmbeds();
      }
    }
  }, [cleanFormId]);

  const handleCopyDirectLink = () => {
    navigator.clipboard.writeText(directUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 card-glow ${className}`}>
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80">
        <div className="flex items-center space-x-2.5">
          <div className="h-7 w-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight">{formTitle}</h4>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
              <span className="text-emerald-400 font-semibold">TALLY SECURE INTAKE</span>
              <span>&bull;</span>
              <span>256-BIT ENCRYPTED</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={handleCopyDirectLink}
            title="Copy direct form URL"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
            <span className="font-mono text-[11px]">{copied ? 'Copied' : 'Copy Link'}</span>
          </button>

          {showDirectLink && (
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors font-medium"
            >
              <span>Open in Tab</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Embedded Iframe */}
      <div className="relative w-full rounded-xl overflow-hidden bg-slate-950/40 min-h-[400px]">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-sm z-10 space-y-3">
            <RefreshCw className="h-6 w-6 text-emerald-400 animate-spin" />
            <span className="font-mono text-xs text-slate-400">Loading secure form...</span>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={formTitle}
          width="100%"
          height={height}
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          onLoad={() => {
            setIsLoading(false);
            if (onFormLoaded) onFormLoaded();
          }}
          className="w-full border-0 rounded-xl"
        />
      </div>

      {/* Footer Trust Marker */}
      <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500 gap-2">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Direct HTTPS Submission to Moonshine Capital Underwriting Queue</span>
        </span>
        <span className="text-slate-500">ID: {cleanFormId}</span>
      </div>
    </div>
  );
};
