import React from 'react';
import { SEOHead } from '../components/site/SEOHead';
import { SEO_CONFIG } from '../config/seo';
import { Hero } from '../components/home/Hero';
import { ActionDeck } from '../components/home/ActionDeck';
import { OperatorThesis } from '../components/home/OperatorThesis';
import { CapitalDemandFlow } from '../components/home/CapitalDemandFlow';
import { AudiencePaths } from '../components/home/AudiencePaths';
import { OperatingModelRail } from '../components/home/OperatingModelRail';
import { CapabilityGrid } from '../components/home/CapabilityGrid';
import { WorkflowArchitecture } from '../components/home/WorkflowArchitecture';
import { InfrastructureStack } from '../components/home/InfrastructureStack';
import { HumanJudgmentSection } from '../components/home/HumanJudgmentSection';
import { EcosystemRail } from '../components/home/EcosystemRail';
import { ProofStrip } from '../components/home/ProofStrip';
import { FinalCTA } from '../components/home/FinalCTA';
import { MarqueeRail } from '../components/site/MarqueeRail';

export const Home: React.FC = () => {
  const marqueeItems = [
    'FUNDING DISCOVERY',
    'PRODUCT MATCHING',
    'PROVENANCE-GATED PROVIDERS',
    'DOCUMENT CHECKLISTS',
    'CAPITAL CASES',
    'HUMAN-CONTROLLED HANDOFFS'
  ];

  return (
    <>
      <SEOHead seo={SEO_CONFIG.home} />
      <Hero />
      <ActionDeck />
      <MarqueeRail items={marqueeItems} />
      <OperatorThesis />
      <CapitalDemandFlow />
      <AudiencePaths />
      <OperatingModelRail />
      <CapabilityGrid />
      <WorkflowArchitecture />
      <InfrastructureStack />
      <HumanJudgmentSection />
      <EcosystemRail />
      <ProofStrip />
      <FinalCTA />
    </>
  );
};
