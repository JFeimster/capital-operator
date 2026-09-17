/**
 * Capital Operator — Server Event Bus
 * server/events/eventBus.ts
 */

import crypto from 'crypto';
import { CapitalEvent, CapitalEventType, CapitalEventContext } from './types';
import { dispatchWebhook } from './webhookDispatcher';

export type EventHandler<T = any> = (event: CapitalEvent<T>) => void | Promise<void>;

class EventBus {
  private handlers: Map<CapitalEventType, Set<EventHandler>> = new Map();

  /**
   * Subscribes an in-memory handler to a specific event type.
   */
  subscribe<T = any>(type: CapitalEventType, handler: EventHandler<T>): () => void {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, new Set());
    }
    this.handlers.get(type)!.add(handler as EventHandler);

    return () => {
      this.handlers.get(type)?.delete(handler as EventHandler);
    };
  }

  /**
   * Factory method to construct a canonical CapitalEvent envelope.
   */
  createEvent<T = Record<string, unknown>>(
    type: CapitalEventType,
    payload: T,
    context?: CapitalEventContext
  ): CapitalEvent<T> {
    const id = `evt_${crypto.randomBytes(8).toString('hex')}`;
    return {
      id,
      type,
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      payload,
      context: {
        environment: process.env.NODE_ENV || 'production',
        source: 'capital-operator-server',
        ...context
      }
    };
  }

  /**
   * Emits an event to registered local listeners and outbound webhook endpoints.
   */
  async emit<T = Record<string, unknown>>(
    type: CapitalEventType,
    payload: T,
    context?: CapitalEventContext
  ): Promise<CapitalEvent<T>> {
    const event = this.createEvent(type, payload, context);

    // 1. Notify local in-memory listeners
    const listeners = this.handlers.get(type);
    if (listeners && listeners.size > 0) {
      for (const listener of listeners) {
        try {
          await listener(event);
        } catch (err: any) {
          console.error(`[EventBus] Error in listener for ${type}:`, err?.message);
        }
      }
    }

    // 2. Outbound Webhook dispatch if configured
    const webhookUrl = process.env.OUTBOUND_WEBHOOK_URL || process.env.CAPITAL_OPERATOR_WEBHOOK_URL;
    const webhookSecret = process.env.WEBHOOK_SECRET || process.env.CAPITAL_OPERATOR_WEBHOOK_SECRET;

    if (webhookUrl && webhookSecret) {
      try {
        await dispatchWebhook(event, {
          targetUrl: webhookUrl,
          secret: webhookSecret,
          timeoutMs: 4000
        });
      } catch (err: any) {
        console.warn(`[EventBus] Webhook emission warning for ${type}:`, err?.message);
      }
    }

    return event;
  }
}

export const serverEventBus = new EventBus();
