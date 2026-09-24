import { applyCors } from '../../server/http/cors.js';
import { FUNDING_PRODUCT_FAMILIES, FUNDING_PRODUCTS, FUNDING_PRODUCT_PATHS, FUNDING_PRODUCT_REGISTRY_STATUS } from '../../src/config/fundingProducts.js';

function first(value:any):string { return Array.isArray(value)?String(value[0]||''):String(value||''); }
function number(value:any):number|undefined { const parsed=Number(first(value)); return Number.isFinite(parsed)?parsed:undefined; }
function bool(value:any):boolean|undefined { const raw=first(value).toLowerCase(); if(raw==='true') return true; if(raw==='false') return false; return undefined; }

export default async function handler(req:any,res:any){
  applyCors(req,res,['GET','OPTIONS']);
  if(req.method==='OPTIONS') return res.status(200).end();
  if(req.method!=='GET') return res.status(405).json({status:'error',code:'METHOD_NOT_ALLOWED',message:'Expected GET.',timestamp:new Date().toISOString()});

  const q=first(req.query?.q).trim().toLowerCase();
  const family=first(req.query?.family);
  const productPath=first(req.query?.productPath||req.query?.product_path);
  const provider=first(req.query?.provider);
  const requestedAmount=number(req.query?.amount);
  const credit=number(req.query?.credit);
  const monthlyRevenue=number(req.query?.monthlyRevenue);
  const timeInBusinessMonths=number(req.query?.timeInBusinessMonths);
  const startup=bool(req.query?.startup);
  const verification=first(req.query?.verification).toUpperCase();

  const providerProducts=FUNDING_PRODUCTS.filter(product=>{
    if(q && ![product.name,product.providerName,product.fundingType,product.category].some(value=>String(value||'').toLowerCase().includes(q))) return false;
    if(family && product.productFamily!==family) return false;
    if(productPath && product.productPathId!==productPath) return false;
    if(provider && product.providerId!==provider) return false;
    if(requestedAmount!==undefined && ((product.minAmount!==undefined&&requestedAmount<product.minAmount)||(product.maxAmount!==undefined&&requestedAmount>product.maxAmount))) return false;
    if(credit!==undefined && product.minCreditScore!==undefined && credit<product.minCreditScore) return false;
    if(monthlyRevenue!==undefined && product.minMonthlyRevenue!==undefined && monthlyRevenue<product.minMonthlyRevenue) return false;
    if(timeInBusinessMonths!==undefined && product.minTimeInBusinessMonths!==undefined && timeInBusinessMonths<product.minTimeInBusinessMonths) return false;
    if(startup!==undefined && product.startupEligible!==undefined && product.startupEligible!==startup) return false;
    if(verification && product.provenance.verificationStatus!==verification) return false;
    return true;
  }).map(product=>({
    id:product.id,slug:product.slug,name:product.name,providerId:product.providerId,providerName:product.providerName,
    productFamily:product.productFamily,productPathId:product.productPathId,fundingType:product.fundingType,
    minAmount:product.minAmount,maxAmount:product.maxAmount,minCreditScore:product.minCreditScore,minMonthlyRevenue:product.minMonthlyRevenue,
    minTimeInBusinessMonths:product.minTimeInBusinessMonths,termLength:product.termLength,paymentType:product.paymentType,
    rateCostRange:product.rateCostRange,timeToFunding:product.timeToFunding,startupEligible:product.startupEligible,
    status:product.status,verificationStatus:product.provenance.verificationStatus,lastVerifiedAt:product.provenance.verifiedAt
  }));

  return res.status(200).json({
    status:'success',capability_status:FUNDING_PRODUCT_REGISTRY_STATUS.status,registry_status:FUNDING_PRODUCT_REGISTRY_STATUS,
    filters:{q,family,productPath,provider,requestedAmount,credit,monthlyRevenue,timeInBusinessMonths,startup,verification},
    products:FUNDING_PRODUCT_PATHS,product_paths:FUNDING_PRODUCT_PATHS,
    product_families:FUNDING_PRODUCT_FAMILIES.filter(family=>family.visibility==='public').map(family=>({
      id:family.id,slug:family.slug,name:family.name,publicName:family.publicName,summary:family.summary,route:family.route,status:family.status,
      commonUseCases:family.commonUseCases,qualificationSignals:family.qualificationSignals,speedProfile:family.speedProfile,requiredDocuments:family.requiredDocuments
    })),
    provider_products:providerProducts,provider_product_count:FUNDING_PRODUCTS.length,filtered_provider_product_count:providerProducts.length,
    provider_products_internal:false,provider_specific:true,human_review_required:true,timestamp:new Date().toISOString()
  });
}
