import { applyCors } from '../../server/http/cors.js';
import { VERIFIED_FUNDING_PROVIDERS, PROVIDER_REGISTRY_STATUS } from '../../src/config/fundingProviders.js';

export default async function handler(req:any,res:any){
  applyCors(req,res,['GET','OPTIONS']);
  if(req.method==='OPTIONS') return res.status(200).end();
  if(req.method!=='GET') return res.status(405).json({status:'error',code:'METHOD_NOT_ALLOWED',message:'Expected GET.',timestamp:new Date().toISOString()});

  const providers=VERIFIED_FUNDING_PROVIDERS.map(provider=>({
    id:provider.id,
    slug:provider.slug,
    name:provider.name,
    status:provider.status,
    lastVerifiedAt:provider.lastVerifiedAt,
    geography:provider.geography,
    website:provider.website,
    applicationUrl:provider.applicationUrl,
    categories:provider.categories,
    productFamilyIds:provider.productFamilyIds,
    financingProducts:provider.financingProducts,
    productPathIds:provider.productPathIds,
    provenance:{
      verificationStatus:provider.provenance.verificationStatus,
      verifiedAt:provider.provenance.verifiedAt,
      sourceRecordId:provider.provenance.sourceRecordId
    }
  }));

  return res.status(200).json({
    status:'success',
    capability_status:PROVIDER_REGISTRY_STATUS.status,
    registry_status:PROVIDER_REGISTRY_STATUS,
    providers,
    provider_availability_claimed:false,
    internal_fields_exposed:false,
    timestamp:new Date().toISOString()
  });
}
