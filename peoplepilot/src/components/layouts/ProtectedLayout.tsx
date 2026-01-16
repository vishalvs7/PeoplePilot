'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedLayoutProps {
  children: React.ReactNode;
  requiredRole?: 'hr_admin' | 'employee';
}

export default function ProtectedLayout({ 
  children, 
  requiredRole 
}: ProtectedLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // User not logged in, redirect to login
      router.push('/login');
    }
    
    if (!loading && user && requiredRole && user.role !== requiredRole) {
      // User doesn't have required role, redirect to appropriate dashboard
      if (user.role === 'hr_admin') {
        router.push('/dashboard/hr');
      } else {
        router.push(`/${user.companyId}/employee/dashboard`);
      }
    }
  }, [user, loading, router, requiredRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  if (requiredRole && user.role !== requiredRole) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}