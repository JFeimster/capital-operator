import React from 'react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { Breadcrumbs } from '../components/site/Breadcrumbs';
import { EcosystemMap } from '../components/ecosystem/EcosystemMap';
import { CapabilityMatrix } from '../components/ecosystem/CapabilityMatrix';
import { routeEcosystem } from '../lib/ecosystemRouter';
import { trackEvent } from '../lib/analytics';
import { ANALYTICS_EVENTS } from '../config/analyticsEvents';

export const Ecosystem: React.FC = () => {
  const routes=routeEcosystem({capabilityIds:['funding-intake','capital-case','routing','crm-lifecycle','automation']});
  return (
    <>
      <div className="border-b border-slate-800 bg-grid-pattern py-12">
        <Container>
          <Breadcrumbs items={[{label:'Ecosystem Control Plane'}]} className="mb-6" />
          <div className="max-w-4xl">
            <span className="font-mono text-xs font-semibold text-emerald-400">CAPABILITY → SYSTEM → HUMAN CHECKPOINT</span>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">Route the work, not just the lead.</h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">Capital Operator maps each workflow stage to a canonical capability, the system that should handle repetition, AI assistance where useful, and the human checkpoint that keeps consequential capital decisions under operator control.</p>
          </div>
        </Container>
      </div>
      <Section><Container><h2 className="mb-6 text-2xl font-black text-white">Workflow control plane</h2><EcosystemMap /></Container></Section>
      <Section borderTop><Container><h2 className="mb-6 text-2xl font-black text-white">Capability matrix</h2><CapabilityMatrix /></Container></Section>
      <Section borderTop><Container>
        <h2 className="mb-6 text-2xl font-black text-white">Canonical handoff examples</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {routes.map(route=><div key={route.capabilityId} className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
            <div className="font-mono text-xs text-emerald-400">{route.status}</div>
            <div className="mt-2 text-lg font-bold text-white">{route.product?.name||route.capabilityId}</div>
            <p className="mt-2 text-sm text-slate-400">{route.reason}</p>
            <p className="mt-3 text-xs text-slate-500">Fallback: {route.fallback}</p>
            {route.product?.url && <a href={route.product.url} target="_blank" rel="noreferrer" onClick={()=>trackEvent(ANALYTICS_EVENTS.ECOSYSTEM_HANDOFF_INITIATED,{capabilityId:route.capabilityId,productId:route.product?.id})} className="mt-4 inline-block text-sm font-semibold text-emerald-400 hover:text-emerald-300">Open handoff →</a>}
          </div>)}
        </div>
      </Container></Section>
    </>
  );
};
