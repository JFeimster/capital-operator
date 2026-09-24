import intentsHandler from '../api/v1/funding/intents.js';
import optionsHandler from '../api/v1/funding/options.js';
import readinessHandler from '../api/v1/funding/readiness.js';

class MockResponse {
  statusCode=200;
  headers:Record<string,string>={};
  data:any=null;
  status(code:number){this.statusCode=code;return this;}
  setHeader(name:string,value:string){this.headers[name]=value;return this;}
  json(body:any){this.data=body;return this;}
  end(){return this;}
}

export async function runFundingApiTests() {
  const req={
    method:'POST',
    headers:{},
    body:{
      objective:'I need $150,000 in equipment financing.',
      businessProfile:{timeInBusinessMonths:36,annualRevenue:900000},
      assetContext:{equipmentType:'excavator',equipmentCost:150000}
    }
  };

  const intentRes=new MockResponse();
  await intentsHandler(req,intentRes);
  if(intentRes.statusCode!==200 || intentRes.data?.intent?.vertical!=='equipment') {
    throw new Error('Funding intent API failed');
  }
  if(intentRes.data?.persistence!=='NON_PERSISTENT') {
    throw new Error('Funding intent API must not imply durable storage');
  }

  const optionsRes=new MockResponse();
  await optionsHandler(req,optionsRes);
  if(optionsRes.statusCode!==200 || optionsRes.data?.providerDiscoveryStatus!=='NO_VERIFIED_PROVIDER_DATA') {
    throw new Error('Funding options API provider truth boundary failed');
  }

  const readinessRes=new MockResponse();
  await readinessHandler(req,readinessRes);
  if(readinessRes.statusCode!==200 || readinessRes.data?.readiness?.humanReviewRequired!==true) {
    throw new Error('Funding readiness API failed');
  }

  return {passed:true,testName:'runFundingApiTests'};
}
