// This is where we define what a "Company" looks like
// For now, we'll use a hardcoded default company

export type Company = {
  id: string;           // Unique ID like "comp_abc123"
  name: string;         // Company name like "ACME Corp"
  slug: string;         // URL slug like "acme" for acme.peoplepilot.app
  logo?: string;        // Optional logo URL
  primaryColor?: string; // Brand color like "#3b82f6"
  createdAt: Date;      // When company was created
  plan?: 'free' | 'pro' | 'enterprise'; // Subscription plan
};

// For Phase 1 (single company mode), we'll use this hardcoded company
export const DEFAULT_COMPANY: Company = {
  id: 'default-company',
  name: 'Default Company',
  slug: 'default',
  primaryColor: '#19a800', // Blue color
  createdAt: new Date(),
  plan: 'free'
};