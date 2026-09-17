/**
 * Capital Operator — Diagnostic Questions Matrix
 * src/config/questions.ts
 */

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
  weight?: number;
  tags?: string[];
}

export interface QuestionDef {
  id: number;
  key: string;
  question: string;
  subtext?: string;
  type: 'single' | 'multi';
  maxSelections?: number;
  options: string[];
  optionDetails?: QuestionOption[];
}

export const QUESTIONS: QuestionDef[] = [
  {
    id: 1,
    key: 'q1_currentHandling',
    question: 'How are you handling capital opportunities today?',
    subtext: 'Select the operating situation that most accurately reflects your starting point.',
    type: 'single',
    options: [
      'I want to add capital as a new revenue line',
      'I personally manage deals from lead to funding',
      'My team handles an active funding pipeline',
      'I refer capital opportunities elsewhere today',
      "Clients ask me about funding, but it isn't a core service",
      'My users need capital inside my platform or ecosystem'
    ]
  },
  {
    id: 2,
    key: 'q2_monthlyVolume',
    question: 'About how many capital opportunities touch your business each month?',
    subtext: 'Include inquiries, client requests, form fills, or potential referrals.',
    type: 'single',
    options: [
      'Under 10',
      '10–25',
      '26–75',
      '76–200',
      '200+'
    ]
  },
  {
    id: 3,
    key: 'q3_leadSources',
    question: 'Where do these opportunities come from?',
    subtext: 'Select all channels where capital demand originates.',
    type: 'multi',
    options: [
      'Existing clients or customer base',
      'Professional referral partners (CPAs, attorneys, brokers)',
      'Direct marketing / paid traffic / outbound',
      'Organic search / social / content',
      'Platform or software users',
      'Ad-hoc word of mouth'
    ]
  },
  {
    id: 4,
    key: 'q4_pipelineLocation',
    question: 'Where do deals live after an opportunity enters your world?',
    subtext: 'Where does your team check the status of active requests?',
    type: 'single',
    options: [
      'Email inbox / memory / sticky notes',
      'Spreadsheets (Google Sheets, Excel)',
      'Standard CRM (HubSpot, Salesforce, Pipedrive)',
      'Vertical lending software / loan origination system',
      'Proprietary custom database / platform'
    ]
  },
  {
    id: 5,
    key: 'q5_pursuingDecision',
    question: 'How do you decide if a deal is worth pursuing?',
    subtext: 'What is your preliminary qualification workflow?',
    type: 'single',
    options: [
      'Gut feel after talking to the borrower',
      'Reviewing bank statements manually',
      'A checklist of basic qualifying criteria',
      'Automated intake with scoring rules',
      'We pass everything to a partner or lender to decide'
    ]
  },
  {
    id: 6,
    key: 'q6_documentHandling',
    question: 'How do you collect and process borrower documents?',
    subtext: 'Bank statements, tax returns, P&Ls, and debt schedules.',
    type: 'single',
    options: [
      'Borrowers email them, we download and organize manually',
      'Shared cloud folders (Google Drive, Dropbox, Box)',
      'Dedicated document collection portal with checklists',
      'Automated financial data extraction (Plaid, Heron, Inscribe, OCR)',
      'We do not collect documents — our partner handles that'
    ]
  },
  {
    id: 7,
    key: 'q7_routingDecision',
    question: 'How do you decide which lender or capital product to use?',
    subtext: 'Matching the borrower with the right financing mechanism.',
    type: 'single',
    options: [
      'I send to the 1-2 lenders or brokers I know best',
      'I have a mental or spreadsheet list of lender criteria',
      'I submit to multiple lenders simultaneously and compare',
      'We use a structured lender matrix with defined criteria',
      'A partner handles all lender placement'
    ]
  },
  {
    id: 8,
    key: 'q8_followUpAutomation',
    question: 'How much of your communication and follow-up is automated?',
    subtext: 'Chasing missing documents, status notifications, and updates.',
    type: 'single',
    options: [
      'Almost nothing — every email, text, and call is manual',
      'A few email templates, but sending is manual',
      'Automated document reminders and pipeline notifications',
      'Fully automated sequences with human review points'
    ]
  },
  {
    id: 9,
    key: 'q9_breakdownPoints',
    question: 'Where do deals fall apart or slow down most?',
    subtext: 'Select up to 3 biggest operational friction points.',
    type: 'multi',
    maxSelections: 3,
    options: [
      'Getting borrowers to send documents',
      'Sorting through unqualified leads',
      'Knowing which lender will actually approve the deal',
      'Manual data entry and packaging credit memos',
      'Lender responsiveness and condition clearing',
      'Losing track of where deals stand in the pipeline',
      'Borrowers going dark after getting an offer'
    ]
  },
  {
    id: 10,
    key: 'q10_priorities',
    question: 'If you could fix only two things in the next 30 days, what would they be?',
    subtext: 'Select your top 2 operational priorities.',
    type: 'multi',
    maxSelections: 2,
    options: [
      'Stop chasing documents manually',
      'Know in 60 seconds if a deal is real',
      'Package deals faster with less effort',
      'Route to the right lender on the first attempt',
      'Keep full visibility of every active deal',
      'Turn capital into revenue without becoming a full-time broker'
    ]
  },
  {
    id: 11,
    key: 'q11_techBudget',
    question: 'What is your current monthly software budget for capital operations?',
    subtext: 'Including CRM, forms, automation, and document tools.',
    type: 'single',
    options: [
      '$0 — using free tools, email, and spreadsheets',
      '$50–$250/mo — basic SaaS stack',
      '$250–$750/mo — dedicated tools and automation',
      '$750–$2,000/mo — full operational software stack',
      '$2,000+/mo — enterprise infrastructure'
    ]
  },
  {
    id: 12,
    key: 'q12_handsOnControl',
    question: 'How hands-on do you want to be in the actual lending process?',
    subtext: 'What operational posture fits your firm?',
    type: 'single',
    options: [
      'Hands-off — I want to introduce deals and receive partner revenue',
      'Hybrid — I want to qualify and advise, with an infrastructure partner packaging and placing',
      'Full operator — I want to build and run an end-to-end capital desk'
    ]
  }
];
