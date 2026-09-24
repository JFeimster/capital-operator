import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BadgeDollarSign, Building2, FileCheck2, Gauge, Landmark, Route, Search, ShieldCheck, Sparkles, Truck, Wrench } from 'lucide-react';
import { Breadcrumbs } from '../components/site/Breadcrumbs';
import { SEOHead } from '../components/site/SEOHead';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { getFundingPreset, FUNDING_DISCOVERY_PRESETS } from '../config/fundingPresets';
import { SEO_CONFIG } from '../config/seo';
import { getAttribution } from '../lib/attribution';
import { trackEvent } from '../lib/analytics';
import { toAppHref } from '../lib/routeLocation';

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
      <div className="relative overflow-hidden border-b border-slate-800 bg-[#07090d]">
        <div className="absolute inset-0 bg-grid-pattern opacity-70"/>
        <div className="absolute -top-48 left-[-8%] h-[420px] w-[420px] rounded-full bg-emerald-500/10 blur-3xl"/>
        <div className="absolute top-10 right-[-6%] h-[360px] w-[360px] rounded-full bg-cyan-500/10 blur-3xl"/>
        <Container>
          <div className="relative py-12 sm:py-16">
            <Breadcrumbs items={[{label:'Get Funded'}]} className="mb-6"/>
            <div className="grid xl:grid-cols-[1.15fr_.85fr] gap-8 items-end">
              <div className="max-w-4xl">
                <div className="font-mono text-[11px] sm:text-xs tracking-[.22em] text-emerald-400 mb-4">FUNDING DISCOVERY // ACTION LAYER</div>
                <h1 className="text-4xl sm:text-6xl font-black tracking-[-0.04em] leading-[1.02] text-white">
                  {preset?.label||'Tell Capital Operator what funding you need.'}
                </h1>
                <p className="mt-5 text-slate-300 max-w-3xl text-base sm:text-lg leading-relaxed">
                  Start with the capital need. Get ranked funding paths, product candidates, verified provider candidates where supported, qualification gaps, documents, tools, and the next action.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {label:'Providers',value:'33',icon:Building2,tone:'emerald'},
                  {label:'Products',value:'59',icon:BadgeDollarSign,tone:'cyan'},
                  {label:'Presets',value:'11',icon:Route,tone:'violet'},
                  {label:'Resources',value:'138',icon:Wrench,tone:'amber'}
                ].map(({label,value,icon:Icon,tone})=>(
                  <div key={label} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 backdrop-blur">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-[.16em] text-slate-500">{label.toUpperCase()}</span>
                      <Icon className={"h-4 w-4 "+(tone==='emerald'?'text-emerald-400':tone==='cyan'?'text-cyan-400':tone==='violet'?'text-violet-400':'text-amber-400')}/>
                    </div>
                    <div className="mt-2 text-2xl font-black text-white">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Section>
        <Container>
          <div className="mb-8">
            <div className="flex items-end justify-between gap-4 mb-4">
              <div>
                <div className="font-mono text-[10px] tracking-[.2em] text-cyan-400">CHOOSE A FUNDING MISSION</div>
                <h2 className="mt-1 text-xl sm:text-2xl font-black text-white">Start with the outcome.</h2>
              </div>
              <a href={toAppHref('/funding')} className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white">
                Open Funding OS <ArrowRight className="h-3.5 w-3.5"/>
              </a>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {FUNDING_DISCOVERY_PRESETS.slice(0,8).map((item,index)=>{
                const Icon=index===0?Gauge:index===2?Truck:index===3?Building2:index===4?Landmark:Route;
                const active=preset?.id===item.id;
                return (
                  <a key={item.id} href={toAppHref('/get-funded/'+item.slug)}
                    className={'group rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-0.5 '+(active
                      ?'border-emerald-500/60 bg-emerald-500/10 shadow-lg shadow-emerald-950/20'
                      :'border-slate-800 bg-slate-900/45 hover:border-slate-700 hover:bg-slate-900/70')}>
                    <div className="flex items-start justify-between gap-3">
                      <div className={'rounded-xl border p-2 '+(active?'border-emerald-500/30 bg-emerald-500/10':'border-slate-800 bg-slate-950')}>
                        <Icon className={'h-4 w-4 '+(active?'text-emerald-300':'text-slate-400 group-hover:text-cyan-300')}/>
                      </div>
                      {active&&<span className="font-mono text-[9px] text-emerald-300">ACTIVE</span>}
                    </div>
                    <div className="mt-3 text-sm font-bold text-white">{item.label}</div>
                    <div className="mt-1 text-[11px] leading-relaxed text-slate-500">{item.description}</div>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid xl:grid-cols-[.82fr_1.18fr] gap-6 lg:gap-8 items-start">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 shadow-2xl shadow-black/20 xl:sticky xl:top-24">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-[10px] tracking-[.18em] text-emerald-400">REQUEST BUILDER</div>
                  <h2 className="mt-1 text-xl font-black text-white">Build the funding request</h2>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5"><Sparkles className="h-5 w-5 text-emerald-400"/></div>
              </div>
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
              {!result&&<div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/35 p-7 text-slate-400">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,.10),transparent_42%)]"/>
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-[10px] tracking-[.2em] text-cyan-400">CAPITAL COMMAND PREVIEW</div>
                      <h2 className="mt-1 text-2xl font-black text-white">What happens when you run discovery</h2>
                    </div>
                    <ShieldCheck className="w-7 h-7 text-emerald-400"/>
                  </div>
                  <div className="mt-6 grid sm:grid-cols-2 gap-3">
                    {[
                      ['01','Rank capital paths','Outcome + product-family fit'],
                      ['02','Find product candidates','Criteria-aware matching'],
                      ['03','Surface providers','Verified candidates where supported'],
                      ['04','Expose gaps','Qualification + document needs'],
                      ['05','Recommend resources','Live tools and calculators'],
                      ['06','Give next action','Handoff or operator workflow']
                    ].map(([n,title,desc])=>(
                      <div key={n} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                        <div className="font-mono text-[10px] text-slate-600">{n}</div>
                        <div className="mt-2 text-sm font-bold text-white">{title}</div>
                        <div className="mt-1 text-[11px] text-slate-500">{desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>}
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
