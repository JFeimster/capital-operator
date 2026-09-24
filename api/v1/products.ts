import { applyCors } from '../../server/http/cors.js';
import { FUNDING_PRODUCT_PATHS } from '../../src/config/fundingProducts.js';

export default async function handler(req:any,res:any){
  applyCors(req,res,['GET','OPTIONS']);
  if(req.method==='OPTIONS') return res.status(200).end();
  if(req.method!=='GET') return res.status(405).json({status:'error',code:'METHOD_NOT_ALLOWED',message:'Expected GET.',timestamp:new Date().toISOString()});
  return res.status(200).json({
    status:'success',
    capability_status:'BETA',
    products:FUNDING_PRODUCT_PATHS,
    provider_specific:false,
    timestamp:new Date().toISOString()
  });
}
