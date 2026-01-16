'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TestRolesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading user...</div>;
  if (!user) return <div>Not logged in</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Role Debug</h1>
      
      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">Current User Data:</h2>
        <pre className="bg-white p-4 rounded overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Expected for HR Admin:</h3>
          <ul className="text-sm space-y-1">
            <li>✓ role: "hr_admin"</li>
            <li>✓ Sidebar: HR navigation</li>
            <li>✓ Redirect to: /dashboard/hr</li>
          </ul>
        </div>
        
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Expected for Employee:</h3>
          <ul className="text-sm space-y-1">
            <li>✓ role: "employee"</li>
            <li>✓ Sidebar: Employee navigation</li>
            <li>✓ Redirect to: /dashboard/employee</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <p className="font-semibold">Your Current Status:</p>
        <p>Role: <span className="font-bold">{user.role}</span></p>
        <p>Should see: <span className="font-bold">{user.role === 'hr_admin' ? 'HR Sidebar' : 'Employee Sidebar'}</span></p>
      </div>
    </div>
  );
}