import React from 'react';
import { CTAButton } from '../site/CTAButton';

export interface AssessmentCTAProps {
  onStart: () => void;
}

export const AssessmentCTA: React.FC<AssessmentCTAProps> = ({ onStart }) => {
  return (
    <div className="text-center pt-6">
      <CTAButton
        href="#assessment"
        onClick={onStart}
        size="lg"
        className="px-8 py-4 text-base"
      >
        Begin Operational Diagnostic
      </CTAButton>
    </div>
  );
};
