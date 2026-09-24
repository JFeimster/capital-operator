import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, FileCheck2, Search, ShieldCheck, Wrench } from 'lucide-react';
import { Breadcrumbs } from '../components/site/Breadcrumbs';
import { SEOHead } from '../components/site/SEOHead';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { getFundingPreset, FUNDING_DISCOVERY_PRESETS } from '../config/fundingPresets';
import { SEO_CONFIG } from '../config/seo';
import { getAttribution } from '../lib/attribution';
import { trackEvent } from '../lib/analytics';

const API_BASE=typeof window!=='undefined'&&window.location.hostname.endsWith('github.io')
  ?'https://capital-operator.vercel.app':'';

async function postOptions(payload:Record<string,unknown>){
  const response=await fetch(API_BASE+'/api/v1/funding/options',{
    method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)
  });
  const data=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(data?.message||('Funding discovery failed ('+response.status+')'));
  return data;
}

function num(value:string):number|undefined {
  const parsed=Number(value);
  return Number.isFinite(parsed)&&parsed>0?parsed:undefined;
}

export const GetFunded:React.FC<{presetSlug?:string}>=({presetSlug})=>{
  const preset=getFundingPreset(presetSlug);
  const [objective,setObjective]=useState(preset?.objective||'I need $250,000 for equipment and working capital.');
  const [amount,setAmount]=useState('250000');
  const [annualRevenue,setAnnualRevenue]=useState('');
  const [monthlyDeposits,setMonthlyDeposits]=useState('');
  const [timeInBusiness,setTimeInBusiness]=useState('');
  const [creditScore,setCreditScore]=useState('');
  const [industry,setIndustry]=useState('');
  const [state,setState]=useState('');
  const [equipmentType,setEquipmentType]=useState('');
  const [equipmentCost,setEquipmentCost]=useState('');
  const [contractStatus,setContractStatus]=useState('');
  const [contractAmount,setContractAmount]=useState('');
  const [purchasePrice,setPurchasePrice]=useState('');
  const [sde,setSde]=useState('');
  const [equity,setEquity]=useState('');
  const [receivables,setReceivables]=useState('');
  const [propertyValue,setPropertyValue]=useState('');
  const [noi,setNoi]=useState('');
  const [debtService,setDebtService]=useState('');
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');
  const [result,setResult]=useState<any>(null);

  useEffect(()=>{
    if(preset) setObjective(preset.objective);
    trackEvent('get_funded_started',{preset:preset?.id||'general'});
  },[preset?.id]);

  const seo=useMemo(()=>preset?{
    title:preset.label+' Funding Discovery — Capital Operator',
    description:'Describe your '+preset.label.toLowerCase()+' need and get funding paths, product candidates, document requirements, qualification gaps, and the next action.',
    canonical:'/get-funded/'+preset.slug,
    keywords:['get funded',preset.label.toLowerCase(),'business funding options']
  }:SEO_CONFIG.getFunded,[preset]);

  const submit=async()=>{
    setBusy(true);setError('');
    trackEvent('funding_search_started',{preset:preset?.id||'general'});
    try{
      const attribution=getAttribution();
      const payload:any={
        objective,requestedAmount:num(amount),
        vertical:preset?.vertical,fundingPurpose:preset?.fundingPurpose,
        businessProfile:{
          industry:industry||undefined,state:state||undefined,
          annualRevenue:num(annualRevenue),avgMonthlyDeposits:num(monthlyDeposits),
          timeInBusinessMonths:num(timeInBusiness),creditScore:num(creditScore)
        },
        source:'get-funded-ui',
        attribution:{
          source:attribution.utm_source||'get-funded-ui',
          campaign:attribution.utm_campaign,
          referralPartner:attribution.partner_id||attribution.ref,
          utmSource:attribution.utm_source,utmMedium:attribution.utm_medium,utmCampaign:attribution.utm_campaign,
          intakePath:preset?.slug?'get-funded/'+preset.slug:'get-funded'
        }
      };
      if(preset?.vertical==='equipment') payload.assetContext={equipmentType:equipmentType||undefined,equipmentCost:num(equipmentCost)};
      if(preset?.vertical==='government_contract') payload.contractContext={status:contractStatus||undefined,contractAmount:num(contractAmount)};
      if(preset?.vertical==='business_acquisition') payload.acquisitionContext={purchasePrice:num(purchasePrice),sellerDiscretionaryEarnings:num(sde),equityAvailable:num(equity)};
      if(preset?.vertical==='receivables') payload.receivableContext={outstandingReceivables:num(receivables)};
      if(preset?.vertical==='real_estate') payload.realEstateContext={propertyValue:num(propertyValue),annualNetOperatingIncome:num(noi),annualDebtService:num(debtService)};
      const data=await postOptions(payload);
      setResult(data);
      trackEvent('funding_options_generated',{paths:data.categoryFits?.length||0,products:data.productMatches?.length||0,providers:data.providerCandidates?.length||0});
      trackEvent('document_checklist_generated',{count:data.documentChecklist?.items?.length||0});
      if(data.supportResources?.length) trackEvent('support_tool_recommended',{resourceId:data.supportResources[0].resourceId});
      trackEvent('get_funded_completed',{preset:preset?.id||'general',providerDiscoveryStatus:data.providerDiscoveryStatus});
    }catch(err:any){setError(err?.message||'Unable to generate funding options.');}
    finally{setBusy(false);}
  };

  const handoff=()=>{
    if(!result?.handoff?.url) return;
    trackEvent('funding_handoff_prepared',{
      destinationType:result.handoff.destinationType,
      providerId:result.handoff.providerId,
      productId:result.handoff.productId
    });
    window.open(result.handoff.url,'_blank','noopener,noreferrer');
  };

  return (
    <>
      <SEOHead seo={seo}/>
      <div className="border-b border-slate-800 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,.12),transparent_38%)]">
        <Container>
          <div className="py-12 sm:py-16 max-w-5xl">
            <Breadcrumbs items={[{label:'Get Funded'}]} className="mb-6"/>
            <div className="font-mono text-xs tracking-[.22em] text-emerald-400 mb-4">FUNDING DISCOVERY // ACTION LAYER</div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">{preset?.label||'Tell Capital Operator what funding you need.'}</h1>
            <p className="mt-5 text-slate-300 max-w-3xl text-base sm:text-lg leading-relaxed">
              Describe the capital need. Capital Operator normalizes the request, ranks canonical funding paths and products, identifies verified provider candidates where supported, shows missing information and documents, and gives you the next action.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="mb-8 flex flex-wrap gap-2">
            {FUNDING_DISCOVERY_PRESETS.slice(0,8).map(item=>
              <a key={item.id} href={'#get-funded/'+item.slug} className={'rounded-lg border px-3 py-2 text-xs font-semibold '+(preset?.id===item.id?'border-emerald-500 bg-emerald-500/10 text-emerald-300':'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700')}>{item.label}</a>
            )}
          </div>

          <div className="grid xl:grid-cols-[.85fr_1.15fr] gap-8">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white">Start with the capital need</h2>
              <div className="mt-6 space-y-4">
                <label className="block"><span className="text-xs font-mono text-slate-400">WHAT DO YOU NEED FUNDING FOR?</span>
                  <textarea rows={3} value={objective} onChange={e=>setObjective(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"/>
                </label>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label><span className="text-xs font-mono text-slate-400">AMOUNT</span><input value={amount} onChange={e=>setAmount(e.target.value)} inputMode="numeric" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"/></label>
                  <label><span className="text-xs font-mono text-slate-400">INDUSTRY</span><input value={industry} onChange={e=>setIndustry(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"/></label>
                  <label><span className="text-xs font-mono text-slate-400">STATE</span><input value={state} onChange={e=>setState(e.target.value)} placeholder="VA" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"/></label>
                  <label><span className="text-xs font-mono text-slate-400">MONTHS IN BUSINESS</span><input value={timeInBusiness} onChange={e=>setTimeInBusiness(e.target.value)} inputMode="numeric" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"/></label>
                  <label><span className="text-xs font-mono text-slate-400">ANNUAL REVENUE</span><input value={annualRevenue} onChange={e=>setAnnualRevenue(e.target.value)} inputMode="numeric" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"/></label>
                  <label><span className="text-xs font-mono text-slate-400">AVG MONTHLY DEPOSITS</span><input value={monthlyDeposits} onChange={e=>setMonthlyDeposits(e.target.value)} inputMode="numeric" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"/></label>
                  <label><span className="text-xs font-mono text-slate-400">CREDIT SCORE</span><input value={creditScore} onChange={e=>setCreditScore(e.target.value)} inputMode="numeric" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"/></label>
                </div>

                {preset?.vertical==='equipment'&&<div className="grid sm:grid-cols-2 gap-4"><label><span className="text-xs font-mono text-slate-400">EQUIPMENT TYPE</span><input value={equipmentType} onChange={e=>setEquipmentType(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"/></label><label><span className="text-xs font-mono text-slate-400">EQUIPMENT COST</span><input value={equipmentCost} onChange={e=>setEquipmentCost(e.target.value)} inputMode="numeric" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"/></label></div>}
                {preset?.vertical==='government_contract'&&<div className="grid sm:grid-cols-2 gap-4"><label><span className="text-xs font-mono text-slate-400">CONTRACT STATUS</span><select value={contractStatus} onChange={e=>setContractStatus(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"><option value="">Select</option><option value="anticipated">Anticipated</option><option value="bid_submitted">Bid submitted</option><option value="awarded">Awarded</option><option value="executed">Executed</option><option value="currently_invoicing">Currently invoicing</option></select></label><label><span className="text-xs font-mono text-slate-400">CONTRACT AMOUNT</span><input value={contractAmount} onChange={e=>setContractAmount(e.target.value)} inputMode="numeric" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"/></label></div>}
                {preset?.vertical==='business_acquisition'&&<div className="grid sm:grid-cols-3 gap-4"><label><span className="text-xs font-mono text-slate-400">PURCHASE PRICE</span><input value={purchasePrice} onChange={e=>setPurchasePrice(e.target.value)} inputMode="numeric" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"/></label><label><span className="text-xs font-mono text-slate-400">SELLER SDE</span><input value={sde} onChange={e=>setSde(e.target.value)} inputMode="numeric" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"/></label><label><span className="text-xs font-mono text-slate-400">BUYER EQUITY</span><input value={equity} onChange={e=>setEquity(e.target.value)} inputMode="numeric" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"/></label></div>}
                {preset?.vertical==='receivables'&&<label className="block"><span className="text-xs font-mono text-slate-400">OUTSTANDING RECEIVABLES</span><input value={receivables} onChange={e=>setReceivables(e.target.value)} inputMode="numeric" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"/></label>}
                {preset?.vertical==='real_estate'&&<div className="grid sm:grid-cols-3 gap-4"><label><span className="text-xs font-mono text-slate-400">PROPERTY VALUE</span><input value={propertyValue} onChange={e=>setPropertyValue(e.target.value)} inputMode="numeric" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"/></label><label><span className="text-xs font-mono text-slate-400">ANNUAL NOI</span><input value={noi} onChange={e=>setNoi(e.target.value)} inputMode="numeric" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"/></label><label><span className="text-xs font-mono text-slate-400">ANNUAL DEBT SERVICE</span><input value={debtService} onChange={e=>setDebtService(e.target.value)} inputMode="numeric" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"/></label></div>}

                <button onClick={submit} disabled={busy} className="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-black text-slate-950 hover:bg-emerald-400 disabled:opacity-50">
                  <Search className="w-4 h-4"/>{busy?'Generating funding paths…':'Find Funding Options'}
                </button>
                {error&&<div className="rounded-xl border border-rose-900 bg-rose-950/30 p-4 text-sm text-rose-300">{error}</div>}
              </div>
            </div>

            <div className="space-y-5">
              {!result&&<div className="rounded-3xl border border-slate-800 bg-slate-900/25 p-8 text-slate-400"><ShieldCheck className="w-8 h-8 text-emerald-400 mb-4"/><h2 className="text-xl font-bold text-white">Explainable funding discovery</h2><p className="mt-2 text-sm leading-relaxed">Results are ranked from canonical product/provider data. Imported criteria stay marked for review. Verified provider candidates require verified provider identity and verified product-level criteria.</p></div>}
              {result&&<>
                <div className="rounded-3xl border border-emerald-900/70 bg-emerald-950/15 p-6">
                  <div className="text-xs font-mono text-emerald-400">PRIMARY NEXT ACTION</div>
                  <div className="mt-2 text-lg font-bold text-white">{result.nextAction}</div>
                  <button onClick={handoff} className="mt-5 inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-sm font-bold text-emerald-300">Start Funding Handoff <ArrowRight className="w-4 h-4"/></button>
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-900/35 p-6">
                  <div className="text-xs font-mono text-cyan-400">FUNDING PATHS</div>
                  <div className="mt-4 space-y-3">{(result.categoryFits||[]).slice(0,5).map((item:any)=><div key={item.productPathId} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"><div className="flex justify-between gap-4"><span className="font-semibold text-white">{item.productName}</span><span className="text-xs font-mono text-cyan-300">{item.score}</span></div><p className="mt-2 text-xs text-slate-400">{item.reasons?.join(' ')}</p></div>)}</div>
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-900/35 p-6">
                  <div className="text-xs font-mono text-violet-400">PRODUCT CANDIDATES</div>
                  <div className="mt-4 grid gap-3">{(result.productMatches||[]).slice(0,6).map((item:any)=><button key={item.productId} onClick={()=>trackEvent('product_candidate_viewed',{productId:item.productId})} className="text-left rounded-xl border border-slate-800 bg-slate-950/60 p-4"><div className="flex justify-between gap-4"><div><div className="font-semibold text-white">{item.productName}</div><div className="text-xs text-slate-500">{item.providerName} · {item.productFamilyId}</div></div><span className="text-[10px] font-mono text-violet-300">{item.matchStatus}</span></div>{item.qualificationGaps?.length>0&&<div className="mt-2 text-xs text-amber-300">{item.qualificationGaps[0].reason}</div>}</button>)}</div>
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-900/35 p-6">
                  <div className="text-xs font-mono text-emerald-400">VERIFIED PROVIDER CANDIDATES</div>
                  {(result.providerCandidates||[]).length?<div className="mt-4 grid gap-3">{result.providerCandidates.slice(0,5).map((item:any)=><button key={item.providerId+item.productId} onClick={()=>trackEvent('provider_candidate_viewed',{providerId:item.providerId,productId:item.productId})} className="text-left rounded-xl border border-emerald-900/50 bg-slate-950/60 p-4"><div className="font-semibold text-white">{item.providerName}</div><div className="text-xs text-slate-400 mt-1">{item.productName||item.productPathId}</div><p className="text-xs text-slate-500 mt-2">{item.whyRelevant?.slice(0,3).join(' ')}</p></button>)}</div>:<p className="mt-3 text-sm text-slate-400">No provider-specific candidate clears the current verified-criteria boundary. Product and funding-path guidance is still available.</p>}
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="rounded-3xl border border-slate-800 bg-slate-900/35 p-6"><div className="flex items-center gap-2 text-xs font-mono text-amber-400"><FileCheck2 className="w-4 h-4"/>MISSING + DOCUMENTS</div><ul className="mt-4 space-y-2 text-xs text-slate-300">{(result.missingInformation||[]).slice(0,5).map((item:any)=><li key={item.field}>• {item.reason}</li>)}{(result.documentChecklist?.items||[]).filter((x:any)=>x.required).slice(0,5).map((item:any)=><li key={item.id}>• {item.label}</li>)}</ul></div>
                  <div className="rounded-3xl border border-slate-800 bg-slate-900/35 p-6"><div className="flex items-center gap-2 text-xs font-mono text-cyan-400"><Wrench className="w-4 h-4"/>LIVE SUPPORT RESOURCES</div>{(result.supportResources||[]).length?<div className="mt-4 space-y-2">{result.supportResources.map((item:any)=><a key={item.resourceId} href={item.liveUrl} target="_blank" rel="noreferrer" className="block rounded-xl border border-slate-800 p-3 text-sm text-cyan-200 hover:border-cyan-800">{item.name}</a>)}</div>:<p className="mt-3 text-sm text-slate-500">No verified-live support resource matched this request strongly enough.</p>}</div>
                </div>
                <p className="text-xs leading-relaxed text-slate-500">{result.disclaimer}</p>
              </>}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};
