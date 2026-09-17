/**
 * Capital Operator — Social & Community Links
 * src/config/socialLinks.ts
 */

export interface SocialLink {
  platform: string;
  url: string;
  iconName: string;
  label: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/JFeimster/capital-operator',
    iconName: 'Github',
    label: 'Open Source Repository'
  },
  {
    platform: 'Website',
    url: 'https://www.distilledfunding.com',
    iconName: 'Globe',
    label: 'Moonshine Capital / Distilled Funding'
  },
  {
    platform: 'Tools',
    url: 'https://tools.distilledfunding.com',
    iconName: 'Wrench',
    label: 'Financial Underwriting Tools'
  }
];
