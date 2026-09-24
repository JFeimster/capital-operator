/**
 * Capital Operator — Homepage Configuration
 */

export const HOMEPAGE_CONFIG = {
  hero: {
    badge: 'CAPITAL DISCOVERY + OPERATIONS',
    headline: 'Turn Capital Demand Into an Operating System.',
    subheadline:
      'Describe the capital need. Capital Operator maps funding paths, products and provenance-gated provider candidates, identifies qualification and document gaps, and gives you the next action to move the opportunity forward.',
    primaryAction: {
      label: 'Get Funded',
      href: '/get-funded'
    },
    secondaryAction: {
      label: 'Open Funding OS',
      href: '/funding'
    },
    metrics: [
      { label: 'Provider Intelligence', value: '33', desc: 'Canonical provider records' },
      { label: 'Funding Products', value: '59', desc: 'Provider-linked product records' },
      { label: 'Funding Presets', value: '11', desc: 'Shared outcome-driven paths' },
      { label: 'Capital Resources', value: '138', desc: 'Tools & calculators indexed' }
    ]
  },
  thesis: {
    badge: 'OPERATOR THESIS',
    headline: 'Capital demand becomes valuable when the system can act on it.',
    statement:
      'Capital Operator connects funding intent, readiness, provider/product intelligence, documents, routing, handoffs, and deal operations into one action-oriented layer.',
    points: [
      {
        title: 'Start With the Funding Outcome',
        description: 'Normalize the amount, purpose, business context, and missing information before choosing a capital path.'
      },
      {
        title: 'Use Canonical Capital Intelligence',
        description: 'Rank product paths and provenance-gated provider candidates against the facts available for the request.'
      },
      {
        title: 'Move the Opportunity Forward',
        description: 'Turn discovery into document preparation, capital-case work, human review, handoff, and deal lifecycle actions.'
      }
    ]
  }
};
