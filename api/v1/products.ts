import { applyCors } from '../../server/http/cors.js';
import {
  FUNDING_PRODUCT_FAMILIES,
  FUNDING_PRODUCTS,
  FUNDING_PRODUCT_PATHS,
  FUNDING_PRODUCT_REGISTRY_STATUS
} from '../../src/config/fundingProducts.js';

export default async function handler(req:any,res:any){
  applyCors(req,res,['GET','OPTIONS']);
  if(req.method==='OPTIONS') return res.status(200).end();
  if(req.method!=='GET') return res.status(405).json({status:'error',code:'METHOD_NOT_ALLOWED',message:'Expected GET.',timestamp:new Date().toISOString()});

  return res.status(200).json({
    status:'success',
    capability_status:FUNDING_PRODUCT_REGISTRY_STATUS.status,
    registry_status:FUNDING_PRODUCT_REGISTRY_STATUS,
    products:FUNDING_PRODUCT_PATHS,
    product_paths:FUNDING_PRODUCT_PATHS,
    product_families:FUNDING_PRODUCT_FAMILIES.filter(family=>family.visibility==='public').map(family=>({
      id:family.id,
      slug:family.slug,
      name:family.name,
      publicName:family.publicName,
      summary:family.summary,
      route:family.route,
      status:family.status,
      commonUseCases:family.commonUseCases,
      qualificationSignals:family.qualificationSignals,
      speedProfile:family.speedProfile,
      requiredDocuments:family.requiredDocuments
    })),
    provider_product_count:FUNDING_PRODUCTS.length,
    provider_products_internal:true,
    provider_specific:false,
    timestamp:new Date().toISOString()
  });
}
