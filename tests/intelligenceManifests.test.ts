import fs from 'node:fs';
import path from 'node:path';

export function runIntelligenceManifestTests() {
  const skills=['capital-assessment','capital-blueprint','capital-routing','capital-case','capital-stack-design'];
  for(const skill of skills) {
    const p=path.join(process.cwd(),'skills',skill,'SKILL.md');
    const text=fs.readFileSync(p,'utf8');
    if(!text.includes('Human checkpoint')) throw new Error(`Skill missing human checkpoint: ${skill}`);
    if(!text.includes('Do not invent lender approvals')) throw new Error(`Skill missing lender-claim prohibition: ${skill}`);
  }
  const agents=['capital-architect','intake-analyst','capital-case-builder','routing-copilot'];
  for(const agent of agents) {
    const p=path.join(process.cwd(),'agents',`${agent}.md`);
    const text=fs.readFileSync(p,'utf8');
    if(!text.includes('Prohibited actions')) throw new Error(`Agent missing prohibited actions: ${agent}`);
    if(!text.includes('Human checkpoint')) throw new Error(`Agent missing human checkpoint: ${agent}`);
    if(!text.includes('Audit trace')) throw new Error(`Agent missing audit trace: ${agent}`);
  }
  return {passed:true,testName:'runIntelligenceManifestTests'};
}
