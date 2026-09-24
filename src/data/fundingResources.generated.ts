/** AUTO-GENERATED from the attached Registries.zip. Do not hand-edit. */
import type { FundingProductFamilyRecord, FundingProductRecord, FundingProviderRecord, ProviderCriteriaRecord } from '../types/funding.js';

export const GENERATED_FUNDING_PRODUCT_FAMILIES: FundingProductFamilyRecord[] = [
  {
    "id": "working-capital",
    "slug": "working-capital",
    "name": "Working Capital",
    "publicName": "Working Capital Funding",
    "route": "/funding/working-capital",
    "category": "business",
    "summary": "Fast capital for payroll, inventory, materials, short-cycle opportunities, and cash-flow gaps. Also covers amortizing term loans, SBA 7(a) programs, and business expansion loans folded in from structured growth loans.",
    "bestFitBorrower": [
      "Active business with visible deposits",
      "Needs speed more than perfect pricing",
      "Has recent business bank statements"
    ],
    "avoidWhen": [
      "No active revenue",
      "Long-term expansion need",
      "Margins are already too thin"
    ],
    "commonUseCases": [
      "Payroll gap",
      "Inventory purchase",
      "Materials for a new job",
      "Ad spend recovery",
      "Short-term cash-flow bridge"
    ],
    "qualificationSignals": {
      "minCreditScoreGuide": 500,
      "minMonthlyRevenueGuide": 10000,
      "minTimeInBusinessMonthsGuide": 6,
      "creditTier": [
        "subprime",
        "fair"
      ],
      "repaymentSource": "business_revenue"
    },
    "speedProfile": {
      "label": "Fast",
      "typicalTimeToFunding": "24 hours to 3 days"
    },
    "requiredDocuments": [
      "Recent business bank statements",
      "Business basics",
      "Revenue proof",
      "Bank/API connection where applicable"
    ],
    "fastDisqualifiers": [
      "Open bankruptcy",
      "Repeated recent NSFs",
      "No revenue for a revenue-based request",
      "Severe stacking risk"
    ],
    "productIds": [
      "7figs-mca",
      "7figs-sba",
      "dac-corerate",
      "dac-flexrate",
      "dac-giggle",
      "dac-canada",
      "gokap-mca",
      "gokap-sbl",
      "gokap-term",
      "gokap-sba",
      "gokap-consumer",
      "gokap-cannabis",
      "rok-term",
      "rok-sba",
      "rok-ar",
      "rok-mca",
      "nbc-term",
      "fora-sbl",
      "fora-advance",
      "credibly-wc",
      "credibly-ex",
      "uplyft-mca"
    ],
    "providerIds": [
      "7-figures-funding",
      "8fig",
      "bank-breezy",
      "capchase",
      "credibly",
      "david-allen-capital",
      "fora-financial",
      "fundandgrow",
      "gokapital",
      "onramp",
      "payability",
      "rok-financial",
      "sellersfi",
      "the-finance-factory",
      "uncapped",
      "uplyft-capital"
    ],
    "status": "ACTIVE",
    "visibility": "public",
    "mergedInto": [],
    "primaryCta": {
      "label": "Check Working Capital Options",
      "href": "https://tally.so/r/mDEJB5",
      "trackingId": "working_capital_quote"
    },
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-product-families.registry.json",
      "sourceRecordId": "working-capital",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "startup-credit-leverage",
    "slug": "startup-credit-leverage",
    "name": "Startup Credit Leverage",
    "publicName": "Startup Funding",
    "route": "/funding/startup-funding",
    "category": "business",
    "summary": "0% intro business credit cards and startup/venture debt that leverage strong personal credit into usable business capital without requiring revenue history. Also includes franchise launch/acquisition financing.",
    "bestFitBorrower": [],
    "avoidWhen": [],
    "commonUseCases": [],
    "qualificationSignals": {
      "minCreditScoreGuide": 600,
      "minMonthlyRevenueGuide": 3000,
      "minTimeInBusinessMonthsGuide": 6,
      "creditTier": [
        "subprime",
        "fair"
      ],
      "repaymentSource": "personal_credit"
    },
    "requiredDocuments": [],
    "fastDisqualifiers": [],
    "productIds": [
      "7figs-stacking",
      "7figs-personal-startup",
      "7figs-personal-term",
      "7figs-personal-loc",
      "7figs-debt-consol",
      "7figs-personal-cards",
      "gokap-startup",
      "rok-franchise",
      "rok-startup",
      "fundgrow-stacking",
      "creditsuite-builder",
      "guidant-robs",
      "finfactory-ubf"
    ],
    "providerIds": [
      "equitynet",
      "gokapital",
      "opm-mastery",
      "ramp",
      "rok-financial"
    ],
    "status": "ACTIVE",
    "visibility": "public",
    "mergedInto": [],
    "primaryCta": {
      "label": "Check Startup Funding Options",
      "href": "https://tally.so/r/mDEJB5",
      "trackingId": "startup_credit_leverage_quote"
    },
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-product-families.registry.json",
      "sourceRecordId": "startup-credit-leverage",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "business-line-access",
    "slug": "business-line-access",
    "name": "Business Line Access",
    "publicName": "Business Line of Credit",
    "route": "/funding/business-line-of-credit",
    "category": "business",
    "summary": "Revolving credit lines that let an established business draw, repay, and redraw working capital as needed instead of taking a single lump sum.",
    "bestFitBorrower": [],
    "avoidWhen": [],
    "commonUseCases": [],
    "qualificationSignals": {
      "minCreditScoreGuide": 500,
      "minMonthlyRevenueGuide": 3000,
      "minTimeInBusinessMonthsGuide": 3,
      "creditTier": [
        "subprime",
        "fair"
      ],
      "repaymentSource": "business_revenue"
    },
    "requiredDocuments": [],
    "fastDisqualifiers": [],
    "productIds": [
      "7figs-bloc",
      "dac-loc",
      "gokap-loc",
      "rok-bloc"
    ],
    "providerIds": [
      "7-figures-funding",
      "bank-breezy",
      "credibly",
      "david-allen-capital",
      "gokapital",
      "the-finance-factory",
      "uncapped"
    ],
    "status": "ACTIVE",
    "visibility": "public",
    "mergedInto": [],
    "primaryCta": {
      "label": "Check Business Line of Credit Options",
      "href": "https://tally.so/r/mDEJB5",
      "trackingId": "business_line_access_quote"
    },
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-product-families.registry.json",
      "sourceRecordId": "business-line-access",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "structured-growth-loans",
    "slug": "structured-growth-loans",
    "name": "Structured Growth Loans",
    "publicName": "Term & SBA Growth Loans",
    "category": "business",
    "summary": "[MERGED] Amortizing term loans, SBA programs, and acquisition/franchise financing for planned expansion where pricing matters more than speed. Folded into Working Capital (term/SBA/expansion loans) and Startup Credit Leverage (franchise financing); no standalone lane page.",
    "bestFitBorrower": [],
    "avoidWhen": [],
    "commonUseCases": [],
    "qualificationSignals": {
      "minCreditScoreGuide": 500,
      "minMonthlyRevenueGuide": 3000,
      "minTimeInBusinessMonthsGuide": 3,
      "creditTier": [
        "subprime",
        "fair"
      ],
      "repaymentSource": "business_revenue"
    },
    "requiredDocuments": [],
    "fastDisqualifiers": [],
    "productIds": [],
    "providerIds": [
      "7-figures-funding",
      "bank-breezy",
      "fora-financial",
      "gokapital",
      "rok-financial",
      "the-finance-factory",
      "uncapped",
      "uplyft-capital"
    ],
    "status": "DEPRECATED",
    "visibility": "internal",
    "mergedInto": [
      "working-capital",
      "startup-credit-leverage"
    ],
    "primaryCta": {
      "label": "Check Term & SBA Growth Loans Options",
      "href": "https://tally.so/r/mDEJB5",
      "trackingId": "structured_growth_loans_quote"
    },
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-product-families.registry.json",
      "sourceRecordId": "structured-growth-loans",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verificationStatus": "REVIEW_REQUIRED",
      "notes": []
    }
  },
  {
    "id": "equipment-finance",
    "slug": "equipment-finance",
    "name": "Equipment Finance",
    "publicName": "Equipment Financing",
    "route": "/funding/equipment-financing",
    "category": "business",
    "summary": "Financing secured by the equipment being purchased, letting a business acquire machinery or vehicles while preserving cash.",
    "bestFitBorrower": [],
    "avoidWhen": [],
    "commonUseCases": [],
    "qualificationSignals": {
      "minCreditScoreGuide": 600,
      "minMonthlyRevenueGuide": 3000,
      "minTimeInBusinessMonthsGuide": 3,
      "creditTier": [
        "subprime",
        "fair"
      ],
      "repaymentSource": "business_revenue"
    },
    "requiredDocuments": [],
    "fastDisqualifiers": [],
    "productIds": [
      "7figs-equip",
      "gokap-equip",
      "gokap-truck",
      "rok-equip",
      "bluebridge-efa"
    ],
    "providerIds": [
      "credibly",
      "gokapital",
      "guidant",
      "the-finance-factory"
    ],
    "status": "ACTIVE",
    "visibility": "public",
    "mergedInto": [],
    "primaryCta": {
      "label": "Check Equipment Financing Options",
      "href": "https://tally.so/r/mDEJB5",
      "trackingId": "equipment_finance_quote"
    },
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-product-families.registry.json",
      "sourceRecordId": "equipment-finance",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "real-estate-capital",
    "slug": "real-estate-capital",
    "name": "Real Estate Capital",
    "publicName": "Real Estate Capital",
    "route": "/funding/real-estate-capital",
    "category": "real_estate",
    "summary": "Commercial mortgages, bridge, fix-and-flip, ground-up construction, and DSCR loans underwritten primarily on the property and its income.",
    "bestFitBorrower": [],
    "avoidWhen": [],
    "commonUseCases": [],
    "qualificationSignals": {
      "minCreditScoreGuide": 600,
      "minMonthlyRevenueGuide": 3000,
      "minTimeInBusinessMonthsGuide": 6,
      "creditTier": [
        "subprime",
        "fair"
      ],
      "repaymentSource": "property_income_or_sale"
    },
    "requiredDocuments": [],
    "fastDisqualifiers": [],
    "productIds": [
      "7figs-cre",
      "7figs-heloc",
      "gokap-hardmoney",
      "gokap-cre",
      "gokap-rental",
      "gokap-foreign",
      "rok-res-invest",
      "rok-cre",
      "visio-rental",
      "newsilver-flip"
    ],
    "providerIds": [
      "dlp-capital",
      "gator-lending",
      "gokapital",
      "kiava",
      "new-silver",
      "rok-financial",
      "subto",
      "visio-lending"
    ],
    "status": "ACTIVE",
    "visibility": "public",
    "mergedInto": [],
    "primaryCta": {
      "label": "Check Real Estate Capital Options",
      "href": "https://tally.so/r/mDEJB5",
      "trackingId": "real_estate_capital_quote"
    },
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-product-families.registry.json",
      "sourceRecordId": "real-estate-capital",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "marketplace-capital",
    "slug": "marketplace-capital",
    "name": "Marketplace Capital",
    "publicName": "E-commerce & Marketplace Seller Funding",
    "route": "/funding/ecommerce-seller-funding",
    "category": "business",
    "summary": "Revenue-based financing and working capital sized to marketplace and e-commerce sales velocity for inventory, ad spend, and growth.",
    "bestFitBorrower": [],
    "avoidWhen": [],
    "commonUseCases": [],
    "qualificationSignals": {
      "minCreditScoreGuide": null,
      "minMonthlyRevenueGuide": 3000,
      "minTimeInBusinessMonthsGuide": 3,
      "creditTier": [],
      "repaymentSource": "platform_sales"
    },
    "requiredDocuments": [],
    "fastDisqualifiers": [],
    "productIds": [
      "8fig-growth",
      "onramp-growth",
      "payability-instant",
      "payability-advance",
      "sellersfi-wc"
    ],
    "providerIds": [
      "8fig",
      "onramp",
      "payability",
      "sellersfi"
    ],
    "status": "ACTIVE",
    "visibility": "public",
    "mergedInto": [],
    "primaryCta": {
      "label": "Check E-commerce & Marketplace Seller Funding Options",
      "href": "https://tally.so/r/mDEJB5",
      "trackingId": "marketplace_capital_quote"
    },
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-product-families.registry.json",
      "sourceRecordId": "marketplace-capital",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  }
];

