/**
 * Capital Operator — Homepage Configuration
 * src/config/homepage.ts
 */

export const HOMEPAGE_CONFIG = {
  hero: {
    badge: 'OPERATING SYSTEM FOR COMMERCIAL DEBT',
    headline: 'Turn Borrowing Demand Into An Operating System.',
    subheadline:
      'Most capital advisors lose 40%+ of deal yield to manual document chasing, unvetted intake, and mismatched lender routing. Capital Operator diagnoses your pipeline and builds an institutional capital infrastructure.',
    primaryAction: {
      label: 'Run 3-Minute Diagnostic',
      href: '#assessment'
    },
    secondaryAction: {
      label: 'Explore Capital Stack',
      href: '#capital-stack'
    },
    metrics: [
      { label: 'Diagnostic Matrix', value: '12 Questions', desc: 'Holistic infrastructure evaluation' },
      { label: 'Operating Stages', value: '8 Stages', desc: 'From capture to closing equity' },
      { label: 'Time to Blueprint', value: '< 180s', desc: 'Deterministic executive scoring' },
      { label: 'Zero Required Keys', value: '100% Client-Side', desc: 'Private & secure execution' }
    ]
  },
  thesis: {
    badge: 'OPERATOR THESIS',
    headline: 'Deal flow without infrastructure is operational friction.',
    statement:
      'Brokers celebrate lead volume; operators build standardized conversion pipelines. When underwriting packets are assembled with verified financial criteria, lender turnaround drops from 18 days to 48 hours.',
    points: [
      {
        title: 'Intake is an Underwriting Filter',
        description: 'Raw web forms invite unqualified noise. Smart branching screens for credit profile, DSCR, and time-in-business upfront.'
      },
      {
        title: 'Document Assembly is Deal Velocity',
        description: 'Chasing bank statements via fragmented email threads kills momentum. Automated collection portals eliminate deal fatigue.'
      },
      {
        title: 'Lender Matching Requires Precision',
        description: 'Shotgunning loan requests destroys lender trust. Matching borrowers to exact risk boxes produces immediate term sheets.'
      }
    ]
  }
};
