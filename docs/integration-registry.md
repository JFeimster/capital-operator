# Integration Registry: Capital Operator

## Overview
This registry catalogs all external systems, third-party software, protocols, and integration points supported by Capital Operator.

---

## 1. Intake & Form Integrations
| Service | Method | Target / ID | Capabilities |
| :--- | :--- | :--- | :--- |
| **Tally Partner Form** | Iframe / SDK | `mOe658` | Advisor, Operator, and Platform Partner application with custom hidden fields (`partner_id`, `tier`). |
| **Tally Deal Intake** | Iframe / SDK | `mDEJB5` | Borrower loan intake form with financial upload support and instant attribution tags. |
| **REST Intake API** | POST | `/v1/intake/submit` | Programmatic intake ingestion for SaaS and ERP portals. |

---

## 2. Underwriting & Financial Data Feeds
| Service | Integration Type | Stage | Use Case |
| :--- | :--- | :--- | :--- |
| **Heron Data** | REST API | Stage 2/3 | Bank statement transaction classification and revenue reconciliation. |
| **Ocrolus** | API / Webhook | Stage 3 | PDF document verification, fraud detection, and multi-bank debt schedule parsing. |
| **Validis** | Direct Sync | Stage 3 | Direct accounting package synchronization (QuickBooks, Xero, NetSuite). |

---

## 3. CRM & Pipeline Orchestration
| Service | Protocol | Payload Type | Description |
| :--- | :--- | :--- | :--- |
| **HubSpot** | Webhooks / OAuth | JSON Event | Automatic deal stage progression and document check-off. |
| **Make.com** | Webhook | JSON Payload | Multi-step webhook orchestrator routing deals across syndicates. |
| **Slack / Discord** | Webhook | BlockKit Message | Real-time deal triage alerts and credit memo review triggers. |
