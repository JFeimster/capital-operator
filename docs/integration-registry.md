# Integration Registry: Capital Operator

## Overview
This registry catalogs all external systems, third-party software, protocols, and integration points supported by Capital Operator.

---

## 1. Core Platform & Form Integrations
| Service | Method | Route / Target ID | Status | Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Tally Partner Form** | Iframe / Direct Link | `mOe658` | **LIVE** | Advisor, Operator, and Platform Partner application with custom hidden fields (`partner_id`, `tier`). |
| **Tally Deal Intake** | Iframe / Direct Link | `mDEJB5` | **LIVE** | Borrower loan intake form with financial upload support and instant attribution tags. |
| **REST Health API** | GET | `/api/v1/health` | **LIVE** | Service heartbeat, uptime, environment metadata, and capability status. |
| **REST Intake API** | POST | `/api/v1/intake/submit` | **LIVE** | Programmatic intake ingestion, deterministic triage calculation, and event emission. |
| **Buy-Box Routing API** | POST | `/api/v1/routing/match-buy-box` | **LIVE** | Credit fund criteria matching, disqualification analysis, and facility capacity estimation. |
| **Webhook Test Sandbox** | POST | `/api/v1/webhooks/test` | **SANDBOX** | HMAC-SHA256 test signature generation and target delivery verification. |

---

## 2. Normalized Server CRM & Workflow Adapters
| Service | Provider ID | Protocol | Status | Description |
| :--- | :--- | :--- | :--- | :--- |
| **HubSpot** | `hubspot` | REST (v3 Objects) | **BETA** | Automatic contact creation, operating model tags, and partner attribution. |
| **Notion** | `notion` | REST (v1 Pages) | **BETA** | Direct funding lead database recording with schema property mapping. |
| **n8n Workflow** | `n8n` | Webhook (Secret Auth) | **BETA** | Custom workflow automation trigger for multi-step partner pipelines. |
| **Generic Webhook** | `genericWebhook` | HTTP POST (Secret Auth) | **BETA** | Resilient lead dispatch to any custom endpoint or proxy. |

---

## 3. Financial Data Feeds & Document OCR
| Service | Integration Type | Stage | Status | Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Heron Data** | REST API | Stage 2/3 | **SPECIFIED** | Bank statement transaction classification and revenue reconciliation. |
| **Ocrolus** | API / Webhook | Stage 3 | **SPECIFIED** | PDF document verification, fraud detection, and multi-bank debt schedule parsing. |
| **Validis** | Direct Sync | Stage 3 | **SPECIFIED** | Direct accounting package synchronization (QuickBooks, Xero, NetSuite). |

---

## 4. Pipeline Orchestration & Syndication
| Service | Protocol | Payload Type | Status | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Make.com / Zapier** | Webhook | `CapitalEvent` JSON | **LIVE** | Multi-step webhook orchestrator routing deals across syndicates. |
| **Slack / Discord** | Webhook | BlockKit / JSON | **SPECIFIED** | Real-time deal triage alerts and credit memo review triggers. |
| **Lender Direct LOS** | REST / SOAP | Loan Package JSON | **SPECIFIED** | Direct bi-directional loan origination submission. |
