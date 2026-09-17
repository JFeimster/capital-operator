/**
 * Capital Operator — Lead Capture Component
 * src/components/LeadCaptureModal.tsx
 */

import React, { useState } from 'react';
import { Send, CheckCircle2, Shield, X, Mail } from 'lucide-react';
import { LeadCapturePayload } from '../types';
import { submitLead } from '../config/integrations';

interface LeadCaptureProps {
  operatingModel: string;
  onSuccess: () => void;
  onSkip: () => void;
}

export const LeadCapture: React.FC<LeadCaptureProps> = ({
  operatingModel,
  onSuccess,
  onSkip
}) => {
  const [formData, setFormData] = useState<LeadCapturePayload>({
    firstName: '',
    email: '',
    company: '',
    role: '',
    phone: '',
    operatingModel
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.firstName) {
      setErrorMessage('Please provide your name and work email.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await submitLead(formData);
      if (res.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          onSuccess();
        }, 1200);
      }
    } catch (err) {
      console.error(err);
      setIsSubmitted(true);
      onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-8 text-center my-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mx-auto mb-4">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-bold text-white">Blueprint Dispatched</h3>
        <p className="mt-2 text-sm text-slate-300">
          We've compiled your operating architecture, priority fixes, and 30-day build sequence to {formData.email}.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 sm:p-8 card-glow my-8 no-print">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase font-mono-code">
            PRESERVE YOUR OPERATING SPECIFICATION
          </span>
          <h3 className="mt-1 text-2xl font-extrabold text-white tracking-tight">
            Keep Your Capital Blueprint
          </h3>
          <p className="mt-1.5 text-sm text-slate-300 max-w-xl">
            Get your personalized operating map, priority fixes, recommended infrastructure, and 30-day build sequence sent directly to your team.
          </p>
        </div>

        <button
          onClick={onSkip}
          className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer self-start md:self-center font-mono-code underline underline-offset-4"
        >
          SKIP FOR NOW →
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        {errorMessage && (
          <div className="mb-4 rounded-lg bg-red-950/50 border border-red-800/80 p-3 text-xs text-red-300">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-mono-code text-slate-400 mb-1.5 font-semibold">
              FIRST NAME *
            </label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={e => setFormData({ ...formData, firstName: e.target.value })}
              placeholder="Jason"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-code text-slate-400 mb-1.5 font-semibold">
              WORK EMAIL *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="jason@company.com"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-code text-slate-400 mb-1.5 font-semibold">
              COMPANY NAME
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={e => setFormData({ ...formData, company: e.target.value })}
              placeholder="Acme Capital"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-code text-slate-400 mb-1.5 font-semibold">
              YOUR ROLE
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={e => setFormData({ ...formData, role: e.target.value })}
              placeholder="Managing Partner"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono-code">
            <Shield className="h-3.5 w-3.5 text-slate-400" />
            <span>No generic newsletter gate. We'll send the system you just built.</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center space-x-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>{isSubmitting ? 'Generating Package...' : 'SEND MY BLUEPRINT'}</span>
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
