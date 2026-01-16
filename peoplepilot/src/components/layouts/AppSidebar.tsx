'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCompany } from '@/contexts/CompanyContext';

// Navigation items for HR Admin
const hrNavItems = [
  { name: 'Dashboard', href: '/dashboard/hr', icon: '📊' },
  { name: 'Employees', href: '/hr/employees', icon: '👥' },
  { name: 'Attendance', href: '/hr/attendance', icon: '📅' },
  { name: 'Leaves', href: '/hr/leaves', icon: '🏝️' },
  { name: 'Payroll', href: '/hr/payroll', icon: '💰' },
  { name: 'Documents', href: '/hr/documents', icon: '📄' },
  { name: 'Settings', href: '/hr/settings', icon: '⚙️' },
];

// Navigation items for Employee
const employeeNavItems = [
  { name: 'Dashboard', href: '/employee/dashboard', icon: '📊' },
  { name: 'Attendance', href: '/employee/attendance', icon: '📅' },
  { name: 'Leaves', href: '/employee/leaves', icon: '🏝️' },
  { name: 'Salary', href: '/employee/salary', icon: '💰' },
  { name: 'Documents', href: '/employee/documents', icon: '📄' },
  { name: 'Profile', href: '/employee/profile', icon: '👤' },
];

export default function AppSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();
  const { company } = useCompany();

  // Determine which nav items to show based on user role
  const navItems = user?.role === 'hr_admin' ? hrNavItems : employeeNavItems;
  const basePath = user?.role === 'hr_admin' ? '/hr' : '/employee';

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </div>
      )}

      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">PP</span>
            </div>
            <span className="ml-3 text-lg font-semibold text-gray-900">
              {company.name}
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="mt-5 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(`${basePath}${item.href}`);
            return (
              <Link
                key={item.name}
                href={`/dashboard${basePath}${item.href}`}
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow border-r border-gray-200 bg-white pt-5">
          {/* Company header */}
          <div className="flex items-center px-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">PP</span>
            </div>
            <div className="ml-3">
              <h2 className="text-lg font-semibold text-gray-900">{company.name}</h2>
              <p className="text-xs text-gray-500">
                {user?.role === 'hr_admin' ? 'HR Admin' : 'Employee'}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-8 flex-1 space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(`${basePath}${item.href}`);
              return (
                <Link
                  key={item.name}
                  href={`/default${basePath}${item.href}`}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User profile at bottom */}
          <div className="flex-shrink-0 border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 truncate">
                  {user?.displayName || user?.email}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}