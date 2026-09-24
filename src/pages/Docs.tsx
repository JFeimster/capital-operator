/**
 * Capital Operator — Developer Docs, REST API & Embed Reference
 * src/pages/Docs.tsx
 */

import React, { useState } from 'react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { SEOHead } from '../components/site/SEOHead';
import { SEO_CONFIG } from '../config/seo';
import { Breadcrumbs } from '../components/site/Breadcrumbs';
import { TerminalPanel } from '../components/site/TerminalPanel';
import { CTAButton } from '../components/site/CTAButton';
import { TallyEmbed } from '../components/integrations/TallyEmbed';
import {
  Code,
  Terminal,
  Webhook,
  Layers,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Cpu,
  BookOpen,
  ArrowRight,
  Database,
  Key,
  Share2,
  Sliders
} from 'lucide-react';

export const Docs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'api' | 'webhooks' | 'embeds' | 'widgets' | 'mcp'>('api');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'curl' | 'typescript' | 'python'>('typescript');

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <>
      <SEOHead seo={SEO_CONFIG.docs} />
      <div className="py-12 bg-grid-pattern border-b border-slate-800">
        <Container>
          <Breadcrumbs items={[{ label: 'Developer Docs & API' }]} className="mb-6" />
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20 mb-4 inline-block font-semibold">
              DEVELOPER & OPERATOR INTEGRATION HUB
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Capital Operator Developer Documentation
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Integrate commercial lending infrastructure into your software, automated deal desks, and intake funnels using REST APIs, webhooks, Tally embeds, and AI agent protocols.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          {/* Main Docs Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pb-6 border-b border-slate-800 mb-8">
            <button
              onClick={() => setActiveTab('api')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'api'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Code className="h-4 w-4" />
              <span>REST API Endpoints</span>
            </button>

            <button
              onClick={() => setActiveTab('webhooks')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'webhooks'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Webhook className="h-4 w-4" />
              <span>Webhooks & Events</span>
            </button>

            <button
              onClick={() => setActiveTab('embeds')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'embeds'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Share2 className="h-4 w-4" />
              <span>Tally Form Embeds</span>
            </button>

            <button
              onClick={() => setActiveTab('widgets')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'widgets'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>Diagnostic Widget</span>
            </button>

            <button
              onClick={() => setActiveTab('mcp')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'mcp'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Cpu className="h-4 w-4" />
              <span>MCP & AI Agents</span>
            </button>
          </div>

          {/* TAB 1: REST API REFERENCE */}
          {activeTab === 'api' && (
            <div className="space-y-12">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">API Authentication & Headers</h3>
                    <p className="text-xs text-slate-400 mt-1">Authenticated transaction endpoints use the configured server-side auth adapter. Production auth is not available unless the deployment reports it as configured.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-lg border border-slate-700">Canonical API: https://capital-operator.vercel.app/api/v1</span>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs text-slate-300 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <div className="text-slate-500">// Standard HTTP Headers</div>
                  <div><span className="text-cyan-400">Authorization:</span> Bearer configured-server-token</div>
                  <div><span className="text-cyan-400">Content-Type:</span> application/json</div>
                  <div><span className="text-cyan-400">X-Partner-ID:</span> ptr_moonshine_alpha</div>
                </div>
              </div>

              {/* Language Switcher for Code Samples */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-emerald-400" />
                  <span>Interactive Endpoint Reference</span>
                </h3>
                <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-mono">
                  {(['typescript', 'curl', 'python'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                        selectedLanguage === lang
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Endpoint 1: Intake */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 card-glow">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">POST</span>
                    <span className="font-mono text-sm text-white font-bold">/api/v1/intake/submit</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Ingest commercial lead or borrower application</span>
                </div>

                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Submits intake data into Capital Operator's API layer for deterministic normalization and triage. It does not perform lender underwriting, promise eligibility, or represent lender approval.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Code Request */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 mb-2 border-b border-slate-800">
                      <span>Request Payload ({selectedLanguage})</span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            selectedLanguage === 'curl'
                              ? `curl -X POST https://capital-operator.vercel.app/api/v1/intake/submit \\\n  -H "Authorization: Bearer configured-server-token" \\\n  -H "Content-Type: application/json" \\\n  -d '{"business_name":"Apex Logistics LLC","annual_revenue":3200000,"requested_facility":"ABL_REVOLVER","monthly_deposits":265000}'`
                              : selectedLanguage === 'typescript'
                              ? `const response = await fetch("https://capital-operator.vercel.app/api/v1/intake/submit", {\n  method: "POST",\n  headers: {\n    "Authorization": "Bearer configured-server-token",\n    "Content-Type": "application/json"\n  },\n  body: JSON.stringify({\n    business_name: "Apex Logistics LLC",\n    ein: "82-1234567",\n    annual_revenue: 3200000,\n    avg_monthly_deposits: 265000,\n    time_in_business_months: 48,\n    requested_facility: "ABL_REVOLVER",\n    target_amount: 500000\n  })\n});\nconst result = await response.json();`
                              : `import requests\n\npayload = {\n    "business_name": "Apex Logistics LLC",\n    "annual_revenue": 3200000,\n    "avg_monthly_deposits": 265000,\n    "requested_facility": "ABL_REVOLVER",\n    "target_amount": 500000\n}\nheaders = {\n    "Authorization": "Bearer configured-server-token",\n    "Content-Type": "application/json"\n}\nres = requests.post("https://capital-operator.vercel.app/api/v1/intake/submit", json=payload, headers=headers)\nprint(res.json())`,
                            'endpoint_intake'
                          )
                        }
                        className="inline-flex items-center gap-1 text-slate-400 hover:text-white"
                      >
                        {copiedKey === 'endpoint_intake' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                        <span>{copiedKey === 'endpoint_intake' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <pre className="p-4 rounded-xl bg-slate-950 font-mono text-[11px] text-slate-300 overflow-x-auto border border-slate-800/80 leading-relaxed">
                      {selectedLanguage === 'curl' && `curl -X POST https://capital-operator.vercel.app/api/v1/intake/submit \\
  -H "Authorization: Bearer configured-server-token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "business_name": "Apex Logistics LLC",
    "annual_revenue": 3200000,
    "avg_monthly_deposits": 265000,
    "requested_facility": "ABL_REVOLVER",
    "target_amount": 500000
  }'`}

                      {selectedLanguage === 'typescript' && `const response = await fetch("https://capital-operator.vercel.app/api/v1/intake/submit", {
  method: "POST",
  headers: {
    "Authorization": "Bearer configured-server-token",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    business_name: "Apex Logistics LLC",
    ein: "82-1234567",
    annual_revenue: 3200000,
    avg_monthly_deposits: 265000,
    time_in_business_months: 48,
    requested_facility: "ABL_REVOLVER",
    target_amount: 500000
  })
});
const result = await response.json();`}

                      {selectedLanguage === 'python' && `import requests

payload = {
    "business_name": "Apex Logistics LLC",
    "annual_revenue": 3200000,
    "avg_monthly_deposits": 265000,
    "requested_facility": "ABL_REVOLVER",
    "target_amount": 500000
}
headers = {
    "Authorization": "Bearer configured-server-token",
    "Content-Type": "application/json"
}
res = requests.post("https://capital-operator.vercel.app/api/v1/intake/submit", json=payload, headers=headers)
print(res.json())`}
                    </pre>
                  </div>

                  {/* JSON Response */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 mb-2 border-b border-slate-800">
                      <span>Response (200 OK)</span>
                      <span className="text-emerald-400 font-semibold font-mono text-[10px]">PRE-QUALIFIED</span>
                    </div>

                    <pre className="p-4 rounded-xl bg-slate-950 font-mono text-[11px] text-emerald-300 overflow-x-auto border border-slate-800/80 leading-relaxed">
{`{
  "status": "success",
  "deal_id": "deal_984fbc71a92e",
  "triage_score": 92,
  "operating_model": "Capital Operator",
  "prequalification": {
    "eligible": true,
    "max_credit_limit": 625000,
    "recommended_program": "ASSET_BASED_CREDIT_LINE",
    "matched_lenders_count": 4,
    "estimated_cost_of_capital": "Prime + 2.75%"
  },
  "required_documents": [
    "LAST_6_MONTHS_BANK_STATEMENTS",
    "DEBT_SCHEDULE_FORM_108",
    "YTD_PROFIT_AND_LOSS"
  ]
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Endpoint 2: Match Lenders */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 card-glow">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">POST</span>
                    <span className="font-mono text-sm text-white font-bold">/api/v1/routing/match-buy-box</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Query 50+ debt fund criteria matrices</span>
                </div>

                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Executes deterministic multi-parameter filtering against active syndicate credit guidelines to produce a ranked shortlist of capital providers.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: WEBHOOKS & REAL-TIME EVENTS */}
          {activeTab === 'webhooks' && (
            <div className="space-y-8">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="text-xl font-bold text-white mb-2">Webhook Event Dispatch Architecture</h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                  Subscribe your CRM, Zapier, Make.com, or custom backend to asynchronous lifecycle events. All webhooks deliver JSON payloads with HMAC-SHA256 signature verification.
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { event: 'deal.submitted', desc: 'Fires when a new borrower application or Tally form is received.' },
                    { event: 'prequal.computed', desc: 'Fires when the diagnostic calculates borrow limits and DSCR score.' },
                    { event: 'documents.extracted', desc: 'Fires when bank statement OCR finishes reading cash flows.' },
                    { event: 'lender.matched', desc: 'Fires when buy-box logic identifies eligible credit funds.' },
                    { event: 'termsheet.issued', desc: 'Fires when a lender partner delivers formal pricing & terms.' },
                    { event: 'facility.funded', desc: 'Fires upon final wire release and commission attribution.' }
                  ].map((evt) => (
                    <div key={evt.event} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                      <span className="font-mono text-xs font-bold text-emerald-400 block mb-1">{evt.event}</span>
                      <p className="text-xs text-slate-400">{evt.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signature Verification Code */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-emerald-400" />
                    <h4 className="text-base font-bold text-white">Verifying Webhook Signatures (Node.js)</h4>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `import crypto from "crypto";\n\nexport function verifyCapitalWebhook(payloadRaw: string, signatureHeader: string, webhookSecret: string): boolean {\n  const hmac = crypto.createHmac("sha256", webhookSecret);\n  const digest = "sha256=" + hmac.update(payloadRaw).digest("hex");\n  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signatureHeader));\n}`,
                        'sig_verify'
                      )
                    }
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono cursor-pointer"
                  >
                    {copiedKey === 'sig_verify' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedKey === 'sig_verify' ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-slate-950 font-mono text-[11px] text-slate-300 overflow-x-auto border border-slate-800">
{`import crypto from "crypto";

export function verifyCapitalWebhook(
  payloadRaw: string,
  signatureHeader: string,
  webhookSecret: string
): boolean {
  const hmac = crypto.createHmac("sha256", webhookSecret);
  const digest = "sha256=" + hmac.update(payloadRaw).digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(digest),
    Buffer.from(signatureHeader)
  );
}`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: TALLY FORM EMBEDS */}
          {activeTab === 'embeds' && (
            <div className="space-y-8">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="text-xl font-bold text-white mb-2">Embedding Tally Forms with Pre-Populated Context</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Embed Moonshine Capital intake forms or your custom Tally workflows directly into your web applications, client portals, or Notion pages. Pass hidden fields for attribution tracking and custom logic.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  <div>
                    <h4 className="text-sm font-bold text-white mb-3">HTML Iframe Embed Snippet</h4>
                    <pre className="p-4 rounded-xl bg-slate-950 font-mono text-[11px] text-emerald-300 overflow-x-auto border border-slate-800 mb-4">
{`<iframe
  src="https://tally.so/embed/mOe658?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&partner_id=ACME_CFO"
  width="100%"
  height="600"
  frameborder="0"
  marginheight="0"
  marginwidth="0"
  title="Capital Intake Form">
</iframe>
<script async src="https://tally.so/widgets/embed.js"></script>`}
                    </pre>

                    <h4 className="text-sm font-bold text-white mb-2">Supported URL Parameters</h4>
                    <div className="space-y-2 text-xs font-mono">
                      <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                        <span className="text-cyan-400">partner_id</span>
                        <span className="text-slate-400">Attribution identifier (e.g. CFO_99)</span>
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                        <span className="text-cyan-400">operating_model</span>
                        <span className="text-slate-400">Relationship-Led, Systemized, etc.</span>
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                        <span className="text-cyan-400">deal_amount</span>
                        <span className="text-slate-400">Target facility size in USD</span>
                      </div>
                    </div>
                  </div>

                  {/* Live Interactive Embed Preview */}
                  <div>
                    <h4 className="text-sm font-bold text-white mb-3">Live Interactive Embed Demo</h4>
                    <TallyEmbed
                      formId="mOe658"
                      title="Moonshine Funding Partner Onboarding"
                      height={480}
                      hiddenFields={{ source: 'docs_playground', tier: 'developer' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DIAGNOSTIC WIDGET SDK */}
          {activeTab === 'widgets' && (
            <div className="space-y-8">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="text-xl font-bold text-white mb-2">Embeddable 12-Question Diagnostic Widget</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Place the complete Capital Operator diagnostic onto your website or client portal with a single script tag. Collect inquiries under your own branding.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>HTML Embed Code</span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `<div id="capital-operator-widget" data-theme="dark" data-partner="YOUR_PARTNER_CODE"></div>\n<script src="https://capitaloperator.io/widget.js" async></script>`,
                          'widget_embed'
                        )
                      }
                      className="inline-flex items-center gap-1 text-slate-300 hover:text-white cursor-pointer"
                    >
                      {copiedKey === 'widget_embed' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedKey === 'widget_embed' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-emerald-300 overflow-x-auto border border-slate-800">
{`<!-- Place in your HTML body where you want the diagnostic to appear -->
<div 
  id="capital-operator-widget" 
  data-theme="dark" 
  data-primary-color="#10b981"
  data-partner-id="partner_apex_01"
  data-on-complete="handleDiagnosticResult">
</div>

<script src="https://capitaloperator.io/widget.js" async></script>`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MCP & AI AGENTS */}
          {activeTab === 'mcp' && (
            <div className="space-y-8">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <Cpu className="h-6 w-6 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">Model Context Protocol (MCP) Server for Capital Desks</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl mb-6">
                  Expose lending underwriting tools directly to LLM agents (Claude Desktop, Cursor, Gemini CLI, n8n Agent Nodes). Enable autonomous deal scoring and guideline lookups.
                </p>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300">
                  <span className="text-emerald-400 font-bold block mb-2">// Available MCP Tool Definitions</span>
                  <ul className="space-y-2 text-slate-400">
                    <li>&bull; <code className="text-cyan-300">calculate_commercial_dscr</code>: Compute debt service coverage and cash-flow health.</li>
                    <li>&bull; <code className="text-cyan-300">query_lender_buybox</code>: Match business revenue, time in business, and credit tier against 50+ debt funds.</li>
                    <li>&bull; <code className="text-cyan-300">generate_capital_blueprint</code>: Formulate 8-stage transformation plan based on diagnostic answers.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Quick CTA Bottom */}
          <div className="mt-16 text-center">
            <CTAButton href="#assessment" size="lg">
              Test Operational Diagnostic Now
            </CTAButton>
          </div>
        </Container>
      </Section>
    </>
  );
};
