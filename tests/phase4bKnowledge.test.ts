/**
 * Capital Operator — Phase 4B Knowledge & SEO Verification Tests
 * tests/phase4bKnowledge.test.ts
 */

import { KNOWLEDGE_PAGES } from '../src/data/knowledgePages.js';
import { OPERATING_MODEL_ENTITIES } from '../src/data/operatingModelEntities.js';
import { WORKFLOW_STAGE_ENTITIES } from '../src/data/workflowStageEntities.js';
import { PUBLIC_TOOLS } from '../src/config/publicTools.js';

export async function runPhase4BTests(): Promise<void> {
  const expectedKnowledgeSlugs = [
    'capital-operating-system',
    'capital-infrastructure',
    'capital-demand',
    'capital-routing',
    'capital-case',
    'embedded-capital',
    'capital-operator-model'
  ];

  for (const slug of expectedKnowledgeSlugs) {
    const page = KNOWLEDGE_PAGES[slug];
    if (!page || !page.title || !page.definition || !page.headline || !page.metaDescription) {
      throw new Error(`Missing required metadata for knowledge page: ${slug}`);
    }
  }

  const expectedModelSlugs = ['relationship-led', 'systemized', 'ai-augmented', 'capital-operator'];
  for (const slug of expectedModelSlugs) {
    const model = OPERATING_MODEL_ENTITIES[slug];
    if (!model || !model.name || !model.definition || !model.route) {
      throw new Error(`Missing required fields for operating model: ${slug}`);
    }
  }

  const expectedStageSlugs = [
    'create-demand',
    'find-real-opportunities',
    'know-the-business',
    'build-the-capital-case',
    'route-to-the-right-capital',
    'move-the-deal',
    'keep-momentum',
    'own-the-relationship'
  ];

  for (const slug of expectedStageSlugs) {
    const stage = WORKFLOW_STAGE_ENTITIES[slug];
    if (!stage || !stage.name || !stage.job || !stage.stagePurpose) {
      throw new Error(`Missing required fields for workflow stage: ${slug}`);
    }
  }

  for (const toolId of Object.keys(PUBLIC_TOOLS)) {
    const tool = PUBLIC_TOOLS[toolId as keyof typeof PUBLIC_TOOLS];
    if (!tool || !tool.route || !tool.title) {
      throw new Error(`Missing C1 tool definition for toolId: ${toolId}`);
    }
  }
}
