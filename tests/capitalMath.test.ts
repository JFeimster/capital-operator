import { calculateCommercialDscr } from '../src/lib/capitalMath';

export function runCapitalMathTests() {
  const result=calculateCommercialDscr({netOperatingIncome:150000,annualDebtService:100000});
  if(result.dscr!==1.5) throw new Error('Expected DSCR 1.5');
  if(result.coverageBand!=='ONE_25_PLUS') throw new Error('Expected 1.25+ coverage band');
  let threw=false; try { calculateCommercialDscr({netOperatingIncome:100,annualDebtService:0}); } catch { threw=true; }
  if(!threw) throw new Error('Expected zero debt service validation error');
  if(result.humanReviewRequired!==true) throw new Error('DSCR result must require human review');
  return {passed:true,testName:'runCapitalMathTests'};
}
