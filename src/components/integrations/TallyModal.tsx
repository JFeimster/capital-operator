/**
 * Capital Operator — Tally Modal Component
 * src/components/integrations/TallyModal.tsx
 */

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { TallyEmbed, TallyEmbedProps } from './TallyEmbed';

export interface TallyModalProps extends TallyEmbedProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TallyModal: React.FC<TallyModalProps> = ({
  isOpen,
  onClose,
  formId,
  routeKey,
  title,
  hiddenFields
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-4 sm:p-6">
          <TallyEmbed
            formId={formId}
            routeKey={routeKey}
            title={title}
            height={680}
            hiddenFields={hiddenFields}
            className="border-0 bg-transparent p-0 shadow-none"
          />
        </div>
      </div>
    </div>
  );
};
