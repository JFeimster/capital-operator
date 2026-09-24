import { applyCors } from '../../server/http/cors.js';
import { VERIFIED_FUNDING_PROVIDERS, PROVIDER_REGISTRY_STATUS } from '../../src/config/fundingProviders.js';

function first(value:any):string {
  return Array.isArray(value)?String(value[0]||''):String(value||'');
}
function number(value:any):number|undefined {
  const parsed=Number(first(value));
  return Number.isFinite(parsed)?parsed:undefined;
}

export default async function handler(req:any,res:any){
  applyCors(req,res,['GET','OPTIONS']);
  if(req.method==='OPTIONS') return res.status(200).end();
  if(req.method!=='GET') return res.status(405).json({status:'error',code:'METHOD_NOT_ALLOWED',message:'Expected GET.',timestamp:new Date().toISOString()});

  const q=first(req.query?.q).trim().toLowerCase();
  const family=first(req.query?.family);
  const productPath=first(req.query?.productPath||req.query?.product_path);
  const geography=first(req.query?.state||req.query?.geography).toLowerCase();
  const minCredit=number(req.query?.credit||req.query?.minCredit);
  const minRevenue=number(req.query?.monthlyRevenue||req.query?.minRevenue);
  const minTib=number(req.query?.timeInBusinessMonths||req.query?.minTimeInBusinessMonths);

  const providers=VERIFIED_FUNDING_PROVIDERS.filter(provider=>{
    if(q && ![provider.name,provider.slug,...(provider.financingProducts||[]),...(provider.categories||[])].filter(Boolean).some(value=>String(value).toLowerCase().includes(q))) return false;
    if(family && !(provider.productFamilyIds||[]).includes(family)) return false;
    if(productPath && !provider.productPathIds.includes(productPath)) return false;
    if(geography && !(provider.geography||[]).some(value=>String(value).toLowerCase()===geography||String(value).toLowerCase()==='us')) return false;
    if(minCredit!==undefined && typeof provider.eligibility?.minCreditScore==='number' && provider.eligibility.minCreditScore>minCredit) return false;
    if(minRevenue!==undefined && typeof provider.eligibility?.minMonthlyRevenue==='number' && provider.eligibility.minMonthlyRevenue>minRevenue) return false;
    if(minTib!==undefined && typeof provider.eligibility?.minTimeInBusinessMonths==='number' && provider.eligibility.minTimeInBusinessMonths>minTib) return false;
    return true;
  }).map(provider=>({
    id:provider.id,slug:provider.slug,name:provider.name,status:provider.status,lastVerifiedAt:provider.lastVerifiedAt,
    geography:provider.geography,website:provider.website,applicationUrl:provider.applicationUrl,categories:provider.categories,
    productFamilyIds:provider.productFamilyIds,financingProducts:provider.financingProducts,productPathIds:provider.productPathIds,
    eligibility:provider.eligibility,typicalBorrowerProfile:provider.typicalBorrowerProfile,
    provenance:{verificationStatus:provider.provenance.verificationStatus,verifiedAt:provider.provenance.verifiedAt,sourceRecordId:provider.provenance.sourceRecordId}
  }));

  return res.status(200).json({
    status:'success',capability_status:PROVIDER_REGISTRY_STATUS.status,registry_status:PROVIDER_REGISTRY_STATUS,
    filters:{q,family,productPath,geography,minCredit,minRevenue,minTib},count:providers.length,providers,
    provider_availability_claimed:false,internal_fields_exposed:false,timestamp:new Date().toISOString()
  });
}
