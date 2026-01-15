'use client'; // This is a client component

import { useCompany } from '@/contexts/CompanyContext';

export default function TestPage() {
  // This hook gives us access to company data
  const { company, companyId } = useCompany();
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          🎯 CompanyProvider Test Page
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Current Company Context:
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="font-medium text-gray-700 w-32">Company ID:</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md font-mono">
                {companyId}
              </span>
            </div>
            
            <div className="flex items-center">
              <span className="font-medium text-gray-700 w-32">Company Name:</span>
              <span className="text-gray-900">{company.name}</span>
            </div>
            
            <div className="flex items-center">
              <span className="font-medium text-gray-700 w-32">Company Slug:</span>
              <span className="text-gray-900">{company.slug}</span>
            </div>
            
            <div className="flex items-center">
              <span className="font-medium text-gray-700 w-32">Primary Color:</span>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-6 h-6 rounded border"
                  style={{ backgroundColor: company.primaryColor }}
                />
                <span className="font-mono">{company.primaryColor}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Success Message */}
       // Change the success message div to use primary color:
<div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
  <div className="flex">
    <div className="flex-shrink-0">
      <svg className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    </div>
    <div className="ml-3">
      <h3 className="text-sm font-medium text-primary">
        ✅ CompanyProvider is working!
      </h3>
      <p className="mt-2 text-sm text-primary/80">
        Every component in your app can now access the current company context.
        When we add multi-tenancy, we'll just change the company data here.
      </p>
    </div>
  </div>
</div>
        
        {/* Explanation Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">
            🧠 What this means:
          </h3>
          <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
            <li>Right now, all users see "Default Company"</li>
            <li>All database queries will use <code>companyId: "default-company"</code></li>
            <li>When we're ready for multi-tenant, we'll:
              <ol className="list-decimal pl-5 mt-1">
                <li>Get real company from database based on subdomain</li>
                <li>Pass it to CompanyProvider</li>
                <li>That's it! All features already use companyId</li>
              </ol>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}