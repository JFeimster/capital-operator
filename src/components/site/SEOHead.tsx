import React, { useEffect } from 'react';
import { PageSEO } from '../../config/seo';
import { updateDocumentSEO } from '../../lib/seo';

export interface SEOHeadProps {
  seo: PageSEO;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ seo }) => {
  useEffect(() => {
    updateDocumentSEO(seo);
  }, [seo]);

  return null;
};
