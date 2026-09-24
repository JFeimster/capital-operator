import { applyCors } from '../../../../server/http/cors.js';
import { authenticateHeaders, headersFromRequest } from '../../../../server/auth/authService.js';
import { sendOperationalError } from '../../../../server/http/operationalErrors.js';
import { createDocumentMetadata, listDocuments } from '../../../../server/transactions/service.js';

function routeId(req:any):string{
  const value=req.query?.id;
  return Array.isArray(value)?String(value[0]||''):String(value||'');
}

export default async function handler(req:any,res:any){
  applyCors(req,res,['GET','POST','OPTIONS']);
  if(req.method==='OPTIONS') return res.status(200).end();
  try{
    const session=authenticateHeaders(headersFromRequest(req));
    const dealId=routeId(req);
    if(!dealId) return res.status(400).json({status:'error',code:'VALIDATION_FAILED',message:'Deal id is required.',timestamp:new Date().toISOString()});
    if(req.method==='GET'){
      const documents=await listDocuments(session,dealId);
      return res.status(200).json({status:'success',documents,file_storage_performed:false,timestamp:new Date().toISOString()});
    }
    if(req.method==='POST'){
      const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
      const document=await createDocumentMetadata(session,dealId,{
        type:body.type,
        filename:body.filename,
        mimeType:body.mimeType,
        storageReference:body.storageReference,
        source:body.source
      },req.headers?.['x-correlation-id']);
      return res.status(201).json({status:'success',document,file_storage_performed:false,timestamp:new Date().toISOString()});
    }
    return res.status(405).json({status:'error',code:'METHOD_NOT_ALLOWED',message:'Expected GET or POST.',timestamp:new Date().toISOString()});
  }catch(error){return sendOperationalError(res,error,'Unable to process document metadata.');}
}
