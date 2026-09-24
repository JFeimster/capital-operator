import fs from 'node:fs';
import path from 'node:path';
import { MAIN_NAV, MORE_NAV, HEADER_ACTIONS } from '../src/config/navigation.js';
import { resolveAppLocation } from '../src/lib/routeLocation.js';

export async function runProductSurfaceTests() {
  const mainTitles=MAIN_NAV.map(item=>item.title);
  for(const required of ['Get Funded','Funding OS','Capital','Tools']) {
    if(!mainTitles.includes(required)) throw new Error('Primary navigation missing '+required);
  }
  if(MAIN_NAV.length>5) throw new Error('Primary navigation is too dense');
  if(HEADER_ACTIONS.primaryCTA.href!=='/get-funded') throw new Error('Primary CTA must lead to Get Funded');
  if(!MORE_NAV.some(item=>item.href==='/docs')) throw new Error('Docs must remain accessible in More navigation');

  const clean=resolveAppLocation('/get-funded','#home','/');
  if(clean!=='/get-funded') throw new Error('Clean pathname must win over legacy hash');
  const rootHash=resolveAppLocation('/','#assessment','/');
  if(rootHash!=='#assessment') throw new Error('Root legacy hash routing must remain available');
  const pages=resolveAppLocation('/capital-operator/get-funded','#home','/capital-operator/');
  if(pages!=='/get-funded') throw new Error('GitHub Pages base path resolution failed');

  const hero=fs.readFileSync(path.resolve('src/components/home/Hero.tsx'),'utf8');
  const deck=fs.readFileSync(path.resolve('src/components/home/ActionDeck.tsx'),'utf8');
  const router=fs.readFileSync(path.resolve('src/lib/router.tsx'),'utf8');
  const getFunded=fs.readFileSync(path.resolve('src/pages/GetFunded.tsx'),'utf8');
  const capital=fs.readFileSync(path.resolve('src/pages/CapitalStack.tsx'),'utf8');
  const tools=fs.readFileSync(path.resolve('src/pages/Tools.tsx'),'utf8');
  const fundingOs=fs.readFileSync(path.resolve('src/pages/FundingOperator.tsx'),'utf8');
  if(!hero.includes('Turn Capital Demand Into an')) throw new Error('Homepage hero is not aligned to canonical product positioning');
  if(!deck.includes('What are you trying to fund?')) throw new Error('Homepage action deck missing');
  if(!router.includes("case 'capital':")) throw new Error('Capital hub clean route missing');
  if(getFunded.includes("href={'#get-funded/")) throw new Error('Get Funded still emits legacy hash vertical URLs');
  if(!getFunded.includes("toAppHref('/get-funded/'+item.slug)")) throw new Error('Get Funded verticals must use canonical route helper');
  if(!getFunded.includes('CAPITAL COMMAND PREVIEW')) throw new Error('Get Funded command UI missing');
  if(!capital.includes('CAPITAL INTELLIGENCE // STRUCTURE')) throw new Error('Capital action hub UI missing');
  if(!tools.includes('OPERATOR TOOLBOX // 138 CANONICAL RESOURCES')) throw new Error('Tools command surface missing');
  if(!fundingOs.includes('FUNDING OS // OPERATOR COMMAND CENTER')) throw new Error('Funding OS command surface missing');

  return {passed:true,testName:'runProductSurfaceTests'};
}
