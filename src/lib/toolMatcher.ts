/**
 * Capital Operator — Tool Recommendation Matcher
 * src/lib/toolMatcher.ts
 */

import { ToolItem } from '../types';
import { TOOLS_CATALOG } from '../config/tools';

export function matchToolsForStage(stageNumber: number, budgetPreference?: string): {
  primary: ToolItem;
  alternatives: ToolItem[];
} {
  const stageTools = TOOLS_CATALOG.filter((t: ToolItem) => t.workflowStage === stageNumber);

  if (stageTools.length === 0) {
    const fallback: ToolItem = {
      id: `tool-fallback-${stageNumber}`,
      name: 'Modern Cloud Architecture',
      category: 'workflow automation',
      workflowStage: stageNumber,
      description: 'Standardized automated workflow integration.',
      bestFor: 'Any modern capital operation',
      notFor: 'Manual workflows',
      pricingTier: 'Mid ($50-$250)',
      websiteUrl: 'https://tools.distilledfunding.com',
      isAffiliate: false,
      moonshineAsset: false,
      capability: 'Operational consistency and data auditability',
      tags: ['automation']
    };
    return { primary: fallback, alternatives: [] };
  }

  // If budget is low, prioritize Free / Low or Mid tiers
  if (budgetPreference?.includes('$0') || budgetPreference?.includes('$50–$250')) {
    const sorted = [...stageTools].sort((a, b) => {
      if (a.pricingTier === 'Free / Low') return -1;
      if (b.pricingTier === 'Free / Low') return 1;
      return 0;
    });
    return {
      primary: sorted[0],
      alternatives: sorted.slice(1)
    };
  }

  return {
    primary: stageTools[0],
    alternatives: stageTools.slice(1)
  };
}
