import { applyCors } from '../../../server/http/cors.js';
import { findVerifiedProviderCandidates, PROVIDER_REGISTRY_STATUS } from '../../../src/config/fundingProviders.js';

export default async function handler(req:any,res:any){
  applyCors(req,res,['POST','OPTIONS']);
  if(req.method==='OPTIONS') return res.status(200).end();
  if(req.method!=='POST') return res.status(405).json({status:'error',code:'METHOD_NOT_ALLOWED',message:'Expected POST.',timestamp:new Date().toISOString()});
  const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
  const productPathIds=Array.isArray(body.productPathIds)?body.productPathIds.map(String):[];
  if(!productPathIds.length) return res.status(400).json({status:'error',code:'VALIDATION_FAILED',message:'productPathIds must contain at least one product path id.',timestamp:new Date().toISOString()});
  const providers=findVerifiedProviderCandidates(productPathIds);
  return res.status(200).json({
    status:'success',
    capability_status:providers.length?'BETA':PROVIDER_REGISTRY_STATUS.status,
    provider_discovery_status:providers.length?'VERIFIED_RESULTS':'NO_VERIFIED_PROVIDER_DATA',
    providers,
    eligibility_claimed:false,
    availability_claimed:false,
    timestamp:new Date().toISOString()
  });
}
