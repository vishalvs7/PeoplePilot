'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Company, DEFAULT_COMPANY } from '@/types/company';

interface CompanyContextType {
  company: Company;
  companyId: string;
  loading: boolean;
}

const CompanyContext = createContext<CompanyContextType>({
  company: DEFAULT_COMPANY,
  companyId: DEFAULT_COMPANY.id,
  loading: true,
});

// Export hook
export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};

interface CompanyProviderProps {
  children: ReactNode;
}

export const CompanyProvider: React.FC<CompanyProviderProps> = ({ 
  children 
}) => {
  const [loading, setLoading] = useState(true);

  // SIMPLIFIED: Just use DEFAULT_COMPANY for now
  // We'll add auth dependency back when we fix the circular issue
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const value = {
    company: DEFAULT_COMPANY,
    companyId: DEFAULT_COMPANY.id,
    loading,
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  );
};