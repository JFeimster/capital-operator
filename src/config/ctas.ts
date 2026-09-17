/**
 * Capital Operator — CTAs, Links & Disclosures
 * src/config/ctas.ts
 */

export const CTAS_CONFIG = {
  // Partner Conversion
  partner: {
    headline: "Don't Build the Capital Department. Plug Into One.",
    body: "You already have the relationships. Moonshine Capital gives you a path to turn client funding demand into an actual capability—from intake and qualification to capital routing, deal support, and follow-up.",
    primaryCtaText: "ADD CAPITAL TO MY BUSINESS",
    secondaryCtaText: "EXPLORE THE PARTNER MODEL",
    url: "https://tally.so/r/mOe658",
    altHeadline: "YOUR CLIENTS NEED CAPITAL. OWN WHAT HAPPENS NEXT.",
    altBody: "Stop referring the opportunity away. Add a capital capability to the business you already have—and keep the relationship, visibility, and upside.",
    altCtaText: "TURN ON CAPITAL"
  },

  // Direct Business Funding
  businessFunding: {
    headline: "LOOKING FOR CAPITAL INSTEAD?",
    body: "If you need funding for your own business rather than infrastructure for serving others, start with a personalized funding quote.",
    ctaText: "GET A PERSONALIZED FUNDING QUOTE",
    url: "https://tally.so/r/mDEJB5"
  },

  // Ecosystem Tools Hub
  toolsHub: {
    title: "Explore the Tools",
    body: "Access the full Moonshine Capital and Distilled Funding directory of diagnostic engines, copilots, and operator toolkits.",
    ctaText: "EXPLORE OPERATOR TOOLS",
    url: "https://tools.distilledfunding.com"
  },

  // Compliance & Affiliate Disclosures
  disclosures: {
    affiliate: "Some tool links may be affiliate links. Recommendations remain based on workflow fit, not commission availability.",
    compliance: "Capital Operator provides educational and operational blueprints. This system does not constitute a commitment to lend, credit approval authority, or legal advice. Capital options depend on verified borrower profiles, complete documentation, and independent lender partner underwriting criteria."
  }
};

export const PARTNER_FUNNEL = {
  url: CTAS_CONFIG.partner.url,
  headline: CTAS_CONFIG.partner.headline,
  subheadline: CTAS_CONFIG.partner.body,
  primaryAction: CTAS_CONFIG.partner.primaryCtaText,
  secondaryAction: CTAS_CONFIG.partner.secondaryCtaText
};

export const BUSINESS_FUNDING_FUNNEL = {
  url: CTAS_CONFIG.businessFunding.url,
  headline: CTAS_CONFIG.businessFunding.headline,
  subheadline: CTAS_CONFIG.businessFunding.body,
  primaryAction: CTAS_CONFIG.businessFunding.ctaText
};

export const OPERATOR_TOOLS_PORTAL = {
  url: CTAS_CONFIG.toolsHub.url,
  title: CTAS_CONFIG.toolsHub.title,
  primaryAction: CTAS_CONFIG.toolsHub.ctaText
};
