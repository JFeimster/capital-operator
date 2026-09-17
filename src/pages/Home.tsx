import React from 'react';
import { SEOHead } from '../components/site/SEOHead';
import { SEO_CONFIG } from '../config/seo';
import { Hero } from '../components/home/Hero';
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
    'DETERMINISTIC QUALIFICATION',
    'AUTOMATED STATEMENT OCR',
    'NORMALIZED DSCR SPREADING',
    'INSTITUTIONAL BUY-BOX ROUTING',
    'ZERO CLIENT-SIDE DATA EXPOSURE',
    'MULTI-LENDER SYNDICATION'
  ];

  return (
    <>
      <SEOHead seo={SEO_CONFIG.home} />
      <Hero />
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
