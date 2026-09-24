import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Database, FileCheck2, GitBranch, KeyRound, RefreshCw, ShieldCheck, Waypoints } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { CTAS_CONFIG } from '../config/ctas';
import { trackEvent } from '../lib/analytics';

type CapabilityStatus = {
  status?: string;
  mode?: string;
  configured?: boolean;
  durable?: boolean;
  description?: string;
};

type WorkspaceStatus = {
  auth?: CapabilityStatus;
  persistence?: CapabilityStatus;
  transactional_deals_available?: boolean;
};

const API_BASE = typeof window !== 'undefined' && window.location.hostname.endsWith('github.io')
  ? 'https://capital-operator.vercel.app'
  : '';

async function jsonRequest(path:string, init?:RequestInit) {
  const response=await fetch(API_BASE + path,init);
  const data=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(data?.message||('Request failed (' + response.status + ')'));
  return data;
}

export const FundingOperator: React.FC = () => {
  const [workspace,setWorkspace]=useState<WorkspaceStatus|null>(null);
  const [workspaceError,setWorkspaceError]=useState('');
  const [objective,setObjective]=useState('I need $250,000 to buy equipment for my business.');
  const [amount,setAmount]=useState('250000');
  const [timeInBusiness,setTimeInBusiness]=useState('36');
  const [annualRevenue,setAnnualRevenue]=useState('1200000');
  const [monthlyDeposits,setMonthlyDeposits]=useState('100000');
  const [creditScore,setCreditScore]=useState('680');
  const [industry,setIndustry]=useState('construction');
  const [businessState,setBusinessState]=useState('VA');
  const [registryQuery,setRegistryQuery]=useState('');
  const [registryResult,setRegistryResult]=useState<any>(null);
  const [fundingResult,setFundingResult]=useState<any>(null);
  const [fundingBusy,setFundingBusy]=useState(false);
  const [fundingError,setFundingError]=useState('');

  const [token,setToken]=useState('');
  const [dealId,setDealId]=useState('');
  const [operatorResult,setOperatorResult]=useState<any>(null);
  const [operatorError,setOperatorError]=useState('');
  const [operatorBusy,setOperatorBusy]=useState(false);

  const transactionReady=Boolean(workspace?.auth?.configured&&workspace?.persistence?.configured);
  const authHeaders=useMemo<Record<string,string>>(()=>{
    const headers:Record<string,string>={'Content-Type':'application/json'};
    if(token.trim()) headers.Authorization='Bearer ' + token.trim();
    return headers;
  },[token]);

  const loadWorkspace=async()=>{
    setWorkspaceError('');
    try{
      const data=await jsonRequest('/api/v1/workspace/status');
      setWorkspace(data);
    }catch(error:any){
      setWorkspaceError(error?.message||'Workspace capability status is unavailable.');
    }
  };

  useEffect(()=>{ void loadWorkspace(); },[]);

  const runFundingRequest=async()=>{
    setFundingBusy(true); setFundingError('');
    try{
      const payload={
        objective,
        requestedAmount:Number(amount)||undefined,
        businessProfile:{
          timeInBusinessMonths:Number(timeInBusiness)||undefined,
          annualRevenue:Number(annualRevenue)||undefined,
          avgMonthlyDeposits:Number(monthlyDeposits)||undefined,
          creditScore:Number(creditScore)||undefined,
          industry:industry||undefined,
          state:businessState||undefined
        },
        source:'funding-operator-ui'
      };
      const body=JSON.stringify(payload);
      const headers={'Content-Type':'application/json'};
      trackEvent('funding_search_started',{surface:'operator'});
      const [intent,readiness,options]=await Promise.all([
        jsonRequest('/api/v1/funding/intents',{method:'POST',headers,body}),
        jsonRequest('/api/v1/funding/readiness',{method:'POST',headers,body}),
        jsonRequest('/api/v1/funding/options',{method:'POST',headers,body})
      ]);
      setFundingResult({intent,readiness,options,payload});
      trackEvent('funding_options_generated',{surface:'operator',products:options?.productMatches?.length||0,providers:options?.providerCandidates?.length||0});
    }catch(error:any){
      setFundingError(error?.message||'Funding request could not be prepared.');
    }finally{setFundingBusy(false);}
  };

  const operatorCall=async(path:string,init?:RequestInit)=>{
    setOperatorBusy(true); setOperatorError('');
    try{
      const data=await jsonRequest(path,{...init,headers:{...authHeaders,...(init?.headers||{})}});
      setOperatorResult(data);
      if(data?.deal?.id) setDealId(data.deal.id);
    }catch(error:any){setOperatorError(error?.message||'Operator request failed.');}
    finally{setOperatorBusy(false);}
  };

  const persistDeal=async()=>{
    if(!fundingResult?.payload) return;
    await operatorCall('/api/v1/deals',{
      method:'POST',
      body:JSON.stringify(fundingResult.payload)
    });
  };

  return (
    <div className="bg-[#07090d] min-h-screen">
      <div className="border-b border-slate-800 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.10),transparent_36%)]">
        <Container>
          <div className="py-14 sm:py-20 max-w-5xl">
            <div className="font-mono text-xs tracking-[0.22em] text-emerald-400 mb-4">CAPITAL CLEARING // OPERATOR SURFACE</div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl">
              Turn a funding request into an operating workflow.
            </h1>
            <p className="mt-5 text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
              Start with the funding objective. Normalize the request, expose missing information, identify capital categories, prepare the case, and move the deal through human-controlled routing and submission.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid lg:grid-cols-3 gap-5 mb-10">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <div className="flex items-center gap-2 text-white font-semibold"><ShieldCheck className="w-4 h-4 text-emerald-400"/>Authentication</div>
              <div className="font-mono text-xs mt-3 text-slate-300">{workspace?.auth?.status||'CHECKING'}</div>
              <p className="text-xs text-slate-500 mt-2">{workspace?.auth?.description||workspaceError||'Reading production capability status.'}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <div className="flex items-center gap-2 text-white font-semibold"><Database className="w-4 h-4 text-cyan-400"/>Persistence</div>
              <div className="font-mono text-xs mt-3 text-slate-300">{workspace?.persistence?.status||'CHECKING'}</div>
              <p className="text-xs text-slate-500 mt-2">{workspace?.persistence?.description||workspaceError||'Reading persistence adapter status.'}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <div className="flex items-center gap-2 text-white font-semibold"><Waypoints className="w-4 h-4 text-amber-400"/>Transactional Workspace</div>
              <div className="font-mono text-xs mt-3 text-slate-300">{transactionReady?'AVAILABLE':'NOT CONFIGURED'}</div>
              <p className="text-xs text-slate-500 mt-2">The public funding-preparation layer works independently. Persistent deal operations require both auth and a persistence adapter.</p>
            </div>
          </div>

          <div className="grid xl:grid-cols-[1.1fr_.9fr] gap-8">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/35 p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-6">
                <GitBranch className="w-5 h-5 text-emerald-400"/>
                <h2 className="text-xl font-bold text-white">Start Funding Request</h2>
              </div>
              <div className="space-y-4">
                <label className="block">
                  <span className="text-xs font-mono text-slate-400">FUNDING OBJECTIVE</span>
                  <textarea value={objective} onChange={e=>setObjective(e.target.value)} rows={4}
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"/>
                </label>
                <div className="grid sm:grid-cols-3 gap-4">
                  <label><span className="text-xs font-mono text-slate-400">AMOUNT</span>
                    <input value={amount} onChange={e=>setAmount(e.target.value)} inputMode="numeric"
                      className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"/>
                  </label>
                  <label><span className="text-xs font-mono text-slate-400">MONTHS IN BUSINESS</span>
                    <input value={timeInBusiness} onChange={e=>setTimeInBusiness(e.target.value)} inputMode="numeric"
                      className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"/>
                  </label>
                  <label><span className="text-xs font-mono text-slate-400">ANNUAL REVENUE</span>
                    <input value={annualRevenue} onChange={e=>setAnnualRevenue(e.target.value)} inputMode="numeric"
                      className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"/>
                  </label>
                  <label><span className="text-xs font-mono text-slate-400">MONTHLY DEPOSITS</span>
                    <input value={monthlyDeposits} onChange={e=>setMonthlyDeposits(e.target.value)} inputMode="numeric"
                      className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"/>
                  </label>
                  <label><span className="text-xs font-mono text-slate-400">CREDIT SCORE</span>
                    <input value={creditScore} onChange={e=>setCreditScore(e.target.value)} inputMode="numeric"
                      className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"/>
                  </label>
                  <label><span className="text-xs font-mono text-slate-400">INDUSTRY</span>
                    <input value={industry} onChange={e=>setIndustry(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"/>
                  </label>
                  <label><span className="text-xs font-mono text-slate-400">STATE</span>
                    <input value={businessState} onChange={e=>setBusinessState(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"/>
                  </label>
                </div>
                <button onClick={runFundingRequest} disabled={fundingBusy}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400 disabled:opacity-50">
                  {fundingBusy?<RefreshCw className="w-4 h-4 animate-spin"/>:<ArrowRight className="w-4 h-4"/>}
                  Prepare Funding Path
                </button>
                {fundingError&&<div className="text-sm text-rose-300 border border-rose-900/60 bg-rose-950/30 rounded-xl p-4">{fundingError}</div>}
              </div>

              {fundingResult&&(
                <div className="mt-8 grid gap-4">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                    <div className="text-xs font-mono text-emerald-400">NORMALIZED INTENT</div>
                    <div className="mt-2 text-white font-semibold">{fundingResult.intent?.intent?.fundingPurpose?.replaceAll('_',' ')}</div>
                    <div className="text-sm text-slate-400 mt-1">
                      {fundingResult.intent?.intent?.vertical?.replaceAll('_',' ')} · {fundingResult.intent?.intent?.requestedAmount ? ('$' + Number(fundingResult.intent.intent.requestedAmount).toLocaleString()) : 'Amount needed'}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                    <div className="text-xs font-mono text-cyan-400">CAPITAL PATHS</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(fundingResult.options?.categoryFits||[]).map((item:any)=><span key={item.productPathId} className="text-xs border border-cyan-900 bg-cyan-950/30 text-cyan-200 rounded-lg px-2.5 py-1.5">{item.productName}</span>)}
                    </div>
                    <div className="mt-3 text-xs text-slate-500">Provider discovery: {fundingResult.options?.providerDiscoveryStatus||'NO VERIFIED PROVIDER DATA'}</div>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                    <div className="text-xs font-mono text-violet-400">PRODUCT + PROVIDER CANDIDATES</div>
                    <div className="mt-3 space-y-2">
                      {(fundingResult.options?.productMatches||[]).slice(0,4).map((item:any)=><div key={item.productId} className="text-sm text-slate-300"><span className="text-white font-semibold">{item.productName}</span> · {item.providerName} <span className="text-[10px] font-mono text-violet-300">{item.matchStatus}</span></div>)}
                      {(fundingResult.options?.providerCandidates||[]).slice(0,3).map((item:any)=><div key={item.providerId+item.productId} className="text-sm text-emerald-300">Verified: {item.providerName} / {item.productName||item.productPathId}</div>)}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                      <div className="text-xs font-mono text-amber-400">QUALIFICATION + DOCUMENT GAPS</div>
                      <ul className="mt-3 space-y-2 text-xs text-slate-300">
                        {(fundingResult.options?.missingInformation||[]).slice(0,4).map((item:any)=><li key={item.field}>• {item.reason}</li>)}
                        {(fundingResult.options?.documentChecklist?.items||[]).filter((item:any)=>item.required).slice(0,4).map((item:any)=><li key={item.id}>• {item.label}</li>)}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                      <div className="text-xs font-mono text-cyan-400">LIVE SUPPORT RESOURCES</div>
                      <div className="mt-3 space-y-2">{(fundingResult.options?.supportResources||[]).map((item:any)=><a key={item.resourceId} href={item.liveUrl} target="_blank" rel="noreferrer" className="block text-xs text-cyan-300 hover:text-cyan-200">{item.name}</a>)}</div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                    <div className="text-xs font-mono text-amber-400">NEXT REQUIRED WORK</div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-300">
                      {(fundingResult.readiness?.readiness?.nextActions||[]).map((item:string)=><li key={item}>• {item}</li>)}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a href={CTAS_CONFIG.businessFunding.url} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-300">
                      Open Funding Intake <ArrowRight className="w-4 h-4"/>
                    </a>
                    <button onClick={persistDeal} disabled={!transactionReady||!token||operatorBusy}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-300 disabled:opacity-40">
                      <Database className="w-4 h-4"/> Persist as Deal
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/35 p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-2"><KeyRound className="w-5 h-5 text-cyan-400"/><h2 className="text-xl font-bold text-white">Operator Session</h2></div>
              <p className="text-xs text-slate-500 mb-6">Bearer token is held only in React memory for this browser session. It is not written to localStorage.</p>
              <label className="block">
                <span className="text-xs font-mono text-slate-400">BEARER TOKEN</span>
                <input type="password" value={token} onChange={e=>setToken(e.target.value)} autoComplete="off"
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                  placeholder="Configured server-side token"/>
              </label>
              <label className="block mt-4">
                <span className="text-xs font-mono text-slate-400">DEAL ID</span>
                <input value={dealId} onChange={e=>setDealId(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                  placeholder="deal_..."/>
              </label>
              <div className="grid sm:grid-cols-2 gap-3 mt-5">
                <button onClick={()=>operatorCall('/api/v1/deals')} disabled={!token||operatorBusy}
                  className="rounded-xl border border-slate-700 px-3 py-2.5 text-xs font-semibold text-slate-300 disabled:opacity-40">List Deals</button>
                <button onClick={()=>operatorCall('/api/v1/funding/' + encodeURIComponent(dealId) + '/status')} disabled={!token||!dealId||operatorBusy}
                  className="rounded-xl border border-slate-700 px-3 py-2.5 text-xs font-semibold text-slate-300 disabled:opacity-40">Funding Status</button>
                <button onClick={()=>operatorCall('/api/v1/deals/' + encodeURIComponent(dealId) + '/offers?compare=true')} disabled={!token||!dealId||operatorBusy}
                  className="rounded-xl border border-slate-700 px-3 py-2.5 text-xs font-semibold text-slate-300 disabled:opacity-40">Compare Offers</button>
                <button onClick={()=>operatorCall('/api/v1/deals/' + encodeURIComponent(dealId) + '/documents')} disabled={!token||!dealId||operatorBusy}
                  className="rounded-xl border border-slate-700 px-3 py-2.5 text-xs font-semibold text-slate-300 disabled:opacity-40">Document Room</button>
              </div>
              {operatorError&&<div className="mt-4 text-sm text-rose-300 border border-rose-900/60 bg-rose-950/30 rounded-xl p-4">{operatorError}</div>}
              <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/70 min-h-56 p-4 overflow-auto">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-3"><FileCheck2 className="w-4 h-4"/>WORKSPACE OUTPUT</div>
                <pre className="text-[11px] leading-relaxed text-slate-300 whitespace-pre-wrap break-words">{operatorResult?JSON.stringify(operatorResult,null,2):'No authenticated workspace request has been run.'}</pre>
              </div>
              <p className="mt-4 text-xs text-slate-500">Submission transmission, lender decisions, negotiations, and funding confirmations remain human-controlled. The console does not auto-submit a deal.</p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/35 p-6 sm:p-8">
            <div className="text-xs font-mono text-cyan-400">CANONICAL REGISTRY SEARCH</div>
            <div className="mt-4 flex gap-3">
              <input value={registryQuery} onChange={e=>setRegistryQuery(e.target.value)} placeholder="provider, product, funding type…" className="flex-1 rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white"/>
              <button onClick={async()=>{const q=encodeURIComponent(registryQuery);const [providers,products]=await Promise.all([jsonRequest('/api/v1/providers?q='+q),jsonRequest('/api/v1/products?q='+q)]);setRegistryResult({providers,products});}} className="rounded-xl border border-cyan-800 bg-cyan-950/30 px-4 py-3 text-sm font-semibold text-cyan-300">Search</button>
            </div>
            {registryResult&&<div className="mt-5 grid md:grid-cols-2 gap-5">
              <div><div className="text-xs font-mono text-slate-500">PROVIDERS</div>{(registryResult.providers?.providers||[]).slice(0,8).map((item:any)=><div key={item.id} className="mt-2 text-sm text-slate-300">{item.name} <span className="text-[10px] text-emerald-400">{item.status}</span></div>)}</div>
              <div><div className="text-xs font-mono text-slate-500">PRODUCTS</div>{(registryResult.products?.provider_products||[]).slice(0,8).map((item:any)=><div key={item.id} className="mt-2 text-sm text-slate-300">{item.name} <span className="text-[10px] text-violet-400">{item.verificationStatus}</span></div>)}</div>
            </div>}
          </div>
        </Container>
      </Section>
    </div>
  );
};