export const GENERATED_FUNDING_PRODUCTS: FundingProductRecord[] = [
  {
    "id": "7figs-stacking",
    "slug": "7figs-stacking",
    "name": "Startup Funding: 0% Business Credit Card Stacking",
    "providerId": "7-figures-funding",
    "providerName": "7 Figures Funding",
    "productFamily": "startup-credit-leverage",
    "category": "Business",
    "fundingType": "Unsecured Line",
    "minAmount": 10000,
    "maxAmount": 150000,
    "minCreditScore": 680,
    "minMonthlyRevenue": 0,
    "minTimeInBusinessMonths": 0,
    "creditTier": "Good",
    "termLength": "Revolving (0% 6-20 mos)",
    "paymentType": "Monthly",
    "rateCostRange": "0% Intro / 15.99%+ After",
    "timeToFunding": "2 - 3 Weeks",
    "startupEligible": true,
    "ctaLabel": "Check Eligibility",
    "productPathId": "business-cards-or-loc",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "7figs-stacking",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "7figs-personal-startup",
    "slug": "7figs-personal-startup",
    "name": "Startup Funding: Personal Term Loans",
    "providerId": "7-figures-funding",
    "providerName": "7 Figures Funding",
    "productFamily": "startup-credit-leverage",
    "category": "Personal",
    "fundingType": "Installment Loan",
    "minAmount": 20000,
    "maxAmount": 250000,
    "minCreditScore": 680,
    "minMonthlyRevenue": 50000,
    "minTimeInBusinessMonths": 0,
    "creditTier": "Good",
    "termLength": "5 Years",
    "paymentType": "Monthly",
    "rateCostRange": "From 5.99%",
    "timeToFunding": "3 - 10 Days",
    "startupEligible": true,
    "ctaLabel": "Apply for Loan",
    "productPathId": "business-cards-or-loc",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "7figs-personal-startup",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "7figs-bloc",
    "slug": "7figs-bloc",
    "name": "Business Line of Credit",
    "providerId": "7-figures-funding",
    "providerName": "7 Figures Funding",
    "productFamily": "business-line-access",
    "category": "Business",
    "fundingType": "Revolving Line",
    "minAmount": 5000,
    "maxAmount": 500000,
    "minCreditScore": 600,
    "minMonthlyRevenue": 15000,
    "minTimeInBusinessMonths": 12,
    "creditTier": "Fair",
    "termLength": "1 - 3 Years",
    "paymentType": "Weekly/Monthly",
    "rateCostRange": "As low as 8%",
    "timeToFunding": "3 Days",
    "startupEligible": false,
    "ctaLabel": "Get Line",
    "productPathId": "business-line-of-credit",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "7figs-bloc",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": [
        "Product sheet lists 600 min FICO for the BLOC specifically; the 7 Figures provider-level affiliate requirement is 680+ overall. Using product-level 600 here."
      ]
    }
  },
  {
    "id": "7figs-mca",
    "slug": "7figs-mca",
    "name": "Short Term Business Loan (MCA)",
    "providerId": "7-figures-funding",
    "providerName": "7 Figures Funding",
    "productFamily": "working-capital",
    "category": "Business",
    "fundingType": "Revenue Advance",
    "minAmount": 5000,
    "maxAmount": 500000,
    "minCreditScore": 500,
    "minMonthlyRevenue": 10000,
    "minTimeInBusinessMonths": 6,
    "creditTier": "Subprime",
    "termLength": "6 - 24 Months",
    "paymentType": "Daily/Weekly",
    "rateCostRange": "1.20 Factor Rate",
    "timeToFunding": "24 Hours",
    "startupEligible": false,
    "ctaLabel": "Get Offer",
    "productPathId": "merchant-cash-advance",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "7figs-mca",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "7figs-equip",
    "slug": "7figs-equip",
    "name": "Equipment Funding",
    "providerId": "7-figures-funding",
    "providerName": "7 Figures Funding",
    "productFamily": "equipment-finance",
    "category": "Business",
    "fundingType": "Asset Backed",
    "minAmount": 10000,
    "maxAmount": 50000000,
    "minCreditScore": 600,
    "creditTier": "Fair",
    "termLength": "Up to 5 Years",
    "paymentType": "Monthly",
    "rateCostRange": "As low as 7.99%",
    "timeToFunding": "1 - 3 Weeks",
    "startupEligible": false,
    "ctaLabel": "Finance Gear",
    "productPathId": "equipment-financing",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "7figs-equip",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "7figs-cre",
    "slug": "7figs-cre",
    "name": "Commercial Real Estate",
    "providerId": "7-figures-funding",
    "providerName": "7 Figures Funding",
    "productFamily": "real-estate-capital",
    "category": "Real Estate",
    "fundingType": "Mortgage",
    "minAmount": 100000,
    "maxAmount": 100000000,
    "minCreditScore": 650,
    "creditTier": "Fair",
    "termLength": "Up to 30 Years",
    "paymentType": "Monthly",
    "rateCostRange": "As low as 4%",
    "timeToFunding": "1 - 3 Months",
    "startupEligible": false,
    "ctaLabel": "Fund Property",
    "productPathId": "commercial-mortgage",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "7figs-cre",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "7figs-sba",
    "slug": "7figs-sba",
    "name": "SBA Loans",
    "providerId": "7-figures-funding",
    "providerName": "7 Figures Funding",
    "productFamily": "working-capital",
    "category": "Business",
    "fundingType": "Term Loan",
    "minAmount": 20000,
    "maxAmount": 5000000,
    "minCreditScore": 680,
    "minMonthlyRevenueNote": "Profitability Req",
    "minTimeInBusinessMonths": 24,
    "creditTier": "Good",
    "termLength": "10 - 25 Years",
    "paymentType": "Monthly",
    "rateCostRange": "Prime + 3.75%",
    "timeToFunding": "1 - 3 Months",
    "startupEligible": false,
    "ctaLabel": "Apply for SBA",
    "productPathId": "business-term-loan",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "7figs-sba",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "7figs-personal-term",
    "slug": "7figs-personal-term",
    "name": "Personal Term Loans",
    "providerId": "7-figures-funding",
    "providerName": "7 Figures Funding",
    "productFamily": "startup-credit-leverage",
    "category": "Personal",
    "fundingType": "Installment Loan",
    "minAmount": 5000,
    "maxAmount": 500000,
    "minCreditScore": 680,
    "minMonthlyRevenueNote": "Income Verified",
    "creditTier": "Good",
    "termLength": "1 - 12 Years",
    "paymentType": "Monthly",
    "rateCostRange": "5.99% - 36% APR",
    "timeToFunding": "24 - 48 Hours",
    "startupEligible": false,
    "ctaLabel": "Check Personal Rates",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "7figs-personal-term",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "7figs-personal-loc",
    "slug": "7figs-personal-loc",
    "name": "Personal Line of Credit",
    "providerId": "7-figures-funding",
    "providerName": "7 Figures Funding",
    "productFamily": "startup-credit-leverage",
    "category": "Personal",
    "fundingType": "Revolving Line",
    "minAmount": 5000,
    "maxAmount": 250000,
    "minCreditScore": 680,
    "minMonthlyRevenueNote": "Income Verified",
    "creditTier": "Good",
    "termLength": "Revolving",
    "paymentType": "Revolving",
    "rateCostRange": "From 6.99%",
    "timeToFunding": "3 - 5 Days",
    "startupEligible": false,
    "ctaLabel": "Get Personal Line",
    "productPathId": "business-cards-or-loc",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "7figs-personal-loc",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "7figs-debt-consol",
    "slug": "7figs-debt-consol",
    "name": "Debt Consolidation Loan",
    "providerId": "7-figures-funding",
    "providerName": "7 Figures Funding",
    "productFamily": "startup-credit-leverage",
    "category": "Personal",
    "fundingType": "Installment Loan",
    "minAmount": 5000,
    "maxAmount": 500000,
    "minCreditScore": 660,
    "minMonthlyRevenueNote": "Income Verified",
    "creditTier": "Fair",
    "termLength": "1 - 12 Years",
    "paymentType": "Monthly",
    "rateCostRange": "5.99% - 36% APR",
    "timeToFunding": "24 - 48 Hours",
    "startupEligible": false,
    "ctaLabel": "Consolidate Debt",
    "productPathId": "debt-refinance",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "7figs-debt-consol",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "7figs-heloc",
    "slug": "7figs-heloc",
    "name": "Home Equity Loan",
    "providerId": "7-figures-funding",
    "providerName": "7 Figures Funding",
    "productFamily": "real-estate-capital",
    "category": "Personal",
    "fundingType": "Mortgage",
    "minAmount": 20000,
    "maxAmount": 1000000,
    "minCreditScore": 680,
    "creditTier": "Good",
    "termLength": "Up to 30 Years",
    "paymentType": "Monthly",
    "rateCostRange": "Variable Market Rate",
    "timeToFunding": "2 - 4 Weeks",
    "startupEligible": false,
    "ctaLabel": "Tap Home Equity",
    "productPathId": "commercial-mortgage",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "7figs-heloc",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "7figs-personal-cards",
    "slug": "7figs-personal-cards",
    "name": "Low-Interest Personal Cards",
    "providerId": "7-figures-funding",
    "providerName": "7 Figures Funding",
    "productFamily": "startup-credit-leverage",
    "category": "Personal",
    "fundingType": "Credit Card",
    "minAmount": 500,
    "maxAmount": 50000,
    "minCreditScore": 680,
    "minMonthlyRevenueNote": "Income Verified",
    "creditTier": "Good",
    "termLength": "Revolving",
    "paymentType": "Revolving",
    "rateCostRange": "Variable APR",
    "timeToFunding": "1 - 2 Weeks",
    "startupEligible": false,
    "ctaLabel": "Compare Cards",
    "productPathId": "business-cards-or-loc",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "7figs-personal-cards",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "dac-corerate",
    "slug": "dac-corerate",
    "name": "BankBreezy CoreRate Funding",
    "providerId": "bank-breezy",
    "providerName": "Bank Breezy (DAC)",
    "productFamily": "working-capital",
    "category": "Business",
    "fundingType": "Revenue Advance",
    "minAmount": 5000,
    "maxAmount": 2000000,
    "minCreditScore": 680,
    "minMonthlyRevenue": 15000,
    "minTimeInBusinessMonths": 24,
    "creditTier": "Good",
    "termLength": "6 - 24 Months",
    "paymentType": "Daily/Weekly",
    "rateCostRange": "1.15x - 1.25x Factor",
    "timeToFunding": "1 - 3 Days",
    "startupEligible": false,
    "ctaLabel": "Get Core Rate",
    "productPathId": "revenue-based-financing",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "dac-corerate",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "dac-flexrate",
    "slug": "dac-flexrate",
    "name": "BankBreezy FlexRate Funding",
    "providerId": "bank-breezy",
    "providerName": "Bank Breezy (DAC)",
    "productFamily": "working-capital",
    "category": "Business",
    "fundingType": "Revenue Advance",
    "minAmount": 5000,
    "maxAmount": 2000000,
    "minCreditScore": 550,
    "minMonthlyRevenue": 15000,
    "minTimeInBusinessMonths": 6,
    "creditTier": "Subprime",
    "termLength": "4 - 24 Months",
    "paymentType": "Daily/Weekly",
    "rateCostRange": "1.26x - 1.50x Factor",
    "timeToFunding": "1 - 3 Days",
    "startupEligible": false,
    "ctaLabel": "Get Flex Rate",
    "productPathId": "revenue-based-financing",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "dac-flexrate",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "dac-giggle",
    "slug": "dac-giggle",
    "name": "Giggle Instant Approval",
    "providerId": "bank-breezy",
    "providerName": "Bank Breezy (DAC)",
    "productFamily": "working-capital",
    "category": "Business",
    "fundingType": "Revenue Advance",
    "minAmount": 500,
    "maxAmount": 10000,
    "minMonthlyRevenue": 3000,
    "minTimeInBusinessMonths": 4,
    "creditTier": "Subprime",
    "termLength": "3 - 6 Months",
    "paymentType": "Weekly",
    "rateCostRange": "1.29x - 1.69x Factor",
    "timeToFunding": "Instant",
    "startupEligible": false,
    "ctaLabel": "Get Instant Cash",
    "productPathId": "revenue-based-financing",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "dac-giggle",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "dac-loc",
    "slug": "dac-loc",
    "name": "DAC Line of Credit",
    "providerId": "bank-breezy",
    "providerName": "Bank Breezy (DAC)",
    "productFamily": "business-line-access",
    "category": "Business",
    "fundingType": "Revolving Line",
    "minAmount": 6000,
    "maxAmount": 150000,
    "minCreditScore": 680,
    "minMonthlyRevenue": 20000,
    "minTimeInBusinessMonths": 24,
    "creditTier": "Good",
    "termLength": "6 - 12 Months",
    "paymentType": "Weekly",
    "rateCostRange": ".69% - 1.39% Weekly Fee",
    "timeToFunding": "24 Hours",
    "startupEligible": false,
    "ctaLabel": "Get Credit Line",
    "productPathId": "business-line-of-credit",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "dac-loc",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "dac-canada",
    "slug": "dac-canada",
    "name": "Canada Funding",
    "providerId": "bank-breezy",
    "providerName": "Bank Breezy (DAC)",
    "productFamily": "working-capital",
    "category": "Business",
    "fundingType": "Revenue Advance",
    "minAmount": 5000,
    "maxAmount": 500000,
    "minCreditScore": 550,
    "minMonthlyRevenue": 10000,
    "minTimeInBusinessMonths": 6,
    "creditTier": "Subprime",
    "termLength": "3 - 12 Months",
    "paymentType": "Daily/Weekly",
    "rateCostRange": "1.27x - 1.49x Factor",
    "timeToFunding": "1 - 3 Days",
    "startupEligible": false,
    "ctaLabel": "Apply Canada",
    "productPathId": "revenue-based-financing",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "dac-canada",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "gokap-mca",
    "slug": "gokap-mca",
    "name": "Merchant Cash Advance",
    "providerId": "gokapital",
    "providerName": "GoKapital",
    "productFamily": "working-capital",
    "category": "Business",
    "fundingType": "Revenue Advance",
    "minAmount": 20000,
    "maxAmount": 5000000,
    "minCreditScore": 0,
    "minMonthlyRevenue": 20000,
    "minTimeInBusinessMonths": 3,
    "creditTier": "Subprime",
    "termLength": "3 - 18 Months",
    "paymentType": "Daily/Weekly",
    "rateCostRange": "Factor Rate 1.20 - 1.49",
    "timeToFunding": "24 Hours",
    "startupEligible": false,
    "ctaLabel": "Get Advance",
    "productPathId": "merchant-cash-advance",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "gokap-mca",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "gokap-loc",
    "slug": "gokap-loc",
    "name": "Business Line of Credit",
    "providerId": "gokapital",
    "providerName": "GoKapital",
    "productFamily": "business-line-access",
    "category": "Business",
    "fundingType": "Revolving Line",
    "minAmount": 5000,
    "maxAmount": 55000,
    "minCreditScore": 600,
    "minMonthlyRevenue": 15000,
    "minTimeInBusinessMonths": 12,
    "creditTier": "Fair",
    "termLength": "Revolving",
    "paymentType": "Revolving",
    "rateCostRange": "Interest on Funds Used",
    "timeToFunding": "24 Hours",
    "startupEligible": false,
    "ctaLabel": "Get Line",
    "productPathId": "business-line-of-credit",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "gokap-loc",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "gokap-startup",
    "slug": "gokap-startup",
    "name": "Personal/Start-up Loan",
    "providerId": "gokapital",
    "providerName": "GoKapital",
    "productFamily": "startup-credit-leverage",
    "category": "Personal",
    "fundingType": "Installment Loan",
    "minAmount": 20000,
    "maxAmount": 500000,
    "minCreditScore": 680,
    "minMonthlyRevenue": 30000,
    "minTimeInBusinessMonths": 0,
    "creditTier": "Good",
    "termLength": "1 - 5 Years",
    "paymentType": "Monthly",
    "rateCostRange": "6% - 18%",
    "timeToFunding": "5 - 7 Days",
    "startupEligible": true,
    "ctaLabel": "Get Startup Loan",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "gokap-startup",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "gokap-sbl",
    "slug": "gokap-sbl",
    "name": "Small Business Loans",
    "providerId": "gokapital",
    "providerName": "GoKapital",
    "productFamily": "working-capital",
    "category": "Business",
    "fundingType": "Term Loan",
    "minAmount": 20000,
    "maxAmount": 5000000,
    "creditTier": "Fair",
    "termLength": "Varies",
    "paymentType": "Monthly",
    "rateCostRange": "Varies",
    "timeToFunding": "24 Hours",
    "startupEligible": false,
    "ctaLabel": "Apply Now",
    "productPathId": "business-term-loan",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "gokap-sbl",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "gokap-equip",
    "slug": "gokap-equip",
    "name": "Equipment Financing",
    "providerId": "gokapital",
    "providerName": "GoKapital",
    "productFamily": "equipment-finance",
    "category": "Business",
    "fundingType": "Asset Backed",
    "minAmount": 20000,
    "maxAmount": 50000000,
    "minCreditScore": 580,
    "minTimeInBusinessMonths": 12,
    "creditTier": "Subprime",
    "termLength": "1 - 5 Years",
    "paymentType": "Monthly",
    "rateCostRange": "6% - 35%",
    "timeToFunding": "Quick Approval",
    "startupEligible": false,
    "ctaLabel": "Finance Equipment",
    "productPathId": "equipment-financing",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "gokap-equip",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "gokap-term",
    "slug": "gokap-term",
    "name": "Unsecured Business Term Loans",
    "providerId": "gokapital",
    "providerName": "GoKapital",
    "productFamily": "working-capital",
    "category": "Business",
    "fundingType": "Installment Loan",
    "minAmount": 20000,
    "maxAmount": 500000,
    "creditTier": "Good",
    "termLength": "Up to 5 Years",
    "paymentType": "Monthly",
    "rateCostRange": "Simple Interest",
    "timeToFunding": "1 - 2 Weeks",
    "startupEligible": false,
    "ctaLabel": "Get Term Loan",
    "productPathId": "business-term-loan",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "gokap-term",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "gokap-sba",
    "slug": "gokap-sba",
    "name": "SBA 7(a) Loans",
    "providerId": "gokapital",
    "providerName": "GoKapital",
    "productFamily": "working-capital",
    "category": "Business",
    "fundingType": "Term Loan",
    "minAmount": 30000,
    "maxAmount": 5000000,
    "minCreditScore": 680,
    "minMonthlyRevenueNote": "Profitability Req",
    "minTimeInBusinessMonths": 24,
    "creditTier": "Good",
    "termLength": "10 - 25 Years",
    "paymentType": "Monthly",
    "rateCostRange": "Prime + 2.75% - 4.75%",
    "timeToFunding": "1 - 3 Months",
    "startupEligible": false,
    "ctaLabel": "Apply for SBA",
    "productPathId": "business-term-loan",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "gokap-sba",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "gokap-consumer",
    "slug": "gokap-consumer",
    "name": "Consumer Financing",
    "providerId": "gokapital",
    "providerName": "GoKapital",
    "productFamily": "working-capital",
    "category": "Business",
    "fundingType": "Service",
    "minTimeInBusinessMonths": 12,
    "termLength": "Varies",
    "rateCostRange": "Varies",
    "timeToFunding": "Instant",
    "startupEligible": false,
    "ctaLabel": "Offer Financing",
    "productPathId": "working-capital",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "gokap-consumer",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "gokap-hardmoney",
    "slug": "gokap-hardmoney",
    "name": "Hard Money Bridge Loans",
    "providerId": "gokapital",
    "providerName": "GoKapital",
    "productFamily": "real-estate-capital",
    "category": "Real Estate",
    "fundingType": "Hard Money",
    "minAmount": 100000,
    "maxAmount": 50000000,
    "creditTier": "Fair",
    "termLength": "1 - 2 Years",
    "paymentType": "Interest Only",
    "rateCostRange": "7% - 14%",
    "timeToFunding": "2 - 4 Weeks",
    "startupEligible": false,
    "ctaLabel": "Fund Flip",
    "productPathId": "real-estate-bridge",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "gokap-hardmoney",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "gokap-cre",
    "slug": "gokap-cre",
    "name": "Commercial Mortgages",
    "providerId": "gokapital",
    "providerName": "GoKapital",
    "productFamily": "real-estate-capital",
    "category": "Real Estate",
    "fundingType": "Mortgage",
    "minAmount": 100000,
    "maxAmount": 50000000,
    "creditTier": "Fair",
    "termLength": "1 - 30 Years",
    "paymentType": "Monthly",
    "rateCostRange": "7% - 14%",
    "timeToFunding": "2 - 4 Weeks",
    "startupEligible": false,
    "ctaLabel": "Refinance CRE",
    "productPathId": "commercial-mortgage",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "gokap-cre",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "gokap-rental",
    "slug": "gokap-rental",
    "name": "Rental Investment",
    "providerId": "gokapital",
    "providerName": "GoKapital",
    "productFamily": "real-estate-capital",
    "category": "Real Estate",
    "fundingType": "Mortgage",
    "minAmount": 150000,
    "maxAmount": 50000000,
    "minCreditScore": 660,
    "creditTier": "Good",
    "termLength": "Up to 30 Years",
    "paymentType": "Monthly",
    "rateCostRange": "5.9% - 7.9%",
    "timeToFunding": "Varies",
    "startupEligible": false,
    "ctaLabel": "Fund Rental",
    "productPathId": "dscr-real-estate",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "gokap-rental",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "gokap-foreign",
    "slug": "gokap-foreign",
    "name": "Foreign National Loans",
    "providerId": "gokapital",
    "providerName": "GoKapital",
    "productFamily": "real-estate-capital",
    "category": "Real Estate",
    "fundingType": "Mortgage",
    "minAmount": 150000,
    "maxAmount": 50000000,
    "termLength": "Varies",
    "paymentType": "Monthly",
    "rateCostRange": "6% - 14%",
    "timeToFunding": "Varies",
    "startupEligible": false,
    "ctaLabel": "Apply Foreign",
    "productPathId": "commercial-mortgage",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "gokap-foreign",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "gokap-cannabis",
    "slug": "gokap-cannabis",
    "name": "Cannabis Business Loans",
    "providerId": "gokapital",
    "providerName": "GoKapital",
    "productFamily": "working-capital",
    "category": "Business",
    "fundingType": "Term Loan",
    "minAmount": 50000,
    "maxAmount": 5000000,
    "minCreditScore": 600,
    "minMonthlyRevenue": 20000,
    "minTimeInBusinessMonths": 12,
    "creditTier": "Fair",
    "termLength": "Varies",
    "paymentType": "Monthly",
    "rateCostRange": "Varies",
    "timeToFunding": "1 - 2 Weeks",
    "startupEligible": false,
    "ctaLabel": "Fund Cannabis Biz",
    "productPathId": "business-term-loan",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "gokap-cannabis",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "gokap-truck",
    "slug": "gokap-truck",
    "name": "Commercial Truck Financing",
    "providerId": "gokapital",
    "providerName": "GoKapital",
    "productFamily": "equipment-finance",
    "category": "Business",
    "fundingType": "Asset Backed",
    "minAmount": 20000,
    "maxAmount": 5000000,
    "minCreditScore": 600,
    "creditTier": "Fair",
    "termLength": "1 - 5 Years",
    "paymentType": "Monthly",
    "rateCostRange": "Varies",
    "timeToFunding": "1 - 3 Days",
    "startupEligible": false,
    "ctaLabel": "Finance Truck",
    "productPathId": "equipment-financing",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "gokap-truck",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "rok-term",
    "slug": "rok-term",
    "name": "Small Business Loans",
    "providerId": "rok-financial",
    "providerName": "ROK Financial",
    "productFamily": "working-capital",
    "category": "Business",
    "fundingType": "Term Loan",
    "minAmount": 20000,
    "maxAmount": 5000000,
    "minCreditScore": 600,
    "minMonthlyRevenue": 15000,
    "minTimeInBusinessMonths": 24,
    "creditTier": "Fair",
    "termLength": "6 mos - 10 Years",
    "paymentType": "Monthly",
    "rateCostRange": "Varies",
    "timeToFunding": "1 - 3 Days",
    "startupEligible": false,
    "ctaLabel": "Apply Now",
    "productPathId": "business-term-loan",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "rok-term",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "rok-bloc",
    "slug": "rok-bloc",
    "name": "Business Line of Credit",
    "providerId": "rok-financial",
    "providerName": "ROK Financial",
    "productFamily": "business-line-access",
    "category": "Business",
    "fundingType": "Revolving Line",
    "minAmount": 10000,
    "maxAmount": 500000,
    "minCreditScore": 600,
    "minMonthlyRevenue": 15000,
    "minTimeInBusinessMonths": 12,
    "creditTier": "Fair",
    "termLength": "Revolving",
    "paymentType": "Revolving",
    "rateCostRange": "Varies",
    "timeToFunding": "1 - 3 Days",
    "startupEligible": false,
    "ctaLabel": "Get Line",
    "productPathId": "business-line-of-credit",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "rok-bloc",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "rok-sba",
    "slug": "rok-sba",
    "name": "SBA Loans",
    "providerId": "rok-financial",
    "providerName": "ROK Financial",
    "productFamily": "working-capital",
    "category": "Business",
    "fundingType": "Term Loan",
    "minAmount": 50000,
    "maxAmount": 5000000,
    "minCreditScore": 680,
    "minMonthlyRevenueNote": "Profitability Req",
    "minTimeInBusinessMonths": 24,
    "creditTier": "Good",
    "termLength": "10 - 25 Years",
    "paymentType": "Monthly",
    "rateCostRange": "Prime Based",
    "timeToFunding": "1 - 3 Months",
    "startupEligible": false,
    "ctaLabel": "Apply SBA",
    "productPathId": "business-term-loan",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "rok-sba",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "rok-equip",
    "slug": "rok-equip",
    "name": "Equipment Financing",
    "providerId": "rok-financial",
    "providerName": "ROK Financial",
    "productFamily": "equipment-finance",
    "category": "Business",
    "fundingType": "Asset Backed",
    "minAmount": 20000,
    "maxAmount": 5000000,
    "minCreditScore": 600,
    "minMonthlyRevenue": 15000,
    "creditTier": "Fair",
    "termLength": "1 - 5 Years",
    "paymentType": "Monthly",
    "rateCostRange": "Varies",
    "timeToFunding": "1 - 3 Days",
    "startupEligible": false,
    "ctaLabel": "Finance Equipment",
    "productPathId": "equipment-financing",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "rok-equip",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "rok-ar",
    "slug": "rok-ar",
    "name": "Accounts Receivable Financing",
    "providerId": "rok-financial",
    "providerName": "ROK Financial",
    "productFamily": "working-capital",
    "category": "Business",
    "fundingType": "Factoring",
    "minAmount": 20000,
    "maxAmount": 5000000,
    "minCreditScore": 600,
    "minMonthlyRevenue": 15000,
    "creditTier": "Fair",
    "termLength": "Revolving",
    "paymentType": "Revolving",
    "rateCostRange": "Factor Rate",
    "timeToFunding": "1 - 3 Days",
    "startupEligible": false,
    "ctaLabel": "Factor Invoices",
    "productPathId": "invoice-factoring",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "rok-ar",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "rok-mca",
    "slug": "rok-mca",
    "name": "Merchant Cash Advance / Working Capital",
    "providerId": "rok-financial",
    "providerName": "ROK Financial",
    "productFamily": "working-capital",
    "category": "Business",
    "fundingType": "Revenue Advance",
    "minAmount": 20000,
    "maxAmount": 2000000,
    "minCreditScore": 500,
    "minMonthlyRevenue": 15000,
    "minTimeInBusinessMonths": 6,
    "creditTier": "Subprime",
    "termLength": "3 - 18 Months",
    "paymentType": "Daily/Weekly",
    "rateCostRange": "Factor Rate",
    "timeToFunding": "24 Hours",
    "startupEligible": false,
    "ctaLabel": "Get Advance",
    "productPathId": "merchant-cash-advance",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "rok-mca",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "rok-franchise",
    "slug": "rok-franchise",
    "name": "Franchise Financing",
    "providerId": "rok-financial",
    "providerName": "ROK Financial",
    "productFamily": "startup-credit-leverage",
    "category": "Business",
    "fundingType": "Term Loan",
    "minAmount": 50000,
    "maxAmount": 5000000,
    "minCreditScore": 680,
    "creditTier": "Good",
    "termLength": "Varies",
    "paymentType": "Monthly",
    "rateCostRange": "Varies",
    "timeToFunding": "2 - 4 Weeks",
    "startupEligible": false,
    "ctaLabel": "Fund Franchise",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "rok-franchise",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "rok-res-invest",
    "slug": "rok-res-invest",
    "name": "Residential Investment Loans",
    "providerId": "rok-financial",
    "providerName": "ROK Financial",
    "productFamily": "real-estate-capital",
    "category": "Real Estate",
    "fundingType": "Hard Money",
    "minAmount": 100000,
    "maxAmount": 5000000,
    "minCreditScore": 650,
    "creditTier": "Fair",
    "termLength": "12 - 24 Months",
    "paymentType": "Interest Only",
    "rateCostRange": "Varies",
    "timeToFunding": "2 - 4 Weeks",
    "startupEligible": false,
    "ctaLabel": "Fund Flip",
    "productPathId": "real-estate-bridge",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "rok-res-invest",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "rok-startup",
    "slug": "rok-startup",
    "name": "Startup Funding",
    "providerId": "rok-financial",
    "providerName": "ROK Financial",
    "productFamily": "startup-credit-leverage",
    "category": "Business",
    "fundingType": "Unsecured Line",
    "minAmount": 10000,
    "maxAmount": 150000,
    "minCreditScore": 680,
    "minMonthlyRevenue": 0,
    "minTimeInBusinessMonths": 0,
    "creditTier": "Good",
    "termLength": "Revolving",
    "paymentType": "Monthly",
    "rateCostRange": "0% Intro / Varies",
    "timeToFunding": "2 - 3 Weeks",
    "startupEligible": true,
    "ctaLabel": "Get Startup Funds",
    "productPathId": "business-cards-or-loc",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "rok-startup",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "rok-cre",
    "slug": "rok-cre",
    "name": "Commercial Real Estate Financing",
    "providerId": "rok-financial",
    "providerName": "ROK Financial",
    "productFamily": "real-estate-capital",
    "category": "Real Estate",
    "fundingType": "Mortgage",
    "minAmount": 100000,
    "maxAmount": 50000000,
    "minCreditScore": 660,
    "creditTier": "Fair",
    "termLength": "Varies",
    "paymentType": "Monthly",
    "rateCostRange": "Varies",
    "timeToFunding": "1 - 3 Months",
    "startupEligible": false,
    "ctaLabel": "Fund CRE",
    "productPathId": "commercial-mortgage",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "rok-cre",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "8fig-growth",
    "slug": "8fig-growth",
    "name": "Growth Plan",
    "providerId": "8fig",
    "providerName": "8fig",
    "productFamily": "marketplace-capital",
    "category": "Business",
    "fundingType": "Revenue Based",
    "minAmount": 10000,
    "maxAmount": 500000,
    "minMonthlyRevenue": 8500,
    "minTimeInBusinessMonths": 6,
    "creditTier": "Fair",
    "termLength": "Supply Chain Aligned",
    "paymentType": "Scheduled Remittance",
    "rateCostRange": "Fixed Fee 6% - 10%",
    "timeToFunding": "24 - 48 Hours",
    "startupEligible": false,
    "ctaLabel": "Map Your Cashflow",
    "productPathId": "ecommerce-working-capital",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "8fig-growth",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "onramp-growth",
    "slug": "onramp-growth",
    "name": "E-commerce Growth Capital",
    "providerId": "onramp",
    "providerName": "OnRamp Funds",
    "productFamily": "marketplace-capital",
    "category": "Business",
    "fundingType": "Revenue Based",
    "minAmount": 5000,
    "maxAmount": 2000000,
    "minMonthlyRevenue": 3000,
    "creditTier": "Fair",
    "termLength": "Varies",
    "paymentType": "Revenue Share",
    "rateCostRange": "1% - 3% Fee",
    "timeToFunding": "Instant",
    "startupEligible": false,
    "ctaLabel": "Get Growth Capital",
    "productPathId": "ecommerce-working-capital",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "onramp-growth",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "payability-instant",
    "slug": "payability-instant",
    "name": "Instant Access (Daily Payouts)",
    "providerId": "payability",
    "providerName": "Payability",
    "productFamily": "marketplace-capital",
    "category": "Business",
    "fundingType": "Factoring",
    "minAmount": 1000,
    "minMonthlyRevenue": 2000,
    "minTimeInBusinessMonths": 3,
    "creditTier": "Fair",
    "termLength": "Daily",
    "paymentType": "Daily Deduction",
    "rateCostRange": "2% Flat Fee (Gross)",
    "timeToFunding": "24 Hours",
    "startupEligible": false,
    "ctaLabel": "Get Daily Pay",
    "productPathId": "ecommerce-working-capital",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "payability-instant",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "payability-advance",
    "slug": "payability-advance",
    "name": "Instant Advance",
    "providerId": "payability",
    "providerName": "Payability",
    "productFamily": "marketplace-capital",
    "category": "Business",
    "fundingType": "Revenue Advance",
    "minAmount": 5000,
    "maxAmount": 250000,
    "minMonthlyRevenue": 10000,
    "minTimeInBusinessMonths": 9,
    "creditTier": "Fair",
    "termLength": "Weekly",
    "paymentType": "Weekly",
    "rateCostRange": "Varies",
    "timeToFunding": "24 Hours",
    "startupEligible": false,
    "ctaLabel": "Get Advance",
    "productPathId": "ecommerce-working-capital",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "payability-advance",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "fundgrow-stacking",
    "slug": "fundgrow-stacking",
    "name": "Business Credit Stacking",
    "providerId": "fundandgrow",
    "providerName": "Fund&Grow",
    "productFamily": "startup-credit-leverage",
    "category": "Business",
    "fundingType": "Unsecured Line",
    "minAmount": 10000,
    "maxAmount": 250000,
    "minCreditScore": 700,
    "minMonthlyRevenue": 0,
    "minTimeInBusinessMonths": 0,
    "creditTier": "Good",
    "termLength": "Revolving (0% 6-12mo)",
    "paymentType": "Revolving",
    "rateCostRange": "0% Intro Rate",
    "timeToFunding": "2 - 4 Weeks",
    "startupEligible": true,
    "ctaLabel": "Start Stacking",
    "productPathId": "business-cards-or-loc",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "fundgrow-stacking",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "creditsuite-builder",
    "slug": "creditsuite-builder",
    "name": "Business Credit Builder",
    "providerId": "credit-suite",
    "providerName": "Credit Suite",
    "productFamily": "startup-credit-leverage",
    "category": "Business",
    "fundingType": "Service",
    "minCreditScore": 0,
    "minMonthlyRevenue": 0,
    "minTimeInBusinessMonths": 0,
    "rateCostRange": "Consulting Fee",
    "startupEligible": true,
    "ctaLabel": "Build Business Credit",
    "productPathId": "business-credit-building",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "creditsuite-builder",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "bluebridge-efa",
    "slug": "bluebridge-efa",
    "name": "Equipment Finance Agreement",
    "providerId": "blue-bridge-financial",
    "providerName": "Blue Bridge Financial",
    "productFamily": "equipment-finance",
    "category": "Business",
    "fundingType": "Asset Backed",
    "minAmount": 10000,
    "maxAmount": 500000,
    "minCreditScore": 600,
    "minTimeInBusinessMonths": 24,
    "creditTier": "Fair",
    "termLength": "1 - 5 Years",
    "paymentType": "Monthly",
    "rateCostRange": "Varies",
    "timeToFunding": "1 - 3 Days",
    "startupEligible": false,
    "ctaLabel": "Finance Equipment",
    "productPathId": "equipment-financing",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "bluebridge-efa",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "nbc-term",
    "slug": "nbc-term",
    "name": "Small Business Loans",
    "providerId": "national-business-capital",
    "providerName": "National Business Capital",
    "productFamily": "working-capital",
    "category": "Business",
    "fundingType": "Term Loan",
    "minAmount": 25000,
    "maxAmount": 5000000,
    "minCreditScore": 600,
    "minMonthlyRevenue": 10000,
    "minTimeInBusinessMonths": 12,
    "creditTier": "Fair",
    "termLength": "6 mos - 10 Years",
    "paymentType": "Monthly",
    "rateCostRange": "Varies",
    "timeToFunding": "24 Hours",
    "startupEligible": false,
    "ctaLabel": "Apply Now",
    "productPathId": "business-term-loan",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "nbc-term",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "sellersfi-wc",
    "slug": "sellersfi-wc",
    "name": "Working Capital",
    "providerId": "sellersfi",
    "providerName": "SellersFi",
    "productFamily": "marketplace-capital",
    "category": "Business",
    "fundingType": "Revenue Based",
    "minAmount": 10000,
    "maxAmount": 10000000,
    "minCreditScore": 600,
    "minMonthlyRevenue": 20000,
    "minTimeInBusinessMonths": 6,
    "creditTier": "Fair",
    "termLength": "3 - 24 Months",
    "paymentType": "Bi-Weekly/Monthly",
    "rateCostRange": "Varies",
    "timeToFunding": "24 - 48 Hours",
    "startupEligible": false,
    "ctaLabel": "Get Capital",
    "productPathId": "ecommerce-working-capital",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "sellersfi-wc",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "guidant-robs",
    "slug": "guidant-robs",
    "name": "401(k) Rollover (ROBS)",
    "providerId": "guidant",
    "providerName": "Guidant Financial",
    "productFamily": "startup-credit-leverage",
    "category": "Business",
    "fundingType": "Equity",
    "minAmount": 50000,
    "maxAmount": 5000000,
    "minCreditScore": 0,
    "minMonthlyRevenue": 0,
    "minTimeInBusinessMonths": 0,
    "rateCostRange": "Setup Fee + Monthly Admin",
    "timeToFunding": "3 - 4 Weeks",
    "startupEligible": true,
    "ctaLabel": "Start Debt Free",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "guidant-robs",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "finfactory-ubf",
    "slug": "finfactory-ubf",
    "name": "Unsecured Business Finance",
    "providerId": "the-finance-factory",
    "providerName": "Finance Factory",
    "productFamily": "startup-credit-leverage",
    "category": "Business",
    "fundingType": "Unsecured Line",
    "minAmount": 25000,
    "maxAmount": 500000,
    "minCreditScore": 700,
    "minMonthlyRevenue": 0,
    "minTimeInBusinessMonths": 0,
    "creditTier": "Good",
    "termLength": "Revolving / 5-7 Years",
    "paymentType": "Monthly",
    "rateCostRange": "0% Intro / 6% - 15%",
    "timeToFunding": "10 - 14 Days",
    "startupEligible": true,
    "ctaLabel": "Check Eligibility",
    "productPathId": "business-cards-or-loc",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "finfactory-ubf",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "fora-sbl",
    "slug": "fora-sbl",
    "name": "Small Business Loan",
    "providerId": "fora-financial",
    "providerName": "Fora Financial",
    "productFamily": "working-capital",
    "category": "Business",
    "fundingType": "Term Loan",
    "minAmount": 5000,
    "maxAmount": 500000,
    "minCreditScore": 500,
    "minMonthlyRevenue": 12000,
    "minTimeInBusinessMonths": 6,
    "creditTier": "Subprime",
    "termLength": "6 - 15 Months",
    "paymentType": "Daily/Weekly",
    "rateCostRange": "Factor Rate",
    "timeToFunding": "24 - 72 Hours",
    "startupEligible": false,
    "ctaLabel": "Apply Now",
    "productPathId": "business-term-loan",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "fora-sbl",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "fora-advance",
    "slug": "fora-advance",
    "name": "Revenue Advance",
    "providerId": "fora-financial",
    "providerName": "Fora Financial",
    "productFamily": "working-capital",
    "category": "Business",
    "fundingType": "Revenue Advance",
    "minAmount": 5000,
    "maxAmount": 500000,
    "minCreditScore": 500,
    "minMonthlyRevenue": 12000,
    "minTimeInBusinessMonths": 6,
    "creditTier": "Subprime",
    "termLength": "Varies",
    "paymentType": "Daily/Weekly",
    "rateCostRange": "Factor Rate",
    "timeToFunding": "24 Hours",
    "startupEligible": false,
    "ctaLabel": "Get Advance",
    "productPathId": "revenue-based-financing",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "fora-advance",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "credibly-wc",
    "slug": "credibly-wc",
    "name": "Working Capital Loan",
    "providerId": "credibly",
    "providerName": "Credibly",
    "productFamily": "working-capital",
    "category": "Business",
    "fundingType": "Term Loan",
    "minAmount": 5000,
    "maxAmount": 600000,
    "minCreditScore": 500,
    "minMonthlyRevenue": 15000,
    "minTimeInBusinessMonths": 6,
    "creditTier": "Subprime",
    "termLength": "6 - 24 Months",
    "paymentType": "Daily/Weekly",
    "rateCostRange": "Factor Rate 1.11+",
    "timeToFunding": "24 Hours",
    "startupEligible": false,
    "ctaLabel": "Get Funds",
    "productPathId": "business-term-loan",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "credibly-wc",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "credibly-ex",
    "slug": "credibly-ex",
    "name": "Business Expansion Loan",
    "providerId": "credibly",
    "providerName": "Credibly",
    "productFamily": "working-capital",
    "category": "Business",
    "fundingType": "Term Loan",
    "minAmount": 5000,
    "maxAmount": 600000,
    "minCreditScore": 600,
    "minMonthlyRevenue": 15000,
    "minTimeInBusinessMonths": 6,
    "creditTier": "Fair",
    "termLength": "18 - 24 Months",
    "paymentType": "Weekly",
    "rateCostRange": "Simple Interest",
    "timeToFunding": "3 - 5 Days",
    "startupEligible": false,
    "ctaLabel": "Expand Now",
    "productPathId": "business-term-loan",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "credibly-ex",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "uplyft-mca",
    "slug": "uplyft-mca",
    "name": "Merchant Cash Advance",
    "providerId": "uplyft-capital",
    "providerName": "Uplyft Capital",
    "productFamily": "working-capital",
    "category": "Business",
    "fundingType": "Revenue Advance",
    "minAmount": 5000,
    "maxAmount": 500000,
    "minCreditScore": 500,
    "minMonthlyRevenue": 10000,
    "minTimeInBusinessMonths": 6,
    "creditTier": "Subprime",
    "termLength": "3 - 12 Months",
    "paymentType": "Daily",
    "rateCostRange": "Factor Rate",
    "timeToFunding": "24 Hours",
    "startupEligible": false,
    "ctaLabel": "Get Offer",
    "productPathId": "merchant-cash-advance",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "uplyft-mca",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "visio-rental",
    "slug": "visio-rental",
    "name": "Rental Loans (DSCR)",
    "providerId": "visio-lending",
    "providerName": "Visio Lending",
    "productFamily": "real-estate-capital",
    "category": "Real Estate",
    "fundingType": "Mortgage",
    "minAmount": 75000,
    "maxAmount": 5000000,
    "minCreditScore": 680,
    "creditTier": "Good",
    "termLength": "30 Years",
    "paymentType": "Monthly",
    "rateCostRange": "6% - 9%",
    "timeToFunding": "3 - 4 Weeks",
    "startupEligible": false,
    "ctaLabel": "Fund Rental",
    "productPathId": "dscr-real-estate",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "visio-rental",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  },
  {
    "id": "newsilver-flip",
    "slug": "newsilver-flip",
    "name": "Fix and Flip Bridge",
    "providerId": "new-silver",
    "providerName": "New Silver",
    "productFamily": "real-estate-capital",
    "category": "Real Estate",
    "fundingType": "Hard Money",
    "minAmount": 100000,
    "maxAmount": 5000000,
    "minCreditScore": 650,
    "creditTier": "Fair",
    "termLength": "12 - 24 Months",
    "paymentType": "Interest Only",
    "rateCostRange": "8% - 11%",
    "timeToFunding": "5 - 7 Days",
    "startupEligible": false,
    "ctaLabel": "Fund Flip",
    "productPathId": "real-estate-bridge",
    "status": "ACTIVE_IMPORTED",
    "visibility": "internal",
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-products.registry.json",
      "sourceRecordId": "newsilver-flip",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": []
    }
  }
];

