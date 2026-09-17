/**
 * Capital Operator — FAQ Items Configuration
 * src/config/faq.ts
 */

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Diagnostic' | 'Architecture' | 'Ecosystem' | 'Privacy';
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'Diagnostic',
    question: 'How long does the operational diagnostic take to complete?',
    answer:
      'The assessment takes approximately 2 to 3 minutes. It consists of 12 focused questions covering your borrower intake, documentation pipeline, underwriting triage, and lender distribution.'
  },
  {
    category: 'Diagnostic',
    question: 'How is my operating model and capability unlock calculated?',
    answer:
      'The recommendation engine evaluates your responses across 8 operational stages. It applies weighted algorithms to detect operational friction, score automation leaks in dollar terms, and recommend high-leverage transformational actions.'
  },
  {
    category: 'Architecture',
    question: 'Does Capital Operator store my client files or confidential data?',
    answer:
      'No. Capital Operator runs client-side in your browser. All diagnostic scoring and blueprint generation occur locally. No borrower documents, bank statements, or sensitive financial sheets are uploaded or stored.'
  },
  {
    category: 'Architecture',
    question: 'Can I export the blueprint for my executive team or partners?',
    answer:
      'Yes. You can instantly copy an executive markdown summary to your clipboard, or click "Download as PDF" to generate a clean, print-optimized document ready for presentation.'
  },
  {
    category: 'Ecosystem',
    question: 'What is the relationship between Capital Operator and Moonshine Capital?',
    answer:
      'Capital Operator was engineered by Moonshine Capital to establish an open, standardized infrastructure standard for commercial capital syndication, empowering advisors, brokers, and platforms to operate with institutional precision.'
  }
];
