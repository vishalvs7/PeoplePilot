'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function EmployeeDashboardPage() {
  const stats = [
    { label: 'Today\'s Status', value: 'Present', change: 'Checked in: 9:02 AM', icon: '✅', color: 'bg-green-100 text-green-600' },
    { label: 'Leave Balance', value: '18 days', change: 'Casual: 8, Sick: 6, Earned: 4', icon: '🏝️', color: 'bg-blue-100 text-blue-600' },
    { label: 'This Month', value: '21/22 days', change: '95% attendance', icon: '📅', color: 'bg-purple-100 text-purple-600' },
    { label: 'Salary Due', value: '₹68,500', change: 'Next: 25th Jan', icon: '💰', color: 'bg-amber-100 text-amber-600' },
  ];

  const recentActivities = [
    { action: 'Checked in', time: 'Today, 9:02 AM', icon: '🟢' },
    { action: 'Applied for leave', time: 'Yesterday, 4:30 PM', icon: '📝' },
    { action: 'Salary credited', time: 'Jan 5, 10:00 AM', icon: '💰' },
    { action: 'Profile updated', time: 'Jan 3, 3:15 PM', icon: '👤' },
  ];

  const upcomingLeaves = [
    { date: 'Jan 20-22', type: 'Casual Leave', days: 3, status: 'Approved' },
    { date: 'Feb 1-5', type: 'Earned Leave', days: 5, status: 'Pending' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, Rajesh! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Here's your dashboard for today.
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
          <a href="/dashboard/employee/attendance" className="block">
            <Card className="p-6 hover:border-primary transition-colors cursor-pointer text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary text-xl">📅</span>
              </div>
              <h3 className="font-medium text-gray-900">Mark Attendance</h3>
            </Card>
          </a>
          <a href="/dashboard/employee/leaves" className="block">
            <Card className="p-6 hover:border-primary transition-colors cursor-pointer text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary text-xl">🏝️</span>
              </div>
              <h3 className="font-medium text-gray-900">Apply Leave</h3>
            </Card>
          </a>
          <a href="/dashboard/employee/salary" className="block">
            <Card className="p-6 hover:border-primary transition-colors cursor-pointer text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary text-xl">💰</span>
              </div>
              <h3 className="font-medium text-gray-900">View Salary</h3>
            </Card>
          </a>
          <a href="/dashboard/employee/profile" className="block">
            <Card className="p-6 hover:border-primary transition-colors cursor-pointer text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary text-xl">👤</span>
              </div>
              <h3 className="font-medium text-gray-900">Update Profile</h3>
            </Card>
          </a>
        </div>
      </div>

      {/* Recent Activity & Upcoming Leaves */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 pb-4 border-b border-gray-100 last:border-0">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-lg">{activity.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4">View All Activity</Button>
        </Card>

        {/* Upcoming Leaves */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Leaves</h2>
            <Button variant="ghost" size="sm">Apply Leave</Button>
          </div>
          <div className="space-y-4">
            {upcomingLeaves.map((leave, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{leave.date}</p>
                  <p className="text-sm text-gray-500">{leave.type} • {leave.days} days</p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  leave.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {leave.status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Leave Balance</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-xs text-gray-500">Casual</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">6</p>
                <p className="text-xs text-gray-500">Sick</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">4</p>
                <p className="text-xs text-gray-500">Earned</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Company Announcements */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">📢 Company Announcements</h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600">🎉</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Republic Day Holiday</h4>
                <p className="text-xs text-gray-500">Posted: Jan 20, 2024</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Office will remain closed on 26th January for Republic Day. Wishing everyone a happy holiday!
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600">🏆</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Employee of the Month</h4>
                <p className="text-xs text-gray-500">Posted: Jan 15, 2024</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Congratulations to Priya Sharma for being selected as Employee of the Month for December!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}