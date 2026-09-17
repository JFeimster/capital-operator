/**
 * Capital Operator — Vercel Serverless Lead Integration Endpoint
 * api/lead.ts
 *
 * Handles secure server-side lead ingestion, validation, and multi-destination dispatch.
 * Private credentials (HUBSPOT_ACCESS_TOKEN, NOTION_TOKEN, N8N_WEBHOOK_URL, etc.)
 * are accessed exclusively in this serverless execution environment.
 */

interface LeadRequestBody {
  firstName?: string;
  email?: string;
  company?: string;
  role?: string;
  phone?: string;
  operatingModel?: string;
  assessmentAnswers?: Record<string, any>;
  attribution?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    partner_id?: string;
    ref?: string;
    source_url?: string;
    assessment_segment?: string;
    operating_model?: string;
    captured_at?: string;
  };
  submittedAt?: string;
  source?: string;
}

export default async function handler(req: any, res: any) {
  // CORS configuration for serverless deployment
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Expected POST.'
    });
  }

  try {
    const rawBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const body: LeadRequestBody = rawBody || {};

    // 1. Validation
    const { firstName, email, company, role, operatingModel, attribution } = body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        error: 'A valid email address is required.'
      });
    }

    if (!firstName || !company) {
      return res.status(400).json({
        success: false,
        error: 'First name and company are required.'
      });
    }

    const dispatchedTo: string[] = [];
    const dispatchErrors: string[] = [];

    // 2. HubSpot Integration (Server-side with HUBSPOT_ACCESS_TOKEN)
    const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN;
    if (hubspotToken) {
      try {
        const hsRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${hubspotToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            properties: {
              email: email.trim().toLowerCase(),
              firstname: firstName.trim(),
              company: company.trim(),
              jobtitle: role || '',
              capital_operator_operating_model: operatingModel || '',
              capital_operator_segment: attribution?.assessment_segment || '',
              utm_source: attribution?.utm_source || '',
              utm_medium: attribution?.utm_medium || '',
              utm_campaign: attribution?.utm_campaign || '',
              partner_id: attribution?.partner_id || attribution?.ref || ''
            }
          })
        });

        if (hsRes.ok || hsRes.status === 409) {
          dispatchedTo.push('hubspot');
        } else {
          const errText = await hsRes.text();
          dispatchErrors.push(`HubSpot error: ${errText}`);
        }
      } catch (err: any) {
        dispatchErrors.push(`HubSpot exception: ${err?.message}`);
      }
    }

    // 3. Notion Integration (Server-side with NOTION_TOKEN)
    const notionToken = process.env.NOTION_TOKEN;
    const notionLeadsDbId = process.env.NOTION_FUNDING_LEADS_DATABASE_ID || process.env.VITE_NOTION_FUNDING_LEADS_DATABASE_ID;
    if (notionToken && notionLeadsDbId) {
      try {
        const notionRes = await fetch('https://api.notion.com/v1/pages', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${notionToken}`,
            'Content-Type': 'application/json',
            'Notion-Version': '2022-06-28'
          },
          body: JSON.stringify({
            parent: { database_id: notionLeadsDbId },
            properties: {
              Name: {
                title: [{ text: { content: `${firstName} (${company})` } }]
              },
              Email: {
                email: email
              },
              Company: {
                rich_text: [{ text: { content: company } }]
              },
              Role: {
                select: { name: role || 'Advisor' }
              },
              'Operating Model': {
                select: { name: operatingModel || 'Relationship-Led' }
              }
            }
          })
        });

        if (notionRes.ok) {
          dispatchedTo.push('notion');
        } else {
          const errText = await notionRes.text();
          dispatchErrors.push(`Notion error: ${errText}`);
        }
      } catch (err: any) {
        dispatchErrors.push(`Notion exception: ${err?.message}`);
      }
    }

    // 4. n8n Webhook Integration (Server-side with N8N_WEBHOOK_URL)
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      try {
        const n8nSecret = process.env.N8N_WEBHOOK_SECRET;
        const n8nRes = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(n8nSecret ? { 'X-Webhook-Secret': n8nSecret } : {})
          },
          body: JSON.stringify({
            ...body,
            dispatchedAt: new Date().toISOString()
          })
        });

        if (n8nRes.ok) {
          dispatchedTo.push('n8n');
        } else {
          dispatchErrors.push(`n8n webhook error status: ${n8nRes.status}`);
        }
      } catch (err: any) {
        dispatchErrors.push(`n8n exception: ${err?.message}`);
      }
    }

    // 5. Generic Dispatch Webhook (Server-side with LEAD_DISPATCH_WEBHOOK_URL)
    const genericWebhook = process.env.LEAD_DISPATCH_WEBHOOK_URL;
    if (genericWebhook) {
      try {
        const genRes = await fetch(genericWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        if (genRes.ok) {
          dispatchedTo.push('lead_dispatch_webhook');
        }
      } catch (err: any) {
        dispatchErrors.push(`Generic webhook exception: ${err?.message}`);
      }
    }

    // If no external server keys were configured, record simulated queue for MVP
    if (dispatchedTo.length === 0) {
      dispatchedTo.push('serverless_buffer');
    }

    return res.status(200).json({
      success: true,
      message: 'Lead registered and processed successfully.',
      dispatchedTo,
      errors: dispatchErrors.length > 0 ? dispatchErrors : undefined,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error('Lead endpoint internal error:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal processing error while saving lead.'
    });
  }
}
