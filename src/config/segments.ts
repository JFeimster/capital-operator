/**
 * Capital Operator — Segment Copy & Positioning
 * src/config/segments.ts
 */

import { SegmentType } from '../types';

export interface SegmentConfig {
  id: SegmentType;
  title: string;
  tagline: string;
  heroCtaHeadline: string;
  heroCtaBody: string;
  ctaText: string;
  supportingLine?: string;
  primaryPathway: string;
}

export const SEGMENTS_CONFIG: Record<SegmentType, SegmentConfig> = {
  advisor: {
    id: 'advisor',
    title: 'Advisor / Consultant / Professional Services',
    tagline: 'Turn Client Advisory Into a Durable Capital Layer',
    heroCtaHeadline: 'YOUR CLIENTS ALREADY ASK YOU ABOUT MONEY.',
    heroCtaBody: 'Today, you may be referring those opportunities elsewhere and losing visibility the moment they leave. Build capital into the relationship you already own.',
    ctaText: 'ADD CAPITAL AS A SERVICE',
    primaryPathway: 'Advisory Capital Integration'
  },

  operator: {
    id: 'operator',
    title: 'Existing Funding Operator / Active Funding Team',
    tagline: 'Replace Tribal Memory With Operating Infrastructure',
    heroCtaHeadline: "THE BEST OPERATOR SHOULDN'T BE THE OPERATING SYSTEM.",
    heroCtaBody: 'Turn lender knowledge, qualification logic, document workflows, submissions, and follow-up into a system your entire operation can run without bottlenecks.',
    ctaText: 'SYSTEMIZE MY CAPITAL OPERATION',
    primaryPathway: 'Originator & Broker Operating System'
  },

  affiliate: {
    id: 'affiliate',
    title: 'Affiliate / Referral Partner',
    tagline: 'Maintain Attribution & Lifetime Relationship Equity',
    heroCtaHeadline: 'STOP GIVING AWAY THE OPPORTUNITY.',
    heroCtaBody: 'Keep visibility into the capital demand you already generate and connect it to a repeatable funding workflow that preserves your upside and client relationship.',
    ctaText: 'OWN WHAT HAPPENS NEXT',
    primaryPathway: 'Partner Referral Infrastructure'
  },

  platform: {
    id: 'platform',
    title: 'SaaS / Ecosystem / Community Platform',
    tagline: 'Embedded Capital Without Building a Lending Division',
    heroCtaHeadline: 'YOUR USERS LEAVE YOUR PRODUCT TO FIND CAPITAL. FIX THAT.',
    heroCtaBody: 'Add a capital layer to the experience they already trust. Keep users inside your ecosystem while qualified opportunities route into the right capital infrastructure.',
    ctaText: 'ADD CAPITAL TO MY PLATFORM',
    supportingLine: 'Capital becomes a feature—not a referral link.',
    primaryPathway: 'Embedded Platform Capital Layer'
  },

  new_revenue: {
    id: 'new_revenue',
    title: 'New Capital Revenue Line',
    tagline: 'Plug Directly Into Modern Capital Infrastructure',
    heroCtaHeadline: "DON'T BUILD THE CAPITAL DEPARTMENT. PLUG INTO ONE.",
    heroCtaBody: 'Add the workflows, tools, partner rails, qualification systems, and deal support required to turn capital demand into a real revenue-producing capability.',
    ctaText: 'ADD CAPITAL TO MY BUSINESS',
    primaryPathway: 'Turnkey Capital Department'
  }
};
