'use client'; // This MUST be a client component because it uses React hooks

import React, { createContext, useContext, ReactNode } from 'react';
import { Company, DEFAULT_COMPANY } from '@/types/company';

// 1. Define what data the context will provide
interface CompanyContextType {
  company: Company;
  companyId: string;
  setCompany?: (company: Company) => void; // Optional for Phase 2
}

// 2. Create the context with default values
const CompanyContext = createContext<CompanyContextType>({
  company: DEFAULT_COMPANY,
  companyId: DEFAULT_COMPANY.id,
});

// 3. Create a custom hook to use this context
export const useCompany = () => {
  const context = useContext(CompanyContext);
  
  // Safety check - this shouldn't happen if we wrap our app properly
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  
  return context;
};

// 4. Create the Provider component that will wrap our app
interface CompanyProviderProps {
  children: ReactNode;
  company?: Company; // Optional: we can pass a real company later
}

export const CompanyProvider: React.FC<CompanyProviderProps> = ({ 
  children, 
  company = DEFAULT_COMPANY // Default to our hardcoded company
}) => {
  // For Phase 2, we might add state here to change companies
  // For now, it's just static
  
  return (
    <CompanyContext.Provider value={{ 
      company, 
      companyId: company.id 
    }}>
      {children}
    </CompanyContext.Provider>
  );
};