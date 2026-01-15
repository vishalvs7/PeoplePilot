'use client';

import { useCompany } from '@/contexts/CompanyContext';
import Link from 'next/link';

export default function Home() {
  const { company } = useCompany();
  
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-gray-50">
      <div className="text-center max-w-2xl">
        {/* Logo/Title */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <span className="text-2xl font-bold text-white">PP</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            People<span className="text-primary">Pilot</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Simple HR Management for Small Companies
          </p>
        </div>
        
        {/* Tagline */}
        <div className="mb-12">
          <p className="text-gray-700 mb-6 max-w-md mx-auto">
            All-in-one HR platform for companies with 50-100 employees. 
            Manage attendance, leaves, payroll, and documents in one place.
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
            <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
            <span className="text-primary font-medium">
              Currently serving: <strong>{company.name}</strong>
            </span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link 
            href="/test" 
            className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-all duration-200 shadow-md hover:shadow-lg"
          >
            🚀 Test CompanyProvider
          </Link>
          <Link 
            href="/login" 
            className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/5 transition-all duration-200"
          >
            🔐 Login (Coming Soon)
          </Link>
        </div>
        
        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-primary text-2xl">👥</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Employee Management</h3>
            <p className="text-gray-600 text-sm">Add, manage, and organize your team members</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-primary text-2xl">💰</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Payroll Processing</h3>
            <p className="text-gray-600 text-sm">Run payroll and generate payslips automatically</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-primary text-2xl">📅</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Attendance Tracking</h3>
            <p className="text-gray-600 text-sm">Track attendance and manage leaves seamlessly</p>
          </div>
        </div>
        
        {/* Current Context Info */}
        <div className="bg-white p-6 rounded-xl border border-primary/20 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
            Current System Context
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Company ID</p>
              <p className="font-mono text-gray-800">{company.id}</p>
            </div>
            <div>
              <p className="text-gray-500">Company Color</p>
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded border mr-2"
                  style={{ backgroundColor: company.primaryColor }}
                ></div>
                <code>{company.primaryColor}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}