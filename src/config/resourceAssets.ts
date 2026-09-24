import { GENERATED_FUNDING_RESOURCE_ASSETS } from '../data/fundingResourceAssets.generated.js';

export const FUNDING_RESOURCE_ASSETS = GENERATED_FUNDING_RESOURCE_ASSETS;
export const LIVE_FUNDING_RESOURCE_ASSETS = FUNDING_RESOURCE_ASSETS.filter(asset=>asset.status==='LIVE');

export const RESOURCE_ASSET_SOURCE_STATUS = {
  status:'BETA' as const,
  sourcePackage:'Registries.zip',
  importedAt:'2026-09-24',
  resourceCount:FUNDING_RESOURCE_ASSETS.length,
  liveResourceCount:LIVE_FUNDING_RESOURCE_ASSETS.length,
  conceptResourceCount:FUNDING_RESOURCE_ASSETS.filter(asset=>asset.status==='CONCEPT').length,
  sourceToolRows:125,
  sourceCalculatorRows:138,
  exactSemanticOverlaps:121,
  normalizedAliasOverlaps:4,
  calculatorOnlyRows:13,
  note:'Overlapping tool/calculator records were canonicalized into one asset. Tool registry metadata wins on overlap; calculator-only records remain non-operational concepts.'
};

export function findFundingResourceAssets(options:{query?:string;status?:'LIVE'|'CONCEPT'|'ANY';limit?:number}={}) {
  const query=String(options.query||'').trim().toLowerCase();
  const status=options.status||'LIVE';
  const limit=Math.min(Math.max(Number(options.limit)||10,1),50);
  return FUNDING_RESOURCE_ASSETS.filter(asset=>{
    if(status!=='ANY'&&asset.status!==status) return false;
    if(!query) return true;
    return [asset.name,asset.slug,...asset.aliases,asset.brand,asset.persona,asset.problem,asset.painSolved,asset.assetType,asset.partnerChannel]
      .filter(Boolean).some(value=>String(value).toLowerCase().includes(query));
  }).slice(0,limit);
}
