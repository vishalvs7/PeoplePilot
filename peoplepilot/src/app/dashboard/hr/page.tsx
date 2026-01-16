'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useCompany } from '@/contexts/CompanyContext';

export default function HRDashboardPage() {
  const { company } = useCompany();

  const stats = [
    { label: 'Total Employees', value: '47', change: '+2 this month', icon: '👥', color: 'bg-blue-100 text-blue-600' },
    { label: 'Present Today', value: '42', change: '89% attendance', icon: '✅', color: 'bg-green-100 text-green-600' },
    { label: 'Pending Leaves', value: '5', change: '3 to approve', icon: '🏝️', color: 'bg-amber-100 text-amber-600' },
    { label: 'Payroll Due', value: '₹4,82,500', change: 'Next: 25th Jan', icon: '💰', color: 'bg-purple-100 text-purple-600' },
  ];

  const quickActions = [
    { title: 'Add Employee', icon: '➕', href: '/dashboard/hr/employees/add' },
    { title: 'Run Payroll', icon: '💰', href: '/dashboard/hr/payroll/run' },
    { title: 'Approve Leaves', icon: '✅', href: '/dashboard/hr/leaves' },
    { title: 'Generate Reports', icon: '📊', href: '/dashboard/hr/reports' },
  ];

  const recentActivities = [
    { user: 'Rajesh Kumar', action: 'applied for leave', time: '2 hours ago', type: 'leave' },
    { user: 'Priya Sharma', action: 'checked in late', time: '3 hours ago', type: 'attendance' },
    { user: 'Amit Patel', action: 'updated profile', time: '5 hours ago', type: 'profile' },
    { user: 'System', action: 'payroll processed for Dec', time: '1 day ago', type: 'payroll' },
  ];

  const upcomingHolidays = [
    { date: '26 Jan', day: 'Friday', holiday: 'Republic Day', type: 'national' },
    { date: '8 Mar', day: 'Friday', holiday: 'Holi', type: 'festival' },
    { date: '14 Apr', day: 'Monday', holiday: 'Ambedkar Jayanti', type: 'national' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back to {company.name} 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your team today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <a key={index} href={action.href} className="block">
              <Card className="p-6 hover:border-primary transition-colors cursor-pointer text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 bg-primary/10 text-primary`}>
                  <span className="text-xl">{action.icon}</span>
                </div>
                <h3 className="font-medium text-gray-900">{action.title}</h3>
              </Card>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Activity & Upcoming Holidays */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  {activity.type === 'leave' && '🏝️'}
                  {activity.type === 'attendance' && '📅'}
                  {activity.type === 'profile' && '👤'}
                  {activity.type === 'payroll' && '💰'}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span>{' '}
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Holidays */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Holidays</h2>
            <Button variant="ghost" size="sm">View Calendar</Button>
          </div>
          <div className="space-y-4">
            {upcomingHolidays.map((holiday, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900">{holiday.date}</p>
                    <p className="text-xs text-gray-500">{holiday.day}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{holiday.holiday}</p>
                    <p className="text-xs text-gray-500 capitalize">{holiday.type} holiday</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  holiday.type === 'national' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {holiday.type === 'national' ? 'National' : 'Festival'}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}