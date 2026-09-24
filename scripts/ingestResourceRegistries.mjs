#!/usr/bin/env node
/**
 * Build/validate canonical resource payloads from extracted Registries.zip JSON.
 *
 * Usage:
 * node scripts/ingestResourceRegistries.mjs \
 *   --providers <funding-providers.registry.json> \
 *   --products <funding-products.registry.json> \
 *   --families <funding-product-families.registry.json> \
 *   --tools <funding-tools.registry.json> \
 *   --calculators <funding-calculators.registry.json>
 *
 * The generated TypeScript payloads remain implementation data. Canonical runtime
 * consumers stay in src/config/*.
 */
import fs from 'node:fs';

const args={};
for(let i=2;i<process.argv.length;i+=2){
  const key=process.argv[i];
  if(!key?.startsWith('--')) throw new Error(`Unexpected argument: ${key}`);
  args[key.slice(2)]=process.argv[i+1];
}
for(const key of ['providers','products','families','tools','calculators']){
  if(!args[key]) throw new Error(`Missing --${key} <path>`);
}
const load=path=>JSON.parse(fs.readFileSync(path,'utf8'));
const providers=load(args.providers).entries||[];
const products=load(args.products).entries||[];
const families=load(args.families).entries||[];
const toolRows=load(args.tools).entries||[];
const calculatorRows=load(args.calculators).entries||[];

const normalize=s=>String(s||'').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'');
const duplicateIds=(rows,key='id')=>{
  const seen=new Set(),dup=[];
  for(const row of rows){const id=String(row[key]||'');if(seen.has(id))dup.push(id);seen.add(id);}
  return [...new Set(dup)];
};
for(const [label,rows,key] of [['providers',providers,'id'],['products',products,'id'],['families',families,'id'],['tools',toolRows,'slug'],['calculators',calculatorRows,'id']]){
  const dup=duplicateIds(rows,key);
  if(dup.length) throw new Error(`${label} duplicate IDs: ${dup.join(', ')}`);
}

const providerIds=new Set(providers.map(x=>x.id));
const familyIds=new Set(families.map(x=>x.id));
for(const product of products){
  if(!providerIds.has(product.providerId)) throw new Error(`Unknown provider ${product.providerId} for ${product.id}`);
  if(!familyIds.has(product.productFamily)) throw new Error(`Unknown family ${product.productFamily} for ${product.id}`);
}

const toolNames=new Set(toolRows.map(x=>normalize(x.name)));
const calculatorOnly=calculatorRows.filter(x=>!toolNames.has(normalize(x.name)));
const canonicalResourceCount=toolRows.length+calculatorOnly.length;
const liveToolCount=toolRows.filter(x=>x.build_state==='live'&&x.live_url).length;

const expected={providers:33,products:59,families:7,tools:125,calculators:138,canonicalResources:138,liveResources:6};
const actual={
  providers:providers.length,products:products.length,families:families.length,tools:toolRows.length,
  calculators:calculatorRows.length,canonicalResources:canonicalResourceCount,liveResources:liveToolCount
};
for(const [key,value] of Object.entries(expected)){
  if(actual[key]!==value) throw new Error(`Unexpected ${key}: expected ${value}, got ${actual[key]}`);
}

console.log(JSON.stringify({
  status:'validated',
  actual,
  verifiedProviders:providers.filter(x=>x.source?.verificationStatus==='verified').length,
  verifiedProducts:products.filter(x=>x.source?.verificationStatus==='verified').length,
  calculatorOnlyRows:calculatorOnly.length,
  note:'Normalization is deterministic: provider/product/family IDs are preserved; tool/calculator rows dedupe by normalized resource name; conceptual rows remain non-operational.'
},null,2));
