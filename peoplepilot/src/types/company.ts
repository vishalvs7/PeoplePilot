export interface CompanySettings {
  defaultLeaveDays: number;
  workHoursPerDay: number;
  currency: string;
  timezone: string;
  // Add more settings as needed
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  primaryColor: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: Date;
  updatedAt: Date;
  settings: CompanySettings;
}

export interface CompanyDocument {
  name: string;
  slug: string;
  logo?: string;
  primaryColor: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: Date;
  updatedAt: Date;
  settings: CompanySettings;
}

// Default company for Phase 1 (single company mode)
export const DEFAULT_COMPANY: Company = {
  id: 'default-company',
  name: 'PeoplePilot Demo',
  slug: 'default',
  primaryColor: '#19A800', // Your primary color
  plan: 'free',
  createdAt: new Date(),
  updatedAt: new Date(),
  settings: {
    defaultLeaveDays: 12,
    workHoursPerDay: 8,
    currency: 'INR',
    timezone: 'Asia/Kolkata',
  },
};