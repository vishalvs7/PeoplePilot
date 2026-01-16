'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCompany } from '@/contexts/CompanyContext';

// HR Navigation items
const hrNavItems = [
  { name: 'Dashboard', href: '/dashboard/hr', icon: '📊' },
  { name: 'Employees', href: '/dashboard/hr/employees', icon: '👥' },
  { name: 'Attendance', href: '/dashboard/hr/attendance', icon: '📅' },
  { name: 'Leaves', href: '/dashboard/hr/leaves', icon: '🏝️' },
  { name: 'Payroll', href: '/dashboard/hr/payroll', icon: '💰' },
  { name: 'Documents', href: '/dashboard/hr/documents', icon: '📄' },
  { name: 'Settings', href: '/dashboard/hr/settings', icon: '⚙️' },
];

// Employee Navigation items
const employeeNavItems = [
  { name: 'Dashboard', href: '/dashboard/employee', icon: '📊' },
  { name: 'Attendance', href: '/dashboard/employee/attendance', icon: '📅' },
  { name: 'Leaves', href: '/dashboard/employee/leaves', icon: '🏝️' },
  { name: 'Salary', href: '/dashboard/employee/salary', icon: '💰' },
  { name: 'Documents', href: '/dashboard/employee/documents', icon: '📄' },
  { name: 'Profile', href: '/dashboard/employee/profile', icon: '👤' },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { company } = useCompany();

  const isHR = user?.role === 'hr_admin';
  const navItems = isHR ? hrNavItems : employeeNavItems;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar for mobile */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
          <div className="flex items-center px-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">PP</span>
            </div>
            <span className="ml-3 text-lg font-semibold text-gray-900">
              {company.name}
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="ml-auto rounded-md p-2 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close sidebar</span>
              ✕
            </button>
          </div>
          <nav className="mt-8 flex-1 space-y-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  pathname === item.href
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
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
                {isHR ? 'HR Admin' : 'Employee'}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-8 flex-1 space-y-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  pathname === item.href
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Link>
            ))}
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
              <button
                onClick={handleLogout}
                className="ml-auto p-2 text-gray-400 hover:text-gray-500"
                title="Logout"
              >
                🔓
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                type="button"
                className="lg:hidden -ml-2 mr-2 p-2 text-gray-400 hover:text-gray-500"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                ☰
              </button>
              <h1 className="text-lg font-semibold text-gray-900">
                {navItems.find(item => item.href === pathname)?.name || 'Dashboard'}
              </h1>
            </div>

            {/* Notifications and user info */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                <span className="sr-only">Notifications</span>
                🔔
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>
              
              <div className="hidden lg:block text-right">
                <p className="text-sm font-medium text-gray-700">
                  {user?.displayName || user?.email}
                </p>
                <p className="text-xs text-gray-500">
                  {isHR ? 'HR Admin' : 'Employee'}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}