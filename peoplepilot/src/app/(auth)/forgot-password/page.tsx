'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50 p-4">
      <div className="w-full max-w-md">
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
            Reset Password
          </h1>
          <p className="text-gray-600">
            Enter your email to receive reset instructions
          </p>
        </div>

        {/* Card */}
        <Card className="p-8">
          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Check Your Email
              </h3>
              <p className="text-gray-600 mb-6">
                We've sent password reset instructions to <strong>{email}</strong>.
                Please check your inbox and follow the link.
              </p>
              <div className="space-y-4">
                <Button
                  onClick={() => setSuccess(false)}
                  variant="outline"
                  className="w-full"
                >
                  Try Another Email
                </Button>
                <Link href="/login">
                  <Button variant="ghost" className="w-full">
                    Back to Login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    disabled={loading}
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Enter the email address associated with your account.
                  </p>
                </div>

                <Button
                  type="submit"
                  loading={loading}
                  className="w-full"
                >
                  Send Reset Instructions
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link 
                  href="/login" 
                  className="text-primary font-medium hover:text-primary-dark"
                >
                  ← Back to Login
                </Link>
              </div>

              {/* Help Text */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Didn't receive the email?
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Check your spam or junk folder</li>
                    <li>• Make sure you entered the correct email</li>
                    <li>• Wait a few minutes and try again</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}