import dealsHandler from '../api/v1/deals/index.js';
import dealHandler from '../api/v1/deals/[id].js';
import transitionHandler from '../api/v1/deals/[id]/transition.js';
import fundingStatusHandler from '../api/v1/funding/[id]/status.js';
import { getDevelopmentMemoryRepository } from '../server/persistence/index.js';

class MockResponse {
  statusCode=200;
  headers:Record<string,string>={};
  data:any=null;
  status(code:number){this.statusCode=code;return this;}
  setHeader(name:string,value:string){this.headers[name]=value;return this;}
  json(body:any){this.data=body;return this;}
  end(){return this;}
}

const headers={
  'x-capital-user-id':'api-operator',
  'x-capital-workspace-id':'api-workspace',
  'x-capital-role':'operator'
};

export async function runDealApiTests() {
  const original={
    nodeEnv:process.env.NODE_ENV,
    authMode:process.env.CAPITAL_AUTH_MODE,
    persistenceMode:process.env.CAPITAL_PERSISTENCE_MODE
  };

  try {
    process.env.NODE_ENV='test';
    process.env.CAPITAL_AUTH_MODE='development';
    process.env.CAPITAL_PERSISTENCE_MODE='memory';
    getDevelopmentMemoryRepository().clearForTests();

    const createRes=new MockResponse();
    await dealsHandler({
      method:'POST',
      headers,
      body:{
        objective:'I need $175,000 for working capital.',
        businessProfile:{timeInBusinessMonths:48,annualRevenue:1000000}
      }
    },createRes);
    if(createRes.statusCode!==201 || createRes.data?.deal?.workspaceId!=='api-workspace') {
      throw new Error('Deal POST API failed');
    }
    const dealId=createRes.data.deal.id;

    const detailRes=new MockResponse();
    await dealHandler({method:'GET',headers,query:{id:dealId}},detailRes);
    if(detailRes.statusCode!==200 || detailRes.data?.deal?.id!==dealId) {
      throw new Error('Deal GET API failed');
    }

    const crossRes=new MockResponse();
    await dealHandler({
      method:'GET',
      headers:{...headers,'x-capital-workspace-id':'other-workspace'},
      query:{id:dealId}
    },crossRes);
    if(crossRes.statusCode!==404) throw new Error('Deal API must prevent cross-workspace access');

    const transitionRes=new MockResponse();
    await transitionHandler({
      method:'POST',
      headers,
      query:{id:dealId},
      body:{to:'INTAKE',reason:'Start applicant intake'}
    },transitionRes);
    if(transitionRes.statusCode!==200 || transitionRes.data?.deal?.status!=='INTAKE') {
      throw new Error('Deal transition API failed');
    }

    const statusRes=new MockResponse();
    await fundingStatusHandler({method:'GET',headers,query:{id:dealId}},statusRes);
    if(statusRes.statusCode!==200 || statusRes.data?.deal_stage!=='INTAKE') {
      throw new Error('Funding status API failed');
    }
    if(!Array.isArray(statusRes.data?.submissions) || !Array.isArray(statusRes.data?.offers_received)) {
      throw new Error('Funding status API must expose transaction collections');
    }

    const unauthRes=new MockResponse();
    await dealsHandler({method:'GET',headers:{}},unauthRes);
    if(unauthRes.statusCode!==401) throw new Error('Deal API must require authenticated context');

    return {passed:true,testName:'runDealApiTests'};
  } finally {
    if(original.nodeEnv===undefined) delete process.env.NODE_ENV; else process.env.NODE_ENV=original.nodeEnv;
    if(original.authMode===undefined) delete process.env.CAPITAL_AUTH_MODE; else process.env.CAPITAL_AUTH_MODE=original.authMode;
    if(original.persistenceMode===undefined) delete process.env.CAPITAL_PERSISTENCE_MODE; else process.env.CAPITAL_PERSISTENCE_MODE=original.persistenceMode;
  }
}
