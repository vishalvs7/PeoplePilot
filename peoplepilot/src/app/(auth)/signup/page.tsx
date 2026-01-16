'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { isCompanySlugAvailable } from '@/lib/firebase/firestore';
import { signUpWithEmail } from '@/lib/firebase/auth';
import { createUserDocument, createCompanyDocument } from '@/lib/firebase/firestore';

export default function SignupPage() {
  const router = useRouter();
  
  // Form state
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Company info
  const [companyName, setCompanyName] = useState('');
  const [companySlug, setCompanySlug] = useState('');
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [checkingSlug, setCheckingSlug] = useState(false);
  
  // Admin info
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Check if company slug is available
  const checkSlugAvailability = async () => {
    if (!companySlug) return;
    
    setCheckingSlug(true);
    try {
      const available = await isCompanySlugAvailable(companySlug);
      setSlugAvailable(available);
      setError(available ? '' : 'This company URL is already taken. Please choose another.');
    } catch (err: any) {
      setError('Error checking company URL. Please try again.');
    } finally {
      setCheckingSlug(false);
    }
  };

  // Generate slug from company name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
      .substring(0, 30);
  };

  // Handle company name change
  const handleCompanyNameChange = (value: string) => {
  setCompanyName(value);
  if (!companySlug || companySlug === generateSlug(companyName)) {
    setCompanySlug(generateSlug(value));
    setSlugAvailable(null);
  }
};

  // Handle company slug change
  const handleCompanySlugChange = (value: string) => {
  const slug = value.toLowerCase().replace(/[^a-z0-9-]/g, '');
  setCompanySlug(slug);
  setSlugAvailable(null);
};

  // Validate step 1 (company info)
  const validateStep1 = () => {
    if (!companyName.trim()) {
      setError('Company name is required');
      return false;
    }
    if (!companySlug.trim()) {
      setError('Company URL is required');
      return false;
    }
    if (slugAvailable === false) {
      setError('Please choose a different company URL');
      return false;
    }
    if (slugAvailable === null && companySlug) {
      setError('Please check company URL availability');
      return false;
    }
    return true;
  };

  // Validate step 2 (admin info)
  const validateStep2 = () => {
    if (!adminName.trim()) {
      setError('Your name is required');
      return false;
    }
    if (!adminEmail.trim() || !/\S+@\S+\.\S+/.test(adminEmail)) {
      setError('Valid email is required');
      return false;
    }
    if (!adminPassword || adminPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (adminPassword !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      // Generate company ID
      const companyId = `comp_${Date.now()}`;
      
      // 1. Create company document
      await createCompanyDocument(companyId, {
        name: companyName,
        slug: companySlug,
        primaryColor: '#19A800', // Default color
        plan: 'free',
        settings: {
          defaultLeaveDays: 12,
          workHoursPerDay: 8,
          currency: 'INR',
          timezone: 'Asia/Kolkata',
        },
      });

      // 2. Create admin user in Firebase Auth
      const firebaseUser = await signUpWithEmail(
        adminEmail,
        adminPassword,
        adminName,
        'hr_admin',
        companyId
      );

      // 3. Create user document in Firestore
      await createUserDocument(firebaseUser.uid, {
        email: adminEmail,
        displayName: adminName,
        role: 'hr_admin',
        companyId,
        emailVerified: false,
      });

      // 4. Redirect to setup wizard
      router.push('/dashboard/hr');
      
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50 p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">PP</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                People<span className="text-primary">Pilot</span>
              </span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Start Your Free Trial
          </h1>
          <p className="text-gray-600">
            Get your company set up in minutes
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className={`flex items-center ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <span className="ml-2 font-medium">Company Info</span>
          </div>
          <div className="w-16 h-1 mx-4 bg-gray-200"></div>
          <div className={`flex items-center ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <span className="ml-2 font-medium">Admin Account</span>
          </div>
        </div>

        {/* Signup Card */}
        <Card className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Step 1: Company Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <Input
                  type="text"
                  value={companyName}
                  onChange={(e) => handleCompanyNameChange(e.target.value)}
                  placeholder="Acme Corporation"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company URL *
                </label>
                <div className="flex">
                  <div className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600">
                    https://
                  </div>
                  <Input
                    type="text"
                    value={companySlug}
                    onChange={(e) => handleCompanySlugChange(e.target.value)}
                    onBlur={checkSlugAvailability}
                    className="rounded-l-none"
                    placeholder="your-company"
                    required
                  />
                  <div className="flex items-center px-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-600">
                    .peoplepilot.app
                  </div>
                </div>
                
                {/* Slug Availability Indicator */}
                {companySlug && (
                  <div className="mt-2">
                    {checkingSlug ? (
                      <p className="text-sm text-gray-500">Checking availability...</p>
                    ) : slugAvailable === true ? (
                      <p className="text-sm text-green-600">
                        ✓ This URL is available! Your dashboard will be at:{' '}
                        <code className="bg-green-50 px-2 py-1 rounded">
                          {companySlug}.peoplepilot.app
                        </code>
                      </p>
                    ) : slugAvailable === false ? (
                      <p className="text-sm text-red-600">
                        ✗ This URL is already taken. Please choose another.
                      </p>
                    ) : null}
                  </div>
                )}
                
                <p className="mt-2 text-sm text-gray-500">
                  This will be your unique company URL. You can't change it later.
                </p>
              </div>

              <Button
                onClick={() => {
                  if (validateStep1()) setStep(2);
                }}
                className="w-full"
              >
                Continue to Admin Account
              </Button>
            </div>
          )}

          {/* Step 2: Admin Account */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Create Admin Account for {companyName}
                </h3>
                <p className="text-gray-600 mb-6">
                  You'll be the HR administrator for your company.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Full Name *
                </label>
                <Input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Email *
                </label>
                <Input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="john@company.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <Input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  Must be at least 6 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  loading={loading}
                  className="flex-1"
                >
                  Create Account
                </Button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-6">
                By creating an account, you agree to our{' '}
                <a href="#" className="text-primary hover:underline">Terms of Service</a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </p>
            </div>
          )}

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="text-primary font-medium hover:text-primary-dark"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}