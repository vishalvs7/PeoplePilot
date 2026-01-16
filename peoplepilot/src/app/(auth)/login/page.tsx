'use client';

import { useState, useEffect } from 'react'; // ADD useEffect
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false); // ADD new state
  
  const router = useRouter();
  const { loginWithEmail, loginWithGoogle, user, loading: authLoading } = useAuth(); // ADD user and authLoading

  // ADD: Effect to handle redirect after successful login
  useEffect(() => {
    if (!authLoading && user && !isRedirecting) {
      setIsRedirecting(true);
      
      // Role-based redirect logic
      if (user.role === 'hr_admin') {
        router.push('/dashboard/hr');
      } else {
        router.push('/dashboard/employee');
      }
    }
  }, [user, authLoading, router, isRedirecting]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginWithEmail(email, password);
      // REMOVED: router.push('/dashboard/hr'); - Let useEffect handle redirect
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
      setLoading(false); // Reset loading on error
    }
    // Note: Don't reset loading here - useEffect will handle redirect
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      await loginWithGoogle();
      // REMOVED: router.push('/app/default/hr/dashboard'); - Let useEffect handle redirect
    } catch (err: any) {
      setError(err.message || 'Failed to login with Google.');
      setLoading(false); // Reset loading on error
    }
  };

  // ADD: Show loading state while auth is being checked
  if (authLoading || isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50 p-4">
      <div className="w-full max-w-md">
        {/* Header - unchanged */}
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
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to your HR management dashboard
          </p>
        </div>

        {/* Login Card - unchanged */}
        <Card className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Email/Password Form - unchanged */}
          <form onSubmit={handleEmailLogin} className="space-y-6">
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
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
              />
              <div className="text-right mt-2">
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-primary hover:text-primary-dark"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            
            <Button
              type="submit"
              loading={loading}
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          {/* Divider - unchanged */}
          <div className="flex items-center my-8">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-sm text-gray-500">Or continue with</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Google Login - unchanged */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            loading={loading}
            className="w-full"
            icon={
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            }
          >
            Sign in with Google
          </Button>

          {/* Sign Up Link - unchanged */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link 
                href="/signup" 
                className="text-primary font-medium hover:text-primary-dark"
              >
                Sign up for free
              </Link>
            </p>
          </div>

          {/* Demo Info - unchanged */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="bg-primary/5 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Demo Credentials
              </h4>
              <p className="text-sm text-gray-600 mb-1">
                For testing: <code className="bg-gray-100 px-2 py-1 rounded">test@company.com</code>
              </p>
              <p className="text-sm text-gray-600">
                Password: <code className="bg-gray-100 px-2 py-1 rounded">password123</code>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}