export const GENERATED_FUNDING_PROVIDERS: FundingProviderRecord[] = [
  {
    "id": "7-figures-funding",
    "slug": "7-figures-funding",
    "name": "7 Figures Funding",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#7-figures-funding",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "applicationUrl": "https://portal.7figurespartners.com/affiliates/panel.php#Home",
    "website": "https://www.7figuresfunding.com/",
    "affiliateUrl": "https://www.7figurescredit.com?a_aid=MoonshineCapital",
    "categories": [
      "Personal",
      "Business"
    ],
    "productFamilyIds": [
      "business-line-access",
      "structured-growth-loans",
      "working-capital"
    ],
    "financingProducts": [
      "Term Loan",
      "Line of Credit",
      "Revenue-Based Financing (RBF)",
      "Merchant Cash Advance (MCA)"
    ],
    "industryAppetite": [
      "Startups",
      "Entrepreneurs"
    ],
    "restrictedIndustries": [],
    "typicalBorrowerProfile": "680+ credit score, U.S. citizen, no recent bankruptcies",
    "eligibility": {
      "minCreditScore": 680,
      "minMonthlyRevenue": null,
      "minTimeInBusinessMonths": null
    },
    "requirements": {
      "pgType": "Soft PG",
      "disqualifiers": null,
      "requirementsNote": "680+ credit score, U.S. citizen, no recent bankruptcies"
    },
    "commissionMetadata": "Varies; typically 2-3%",
    "contactEmail": "partners@7figures.com",
    "productIds": [
      "7figs-stacking",
      "7figs-personal-startup",
      "7figs-bloc",
      "7figs-mca",
      "7figs-equip",
      "7figs-cre",
      "7figs-sba",
      "7figs-personal-term",
      "7figs-personal-loc",
      "7figs-debt-consol",
      "7figs-heloc",
      "7figs-personal-cards"
    ],
    "productPathIds": [
      "business-cards-or-loc",
      "business-line-of-credit",
      "merchant-cash-advance",
      "equipment-financing",
      "commercial-mortgage",
      "business-term-loan",
      "debt-refinance"
    ],
    "criteriaIds": [
      "criteria:7figs-stacking",
      "criteria:7figs-personal-startup",
      "criteria:7figs-bloc",
      "criteria:7figs-mca",
      "criteria:7figs-equip",
      "criteria:7figs-cre",
      "criteria:7figs-sba",
      "criteria:7figs-personal-term",
      "criteria:7figs-personal-loc",
      "criteria:7figs-debt-consol",
      "criteria:7figs-heloc",
      "criteria:7figs-personal-cards"
    ],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "7-figures-funding",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "8fig",
    "slug": "8fig",
    "name": "8fig",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#8fig",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "website": "https://8fig.co/",
    "categories": [
      "Business"
    ],
    "productFamilyIds": [
      "marketplace-capital",
      "working-capital"
    ],
    "financingProducts": [
      "Revenue-Based Financing (RBF)"
    ],
    "industryAppetite": [
      "E-commerce",
      "Amazon Sellers",
      "Walmart Sellers",
      "Shopify Sellers"
    ],
    "restrictedIndustries": [],
    "typicalBorrowerProfile": "E-commerce businesses with consistent sales history, seeking growth capital",
    "eligibility": {
      "minCreditScore": null,
      "minMonthlyRevenue": 12000,
      "minTimeInBusinessMonths": 6
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": "E-commerce businesses with consistent sales history, seeking growth capital"
    },
    "fundingAmountText": "$10,000,000",
    "commissionMetadata": "10%",
    "keyContact": "Contact via partner portal",
    "productIds": [
      "8fig-growth"
    ],
    "productPathIds": [
      "ecommerce-working-capital"
    ],
    "criteriaIds": [
      "criteria:8fig-growth"
    ],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "8fig",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "bank-breezy",
    "slug": "bank-breezy",
    "name": "Bank Breezy",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#bank-breezy",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "applicationUrl": "https://bankbreezy.com/funding/jason/",
    "website": "https://bankbreezy.com/",
    "affiliateUrl": "https://bankbreezy.com/jason/",
    "categories": [
      "Business"
    ],
    "productFamilyIds": [
      "business-line-access",
      "structured-growth-loans",
      "working-capital"
    ],
    "financingProducts": [
      "Working Capital (General)",
      "Line of Credit",
      "Term Loan",
      "Revenue-Based Financing (RBF)",
      "Merchant Cash Advance (MCA)"
    ],
    "industryAppetite": [
      "Construction",
      "Healthcare",
      "Restaurants",
      "Contractors",
      "HVAC",
      "Gig Workers",
      "Self-Employed",
      "Freelancers"
    ],
    "restrictedIndustries": [],
    "eligibility": {
      "minCreditScore": 500,
      "minMonthlyRevenue": 3000,
      "minTimeInBusinessMonths": 3
    },
    "requirements": {
      "pgType": "Soft PG",
      "disqualifiers": null,
      "requirementsNote": null
    },
    "fundingAmountText": "up to $2,000,000",
    "commissionMetadata": "2-8%",
    "productIds": [
      "dac-corerate",
      "dac-flexrate",
      "dac-giggle",
      "dac-loc",
      "dac-canada"
    ],
    "productPathIds": [
      "revenue-based-financing",
      "business-line-of-credit"
    ],
    "criteriaIds": [
      "criteria:dac-corerate",
      "criteria:dac-flexrate",
      "criteria:dac-giggle",
      "criteria:dac-loc",
      "criteria:dac-canada"
    ],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "bank-breezy",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "business-credit-workshop",
    "slug": "business-credit-workshop",
    "name": "Business Credit Workshop",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#business-credit-workshop",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "categories": [
      "Personal",
      "Consulting"
    ],
    "productFamilyIds": [],
    "financingProducts": [
      "Business Credit Cards / 0% Stacking",
      "Line of Credit"
    ],
    "industryAppetite": [],
    "restrictedIndustries": [],
    "eligibility": {
      "minCreditScore": null,
      "minMonthlyRevenue": null,
      "minTimeInBusinessMonths": null
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": null
    },
    "productIds": [],
    "productPathIds": [],
    "criteriaIds": [],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "business-credit-workshop",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "capchase",
    "slug": "capchase",
    "name": "Capchase",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#capchase",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "applicationUrl": "https://capchase.com/referrals?referralId=395c26d9",
    "website": "https://capchase.com/",
    "affiliateUrl": "https://capchase.com/referrals?referralId=395c26d9",
    "categories": [
      "Business"
    ],
    "productFamilyIds": [
      "working-capital"
    ],
    "financingProducts": [
      "Revenue-Based Financing (RBF)"
    ],
    "industryAppetite": [
      "Startups",
      "Entrepreneurs",
      "Small Business"
    ],
    "restrictedIndustries": [],
    "typicalBorrowerProfile": "Recurring-revenue business. Eligibility based on MRR/ARR and cohort metrics. No personal guarantee or collateral.",
    "eligibility": {
      "minCreditScore": null,
      "minMonthlyRevenue": null,
      "minTimeInBusinessMonths": null
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": "Recurring-revenue business. Eligibility based on MRR/ARR and cohort metrics. No personal guarantee or collateral."
    },
    "productIds": [],
    "productPathIds": [],
    "criteriaIds": [],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "capchase",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "credibly",
    "slug": "credibly",
    "name": "Credibly",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#credibly",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "categories": [
      "Business"
    ],
    "productFamilyIds": [
      "business-line-access",
      "equipment-finance",
      "working-capital"
    ],
    "financingProducts": [
      "Line of Credit",
      "Working Capital (General)",
      "Equipment Financing"
    ],
    "industryAppetite": [
      "Small Business",
      "Healthcare",
      "Retail"
    ],
    "restrictedIndustries": [],
    "typicalBorrowerProfile": "6+ months in business, $15k/month revenue, 500+ credit score",
    "eligibility": {
      "minCreditScore": null,
      "minMonthlyRevenue": null,
      "minTimeInBusinessMonths": null
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": "6+ months in business, $15k/month revenue, 500+ credit score"
    },
    "fundingAmountText": "$5k-$600k",
    "commissionMetadata": "Varies; typically 1-3%",
    "keyContact": "Contact via partner portal",
    "productIds": [
      "credibly-wc",
      "credibly-ex"
    ],
    "productPathIds": [
      "business-term-loan"
    ],
    "criteriaIds": [
      "criteria:credibly-wc",
      "criteria:credibly-ex"
    ],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "credibly",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "credit-suite",
    "slug": "credit-suite",
    "name": "Credit Suite",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#credit-suite",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "website": "https://creditsuite.com/",
    "categories": [
      "Personal",
      "Consulting",
      "Business"
    ],
    "productFamilyIds": [],
    "financingProducts": [],
    "industryAppetite": [
      "Small Business"
    ],
    "restrictedIndustries": [],
    "typicalBorrowerProfile": "Business owners seeking to build business credit profiles",
    "eligibility": {
      "minCreditScore": null,
      "minMonthlyRevenue": null,
      "minTimeInBusinessMonths": null
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": "Business owners seeking to build business credit profiles"
    },
    "commissionMetadata": "Varies; typically a flat fee per referral",
    "keyContact": "Contact via partner portal",
    "productIds": [
      "creditsuite-builder"
    ],
    "productPathIds": [
      "business-credit-building"
    ],
    "criteriaIds": [
      "criteria:creditsuite-builder"
    ],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "credit-suite",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "david-allen-capital",
    "slug": "david-allen-capital",
    "name": "David Allen Capital",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#david-allen-capital",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "applicationUrl": "https://davidallencapital.com/jason/",
    "website": "https://davidallencapital.com",
    "affiliateUrl": "https://davidallencapital.com/jason/",
    "categories": [
      "Business"
    ],
    "productFamilyIds": [
      "business-line-access",
      "working-capital"
    ],
    "financingProducts": [
      "Revenue-Based Financing (RBF)",
      "Merchant Cash Advance (MCA)",
      "Line of Credit",
      "Instant Micro Funding"
    ],
    "industryAppetite": [
      "Construction",
      "Contractors",
      "HVAC",
      "Restaurants",
      "Healthcare",
      "Gig Workers",
      "Self-Employed",
      "Freelancers"
    ],
    "restrictedIndustries": [],
    "typicalBorrowerProfile": "Minimum 3 months in business, $3k/month revenue, 500+ credit score",
    "eligibility": {
      "minCreditScore": 500,
      "minMonthlyRevenue": 3000,
      "minTimeInBusinessMonths": 3
    },
    "requirements": {
      "pgType": "Soft PG",
      "disqualifiers": null,
      "requirementsNote": "Minimum 3 months in business, $3k/month revenue, 500+ credit score"
    },
    "fundingAmountText": "$10k-$2m",
    "commissionMetadata": "Varies; typically 2-8% of funded amount",
    "contactEmail": "support@davidallencapital.com",
    "keyContact": "support@davidallencapital.com",
    "productIds": [],
    "productPathIds": [],
    "criteriaIds": [],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "david-allen-capital",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "dlp-capital",
    "slug": "dlp-capital",
    "name": "DLP Capital",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#dlp-capital",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "categories": [
      "Real Estate"
    ],
    "productFamilyIds": [
      "real-estate-capital"
    ],
    "financingProducts": [
      "Commercial Real Estate Loan",
      "Working Capital (General)"
    ],
    "industryAppetite": [],
    "restrictedIndustries": [],
    "eligibility": {
      "minCreditScore": null,
      "minMonthlyRevenue": null,
      "minTimeInBusinessMonths": null
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": null
    },
    "commissionMetadata": "Lead Converted to Contact: $250.00",
    "productIds": [],
    "productPathIds": [],
    "criteriaIds": [],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "dlp-capital",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "equitynet",
    "slug": "equitynet",
    "name": "EquityNet",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#equitynet",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "applicationUrl": "https://equitynetinc.sjv.io/Kj1aOv",
    "affiliateUrl": "https://equitynetinc.sjv.io/Kj1aOv",
    "categories": [
      "Marketplace"
    ],
    "productFamilyIds": [
      "startup-credit-leverage"
    ],
    "financingProducts": [
      "Startup / Venture Debt"
    ],
    "industryAppetite": [],
    "restrictedIndustries": [],
    "eligibility": {
      "minCreditScore": null,
      "minMonthlyRevenue": null,
      "minTimeInBusinessMonths": null
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": null
    },
    "productIds": [],
    "productPathIds": [],
    "criteriaIds": [],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "equitynet",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "finta-io",
    "slug": "finta-io",
    "name": "Finta.io",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#finta-io",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "applicationUrl": "https://partners.dub.co/programs",
    "categories": [
      "Software"
    ],
    "productFamilyIds": [],
    "financingProducts": [
      "Funding-as-a-Service Platform"
    ],
    "industryAppetite": [],
    "restrictedIndustries": [],
    "eligibility": {
      "minCreditScore": null,
      "minMonthlyRevenue": null,
      "minTimeInBusinessMonths": null
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": null
    },
    "commissionMetadata": "10%",
    "productIds": [],
    "productPathIds": [],
    "criteriaIds": [],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "finta-io",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": [
        "affiliate link present in CRM but not a clean URL; reconfirm"
      ]
    }
  },
  {
    "id": "fora-financial",
    "slug": "fora-financial",
    "name": "Fora Financial",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#fora-financial",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "applicationUrl": "https://forafinancial.pxf.io/gOWX1v",
    "website": "https://www.forafinancial.com/",
    "affiliateUrl": "https://forafinancial.pxf.io/c/2229127/2015280/24953",
    "categories": [
      "Business"
    ],
    "productFamilyIds": [
      "structured-growth-loans",
      "working-capital"
    ],
    "financingProducts": [
      "Working Capital (General)",
      "Term Loan"
    ],
    "industryAppetite": [
      "Small Business",
      "Retail",
      "Restaurants"
    ],
    "restrictedIndustries": [],
    "typicalBorrowerProfile": "6+ months in business, $12k/month revenue, 500+ credit score",
    "eligibility": {
      "minCreditScore": 570,
      "minMonthlyRevenue": 12000,
      "minTimeInBusinessMonths": 4
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": "6+ months in business, $12k/month revenue, 500+ credit score"
    },
    "fundingAmountText": "$5k-$500k",
    "commissionMetadata": "Funded: 4%",
    "contactEmail": "sales@forafinancial.com",
    "productIds": [
      "fora-sbl",
      "fora-advance"
    ],
    "productPathIds": [
      "business-term-loan",
      "revenue-based-financing"
    ],
    "criteriaIds": [
      "criteria:fora-sbl",
      "criteria:fora-advance"
    ],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "fora-financial",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "fundandgrow",
    "slug": "fundandgrow",
    "name": "Fund&Grow",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#fundandgrow",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "applicationUrl": "https://www.fundandgrow.com/jasonfeimster/",
    "website": "https://www.fundandgrow.com/",
    "affiliateUrl": "https://www.fundandgrow.com/jasonfeimster/",
    "categories": [
      "Personal",
      "Business",
      "Consulting"
    ],
    "productFamilyIds": [
      "working-capital"
    ],
    "financingProducts": [
      "Working Capital (General)"
    ],
    "industryAppetite": [
      "Small Business",
      "Startups"
    ],
    "restrictedIndustries": [],
    "typicalBorrowerProfile": "700+ credit score, U.S. citizen, no recent bankruptcies",
    "eligibility": {
      "minCreditScore": 700,
      "minMonthlyRevenue": null,
      "minTimeInBusinessMonths": null
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": "700+ credit score, U.S. citizen, no recent bankruptcies"
    },
    "fundingAmountText": "up to $250,000",
    "commissionMetadata": "Varies; typically a flat fee per client",
    "productIds": [
      "fundgrow-stacking"
    ],
    "productPathIds": [
      "business-cards-or-loc"
    ],
    "criteriaIds": [
      "criteria:fundgrow-stacking"
    ],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "fundandgrow",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "gator-lending",
    "slug": "gator-lending",
    "name": "Gator Lending",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#gator-lending",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "categories": [
      "Real Estate"
    ],
    "productFamilyIds": [
      "real-estate-capital"
    ],
    "financingProducts": [
      "Commercial Real Estate Loan",
      "Real Estate Bridge Loan",
      "Fix & Flip Loan",
      "DSCR Loan"
    ],
    "industryAppetite": [
      "Real Estate"
    ],
    "restrictedIndustries": [],
    "eligibility": {
      "minCreditScore": null,
      "minMonthlyRevenue": null,
      "minTimeInBusinessMonths": null
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": null
    },
    "productIds": [],
    "productPathIds": [],
    "criteriaIds": [],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "gator-lending",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "gokapital",
    "slug": "gokapital",
    "name": "GoKapital",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#gokapital",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "applicationUrl": "https://www.cognitoforms.com/GoKapitalInc/businessloanapplication",
    "website": "https://gokapital.com",
    "categories": [
      "Personal",
      "Business",
      "Real Estate"
    ],
    "productFamilyIds": [
      "business-line-access",
      "equipment-finance",
      "real-estate-capital",
      "startup-credit-leverage",
      "structured-growth-loans",
      "working-capital"
    ],
    "financingProducts": [
      "Revenue-Based Financing (RBF)",
      "Commercial Real Estate Loan",
      "Line of Credit",
      "Term Loan",
      "SBA 7(a)",
      "Equipment Financing",
      "Working Capital (General)",
      "Startup / Venture Debt"
    ],
    "industryAppetite": [
      "Real Estate",
      "Healthcare",
      "Retail"
    ],
    "restrictedIndustries": [],
    "typicalBorrowerProfile": "1+ year in business, $30k/month revenue, 600+ credit score",
    "eligibility": {
      "minCreditScore": 600,
      "minMonthlyRevenue": 3000,
      "minTimeInBusinessMonths": 6
    },
    "requirements": {
      "pgType": "Soft PG",
      "disqualifiers": null,
      "requirementsNote": "1+ year in business, $30k/month revenue, 600+ credit score"
    },
    "fundingAmountText": "up to $5,000,000",
    "commissionMetadata": "Varies; typically 1-3%",
    "productIds": [
      "gokap-mca",
      "gokap-loc",
      "gokap-startup",
      "gokap-sbl",
      "gokap-equip",
      "gokap-term",
      "gokap-sba",
      "gokap-consumer",
      "gokap-hardmoney",
      "gokap-cre",
      "gokap-rental",
      "gokap-foreign",
      "gokap-cannabis",
      "gokap-truck"
    ],
    "productPathIds": [
      "merchant-cash-advance",
      "business-line-of-credit",
      "business-term-loan",
      "equipment-financing",
      "working-capital",
      "real-estate-bridge",
      "commercial-mortgage",
      "dscr-real-estate"
    ],
    "criteriaIds": [
      "criteria:gokap-mca",
      "criteria:gokap-loc",
      "criteria:gokap-startup",
      "criteria:gokap-sbl",
      "criteria:gokap-equip",
      "criteria:gokap-term",
      "criteria:gokap-sba",
      "criteria:gokap-consumer",
      "criteria:gokap-hardmoney",
      "criteria:gokap-cre",
      "criteria:gokap-rental",
      "criteria:gokap-foreign",
      "criteria:gokap-cannabis",
      "criteria:gokap-truck"
    ],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "gokapital",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "guidant",
    "slug": "guidant",
    "name": "Guidant",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#guidant",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "applicationUrl": "https://www.gfprequal.com/mc",
    "affiliateUrl": "https://www.gfprequal.com/mc",
    "categories": [
      "Business"
    ],
    "productFamilyIds": [
      "equipment-finance"
    ],
    "financingProducts": [
      "Equipment Financing"
    ],
    "industryAppetite": [
      "Franchises",
      "Startups",
      "Small Business"
    ],
    "restrictedIndustries": [],
    "typicalBorrowerProfile": "Clients interested in using retirement funds for business startup or expansion",
    "eligibility": {
      "minCreditScore": null,
      "minMonthlyRevenue": null,
      "minTimeInBusinessMonths": null
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": "Clients interested in using retirement funds for business startup or expansion"
    },
    "fundingAmountText": "$50k-$5M",
    "commissionMetadata": "Varies; typically a flat fee per referral",
    "keyContact": "Contact via partner portal",
    "productIds": [
      "guidant-robs"
    ],
    "productPathIds": [],
    "criteriaIds": [
      "criteria:guidant-robs"
    ],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "guidant",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "kiava",
    "slug": "kiava",
    "name": "Kiava",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#kiava",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "applicationUrl": "https://try.kiavi.com/wc6dxe4vsra5",
    "affiliateUrl": "https://try.kiavi.com/wc6dxe4vsra5",
    "categories": [
      "Real Estate"
    ],
    "productFamilyIds": [
      "real-estate-capital"
    ],
    "financingProducts": [],
    "industryAppetite": [],
    "restrictedIndustries": [],
    "eligibility": {
      "minCreditScore": null,
      "minMonthlyRevenue": null,
      "minTimeInBusinessMonths": null
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": null
    },
    "productIds": [],
    "productPathIds": [],
    "criteriaIds": [],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "kiava",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "new-silver",
    "slug": "new-silver",
    "name": "New Silver",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#new-silver",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "applicationUrl": "https://fxo.co/ItIN",
    "website": "https://newsilver.com/",
    "affiliateUrl": "https://fxo.co/ItIN",
    "categories": [
      "Real Estate"
    ],
    "productFamilyIds": [
      "real-estate-capital"
    ],
    "financingProducts": [
      "Ground-Up Construction Loan",
      "Commercial Real Estate Loan"
    ],
    "industryAppetite": [
      "Real Estate"
    ],
    "restrictedIndustries": [],
    "eligibility": {
      "minCreditScore": null,
      "minMonthlyRevenue": null,
      "minTimeInBusinessMonths": null
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": null
    },
    "commissionMetadata": "$50 per completed loan application; $750 per qualified sale",
    "productIds": [
      "newsilver-flip"
    ],
    "productPathIds": [
      "real-estate-bridge"
    ],
    "criteriaIds": [
      "criteria:newsilver-flip"
    ],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "new-silver",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "onramp",
    "slug": "onramp",
    "name": "Onramp",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#onramp",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "website": "https://www.onrampfunds.com/",
    "categories": [
      "Business"
    ],
    "productFamilyIds": [
      "marketplace-capital",
      "working-capital"
    ],
    "financingProducts": [
      "Revenue-Based Financing (RBF)"
    ],
    "industryAppetite": [
      "E-commerce",
      "Amazon Sellers",
      "Shopify Sellers",
      "Walmart Sellers"
    ],
    "restrictedIndustries": [],
    "typicalBorrowerProfile": "E-commerce businesses with stable revenue, seeking inventory or marketing funding",
    "eligibility": {
      "minCreditScore": null,
      "minMonthlyRevenue": 3000,
      "minTimeInBusinessMonths": null
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": "E-commerce businesses with stable revenue, seeking inventory or marketing funding"
    },
    "fundingAmountText": "up to $2M",
    "commissionMetadata": "Typically 1-3%",
    "productIds": [
      "onramp-growth"
    ],
    "productPathIds": [
      "ecommerce-working-capital"
    ],
    "criteriaIds": [
      "criteria:onramp-growth"
    ],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "onramp",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "opm-mastery",
    "slug": "opm-mastery",
    "name": "OPM Mastery",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#opm-mastery",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "applicationUrl": "https://opmmastery.referralrock.com/l/JASONFEIMS03/",
    "website": "https://opmmastery.com",
    "affiliateUrl": "https://opmmastery.referralrock.com/v2/1",
    "categories": [
      "Personal",
      "Business"
    ],
    "productFamilyIds": [
      "startup-credit-leverage"
    ],
    "financingProducts": [
      "Business Credit Cards / 0% Stacking"
    ],
    "industryAppetite": [
      "Small Business",
      "Entrepreneurs",
      "Startups",
      "Real Estate"
    ],
    "restrictedIndustries": [],
    "typicalBorrowerProfile": "For larger approvals: 700+ personal credit, $50k+ monthly business revenue, and 2+ years in business.",
    "eligibility": {
      "minCreditScore": 700,
      "minMonthlyRevenue": null,
      "minTimeInBusinessMonths": 24
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": "For larger approvals: 700+ personal credit, $50k+ monthly business revenue, and 2+ years in business."
    },
    "fundingAmountText": "$50,000 to $2,000,000",
    "productIds": [],
    "productPathIds": [],
    "criteriaIds": [],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "opm-mastery",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "payability",
    "slug": "payability",
    "name": "Payability",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#payability",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "applicationUrl": "https://payability.tapfiliate.com/p/new/dashboard/",
    "website": "https://payability.com",
    "affiliateUrl": "https://fas.st/t/P7LZc7v7",
    "categories": [
      "Business"
    ],
    "productFamilyIds": [
      "marketplace-capital",
      "working-capital"
    ],
    "financingProducts": [
      "Revenue-Based Financing (RBF)",
      "Working Capital (General)"
    ],
    "industryAppetite": [
      "E-commerce",
      "Amazon Sellers",
      "Walmart Sellers"
    ],
    "restrictedIndustries": [],
    "typicalBorrowerProfile": "At least 3 months of selling history and monthly sales of $10,000.",
    "eligibility": {
      "minCreditScore": null,
      "minMonthlyRevenue": 10000,
      "minTimeInBusinessMonths": 3
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": "At least 3 months of selling history and monthly sales of $10,000."
    },
    "fundingAmountText": "Up to $250,000",
    "contactEmail": "partners@payability",
    "productIds": [
      "payability-instant",
      "payability-advance"
    ],
    "productPathIds": [
      "ecommerce-working-capital"
    ],
    "criteriaIds": [
      "criteria:payability-instant",
      "criteria:payability-advance"
    ],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "payability",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "ramp",
    "slug": "ramp",
    "name": "Ramp",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#ramp",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "applicationUrl": "https://api.fintelconnect.com/t/l/645b368ec92e38001ba614ac",
    "affiliateUrl": "https://api.fintelconnect.com/t/l/645b368ec92e38001ba614ac",
    "categories": [
      "Business",
      "Software"
    ],
    "productFamilyIds": [
      "startup-credit-leverage"
    ],
    "financingProducts": [
      "Business Credit Cards / 0% Stacking"
    ],
    "industryAppetite": [],
    "restrictedIndustries": [],
    "eligibility": {
      "minCreditScore": null,
      "minMonthlyRevenue": null,
      "minTimeInBusinessMonths": null
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": null
    },
    "productIds": [],
    "productPathIds": [],
    "criteriaIds": [],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "ramp",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "rok-financial",
    "slug": "rok-financial",
    "name": "ROK Financial",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#rok-financial",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "applicationUrl": "https://rok.my.site.com/MyPartner/s/",
    "website": "https://www.rok.biz/",
    "affiliateUrl": "https://go.mypartner.io/business-financing/?ref=0014x00000H3JAsAAN",
    "categories": [
      "Personal",
      "Business",
      "Real Estate"
    ],
    "productFamilyIds": [
      "real-estate-capital",
      "structured-growth-loans",
      "working-capital"
    ],
    "financingProducts": [
      "Working Capital (General)",
      "Term Loan"
    ],
    "industryAppetite": [
      "Small Business",
      "Healthcare",
      "Construction"
    ],
    "restrictedIndustries": [],
    "typicalBorrowerProfile": "2+ years in business, $15k/month revenue, 600+ credit score",
    "eligibility": {
      "minCreditScore": null,
      "minMonthlyRevenue": null,
      "minTimeInBusinessMonths": null
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": "2+ years in business, $15k/month revenue, 600+ credit score"
    },
    "fundingAmountText": "$20k-$5M",
    "commissionMetadata": "Varies; typically 1-3%",
    "contactEmail": "ckelleher@rok.biz | Partners@Rok.biz",
    "keyContact": "Christian Kelleher",
    "productIds": [
      "rok-term",
      "rok-bloc",
      "rok-sba",
      "rok-equip",
      "rok-ar",
      "rok-mca",
      "rok-franchise",
      "rok-res-invest",
      "rok-startup",
      "rok-cre"
    ],
    "productPathIds": [
      "business-term-loan",
      "business-line-of-credit",
      "equipment-financing",
      "invoice-factoring",
      "merchant-cash-advance",
      "real-estate-bridge",
      "business-cards-or-loc",
      "commercial-mortgage"
    ],
    "criteriaIds": [
      "criteria:rok-term",
      "criteria:rok-bloc",
      "criteria:rok-sba",
      "criteria:rok-equip",
      "criteria:rok-ar",
      "criteria:rok-mca",
      "criteria:rok-franchise",
      "criteria:rok-res-invest",
      "criteria:rok-startup",
      "criteria:rok-cre"
    ],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "rok-financial",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "sellersfi",
    "slug": "sellersfi",
    "name": "SellersFi",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#sellersfi",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "categories": [
      "Business"
    ],
    "productFamilyIds": [
      "marketplace-capital",
      "working-capital"
    ],
    "financingProducts": [
      "Revenue-Based Financing (RBF)",
      "Working Capital (General)"
    ],
    "industryAppetite": [
      "E-commerce"
    ],
    "restrictedIndustries": [],
    "typicalBorrowerProfile": "E-commerce businesses with significant sales volume, seeking working capital or expansion funding",
    "eligibility": {
      "minCreditScore": null,
      "minMonthlyRevenue": null,
      "minTimeInBusinessMonths": null
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": "E-commerce businesses with significant sales volume, seeking working capital or expansion funding"
    },
    "fundingAmountText": "$10k-$10M",
    "commissionMetadata": "Varies; typically 1-3%",
    "productIds": [
      "sellersfi-wc"
    ],
    "productPathIds": [
      "ecommerce-working-capital"
    ],
    "criteriaIds": [
      "criteria:sellersfi-wc"
    ],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "sellersfi",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "stilt",
    "slug": "stilt",
    "name": "Stilt",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#stilt",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "applicationUrl": "https://fxo.co/IwSM",
    "affiliateUrl": "https://fxo.co/IwSM",
    "categories": [
      "Personal"
    ],
    "productFamilyIds": [],
    "financingProducts": [
      "Embedded Finance (API / White-label)"
    ],
    "industryAppetite": [
      "General Consumers"
    ],
    "restrictedIndustries": [],
    "typicalBorrowerProfile": "Personal loans for immigrants/underserved; cash-flow underwriting.",
    "eligibility": {
      "minCreditScore": null,
      "minMonthlyRevenue": null,
      "minTimeInBusinessMonths": null
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": "Not in eligible state; unwillingness to link bank account; collections or bankruptcies.",
      "requirementsNote": "Personal loans for immigrants/underserved; cash-flow underwriting."
    },
    "fundingAmountText": "Up to $100,000",
    "commissionMetadata": "0.8% on Approved Loan orders.",
    "productIds": [],
    "productPathIds": [],
    "criteriaIds": [],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "stilt",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "subto",
    "slug": "subto",
    "name": "Subto",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#subto",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "website": "https://www.subto.com/",
    "categories": [
      "Real Estate"
    ],
    "productFamilyIds": [
      "real-estate-capital"
    ],
    "financingProducts": [],
    "industryAppetite": [
      "Real Estate"
    ],
    "restrictedIndustries": [],
    "eligibility": {
      "minCreditScore": null,
      "minMonthlyRevenue": null,
      "minTimeInBusinessMonths": null
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": null
    },
    "productIds": [],
    "productPathIds": [],
    "criteriaIds": [],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "subto",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "the-finance-factory",
    "slug": "the-finance-factory",
    "name": "The Finance Factory",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#the-finance-factory",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "applicationUrl": "https://lp.thefinancefactory.com/lp/r/6018",
    "affiliateUrl": "https://lp.thefinancefactory.com/lp/r/6018",
    "categories": [
      "Personal",
      "Business"
    ],
    "productFamilyIds": [
      "business-line-access",
      "equipment-finance",
      "structured-growth-loans",
      "working-capital"
    ],
    "financingProducts": [
      "SBA 7(a)",
      "Term Loan",
      "Working Capital (General)",
      "Revenue-Based Financing (RBF)",
      "Equipment Financing",
      "Line of Credit"
    ],
    "industryAppetite": [
      "Small Business"
    ],
    "restrictedIndustries": [],
    "typicalBorrowerProfile": "600+ FICO, 3+ months in business, $10k+ monthly revenue, no open bankruptcies. Revenue-based option: min 500 FICO, 6+ months in business.",
    "eligibility": {
      "minCreditScore": 600,
      "minMonthlyRevenue": 10000,
      "minTimeInBusinessMonths": 3
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": "600+ FICO, 3+ months in business, $10k+ monthly revenue, no open bankruptcies. Revenue-based option: min 500 FICO, 6+ months in business."
    },
    "fundingAmountText": "up to $5M",
    "productIds": [
      "finfactory-ubf"
    ],
    "productPathIds": [
      "business-cards-or-loc"
    ],
    "criteriaIds": [
      "criteria:finfactory-ubf"
    ],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "the-finance-factory",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "uncapped",
    "slug": "uncapped",
    "name": "Uncapped",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#uncapped",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "applicationUrl": "https://login.weareuncapped.com/login",
    "website": "https://weareuncapped.com",
    "affiliateUrl": "https://portal.weareuncapped.com/registration?referral=moonshinecapital",
    "categories": [
      "Business"
    ],
    "productFamilyIds": [
      "business-line-access",
      "structured-growth-loans",
      "working-capital"
    ],
    "financingProducts": [
      "Working Capital (General)",
      "Line of Credit",
      "Term Loan"
    ],
    "industryAppetite": [],
    "restrictedIndustries": [],
    "eligibility": {
      "minCreditScore": null,
      "minMonthlyRevenue": 100000,
      "minTimeInBusinessMonths": 6
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": null
    },
    "fundingAmountText": "$100,000 to $10,000,000",
    "productIds": [],
    "productPathIds": [],
    "criteriaIds": [],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "uncapped",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "uplyft-capital",
    "slug": "uplyft-capital",
    "name": "Uplyft Capital",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#uplyft-capital",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "applicationUrl": "https://uplyftcapital.com/",
    "website": "https://uplyftcapital.com/",
    "categories": [
      "Business"
    ],
    "productFamilyIds": [
      "structured-growth-loans",
      "working-capital"
    ],
    "financingProducts": [
      "Working Capital (General)",
      "SBA 7(a)"
    ],
    "industryAppetite": [
      "Small Business",
      "Retail",
      "Restaurants"
    ],
    "restrictedIndustries": [],
    "typicalBorrowerProfile": "6+ months in business, $10k/month revenue, 500+ credit score",
    "eligibility": {
      "minCreditScore": null,
      "minMonthlyRevenue": null,
      "minTimeInBusinessMonths": null
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": "6+ months in business, $10k/month revenue, 500+ credit score"
    },
    "fundingAmountText": "$5k-$500k",
    "commissionMetadata": "Varies; typically 2-4%",
    "keyContact": "Contact via partner portal",
    "productIds": [
      "uplyft-mca"
    ],
    "productPathIds": [
      "merchant-cash-advance"
    ],
    "criteriaIds": [
      "criteria:uplyft-mca"
    ],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "uplyft-capital",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "upstart",
    "slug": "upstart",
    "name": "Upstart",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#upstart",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "applicationUrl": "https://upstart.9c65.net/qnKBjj",
    "website": "https://www.upstart.com/",
    "affiliateUrl": "https://upstart.9c65.net/qnKBjj",
    "categories": [
      "Personal"
    ],
    "productFamilyIds": [],
    "financingProducts": [
      "Term Loan",
      "Line of Credit",
      "Business Credit Cards / 0% Stacking",
      "Auto Loan",
      "HELOC / Home Equity"
    ],
    "industryAppetite": [
      "General Consumers"
    ],
    "restrictedIndustries": [],
    "typicalBorrowerProfile": "U.S. resident, age 18+, valid SSN, minimum annual income $12,000.",
    "eligibility": {
      "minCreditScore": 600,
      "minMonthlyRevenue": null,
      "minTimeInBusinessMonths": null
    },
    "requirements": {
      "pgType": "Soft PG",
      "disqualifiers": "Income below $12,000/year; not a U.S. resident; ineligible state; fails underwriting after hard pull.",
      "requirementsNote": "U.S. resident, age 18+, valid SSN, minimum annual income $12,000."
    },
    "fundingAmountText": "$1k-$50k",
    "commissionMetadata": "1.4% of funded loans.",
    "productIds": [],
    "productPathIds": [],
    "criteriaIds": [],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "upstart",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "visio-lending",
    "slug": "visio-lending",
    "name": "Visio Lending",
    "status": "ACTIVE_VERIFIED",
    "visibility": "internal",
    "source": "JFeimster/moonshine-ai-directory/lib/registry/funding-providers.registry.json#visio-lending",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "website": "https://visiolending.com/",
    "categories": [
      "Real Estate"
    ],
    "productFamilyIds": [
      "real-estate-capital"
    ],
    "financingProducts": [
      "DSCR Loan",
      "Commercial Real Estate Loan",
      "Asset-Based Lending (ABL)"
    ],
    "industryAppetite": [
      "Real Estate"
    ],
    "restrictedIndustries": [],
    "eligibility": {
      "minCreditScore": null,
      "minMonthlyRevenue": null,
      "minTimeInBusinessMonths": null
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": null
    },
    "commissionMetadata": "Qualified Lead: $50.00",
    "contactEmail": "mark.gochenour@visiolending.com",
    "keyContact": "Mark Gochenour",
    "productIds": [
      "visio-rental"
    ],
    "productPathIds": [
      "dscr-real-estate"
    ],
    "criteriaIds": [
      "criteria:visio-rental"
    ],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceRepo": "JFeimster/moonshine-ai-directory",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "visio-lending",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "VERIFIED",
      "notes": []
    }
  },
  {
    "id": "blue-bridge-financial",
    "slug": "blue-bridge-financial",
    "name": "Blue Bridge Financial",
    "status": "REVIEW_REQUIRED",
    "visibility": "internal",
    "source": "Registries.zip#funding-providers.registry.json#blue-bridge-financial",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "categories": [
      "Business"
    ],
    "productFamilyIds": [
      "equipment-finance"
    ],
    "financingProducts": [
      "Equipment Finance Agreement"
    ],
    "industryAppetite": [],
    "restrictedIndustries": [],
    "typicalBorrowerProfile": "2+ years in business, 600+ credit score; equipment-secured (asset backed)",
    "eligibility": {
      "minCreditScore": 600,
      "minMonthlyRevenue": null,
      "minTimeInBusinessMonths": 24
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": "Equipment Finance Agreement (asset backed); 600+ FICO, 2+ yrs TIB"
    },
    "productIds": [
      "bluebridge-efa"
    ],
    "productPathIds": [
      "equipment-financing"
    ],
    "criteriaIds": [
      "criteria:bluebridge-efa"
    ],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "blue-bridge-financial",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": [
        "Added from the attached Registries.zip product catalog to support product bluebridge-efa. Corrupted source funding-amount text was intentionally not promoted. Affiliate/contact details remain unverified."
      ]
    }
  },
  {
    "id": "national-business-capital",
    "slug": "national-business-capital",
    "name": "National Business Capital",
    "status": "REVIEW_REQUIRED",
    "visibility": "internal",
    "source": "Registries.zip#funding-providers.registry.json#national-business-capital",
    "lastVerifiedAt": "2026-06-26",
    "geography": [
      "US"
    ],
    "categories": [
      "Business"
    ],
    "productFamilyIds": [
      "structured-growth-loans"
    ],
    "financingProducts": [
      "Small Business Loans (Term Loan)"
    ],
    "industryAppetite": [],
    "restrictedIndustries": [],
    "typicalBorrowerProfile": "1+ year in business, $10k/month revenue, 600+ credit score",
    "eligibility": {
      "minCreditScore": 600,
      "minMonthlyRevenue": 10000,
      "minTimeInBusinessMonths": 12
    },
    "requirements": {
      "pgType": null,
      "disqualifiers": null,
      "requirementsNote": "Term loan; 600+ FICO, 1+ yr TIB, $10k/mo revenue"
    },
    "fundingAmountText": "$25,000 - $5,000,000",
    "productIds": [
      "nbc-term"
    ],
    "productPathIds": [
      "business-term-loan"
    ],
    "criteriaIds": [
      "criteria:nbc-term"
    ],
    "provenance": {
      "sourceType": "REGISTRY_IMPORT",
      "sourceFile": "funding-providers.registry.json",
      "sourceRecordId": "national-business-capital",
      "generatedFrom": [
        "Registries.zip"
      ],
      "importedAt": "2026-09-24",
      "verifiedAt": "2026-06-26",
      "verificationStatus": "IMPORTED",
      "notes": [
        "Added from the attached Registries.zip product catalog to support product nbc-term. Affiliate/contact details remain unverified."
      ]
    }
  }
];

