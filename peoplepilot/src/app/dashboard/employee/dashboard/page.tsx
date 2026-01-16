'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock, FileText, DollarSign, TrendingUp, CheckCircle } from 'lucide-react';

// Mock data
const quickStats = [
  { label: 'Today\'s Hours', value: '8.5 hrs', icon: Clock, color: 'bg-blue-500' },
  { label: 'Pending Leaves', value: '2', icon: FileText, color: 'bg-amber-500' },
  { label: 'This Month Salary', value: '₹68,500', icon: DollarSign, color: 'bg-green-500' },
  { label: 'Attendance Rate', value: '96.2%', icon: TrendingUp, color: 'bg-purple-500' },
];

const recentActivities = [
  { id: 1, action: 'Checked in', time: 'Today, 9:02 AM', status: 'success' },
  { id: 2, action: 'Leave approved', time: 'Yesterday, 2:30 PM', status: 'success' },
  { id: 3, action: 'Payslip generated', time: 'Jan 28, 2024', status: 'info' },
  { id: 4, action: 'Document uploaded', time: 'Jan 25, 2024', status: 'info' },
  { id: 5, action: 'Checked out', time: 'Jan 24, 6:05 PM', status: 'success' },
];

const upcomingHolidays = [
  { date: 'Jan 26, 2024', name: 'Republic Day', type: 'National Holiday' },
  { date: 'Mar 8, 2024', name: 'Holi', type: 'Festival Holiday' },
  { date: 'Mar 29, 2024', name: 'Good Friday', type: 'Observance' },
];

const announcements = [
  { title: 'New HR Policy', date: 'Jan 15, 2024', priority: 'high' },
  { title: 'Team Lunch - Friday', date: 'Jan 12, 2024', priority: 'medium' },
  { title: 'System Maintenance', date: 'Jan 10, 2024', priority: 'low' },
];

export default function EmployeeDashboardPage() {
  const [showCheckIn, setShowCheckIn] = useState(true);

  const handleCheckIn = () => {
    setShowCheckIn(false);
    alert('Successfully checked in at ' + new Date().toLocaleTimeString());
  };

  const handleCheckOut = () => {
    setShowCheckIn(true);
    alert('Successfully checked out at ' + new Date().toLocaleTimeString());
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Alex Johnson! 👋</h1>
          <p className="text-gray-600">Here's what's happening with your account today.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Employee ID</p>
            <p className="font-semibold">EMP-2023-045</p>
          </div>
          <div className="h-10 w-px bg-gray-300"></div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Department</p>
            <p className="font-semibold">Engineering</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Check In/Out Card */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Attendance</h2>
              <p className="text-sm text-gray-600">Track your daily attendance</p>
            </div>
            <Calendar className="h-8 w-8 text-gray-400" />
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Date</p>
                <p className="text-2xl font-bold text-gray-900">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Current Time</p>
                <p className="text-2xl font-bold text-gray-900">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
            
            <div className="mt-6">
              {showCheckIn ? (
                <Button 
                  onClick={handleCheckIn}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold"
                >
                  <Clock className="h-5 w-5 mr-2" />
                  Check In Now
                </Button>
              ) : (
                <Button 
                  onClick={handleCheckOut}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold"
                >
                  <Clock className="h-5 w-5 mr-2" />
                  Check Out Now
                </Button>
              )}
            </div>
            
            <p className="text-xs text-center text-gray-500 mt-4">
              {showCheckIn ? 'You need to check in to start tracking your work hours' : 'You are currently checked in since 9:02 AM'}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600">Monthly Hours</p>
              <p className="text-2xl font-bold text-gray-900">142.5 hrs</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600">Overtime</p>
              <p className="text-2xl font-bold text-green-600">8.5 hrs</p>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-4">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-4">
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg mr-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className="mr-3 mt-1">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">View All Activity</Button>
        </Card>

        {/* Upcoming Holidays */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">📅 Upcoming Holidays</h2>
          <div className="space-y-3">
            {upcomingHolidays.map((holiday, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{holiday.name}</p>
                  <p className="text-sm text-gray-500">{holiday.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{holiday.date}</p>
                  <p className="text-xs text-gray-500">Friday</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">View Calendar</Button>
        </Card>

        {/* Announcements */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">📢 Company Announcements</h2>
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <div key={index} className="border-l-4 pl-4" style={{ 
                borderColor: announcement.priority === 'high' ? '#EF4444' : 
                             announcement.priority === 'medium' ? '#F59E0B' : '#10B981' 
              }}>
                <p className="font-medium text-gray-900">{announcement.title}</p>
                <div className="flex items-center mt-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                    announcement.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)} Priority
                  </span>
                  <span className="ml-2 text-sm text-gray-500">{announcement.date}</span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">View All Announcements</Button>
        </Card>
      </div>

      {/* Quick Links */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="flex flex-col items-center justify-center h-32">
            <FileText className="h-8 w-8 text-blue-600 mb-2" />
            <span>Apply Leave</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center justify-center h-32">
            <DollarSign className="h-8 w-8 text-green-600 mb-2" />
            <span>View Payslips</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center justify-center h-32">
            <Clock className="h-8 w-8 text-purple-600 mb-2" />
            <span>Attendance History</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center justify-center h-32">
            <Calendar className="h-8 w-8 text-amber-600 mb-2" />
            <span>Holiday Calendar</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}