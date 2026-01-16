'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { getCompanyDocument } from '@/lib/firebase/firestore';

// Setup steps
const SETUP_STEPS = [
  { id: 1, title: 'Welcome', description: 'Get started with PeoplePilot' },
  { id: 2, title: 'Company Details', description: 'Set up your company information' },
  { id: 3, title: 'Add Employees', description: 'Import or add your team members' },
  { id: 4, title: 'Configure Settings', description: 'Set up leave policies and work hours' },
  { id: 5, title: 'Complete', description: 'You\'re ready to go!' },
];

export default function SetupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<any>(null);
  const [companyId, setCompanyId] = useState<string>('');

  // Get company ID from URL or user context
  useEffect(() => {
    const urlCompanyId = searchParams.get('companyId');
    if (urlCompanyId) {
      setCompanyId(urlCompanyId);
    } else if (user?.companyId) {
      setCompanyId(user.companyId);
    }
  }, [searchParams, user]);

  // Load company data
  useEffect(() => {
    if (companyId) {
      loadCompanyData();
    }
  }, [companyId]);

  const loadCompanyData = async () => {
    try {
      const companyData = await getCompanyDocument(companyId);
      setCompany(companyData);
    } catch (error) {
      console.error('Error loading company:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep < SETUP_STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Setup complete, redirect to dashboard
      router.push(`/app/${company?.slug}/hr/dashboard`);
    }
  };

  const handleSkip = () => {
    // Skip setup and go to dashboard
    router.push(`/app/${company?.slug}/hr/dashboard`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading setup...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 pt-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <span className="text-2xl font-bold text-white">PP</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to PeoplePilot! 🎉
          </h1>
          <p className="text-gray-600 text-lg">
            Let's get your company set up in a few simple steps
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {SETUP_STEPS.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    step.id <= currentStep
                      ? 'bg-primary border-primary text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  {step.id}
                </div>
                <span className={`mt-2 text-sm font-medium ${
                  step.id <= currentStep ? 'text-primary' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="absolute top-0 left-0 h-0.5 bg-gray-300 w-full"></div>
            <div
              className="absolute top-0 left-0 h-0.5 bg-primary transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (SETUP_STEPS.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Setup Content */}
        <Card className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {SETUP_STEPS[currentStep - 1].title}
            </h2>
            <p className="text-gray-600">
              {SETUP_STEPS[currentStep - 1].description}
            </p>
          </div>

          {/* Step Content */}
          <div className="min-h-[400px] flex flex-col">
            {currentStep === 1 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-32 h-32 mb-8">
                  <div className="w-full h-full bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-6xl">👋</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Hello, {user?.displayName || 'Admin'}!
                </h3>
                <p className="text-gray-600 max-w-md mb-6">
                  Welcome to <strong>{company?.name}</strong>'s HR management system.
                  We'll guide you through setting up your company in just 5 quick steps.
                </p>
                <div className="bg-blue-50 rounded-lg p-4 max-w-md">
                  <p className="text-sm text-blue-800">
                    Your company URL: <code className="font-mono bg-blue-100 px-2 py-1 rounded">
                      {company?.slug}.peoplepilot.app
                    </code>
                  </p>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Company Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Company Name</p>
                      <p className="font-medium">{company?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Company URL</p>
                      <p className="font-medium">{company?.slug}.peoplepilot.app</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Plan</p>
                      <p className="font-medium capitalize">{company?.plan}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Admin Email</p>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-medium text-amber-900 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    Need to make changes?
                  </h4>
                  <p className="text-sm text-amber-800">
                    Company name and URL cannot be changed later. If you need to correct anything, 
                    please contact support or create a new account.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">👥</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Add Your Team</h4>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    You can add employees now or skip and add them later from the dashboard.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="text-center p-6 cursor-pointer hover:border-primary transition-colors">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📥</span>
                    </div>
                    <h5 className="font-medium text-gray-900 mb-2">Import CSV</h5>
                    <p className="text-sm text-gray-600">Upload a CSV file with employee details</p>
                  </Card>
                  
                  <Card className="text-center p-6 cursor-pointer hover:border-primary transition-colors">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">➕</span>
                    </div>
                    <h5 className="font-medium text-gray-900 mb-2">Add Manually</h5>
                    <p className="text-sm text-gray-600">Add employees one by one</p>
                  </Card>
                </div>

                <div className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => console.log('Skip employee addition')}
                  >
                    I'll add employees later
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h4 className="font-medium text-gray-900">Configure Default Settings</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium">Leave Policy</p>
                      <p className="text-sm text-gray-600">Default leave days per year</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">-</button>
                      <span className="w-12 text-center">12</span>
                      <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">+</button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium">Work Hours</p>
                      <p className="text-sm text-gray-600">Daily working hours</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">-</button>
                      <span className="w-12 text-center">8</span>
                      <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">+</button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium">Currency</p>
                      <p className="text-sm text-gray-600">For payroll and expenses</p>
                    </div>
                    <select className="border border-gray-300 rounded-lg px-3 py-2">
                      <option>INR (₹)</option>
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-32 h-32 mb-8">
                  <div className="w-full h-full bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-6xl">🎯</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Setup Complete!
                </h3>
                <p className="text-gray-600 max-w-md mb-6">
                  Your company <strong>{company?.name}</strong> is now ready to use PeoplePilot.
                  You can start managing your HR operations immediately.
                </p>
                <div className="bg-green-50 rounded-lg p-4 max-w-md">
                  <p className="text-sm text-green-800">
                    Next: Explore your dashboard and start adding employees!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                onClick={handleSkip}
              >
                Skip Setup
              </Button>
              
              <Button
                onClick={handleNext}
              >
                {currentStep === SETUP_STEPS.length ? 'Go to Dashboard' : 'Continue'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Setup Progress */}
        <div className="text-center text-sm text-gray-500">
          Step {currentStep} of {SETUP_STEPS.length} • {Math.round((currentStep / SETUP_STEPS.length) * 100)}% complete
        </div>
      </div>
    </div>
  );
}