export const GENERATED_PROVIDER_CRITERIA: ProviderCriteriaRecord[] = [
  {
    "id": "criteria:7figs-stacking",
    "providerId": "7-figures-funding",
    "productId": "7figs-stacking",
    "productName": "Startup Funding: 0% Business Credit Card Stacking",
    "productPathId": "business-cards-or-loc",
    "source": "funding-products.registry.json#7figs-stacking",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 680,
      "minMonthlyRevenue": 0,
      "minTimeInBusinessMonths": 0,
      "startupEligible": true,
      "minAmount": 10000,
      "maxAmount": 150000,
      "creditTier": "Good",
      "termLength": "Revolving (0% 6-20 mos)",
      "paymentType": "Monthly",
      "rateCostRange": "0% Intro / 15.99%+ After",
      "timeToFunding": "2 - 3 Weeks"
    }
  },
  {
    "id": "criteria:7figs-personal-startup",
    "providerId": "7-figures-funding",
    "productId": "7figs-personal-startup",
    "productName": "Startup Funding: Personal Term Loans",
    "productPathId": "business-cards-or-loc",
    "source": "funding-products.registry.json#7figs-personal-startup",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 680,
      "minMonthlyRevenue": 50000,
      "minTimeInBusinessMonths": 0,
      "startupEligible": true,
      "minAmount": 20000,
      "maxAmount": 250000,
      "creditTier": "Good",
      "termLength": "5 Years",
      "paymentType": "Monthly",
      "rateCostRange": "From 5.99%",
      "timeToFunding": "3 - 10 Days"
    }
  },
  {
    "id": "criteria:7figs-bloc",
    "providerId": "7-figures-funding",
    "productId": "7figs-bloc",
    "productName": "Business Line of Credit",
    "productPathId": "business-line-of-credit",
    "source": "funding-products.registry.json#7figs-bloc",
    "verifiedAt": "2026-06-26",
    "confidence": "VERIFIED",
    "criteria": {
      "minCreditScore": 600,
      "minMonthlyRevenue": 15000,
      "minTimeInBusinessMonths": 12,
      "startupEligible": false,
      "minAmount": 5000,
      "maxAmount": 500000,
      "creditTier": "Fair",
      "termLength": "1 - 3 Years",
      "paymentType": "Weekly/Monthly",
      "rateCostRange": "As low as 8%",
      "timeToFunding": "3 Days"
    }
  },
  {
    "id": "criteria:7figs-mca",
    "providerId": "7-figures-funding",
    "productId": "7figs-mca",
    "productName": "Short Term Business Loan (MCA)",
    "productPathId": "merchant-cash-advance",
    "source": "funding-products.registry.json#7figs-mca",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 500,
      "minMonthlyRevenue": 10000,
      "minTimeInBusinessMonths": 6,
      "startupEligible": false,
      "minAmount": 5000,
      "maxAmount": 500000,
      "creditTier": "Subprime",
      "termLength": "6 - 24 Months",
      "paymentType": "Daily/Weekly",
      "rateCostRange": "1.20 Factor Rate",
      "timeToFunding": "24 Hours"
    }
  },
  {
    "id": "criteria:7figs-equip",
    "providerId": "7-figures-funding",
    "productId": "7figs-equip",
    "productName": "Equipment Funding",
    "productPathId": "equipment-financing",
    "source": "funding-products.registry.json#7figs-equip",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 600,
      "startupEligible": false,
      "minAmount": 10000,
      "maxAmount": 50000000,
      "creditTier": "Fair",
      "termLength": "Up to 5 Years",
      "paymentType": "Monthly",
      "rateCostRange": "As low as 7.99%",
      "timeToFunding": "1 - 3 Weeks"
    }
  },
  {
    "id": "criteria:7figs-cre",
    "providerId": "7-figures-funding",
    "productId": "7figs-cre",
    "productName": "Commercial Real Estate",
    "productPathId": "commercial-mortgage",
    "source": "funding-products.registry.json#7figs-cre",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 650,
      "startupEligible": false,
      "minAmount": 100000,
      "maxAmount": 100000000,
      "creditTier": "Fair",
      "termLength": "Up to 30 Years",
      "paymentType": "Monthly",
      "rateCostRange": "As low as 4%",
      "timeToFunding": "1 - 3 Months"
    }
  },
  {
    "id": "criteria:7figs-sba",
    "providerId": "7-figures-funding",
    "productId": "7figs-sba",
    "productName": "SBA Loans",
    "productPathId": "business-term-loan",
    "source": "funding-products.registry.json#7figs-sba",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 680,
      "minTimeInBusinessMonths": 24,
      "startupEligible": false,
      "minAmount": 20000,
      "maxAmount": 5000000,
      "creditTier": "Good",
      "termLength": "10 - 25 Years",
      "paymentType": "Monthly",
      "rateCostRange": "Prime + 3.75%",
      "timeToFunding": "1 - 3 Months"
    }
  },
  {
    "id": "criteria:7figs-personal-term",
    "providerId": "7-figures-funding",
    "productId": "7figs-personal-term",
    "productName": "Personal Term Loans",
    "productPathId": "unmapped",
    "source": "funding-products.registry.json#7figs-personal-term",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 680,
      "startupEligible": false,
      "minAmount": 5000,
      "maxAmount": 500000,
      "creditTier": "Good",
      "termLength": "1 - 12 Years",
      "paymentType": "Monthly",
      "rateCostRange": "5.99% - 36% APR",
      "timeToFunding": "24 - 48 Hours"
    }
  },
  {
    "id": "criteria:7figs-personal-loc",
    "providerId": "7-figures-funding",
    "productId": "7figs-personal-loc",
    "productName": "Personal Line of Credit",
    "productPathId": "business-cards-or-loc",
    "source": "funding-products.registry.json#7figs-personal-loc",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 680,
      "startupEligible": false,
      "minAmount": 5000,
      "maxAmount": 250000,
      "creditTier": "Good",
      "termLength": "Revolving",
      "paymentType": "Revolving",
      "rateCostRange": "From 6.99%",
      "timeToFunding": "3 - 5 Days"
    }
  },
  {
    "id": "criteria:7figs-debt-consol",
    "providerId": "7-figures-funding",
    "productId": "7figs-debt-consol",
    "productName": "Debt Consolidation Loan",
    "productPathId": "debt-refinance",
    "source": "funding-products.registry.json#7figs-debt-consol",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 660,
      "startupEligible": false,
      "minAmount": 5000,
      "maxAmount": 500000,
      "creditTier": "Fair",
      "termLength": "1 - 12 Years",
      "paymentType": "Monthly",
      "rateCostRange": "5.99% - 36% APR",
      "timeToFunding": "24 - 48 Hours"
    }
  },
  {
    "id": "criteria:7figs-heloc",
    "providerId": "7-figures-funding",
    "productId": "7figs-heloc",
    "productName": "Home Equity Loan",
    "productPathId": "commercial-mortgage",
    "source": "funding-products.registry.json#7figs-heloc",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 680,
      "startupEligible": false,
      "minAmount": 20000,
      "maxAmount": 1000000,
      "creditTier": "Good",
      "termLength": "Up to 30 Years",
      "paymentType": "Monthly",
      "rateCostRange": "Variable Market Rate",
      "timeToFunding": "2 - 4 Weeks"
    }
  },
  {
    "id": "criteria:7figs-personal-cards",
    "providerId": "7-figures-funding",
    "productId": "7figs-personal-cards",
    "productName": "Low-Interest Personal Cards",
    "productPathId": "business-cards-or-loc",
    "source": "funding-products.registry.json#7figs-personal-cards",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 680,
      "startupEligible": false,
      "minAmount": 500,
      "maxAmount": 50000,
      "creditTier": "Good",
      "termLength": "Revolving",
      "paymentType": "Revolving",
      "rateCostRange": "Variable APR",
      "timeToFunding": "1 - 2 Weeks"
    }
  },
  {
    "id": "criteria:dac-corerate",
    "providerId": "bank-breezy",
    "productId": "dac-corerate",
    "productName": "BankBreezy CoreRate Funding",
    "productPathId": "revenue-based-financing",
    "source": "funding-products.registry.json#dac-corerate",
    "verifiedAt": "2026-06-26",
    "confidence": "VERIFIED",
    "criteria": {
      "minCreditScore": 680,
      "minMonthlyRevenue": 15000,
      "minTimeInBusinessMonths": 24,
      "startupEligible": false,
      "minAmount": 5000,
      "maxAmount": 2000000,
      "creditTier": "Good",
      "termLength": "6 - 24 Months",
      "paymentType": "Daily/Weekly",
      "rateCostRange": "1.15x - 1.25x Factor",
      "timeToFunding": "1 - 3 Days"
    }
  },
  {
    "id": "criteria:dac-flexrate",
    "providerId": "bank-breezy",
    "productId": "dac-flexrate",
    "productName": "BankBreezy FlexRate Funding",
    "productPathId": "revenue-based-financing",
    "source": "funding-products.registry.json#dac-flexrate",
    "verifiedAt": "2026-06-26",
    "confidence": "VERIFIED",
    "criteria": {
      "minCreditScore": 550,
      "minMonthlyRevenue": 15000,
      "minTimeInBusinessMonths": 6,
      "startupEligible": false,
      "minAmount": 5000,
      "maxAmount": 2000000,
      "creditTier": "Subprime",
      "termLength": "4 - 24 Months",
      "paymentType": "Daily/Weekly",
      "rateCostRange": "1.26x - 1.50x Factor",
      "timeToFunding": "1 - 3 Days"
    }
  },
  {
    "id": "criteria:dac-giggle",
    "providerId": "bank-breezy",
    "productId": "dac-giggle",
    "productName": "Giggle Instant Approval",
    "productPathId": "revenue-based-financing",
    "source": "funding-products.registry.json#dac-giggle",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minMonthlyRevenue": 3000,
      "minTimeInBusinessMonths": 4,
      "startupEligible": false,
      "minAmount": 500,
      "maxAmount": 10000,
      "creditTier": "Subprime",
      "termLength": "3 - 6 Months",
      "paymentType": "Weekly",
      "rateCostRange": "1.29x - 1.69x Factor",
      "timeToFunding": "Instant"
    }
  },
  {
    "id": "criteria:dac-loc",
    "providerId": "bank-breezy",
    "productId": "dac-loc",
    "productName": "DAC Line of Credit",
    "productPathId": "business-line-of-credit",
    "source": "funding-products.registry.json#dac-loc",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 680,
      "minMonthlyRevenue": 20000,
      "minTimeInBusinessMonths": 24,
      "startupEligible": false,
      "minAmount": 6000,
      "maxAmount": 150000,
      "creditTier": "Good",
      "termLength": "6 - 12 Months",
      "paymentType": "Weekly",
      "rateCostRange": ".69% - 1.39% Weekly Fee",
      "timeToFunding": "24 Hours"
    }
  },
  {
    "id": "criteria:dac-canada",
    "providerId": "bank-breezy",
    "productId": "dac-canada",
    "productName": "Canada Funding",
    "productPathId": "revenue-based-financing",
    "source": "funding-products.registry.json#dac-canada",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 550,
      "minMonthlyRevenue": 10000,
      "minTimeInBusinessMonths": 6,
      "startupEligible": false,
      "minAmount": 5000,
      "maxAmount": 500000,
      "creditTier": "Subprime",
      "termLength": "3 - 12 Months",
      "paymentType": "Daily/Weekly",
      "rateCostRange": "1.27x - 1.49x Factor",
      "timeToFunding": "1 - 3 Days"
    }
  },
  {
    "id": "criteria:gokap-mca",
    "providerId": "gokapital",
    "productId": "gokap-mca",
    "productName": "Merchant Cash Advance",
    "productPathId": "merchant-cash-advance",
    "source": "funding-products.registry.json#gokap-mca",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 0,
      "minMonthlyRevenue": 20000,
      "minTimeInBusinessMonths": 3,
      "startupEligible": false,
      "minAmount": 20000,
      "maxAmount": 5000000,
      "creditTier": "Subprime",
      "termLength": "3 - 18 Months",
      "paymentType": "Daily/Weekly",
      "rateCostRange": "Factor Rate 1.20 - 1.49",
      "timeToFunding": "24 Hours"
    }
  },
  {
    "id": "criteria:gokap-loc",
    "providerId": "gokapital",
    "productId": "gokap-loc",
    "productName": "Business Line of Credit",
    "productPathId": "business-line-of-credit",
    "source": "funding-products.registry.json#gokap-loc",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 600,
      "minMonthlyRevenue": 15000,
      "minTimeInBusinessMonths": 12,
      "startupEligible": false,
      "minAmount": 5000,
      "maxAmount": 55000,
      "creditTier": "Fair",
      "termLength": "Revolving",
      "paymentType": "Revolving",
      "rateCostRange": "Interest on Funds Used",
      "timeToFunding": "24 Hours"
    }
  },
  {
    "id": "criteria:gokap-startup",
    "providerId": "gokapital",
    "productId": "gokap-startup",
    "productName": "Personal/Start-up Loan",
    "productPathId": "unmapped",
    "source": "funding-products.registry.json#gokap-startup",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 680,
      "minMonthlyRevenue": 30000,
      "minTimeInBusinessMonths": 0,
      "startupEligible": true,
      "minAmount": 20000,
      "maxAmount": 500000,
      "creditTier": "Good",
      "termLength": "1 - 5 Years",
      "paymentType": "Monthly",
      "rateCostRange": "6% - 18%",
      "timeToFunding": "5 - 7 Days"
    }
  },
  {
    "id": "criteria:gokap-sbl",
    "providerId": "gokapital",
    "productId": "gokap-sbl",
    "productName": "Small Business Loans",
    "productPathId": "business-term-loan",
    "source": "funding-products.registry.json#gokap-sbl",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "startupEligible": false,
      "minAmount": 20000,
      "maxAmount": 5000000,
      "creditTier": "Fair",
      "termLength": "Varies",
      "paymentType": "Monthly",
      "rateCostRange": "Varies",
      "timeToFunding": "24 Hours"
    }
  },
  {
    "id": "criteria:gokap-equip",
    "providerId": "gokapital",
    "productId": "gokap-equip",
    "productName": "Equipment Financing",
    "productPathId": "equipment-financing",
    "source": "funding-products.registry.json#gokap-equip",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 580,
      "minTimeInBusinessMonths": 12,
      "startupEligible": false,
      "minAmount": 20000,
      "maxAmount": 50000000,
      "creditTier": "Subprime",
      "termLength": "1 - 5 Years",
      "paymentType": "Monthly",
      "rateCostRange": "6% - 35%",
      "timeToFunding": "Quick Approval"
    }
  },
  {
    "id": "criteria:gokap-term",
    "providerId": "gokapital",
    "productId": "gokap-term",
    "productName": "Unsecured Business Term Loans",
    "productPathId": "business-term-loan",
    "source": "funding-products.registry.json#gokap-term",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "startupEligible": false,
      "minAmount": 20000,
      "maxAmount": 500000,
      "creditTier": "Good",
      "termLength": "Up to 5 Years",
      "paymentType": "Monthly",
      "rateCostRange": "Simple Interest",
      "timeToFunding": "1 - 2 Weeks"
    }
  },
  {
    "id": "criteria:gokap-sba",
    "providerId": "gokapital",
    "productId": "gokap-sba",
    "productName": "SBA 7(a) Loans",
    "productPathId": "business-term-loan",
    "source": "funding-products.registry.json#gokap-sba",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 680,
      "minTimeInBusinessMonths": 24,
      "startupEligible": false,
      "minAmount": 30000,
      "maxAmount": 5000000,
      "creditTier": "Good",
      "termLength": "10 - 25 Years",
      "paymentType": "Monthly",
      "rateCostRange": "Prime + 2.75% - 4.75%",
      "timeToFunding": "1 - 3 Months"
    }
  },
  {
    "id": "criteria:gokap-consumer",
    "providerId": "gokapital",
    "productId": "gokap-consumer",
    "productName": "Consumer Financing",
    "productPathId": "working-capital",
    "source": "funding-products.registry.json#gokap-consumer",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minTimeInBusinessMonths": 12,
      "startupEligible": false,
      "termLength": "Varies",
      "rateCostRange": "Varies",
      "timeToFunding": "Instant"
    }
  },
  {
    "id": "criteria:gokap-hardmoney",
    "providerId": "gokapital",
    "productId": "gokap-hardmoney",
    "productName": "Hard Money Bridge Loans",
    "productPathId": "real-estate-bridge",
    "source": "funding-products.registry.json#gokap-hardmoney",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "startupEligible": false,
      "minAmount": 100000,
      "maxAmount": 50000000,
      "creditTier": "Fair",
      "termLength": "1 - 2 Years",
      "paymentType": "Interest Only",
      "rateCostRange": "7% - 14%",
      "timeToFunding": "2 - 4 Weeks"
    }
  },
  {
    "id": "criteria:gokap-cre",
    "providerId": "gokapital",
    "productId": "gokap-cre",
    "productName": "Commercial Mortgages",
    "productPathId": "commercial-mortgage",
    "source": "funding-products.registry.json#gokap-cre",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "startupEligible": false,
      "minAmount": 100000,
      "maxAmount": 50000000,
      "creditTier": "Fair",
      "termLength": "1 - 30 Years",
      "paymentType": "Monthly",
      "rateCostRange": "7% - 14%",
      "timeToFunding": "2 - 4 Weeks"
    }
  },
  {
    "id": "criteria:gokap-rental",
    "providerId": "gokapital",
    "productId": "gokap-rental",
    "productName": "Rental Investment",
    "productPathId": "dscr-real-estate",
    "source": "funding-products.registry.json#gokap-rental",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 660,
      "startupEligible": false,
      "minAmount": 150000,
      "maxAmount": 50000000,
      "creditTier": "Good",
      "termLength": "Up to 30 Years",
      "paymentType": "Monthly",
      "rateCostRange": "5.9% - 7.9%",
      "timeToFunding": "Varies"
    }
  },
  {
    "id": "criteria:gokap-foreign",
    "providerId": "gokapital",
    "productId": "gokap-foreign",
    "productName": "Foreign National Loans",
    "productPathId": "commercial-mortgage",
    "source": "funding-products.registry.json#gokap-foreign",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "startupEligible": false,
      "minAmount": 150000,
      "maxAmount": 50000000,
      "termLength": "Varies",
      "paymentType": "Monthly",
      "rateCostRange": "6% - 14%",
      "timeToFunding": "Varies"
    }
  },
  {
    "id": "criteria:gokap-cannabis",
    "providerId": "gokapital",
    "productId": "gokap-cannabis",
    "productName": "Cannabis Business Loans",
    "productPathId": "business-term-loan",
    "source": "funding-products.registry.json#gokap-cannabis",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 600,
      "minMonthlyRevenue": 20000,
      "minTimeInBusinessMonths": 12,
      "startupEligible": false,
      "minAmount": 50000,
      "maxAmount": 5000000,
      "creditTier": "Fair",
      "termLength": "Varies",
      "paymentType": "Monthly",
      "rateCostRange": "Varies",
      "timeToFunding": "1 - 2 Weeks"
    }
  },
  {
    "id": "criteria:gokap-truck",
    "providerId": "gokapital",
    "productId": "gokap-truck",
    "productName": "Commercial Truck Financing",
    "productPathId": "equipment-financing",
    "source": "funding-products.registry.json#gokap-truck",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 600,
      "startupEligible": false,
      "minAmount": 20000,
      "maxAmount": 5000000,
      "creditTier": "Fair",
      "termLength": "1 - 5 Years",
      "paymentType": "Monthly",
      "rateCostRange": "Varies",
      "timeToFunding": "1 - 3 Days"
    }
  },
  {
    "id": "criteria:rok-term",
    "providerId": "rok-financial",
    "productId": "rok-term",
    "productName": "Small Business Loans",
    "productPathId": "business-term-loan",
    "source": "funding-products.registry.json#rok-term",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 600,
      "minMonthlyRevenue": 15000,
      "minTimeInBusinessMonths": 24,
      "startupEligible": false,
      "minAmount": 20000,
      "maxAmount": 5000000,
      "creditTier": "Fair",
      "termLength": "6 mos - 10 Years",
      "paymentType": "Monthly",
      "rateCostRange": "Varies",
      "timeToFunding": "1 - 3 Days"
    }
  },
  {
    "id": "criteria:rok-bloc",
    "providerId": "rok-financial",
    "productId": "rok-bloc",
    "productName": "Business Line of Credit",
    "productPathId": "business-line-of-credit",
    "source": "funding-products.registry.json#rok-bloc",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 600,
      "minMonthlyRevenue": 15000,
      "minTimeInBusinessMonths": 12,
      "startupEligible": false,
      "minAmount": 10000,
      "maxAmount": 500000,
      "creditTier": "Fair",
      "termLength": "Revolving",
      "paymentType": "Revolving",
      "rateCostRange": "Varies",
      "timeToFunding": "1 - 3 Days"
    }
  },
  {
    "id": "criteria:rok-sba",
    "providerId": "rok-financial",
    "productId": "rok-sba",
    "productName": "SBA Loans",
    "productPathId": "business-term-loan",
    "source": "funding-products.registry.json#rok-sba",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 680,
      "minTimeInBusinessMonths": 24,
      "startupEligible": false,
      "minAmount": 50000,
      "maxAmount": 5000000,
      "creditTier": "Good",
      "termLength": "10 - 25 Years",
      "paymentType": "Monthly",
      "rateCostRange": "Prime Based",
      "timeToFunding": "1 - 3 Months"
    }
  },
  {
    "id": "criteria:rok-equip",
    "providerId": "rok-financial",
    "productId": "rok-equip",
    "productName": "Equipment Financing",
    "productPathId": "equipment-financing",
    "source": "funding-products.registry.json#rok-equip",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 600,
      "minMonthlyRevenue": 15000,
      "startupEligible": false,
      "minAmount": 20000,
      "maxAmount": 5000000,
      "creditTier": "Fair",
      "termLength": "1 - 5 Years",
      "paymentType": "Monthly",
      "rateCostRange": "Varies",
      "timeToFunding": "1 - 3 Days"
    }
  },
  {
    "id": "criteria:rok-ar",
    "providerId": "rok-financial",
    "productId": "rok-ar",
    "productName": "Accounts Receivable Financing",
    "productPathId": "invoice-factoring",
    "source": "funding-products.registry.json#rok-ar",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 600,
      "minMonthlyRevenue": 15000,
      "startupEligible": false,
      "minAmount": 20000,
      "maxAmount": 5000000,
      "creditTier": "Fair",
      "termLength": "Revolving",
      "paymentType": "Revolving",
      "rateCostRange": "Factor Rate",
      "timeToFunding": "1 - 3 Days"
    }
  },
  {
    "id": "criteria:rok-mca",
    "providerId": "rok-financial",
    "productId": "rok-mca",
    "productName": "Merchant Cash Advance / Working Capital",
    "productPathId": "merchant-cash-advance",
    "source": "funding-products.registry.json#rok-mca",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 500,
      "minMonthlyRevenue": 15000,
      "minTimeInBusinessMonths": 6,
      "startupEligible": false,
      "minAmount": 20000,
      "maxAmount": 2000000,
      "creditTier": "Subprime",
      "termLength": "3 - 18 Months",
      "paymentType": "Daily/Weekly",
      "rateCostRange": "Factor Rate",
      "timeToFunding": "24 Hours"
    }
  },
  {
    "id": "criteria:rok-franchise",
    "providerId": "rok-financial",
    "productId": "rok-franchise",
    "productName": "Franchise Financing",
    "productPathId": "unmapped",
    "source": "funding-products.registry.json#rok-franchise",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 680,
      "startupEligible": false,
      "minAmount": 50000,
      "maxAmount": 5000000,
      "creditTier": "Good",
      "termLength": "Varies",
      "paymentType": "Monthly",
      "rateCostRange": "Varies",
      "timeToFunding": "2 - 4 Weeks"
    }
  },
  {
    "id": "criteria:rok-res-invest",
    "providerId": "rok-financial",
    "productId": "rok-res-invest",
    "productName": "Residential Investment Loans",
    "productPathId": "real-estate-bridge",
    "source": "funding-products.registry.json#rok-res-invest",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 650,
      "startupEligible": false,
      "minAmount": 100000,
      "maxAmount": 5000000,
      "creditTier": "Fair",
      "termLength": "12 - 24 Months",
      "paymentType": "Interest Only",
      "rateCostRange": "Varies",
      "timeToFunding": "2 - 4 Weeks"
    }
  },
  {
    "id": "criteria:rok-startup",
    "providerId": "rok-financial",
    "productId": "rok-startup",
    "productName": "Startup Funding",
    "productPathId": "business-cards-or-loc",
    "source": "funding-products.registry.json#rok-startup",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 680,
      "minMonthlyRevenue": 0,
      "minTimeInBusinessMonths": 0,
      "startupEligible": true,
      "minAmount": 10000,
      "maxAmount": 150000,
      "creditTier": "Good",
      "termLength": "Revolving",
      "paymentType": "Monthly",
      "rateCostRange": "0% Intro / Varies",
      "timeToFunding": "2 - 3 Weeks"
    }
  },
  {
    "id": "criteria:rok-cre",
    "providerId": "rok-financial",
    "productId": "rok-cre",
    "productName": "Commercial Real Estate Financing",
    "productPathId": "commercial-mortgage",
    "source": "funding-products.registry.json#rok-cre",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 660,
      "startupEligible": false,
      "minAmount": 100000,
      "maxAmount": 50000000,
      "creditTier": "Fair",
      "termLength": "Varies",
      "paymentType": "Monthly",
      "rateCostRange": "Varies",
      "timeToFunding": "1 - 3 Months"
    }
  },
  {
    "id": "criteria:8fig-growth",
    "providerId": "8fig",
    "productId": "8fig-growth",
    "productName": "Growth Plan",
    "productPathId": "ecommerce-working-capital",
    "source": "funding-products.registry.json#8fig-growth",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minMonthlyRevenue": 8500,
      "minTimeInBusinessMonths": 6,
      "startupEligible": false,
      "minAmount": 10000,
      "maxAmount": 500000,
      "creditTier": "Fair",
      "termLength": "Supply Chain Aligned",
      "paymentType": "Scheduled Remittance",
      "rateCostRange": "Fixed Fee 6% - 10%",
      "timeToFunding": "24 - 48 Hours"
    }
  },
  {
    "id": "criteria:onramp-growth",
    "providerId": "onramp",
    "productId": "onramp-growth",
    "productName": "E-commerce Growth Capital",
    "productPathId": "ecommerce-working-capital",
    "source": "funding-products.registry.json#onramp-growth",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minMonthlyRevenue": 3000,
      "startupEligible": false,
      "minAmount": 5000,
      "maxAmount": 2000000,
      "creditTier": "Fair",
      "termLength": "Varies",
      "paymentType": "Revenue Share",
      "rateCostRange": "1% - 3% Fee",
      "timeToFunding": "Instant"
    }
  },
  {
    "id": "criteria:payability-instant",
    "providerId": "payability",
    "productId": "payability-instant",
    "productName": "Instant Access (Daily Payouts)",
    "productPathId": "ecommerce-working-capital",
    "source": "funding-products.registry.json#payability-instant",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minMonthlyRevenue": 2000,
      "minTimeInBusinessMonths": 3,
      "startupEligible": false,
      "minAmount": 1000,
      "creditTier": "Fair",
      "termLength": "Daily",
      "paymentType": "Daily Deduction",
      "rateCostRange": "2% Flat Fee (Gross)",
      "timeToFunding": "24 Hours"
    }
  },
  {
    "id": "criteria:payability-advance",
    "providerId": "payability",
    "productId": "payability-advance",
    "productName": "Instant Advance",
    "productPathId": "ecommerce-working-capital",
    "source": "funding-products.registry.json#payability-advance",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minMonthlyRevenue": 10000,
      "minTimeInBusinessMonths": 9,
      "startupEligible": false,
      "minAmount": 5000,
      "maxAmount": 250000,
      "creditTier": "Fair",
      "termLength": "Weekly",
      "paymentType": "Weekly",
      "rateCostRange": "Varies",
      "timeToFunding": "24 Hours"
    }
  },
  {
    "id": "criteria:fundgrow-stacking",
    "providerId": "fundandgrow",
    "productId": "fundgrow-stacking",
    "productName": "Business Credit Stacking",
    "productPathId": "business-cards-or-loc",
    "source": "funding-products.registry.json#fundgrow-stacking",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 700,
      "minMonthlyRevenue": 0,
      "minTimeInBusinessMonths": 0,
      "startupEligible": true,
      "minAmount": 10000,
      "maxAmount": 250000,
      "creditTier": "Good",
      "termLength": "Revolving (0% 6-12mo)",
      "paymentType": "Revolving",
      "rateCostRange": "0% Intro Rate",
      "timeToFunding": "2 - 4 Weeks"
    }
  },
  {
    "id": "criteria:creditsuite-builder",
    "providerId": "credit-suite",
    "productId": "creditsuite-builder",
    "productName": "Business Credit Builder",
    "productPathId": "business-credit-building",
    "source": "funding-products.registry.json#creditsuite-builder",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 0,
      "minMonthlyRevenue": 0,
      "minTimeInBusinessMonths": 0,
      "startupEligible": true,
      "rateCostRange": "Consulting Fee"
    }
  },
  {
    "id": "criteria:bluebridge-efa",
    "providerId": "blue-bridge-financial",
    "productId": "bluebridge-efa",
    "productName": "Equipment Finance Agreement",
    "productPathId": "equipment-financing",
    "source": "funding-products.registry.json#bluebridge-efa",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 600,
      "minTimeInBusinessMonths": 24,
      "startupEligible": false,
      "minAmount": 10000,
      "maxAmount": 500000,
      "creditTier": "Fair",
      "termLength": "1 - 5 Years",
      "paymentType": "Monthly",
      "rateCostRange": "Varies",
      "timeToFunding": "1 - 3 Days"
    }
  },
  {
    "id": "criteria:nbc-term",
    "providerId": "national-business-capital",
    "productId": "nbc-term",
    "productName": "Small Business Loans",
    "productPathId": "business-term-loan",
    "source": "funding-products.registry.json#nbc-term",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 600,
      "minMonthlyRevenue": 10000,
      "minTimeInBusinessMonths": 12,
      "startupEligible": false,
      "minAmount": 25000,
      "maxAmount": 5000000,
      "creditTier": "Fair",
      "termLength": "6 mos - 10 Years",
      "paymentType": "Monthly",
      "rateCostRange": "Varies",
      "timeToFunding": "24 Hours"
    }
  },
  {
    "id": "criteria:sellersfi-wc",
    "providerId": "sellersfi",
    "productId": "sellersfi-wc",
    "productName": "Working Capital",
    "productPathId": "ecommerce-working-capital",
    "source": "funding-products.registry.json#sellersfi-wc",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 600,
      "minMonthlyRevenue": 20000,
      "minTimeInBusinessMonths": 6,
      "startupEligible": false,
      "minAmount": 10000,
      "maxAmount": 10000000,
      "creditTier": "Fair",
      "termLength": "3 - 24 Months",
      "paymentType": "Bi-Weekly/Monthly",
      "rateCostRange": "Varies",
      "timeToFunding": "24 - 48 Hours"
    }
  },
  {
    "id": "criteria:guidant-robs",
    "providerId": "guidant",
    "productId": "guidant-robs",
    "productName": "401(k) Rollover (ROBS)",
    "productPathId": "unmapped",
    "source": "funding-products.registry.json#guidant-robs",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 0,
      "minMonthlyRevenue": 0,
      "minTimeInBusinessMonths": 0,
      "startupEligible": true,
      "minAmount": 50000,
      "maxAmount": 5000000,
      "rateCostRange": "Setup Fee + Monthly Admin",
      "timeToFunding": "3 - 4 Weeks"
    }
  },
  {
    "id": "criteria:finfactory-ubf",
    "providerId": "the-finance-factory",
    "productId": "finfactory-ubf",
    "productName": "Unsecured Business Finance",
    "productPathId": "business-cards-or-loc",
    "source": "funding-products.registry.json#finfactory-ubf",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 700,
      "minMonthlyRevenue": 0,
      "minTimeInBusinessMonths": 0,
      "startupEligible": true,
      "minAmount": 25000,
      "maxAmount": 500000,
      "creditTier": "Good",
      "termLength": "Revolving / 5-7 Years",
      "paymentType": "Monthly",
      "rateCostRange": "0% Intro / 6% - 15%",
      "timeToFunding": "10 - 14 Days"
    }
  },
  {
    "id": "criteria:fora-sbl",
    "providerId": "fora-financial",
    "productId": "fora-sbl",
    "productName": "Small Business Loan",
    "productPathId": "business-term-loan",
    "source": "funding-products.registry.json#fora-sbl",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 500,
      "minMonthlyRevenue": 12000,
      "minTimeInBusinessMonths": 6,
      "startupEligible": false,
      "minAmount": 5000,
      "maxAmount": 500000,
      "creditTier": "Subprime",
      "termLength": "6 - 15 Months",
      "paymentType": "Daily/Weekly",
      "rateCostRange": "Factor Rate",
      "timeToFunding": "24 - 72 Hours"
    }
  },
  {
    "id": "criteria:fora-advance",
    "providerId": "fora-financial",
    "productId": "fora-advance",
    "productName": "Revenue Advance",
    "productPathId": "revenue-based-financing",
    "source": "funding-products.registry.json#fora-advance",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 500,
      "minMonthlyRevenue": 12000,
      "minTimeInBusinessMonths": 6,
      "startupEligible": false,
      "minAmount": 5000,
      "maxAmount": 500000,
      "creditTier": "Subprime",
      "termLength": "Varies",
      "paymentType": "Daily/Weekly",
      "rateCostRange": "Factor Rate",
      "timeToFunding": "24 Hours"
    }
  },
  {
    "id": "criteria:credibly-wc",
    "providerId": "credibly",
    "productId": "credibly-wc",
    "productName": "Working Capital Loan",
    "productPathId": "business-term-loan",
    "source": "funding-products.registry.json#credibly-wc",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 500,
      "minMonthlyRevenue": 15000,
      "minTimeInBusinessMonths": 6,
      "startupEligible": false,
      "minAmount": 5000,
      "maxAmount": 600000,
      "creditTier": "Subprime",
      "termLength": "6 - 24 Months",
      "paymentType": "Daily/Weekly",
      "rateCostRange": "Factor Rate 1.11+",
      "timeToFunding": "24 Hours"
    }
  },
  {
    "id": "criteria:credibly-ex",
    "providerId": "credibly",
    "productId": "credibly-ex",
    "productName": "Business Expansion Loan",
    "productPathId": "business-term-loan",
    "source": "funding-products.registry.json#credibly-ex",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 600,
      "minMonthlyRevenue": 15000,
      "minTimeInBusinessMonths": 6,
      "startupEligible": false,
      "minAmount": 5000,
      "maxAmount": 600000,
      "creditTier": "Fair",
      "termLength": "18 - 24 Months",
      "paymentType": "Weekly",
      "rateCostRange": "Simple Interest",
      "timeToFunding": "3 - 5 Days"
    }
  },
  {
    "id": "criteria:uplyft-mca",
    "providerId": "uplyft-capital",
    "productId": "uplyft-mca",
    "productName": "Merchant Cash Advance",
    "productPathId": "merchant-cash-advance",
    "source": "funding-products.registry.json#uplyft-mca",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 500,
      "minMonthlyRevenue": 10000,
      "minTimeInBusinessMonths": 6,
      "startupEligible": false,
      "minAmount": 5000,
      "maxAmount": 500000,
      "creditTier": "Subprime",
      "termLength": "3 - 12 Months",
      "paymentType": "Daily",
      "rateCostRange": "Factor Rate",
      "timeToFunding": "24 Hours"
    }
  },
  {
    "id": "criteria:visio-rental",
    "providerId": "visio-lending",
    "productId": "visio-rental",
    "productName": "Rental Loans (DSCR)",
    "productPathId": "dscr-real-estate",
    "source": "funding-products.registry.json#visio-rental",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 680,
      "startupEligible": false,
      "minAmount": 75000,
      "maxAmount": 5000000,
      "creditTier": "Good",
      "termLength": "30 Years",
      "paymentType": "Monthly",
      "rateCostRange": "6% - 9%",
      "timeToFunding": "3 - 4 Weeks"
    }
  },
  {
    "id": "criteria:newsilver-flip",
    "providerId": "new-silver",
    "productId": "newsilver-flip",
    "productName": "Fix and Flip Bridge",
    "productPathId": "real-estate-bridge",
    "source": "funding-products.registry.json#newsilver-flip",
    "verifiedAt": "2026-06-26",
    "confidence": "REVIEW_REQUIRED",
    "criteria": {
      "minCreditScore": 650,
      "startupEligible": false,
      "minAmount": 100000,
      "maxAmount": 5000000,
      "creditTier": "Fair",
      "termLength": "12 - 24 Months",
      "paymentType": "Interest Only",
      "rateCostRange": "8% - 11%",
      "timeToFunding": "5 - 7 Days"
    }
  }
];
