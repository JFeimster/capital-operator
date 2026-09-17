/**
 * Capital Operator — Integration Adapter Registry
 * server/integrations/registry.ts
 */

import { IntegrationAdapter } from './types.js';
import { HubSpotAdapter } from './hubspot.js';
import { NotionAdapter } from './notion.js';
import { N8nAdapter } from './n8n.js';
import { GenericWebhookAdapter } from './webhook.js';

class AdapterRegistry {
  private adapters: Map<string, IntegrationAdapter> = new Map();

  constructor() {
    this.register(new HubSpotAdapter());
    this.register(new NotionAdapter());
    this.register(new N8nAdapter());
    this.register(new GenericWebhookAdapter());
  }

  register(adapter: IntegrationAdapter): void {
    this.adapters.set(adapter.id, adapter);
  }

  get(id: string): IntegrationAdapter | undefined {
    return this.adapters.get(id);
  }

  getAll(): IntegrationAdapter[] {
    return Array.from(this.adapters.values());
  }

  getStatusMap(): Record<string, { configured: boolean; enabled: boolean }> {
    const status: Record<string, { configured: boolean; enabled: boolean }> = {};
    for (const [id, adapter] of this.adapters.entries()) {
      status[id] = {
        configured: adapter.isConfigured(),
        enabled: adapter.isEnabled()
      };
    }
    return status;
  }
}

export const integrationRegistry = new AdapterRegistry();
